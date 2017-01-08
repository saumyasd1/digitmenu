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
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;
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
			
			String orderEmailQueue=searchMap.get("orderEmailQueue");
			if(orderEmailQueue!=null && !"".equals(orderEmailQueue)){
				Disjunction disCriteria = Restrictions.disjunction();
				criteria.add(disCriteria);
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
		criteria.add(Restrictions.eq("status", "4"));//Status Code for Unrecognized mails
		entitiesMap.put("emailqueue", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}

	@Override
	public void cancelEmail(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater=null;
		Session session = null;
		String commentString="";
		try{
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
			session = getSessionFactory().getCurrentSession();
			OrderEmailQueue orderEmailQueueObj=null;
			orderEmailQueueObj=(OrderEmailQueue) session.get(OrderEmailQueue.class,entityId);
			updater = mapper.readerForUpdating(orderEmailQueueObj);
			orderEmailQueueObj = updater.readValue(data);
			if(orderEmailQueueObj.getComment()!=null)
				commentString=orderEmailQueueObj.getComment().replace("::", "\n");
			orderEmailQueueObj.setComment(commentString);
			orderEmailQueueObj.preUpdateOp();
			session.update(orderEmailQueueObj);
			orderEmailQueueObj.postUpdateOp();
			commentString="";
			String status=orderEmailQueueObj.getStatus();
			String comment=orderEmailQueueObj.getComment();
			if(!"".equals(comment)){
				commentString=",comment=:comment ";
			}
			String s = "update OrderEmailQueue set status=:value "+commentString+" where id =:id "; 
			Query q = session.createQuery(s);
			q.setString("value",status);
			if(!"".equals(comment)){
				q.setString("comment",comment);
			}
			q.setLong("id",entityId);
			q.executeUpdate();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while Performing updating ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while Performing updating ", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}

	@Override
	public void disregardEmail(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater=null;
		Session session = null;
		String commentString="";
		try{
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
			session = getSessionFactory().getCurrentSession();
			OrderEmailQueue orderEmailQueueObj=null;
			orderEmailQueueObj=(OrderEmailQueue) session.get(OrderEmailQueue.class,entityId);
			updater = mapper.readerForUpdating(orderEmailQueueObj);
			orderEmailQueueObj = updater.readValue(data);
			if(orderEmailQueueObj.getComment()!=null)
				commentString=orderEmailQueueObj.getComment().replace("::", "\n");
			orderEmailQueueObj.setComment(commentString);
			orderEmailQueueObj.preUpdateOp();
			session.update(orderEmailQueueObj);
			orderEmailQueueObj.postUpdateOp();
			commentString="";
			String status=orderEmailQueueObj.getStatus();
			String comment=orderEmailQueueObj.getComment();
			if(!"".equals(comment)){
				commentString=",comment=:comment ";
			}
			String s = "update OrderEmailQueue set status=:value "+commentString+" where id =:id "; 
			Query q = session.createQuery(s);
			q.setString("value",status);
			if(!"".equals(comment)){
				q.setString("comment",comment);
			}
			q.setLong("id",entityId);
			q.executeUpdate();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while disregarding email", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while disregarding email", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}
	

	@Override
	public void identifyEmail(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater= null ;
		Session session = null;
		try{
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
			session = getSessionFactory().getCurrentSession();
			OrderEmailQueue orderEmailQueueObj=null;
			orderEmailQueueObj=(OrderEmailQueue) session.get(OrderEmailQueue.class,entityId);
			updater = mapper.readerForUpdating(orderEmailQueueObj);
			orderEmailQueueObj = updater.readValue(data);
			orderEmailQueueObj.preUpdateOp();
			session.update(orderEmailQueueObj);
			orderEmailQueueObj.postUpdateOp();
			String status=orderEmailQueueObj.getStatus();
			String s = "update OrderEmailQueue set status=:value where id =:id "; 
			Query q = session.createQuery(s);
			q.setString("value",status);
			q.setLong("id",entityId);
			q.executeUpdate();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while processing order", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while processing order", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}
	
	@Override
	public void assignCsrValue(Long entityId, String csrId){
		Session session = null;
		try{
			session = getSessionFactory().getCurrentSession();
			OrderEmailQueue orderEmailQueueObj=null;
			orderEmailQueueObj=(OrderEmailQueue) session.get(OrderEmailQueue.class,entityId);
			orderEmailQueueObj.setAssignCSR(csrId);
			orderEmailQueueObj.setStatus("3");
			String s = "update OrderFileAttachment set status=:value where orderEmailQueueId =:id "; 
			Query q = session.createQuery(s);
			q.setString("value","6");
			q.setLong("id",entityId);
			q.executeUpdate();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while processing order", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while processing order", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}


}
