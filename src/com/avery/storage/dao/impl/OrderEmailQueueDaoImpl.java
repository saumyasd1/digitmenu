package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

@Repository
public class OrderEmailQueueDaoImpl extends GenericDaoImpl<OrderEmailQueue, Long> implements
OrderEmailQueueDao {
	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map entitiesMap =new HashMap();
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		String queryString=(String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(OrderEmailQueue.class);
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
			/*String partnerName=searchMap.get("partnerName");
			if(partnerName!=null && !"".equals(partnerName)){
				criteria.createAlias("partner", "partner");
	            criteria.add(Restrictions.ilike("partner"+".partnerName",partnerName,MatchMode.ANYWHERE));
//				criteria.add(Restrictions.ilike("partnerName", partnerName,MatchMode.ANYWHERE));
			}*/
			String orderEmailQueue=searchMap.get("orderEmailQueue");
			if(orderEmailQueue!=null && !"".equals(orderEmailQueue)){
				Disjunction disCriteria = Restrictions.disjunction();
				/*disCriteria.add(Restrictions.ilike("address1", address,MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address2", address,MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address3", address,MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address4", address,MatchMode.ANYWHERE));
				*/criteria.add(disCriteria);
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
        entitiesMap.put("totalCount", totalCount);
        entitiesMap.put("emailqueue", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}
	
	@Override
	public Map getUnidentifiedEntities(){
		Map entitiesMap = new HashMap();
		Session session=getSessionFactory().getCurrentSession();
		Criteria criteria=null;
		criteria = session.createCriteria(OrderEmailQueue.class);
		criteria.add(Restrictions.eq("status", "1"));
		entitiesMap.put("emailqueue", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}

}
