package com.avery.storage.dao.impl;


import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
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
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderQueue;
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
		criteria.add(Restrictions.neOrIsNotNull("status", "4"));
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
			//Adding search map criteria and removing unnecessary code
			String subject=searchMap.get("subject");
			if(subject!=null && !"".equals(subject)){
				criteria.add(Restrictions.ilike("subject", subject,MatchMode.ANYWHERE));
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
		
		List<OrderEmailQueue> list = criteria.list();
		// getting colorCode, iconName and values as required at the GUI
		HashMap<String, Map> statusList = ApplicationUtils.statusCode;
		if (statusList == null)
			throw new Exception("Unable to fetch Status List.");
		for (OrderEmailQueue orderQueue : list) {
			String status = orderQueue.getStatus();
			if (status == null | status.equals(""))
				throw new Exception("Unidentified value found for the status.");
			Map<String, String> statusCodes = statusList.get(status);
			if (statusCodes == null)
				throw new Exception("No data found in the status table for status:: \"" + status + "\".");
			String iconName = statusCodes.get("iconName");
			String colorCode = statusCodes.get("colorCode");
			String codeValue = statusCodes.get("codeValue");
			orderQueue.setIconName(iconName);
			orderQueue.setColorCode(colorCode);
			orderQueue.setCodeValue(codeValue);
			
			//orderqueue count added for the emailqueue screen "view order" button
			long trackId = orderQueue.getId();
			int orderQueueCount = getOrderQueueCountByTrackId(trackId);
			orderQueue.setOrderQueueCount(orderQueueCount);

		}
		entitiesMap.put("totalCount", totalCount);
		entitiesMap.put("emailqueue", new LinkedHashSet(list));
		return entitiesMap;
	}
	
	@Override
	public Map getUnidentifiedEntities(MultivaluedMap queryMap) throws Exception{
		Map entitiesMap = new HashMap();
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = null;
		int totalCount = 0;
		criteria = session.createCriteria(OrderEmailQueue.class);
		criteria.add(Restrictions.eq("status", "4"));// Status Code for Unrecognized mails
		criteria.addOrder(Order.desc("lastModifiedDate"));
		totalCount = HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		String limit = (String) queryMap.getFirst("limit");
		String pageNo = (String) queryMap.getFirst("page");
		//Adding searchmap for task manager
		String queryString=(String) queryMap.getFirst("query");
		Map<String,String> searchMap=ApplicationUtils.convertJSONtoMaps(queryString);
		String subject=searchMap.get("subject");
		if(subject!=null && !"".equals(subject)){
			criteria.add(Restrictions.ilike("subject", subject,MatchMode.ANYWHERE));
		}
		
		//Pagination added for taskmanager
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if (pageNO != 0) {
			criteria.setFirstResult((pageNO - 1) * pageSize);
			criteria.setMaxResults(pageSize);
		}
		// getting colorCode, iconName and values as required at the GUI
		List<OrderEmailQueue> list = criteria.list();
		try {
			HashMap<String, Map> statusList = ApplicationUtils.statusCode;
			if (statusList == null)
				throw new Exception("Unable to fetch Status List");
			for (OrderEmailQueue orderQueue : list) {
				String status = orderQueue.getStatus();
				if (status == null | status.equals(""))
					throw new Exception("Unidentified value found for the status");
				Map<String, String> statusCodes = statusList.get(status);
				if (statusCodes == null)
					throw new Exception("No data found in the status table for status:: " + status);
				String iconName = statusCodes.get("iconName");
				String colorCode = statusCodes.get("colorCode");
				String codeValue = statusCodes.get("codeValue");
				orderQueue.setIconName(iconName);
				orderQueue.setColorCode(colorCode);
				orderQueue.setCodeValue(codeValue);

			}
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching Unidentified emails ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching Unidentified Emails ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		entitiesMap.put("emailqueue", new LinkedHashSet(list));
		entitiesMap.put("totalCount", totalCount);
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
	
	
	// Getting orderqueue count to enable/disable "view order" button as
	// required at the GUI
	/**
	 * @param trackId
	 * @return orderQueue count
	 */
	public int getOrderQueueCountByTrackId(Long trackId) {
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(OrderQueue.class)
				.createAlias("varOrderFileAttachment", "varOrderFileAttachment")
				.createAlias("varOrderFileAttachment.varOrderEmailQueue", "varOrderEmailQueue")
				.add(Restrictions.eq("varOrderEmailQueue.id", trackId));

		criteria.setProjection(Projections.rowCount());
		List results = criteria.list();
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		return results == null || results.size() == 0 ? 0 : ((Long) results.get(0)).intValue();
	}


}
