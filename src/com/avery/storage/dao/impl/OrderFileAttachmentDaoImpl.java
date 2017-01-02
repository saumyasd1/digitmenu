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
	
	
	
	



	
}
