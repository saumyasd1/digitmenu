package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.Partner;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

@Repository
public class OrderQueueDaoImpl extends GenericDaoImpl<OrderQueue, Long> implements
		OrderQueueDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		Map entitiesMap =new HashMap();
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		String queryString=(String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(OrderQueue.class);
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
			String PartnerName=searchMap.get("PartnerName");
			if(PartnerName!=null && !"".equals(PartnerName)){
				criteria.createAlias("partner", "partner");
				criteria.add(Restrictions.ilike("partner"+".partnerName",PartnerName,MatchMode.ANYWHERE));
			}
			String RBOName=searchMap.get("RBOName");
			if(RBOName!=null && !"".equals(RBOName)){
				criteria.add(Restrictions.ilike("rboName",RBOName,MatchMode.ANYWHERE));
			}
			String Subject=searchMap.get("Subject");
			if(Subject!=null && !"".equals(Subject)){
				criteria.add(Restrictions.ilike("subject",Subject,MatchMode.ANYWHERE));
			}
			String Status=searchMap.get("Status");
			if(Status!=null && !"".equals(Status)){
				criteria.add(Restrictions.ilike("status",Status,MatchMode.ANYWHERE));
			}
			String EmailBody=searchMap.get("EmailBody");
			if(EmailBody!=null && !"".equals(EmailBody)){
				criteria.add(Restrictions.ilike("emailBody",EmailBody,MatchMode.ANYWHERE));
			}
			String OrderSource=searchMap.get("OrderSource");
			if(OrderSource!=null && !"".equals(OrderSource)){
				criteria.add(Restrictions.ilike("orderSource",OrderSource,MatchMode.ANYWHERE));
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
        entitiesMap.put("orders", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}
}
