package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

@Repository
public class ProductLineDaoImpl extends GenericDaoImpl<ProductLine, Long> implements
		ProductLineDao {
	int partnerId;
	@Override
	public Map readAllByPartnerID(MultivaluedMap queryMap) throws Exception{
		Map entitiesMap=null;
		entitiesMap=getAllEntitiesWithCriteria(queryMap);
		return entitiesMap;
	}

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		Map entitiesMap =new HashMap();
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		String queryString=(String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(ProductLine.class);
		Partner partner = new Partner();
		String PartnerId=(String)queryMap.getFirst("partnerId");
		Long partnerId=Long.valueOf(PartnerId);
		partner.setId(partnerId);
		criteria.add(Restrictions.eq("partner", partner));
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
			String productLineType=searchMap.get("productLineType");
			if(productLineType!=null && !"".equals(productLineType)){
				criteria.add(Restrictions.ilike("productLineType", productLineType,MatchMode.ANYWHERE));
			}
		}
			totalCount=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if(pageNO!=0){
        criteria.setFirstResult((pageNO - 1) * pageSize);
        criteria.setMaxResults(pageSize);
		}
        entitiesMap.put("totalCount", totalCount);
        entitiesMap.put("productlines", new LinkedHashSet(criteria.list()));
		return entitiesMap;

	}
	
	@Override
	public Boolean checkDuplicateValues(ProductLine productLine) throws Exception{
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		Boolean valueExist=false;
		Partner partnerobj=null;
		String partnerName="",rboName="",productLineType="";
		List<ProductLine> productLineList = null;
		partnerobj=productLine.getPartner();
		partnerName=partnerobj.getPartnerName();
		rboName=productLine.getRboName();
		productLineType=productLine.getProductLineType();
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(ProductLine.class);
		 Conjunction disCriteria = Restrictions.conjunction();
			criteria.createAlias("partner", "partner");
			disCriteria.add(Restrictions.eq("partner"+".partnerName",partnerName));
			disCriteria.add(Restrictions.eq("rboName", rboName));
			disCriteria.add(Restrictions.eq("productLineType", productLineType));
			criteria.add(disCriteria);
			productLineList= criteria.list();
			totalCount=productLineList.size();
			if(totalCount>0)
				valueExist=true;
		return valueExist;
	}

	
}
