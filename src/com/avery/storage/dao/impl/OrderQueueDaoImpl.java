package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderQueue;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

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
			String ProductLineType=searchMap.get("ProductLineType");
			if(ProductLineType!=null && !"".equals(ProductLineType)){
				criteria.createAlias("productLine", "productLine");
				criteria.add(Restrictions.ilike("productLine"+".productLineType",ProductLineType,MatchMode.ANYWHERE));
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
        entitiesMap.put("orders", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}

	@Override
	public void submitOrderToSystem(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		Long currentObjId=0L;
		ObjectReader updater=null;
		Session session = null;
		try{
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			session = getSessionFactory().getCurrentSession();
			OrderQueue orderQueueObj=null;
			orderQueueObj=(OrderQueue) session.get(OrderQueue.class,entityId);
			updater = mapper.readerForUpdating(orderQueueObj);
			orderQueueObj = updater.readValue(data);
			orderQueueObj.preUpdateOp();
			session.update(orderQueueObj);
			orderQueueObj.postUpdateOp();
			String status=orderQueueObj.getStatus();
			String s = "update SalesOrder set status=:value where orderQueueID=:id";
			Query q = session.createQuery(s);
			q.setString("value",status);
			q.setLong("id",entityId);
			q.executeUpdate();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while Performing bulk update ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while Performing bulk update ", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}
	
	@Override
	public void cancelOrder(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		Long currentObjId=0L;
		ObjectReader updater=null;
		Session session = null;
		String commentString="";
		try{
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			session = getSessionFactory().getCurrentSession();
			OrderQueue orderQueueObj=null;
			orderQueueObj=(OrderQueue) session.get(OrderQueue.class,entityId);
			updater = mapper.readerForUpdating(orderQueueObj);
			orderQueueObj = updater.readValue(data);
			orderQueueObj.preUpdateOp();
			session.update(orderQueueObj);
			orderQueueObj.postUpdateOp();
			String status=orderQueueObj.getStatus();
			String comment=orderQueueObj.getComment();
			if(!"".equals(comment)){
				commentString=",comment=:comment ";
			}
			String s = "update OrderLine set status=:value "+commentString+" where orderQueueID=:id";
			Query q = session.createQuery(s);
			q.setString("value",status);
			if(!"".equals(comment)){
				q.setString("comment",comment);
			}
			q.setLong("id",entityId);
			q.executeUpdate();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while Performing bulk update ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while Performing bulk update ", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}
}
