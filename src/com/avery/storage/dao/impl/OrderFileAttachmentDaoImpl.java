package com.avery.storage.dao.impl;

import java.util.HashMap;
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
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Address;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.Partner;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Repository
public class OrderFileAttachmentDaoImpl extends GenericDaoImpl<OrderFileAttachment, Long> implements
OrderFileAttachmentDao {
	
	@Override
	public List<OrderFileAttachment> readAllByOrderID(Long orderID){
		
		Session session = null;
		Criteria criteria = null;
		try{
			Map entitiesMap = new HashMap();
			session = getSessionFactory().openSession();
			criteria = session.createCriteria(OrderFileAttachment.class);
			/*ProjectionList projections = Projections.projectionList();
			projections.add(Projections.property("id"), "id");
			projections.add(Projections.property("fileName"), "fileName");
			criteria.setProjection(projections);
			*/
			criteria.setMaxResults(10);
			criteria.add(Restrictions.eq("varOrderEmailQueue.id", orderID));
			return criteria.list();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order attachments for order id " + orderID, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order attachments for order id " + orderID, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}
	
	@Override
	public List<OrderFileAttachment> readFileByID(Long fileID){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().openSession();
			criteria = session.createCriteria(OrderFileAttachment.class);
			ProjectionList projections = Projections.projectionList();
			projections.add(Projections.property("fileData"), "fileData");
			criteria.setProjection(projections);
			OrderQueue orderQueue = new OrderQueue();
			orderQueue.setId(fileID);
			criteria.add(Restrictions.eq("orderQueue", orderQueue));
			return criteria.list();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order attachments for order id " + fileID, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order attachments for order id " + fileID, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public void identifyEmail(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		Long currentObjId=0L;
		ObjectReader updater=null;
		Session session = null;
		try{
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
			session = getSessionFactory().getCurrentSession();
			OrderFileAttachment OrderFileAttachmentObj=null;
			OrderFileAttachmentObj=(OrderFileAttachment) session.get(OrderFileAttachment.class,entityId);
			updater = mapper.readerForUpdating(OrderFileAttachmentObj);
			OrderFileAttachmentObj = updater.readValue(data);
			OrderFileAttachmentObj.preUpdateOp();
			session.update(OrderFileAttachmentObj);
			OrderFileAttachmentObj.postUpdateOp();
			String status=OrderFileAttachmentObj.getStatus();
			String s = "update OrderFileAttachment set status=:value where id =:id "; 
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
	public void bulkUpdate(String jsonData,Map<String,Boolean> insertAddress){
		ObjectMapper mapper = new ObjectMapper();
		Long currentObjId=0L;
		ObjectReader updater=null;
		String[] objArray=jsonData.split("@@@");
		Session session = null;
		try{
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			session = getSessionFactory().getCurrentSession();
			
			String t=null;
			//boolean insertShipAddress=false,insertBillAddress=false;
			for(int i=0;i<objArray.length;i++){
				t=objArray[i];
				OrderFileAttachment orderLine = mapper.readValue(t,OrderFileAttachment.class);
				//currentObjId=orderLine.getId();
				OrderFileAttachment attachmentObj=new OrderFileAttachment();
				attachmentObj.setId(orderLine.getId());
				attachmentObj.setStatus(orderLine.getStatus());
				attachmentObj.setFileContentType(orderLine.getFileContentType());
				attachmentObj.setVarProductLine(orderLine.getVarProductLine());
				session.save(attachmentObj);
				orderLine=(OrderFileAttachment) session.get(OrderFileAttachment.class,currentObjId);
				updater = mapper.readerForUpdating(orderLine);
				orderLine = updater.readValue(t);
				orderLine.preUpdateOp();
				session.update(orderLine);
				orderLine.postUpdateOp();
			}
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
	public void bulkUpdateAllById(String jsonData,Map<String,Boolean> flagMap,Long orderQueueId){
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater=null;
		Session session = null;
		boolean fileContentType=false,status=false;
		try{
			
			session = getSessionFactory().getCurrentSession();
			List<OrderFileAttachment> entities = readAllByOrderID(orderQueueId);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			for(OrderFileAttachment orderLine:entities){
				updater = mapper.readerForUpdating(orderLine);
				orderLine = updater.readValue(jsonData);
				orderLine.preUpdateOp();
				session.update(orderLine);
				orderLine.postUpdateOp();
			}
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
