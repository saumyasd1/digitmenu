package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderFileQueueArchive;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

@Repository
public class OrderFileQueueArchiveDaoImpl extends GenericDaoImpl<OrderFileQueueArchive, Long> implements
OrderFileQueueArchiveDao {

	@Override
	public Long create(OrderFileQueueArchive newInstance) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public OrderFileQueueArchive read(Long id) {
		// TODO Auto-generated method stub
		return null;
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
		criteria = session.createCriteria(OrderFileQueueArchive.class);
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
				criteria.add(Restrictions.eq("status",Status));
			}
			String EmailBody=searchMap.get("EmailBody");
			if(EmailBody!=null && !"".equals(EmailBody)){
				criteria.add(Restrictions.ilike("emailBody",EmailBody,MatchMode.ANYWHERE));
			}
			String OrderSource=searchMap.get("OrderSource");
			if(OrderSource!=null && !"".equals(OrderSource)){
				criteria.add(Restrictions.eq("orderSource",OrderSource));
			}
			String ProductLineType=searchMap.get("ProductLineType");
			if(ProductLineType!=null && !"".equals(ProductLineType)){
				criteria.createAlias("productLine", "productLine");
				criteria.add(Restrictions.ilike("productLine"+".productLineType",ProductLineType,MatchMode.ANYWHERE));
			}
			String SenderEmailID=searchMap.get("SenderEmailID");
			if(SenderEmailID!=null && !"".equals(SenderEmailID)){
				criteria.add(Restrictions.ilike("senderEmailID",SenderEmailID,MatchMode.ANYWHERE));
			}
			String OrderTrackingID=searchMap.get("id");
			if(OrderTrackingID!=null && !"".equals(OrderTrackingID)){
				Long Id=Long.parseLong(OrderTrackingID);
				criteria.add(Restrictions.eq("id",Id));
			}
			String PONumber=searchMap.get("ponumber");
			if(PONumber!=null && !"".equals(PONumber)){
				criteria.add(Restrictions.eq("ponumber",PONumber));
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
        entitiesMap.put("ar_orderfilequeue", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}
}
