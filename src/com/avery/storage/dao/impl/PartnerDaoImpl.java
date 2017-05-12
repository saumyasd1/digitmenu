package com.avery.storage.dao.impl;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Address;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.Org;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.RBO;
import com.avery.storage.entities.SalesOrder;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class PartnerDaoImpl extends GenericDaoImpl<Partner, Long> implements
		PartnerDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map entitiesMap =new HashMap();
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		String queryString=(String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(Partner.class);
		String limit=(String)queryMap.getFirst("limit");
		String pageNo=(String) queryMap.getFirst("page");
		if(queryString!=null){
			Map<String,String> searchMap=ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType=searchMap.get("datecriteriavalue");
			if(dateType!=null && !dateType.equals("")){
				String sDate=searchMap.get("fromDate")+" 00:00:00";
				String eDate=searchMap.get("toDate")+" 00:00:00";
				criteria=HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String partnerName=searchMap.get("partnerName");
			if(partnerName!=null && !"".equals(partnerName)){
				criteria.add(Restrictions.ilike("partnerName", partnerName,MatchMode.ANYWHERE));
			}
		}
			totalCount=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
			 criteria.addOrder(Order.desc("lastModifiedDate"));
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if(pageNO!=0){
        criteria.setFirstResult((pageNO - 1) * pageSize);
        criteria.setMaxResults(pageSize);
		}
		List list = criteria.list();
		Partner partner = null;
		for (Object obj : list) {
			partner = (Partner) obj;
			long id = partner.getId();
			partner.setProductLineCount(getCountBasedOnPartnerId(ProductLine.class,id,"varPartner.id"));
			partner.setAddressCount(getCountBasedOnPartnerId(Address.class,id,"varPartner.id"));
			//partner.setOrderQueueCount(getCountBasedOnPartnerId(OrderQueue.class,id,"partner.id"));
		}
        entitiesMap.put("totalCount", totalCount);
        entitiesMap.put("partners", new LinkedHashSet(criteria.list()));
        criteria = session.createCriteria(RBO.class);
        entitiesMap.put("rbo", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}
	
	private int getCountBasedOnPartnerId(Class clazz,Long PartnerId,String propertyName) throws Exception{
		int count=0;
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(clazz);
		criteria.add(Restrictions.eq(propertyName, PartnerId));
		count=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		return count;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Boolean checkDuplicatePartnerName(Partner partnerObj) throws Exception{
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		String partnerName=partnerObj.getPartnerName();
		Long id=partnerObj.getId();
		Boolean partnerExist=false;
		List<Partner> partner = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(Partner.class);
		if(partnerName!=null && !"".equals(partnerName)){
			Conjunction disCriteria = Restrictions.conjunction();
			disCriteria.add(Restrictions.eq("partnerName", partnerName));
			if(id!=0){
				disCriteria.add(Restrictions.ne("id", id));
			}
			criteria.add(disCriteria);
			partner= criteria.list();
			totalCount=partner.size();
			if(totalCount>0)
				partnerExist=true;
		}
		return partnerExist;
	}
	
	@Override
	public List<Partner> getPartner(String siteId) {
		Map<String, Object> responseMap = new HashMap<String, Object>();
		Session session = null;
		Criteria criteria = null;
		Partner partner = null;
		List<Partner> partnerlist = new ArrayList<Partner>();
		List<Partner> partnerList = new ArrayList<Partner>();
		Integer userSiteId = Integer.parseInt(siteId);
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(Partner.class);
		Conjunction disCriteria = Restrictions.conjunction();
		disCriteria.add(Restrictions.eq("siteId", userSiteId));
		criteria.add(disCriteria);
		partnerList = criteria.list();
		for (Partner partnerIter : partnerList) {
			if (partnerIter != null) {
				partner = partnerIter;
				partner.setId(partner.getId());
				partner.setPartnerName(partner.getPartnerName());
				partner.setAddress1(partner.getAddress1());
				partner.setAddress2(partner.getAddress2());
				partner.setAddress3(partner.getAddress3());
				partner.setEmailDomain(partner.getEmailDomain());
				partner.setEmailId(partner.getEmailId());
				partnerlist.add(partner);
			}

		}
		try {
			responseMap.put("partners", partnerlist);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return partnerlist;
	}
	
	
	
}
