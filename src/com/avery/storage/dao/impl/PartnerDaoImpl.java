package com.avery.storage.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Partner;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

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
				String sDate=searchMap.get("fromDate");
				String eDate=searchMap.get("toDate");
				criteria=HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String partnerName=searchMap.get("partnerName");
			if(partnerName!=null && !"".equals(partnerName)){
				criteria.add(Restrictions.ilike("partnerName", partnerName,MatchMode.ANYWHERE));
			}
		}
		    criteria.addOrder(Order.desc("lastModifiedDate"));
			totalCount=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if(pageNO!=0){
        criteria.setFirstResult((pageNO - 1) * pageSize);
        criteria.setMaxResults(pageSize);
		}
		
        entitiesMap.put("totalCount", totalCount);
        entitiesMap.put("partners", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}
	
	
	@Override
	public Boolean checkDuplicatePartnerName(String partnerName) throws Exception{
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		Boolean partnerExist=false;
		List<Partner> partner = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(Partner.class);
		if(partnerName!=null && !"".equals(partnerName)){
			criteria.add(Restrictions.eq("partnerName", partnerName));
			partner= criteria.list();
			totalCount=partner.size();
			if(totalCount>0)
				partnerExist=true;
		}
		return partnerExist;
	}
	
	

	
}
