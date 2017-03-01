package com.avery.storage.dao.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.ProductLine;
import com.avery.utils.ApplicationConstants;
import com.avery.utils.ApplicationUtils;

@Repository
public class OrderFileAttachmentDaoImpl extends GenericDaoImpl<OrderFileAttachment, Long> implements
OrderFileAttachmentDao {
	
	@Override
	public List<OrderFileAttachment> readAllByOrderID(Long orderID){
		
		Session session = null;
		Criteria criteria = null;
		try{
			Map entitiesMap = new HashMap();
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderFileAttachment.class);
			/*
			 * ProjectionList projections = Projections.projectionList();
			 * projections.add(Projections.property("id"), "id");
			 * projections.add(Projections.property("fileName"), "fileName");
			 * criteria.setProjection(projections); criteria.setMaxResults(10);
			 */
			criteria.add(Restrictions.eq("varOrderEmailQueue.id", orderID));
			List<OrderFileAttachment> list = criteria.list();
			// getting colorCode, iconName and values as required at the GUI
			HashMap<String, Map> statusList = ApplicationUtils.statusCode;
			if (statusList == null)
				throw new Exception("Unable to fetch Status List.");
			for (OrderFileAttachment orderFileAttachment : list) {
				String status = orderFileAttachment.getStatus();
				if (status == null | status.equals(""))
					throw new Exception("Unidentified value found for the status.");
				Map<String, String> statusCodes = statusList.get(status);
				if (statusCodes == null)
					throw new Exception("No data found in the status table for status:: \"" + status + "\".");
				String iconName = statusCodes.get("iconName");
				String colorCode = statusCodes.get("colorCode");
				String codeValue = statusCodes.get("codeValue");
				orderFileAttachment.setIconName(iconName);
				orderFileAttachment.setColorCode(colorCode);
				orderFileAttachment.setCodeValue(codeValue);

			}
			return list;
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
	public List<OrderFileAttachment> readByOrderQueueID(Long orderID, Long emailQueueId){
		
		Session session = null;
		Criteria criteria = null;
		try{
			Map entitiesMap = new HashMap();
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderFileAttachment.class)
					.createAlias("listOrderFileQueue", "listOrderFileQueue", JoinType.LEFT_OUTER_JOIN);
			/*
			 * ProjectionList projections = Projections.projectionList();
			 * projections.add(Projections.property("id"), "id");
			 * projections.add(Projections.property("fileName"), "fileName");
			 * criteria.setProjection(projections); criteria.setMaxResults(10);
			 */
			Conjunction conjunction = Restrictions.conjunction();
			conjunction.add(Restrictions.eq("varOrderEmailQueue.id", emailQueueId));
			conjunction.add(Restrictions.eq("fileContentType", "AdditionalData"));
			
			Disjunction disjunction = Restrictions.disjunction();
			disjunction.add(Restrictions.eq("listOrderFileQueue.id", orderID));
			disjunction.add(conjunction);
			
			criteria.add(disjunction);
			//criteria.add(Restrictions.eq("listOrderFileQueue.id", orderID));
			List<OrderFileAttachment> list = criteria.list();
			// getting colorCode, iconName and values as required at the GUI
			HashMap<String, Map> statusList = ApplicationUtils.statusCode;
			if (statusList == null)
				throw new Exception("Unable to fetch Status List.");
			for (OrderFileAttachment orderFileAttachment : list) {
				String status = orderFileAttachment.getStatus();
				if (status == null | status.equals(""))
					throw new Exception("Unidentified value found for the status.");
				Map<String, String> statusCodes = statusList.get(status);
				if (statusCodes == null)
					throw new Exception("No data found in the status table for status:: \"" + status + "\".");
				String iconName = statusCodes.get("iconName");
				String colorCode = statusCodes.get("colorCode");
				String codeValue = statusCodes.get("codeValue");
				orderFileAttachment.setIconName(iconName);
				orderFileAttachment.setColorCode(colorCode);
				orderFileAttachment.setCodeValue(codeValue);

			}
			return list;
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
			session = getSessionFactory().getCurrentSession();
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
	public Map getAdditionalFilesList(long orderFileQueueId){
		Map entitiesMap = new HashMap();
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().openSession();
			criteria = session.createCriteria(OrderLine.class);
			criteria.add(Restrictions.eq("varOrderFileQueue.id", orderFileQueueId));
			criteria.add(Restrictions.isNotNull("additionalFileId"));
			ProjectionList projections = Projections.projectionList();
			projections.add(Projections.property("additionalFileId"), "additionalFileId");
			criteria.setProjection(projections);
			List<String> list = criteria.list();
			if(list == null | list.size() == 0){
				session.close();
				return entitiesMap;
			}
			List uniqueList = getUniqueList(list);
			Iterator itr = uniqueList.iterator();
			Criteria crit = null;
			List<OrderFileAttachment> resList = new ArrayList<OrderFileAttachment>();
			while(itr.hasNext()){
				Long orderFileAttachmentId = (Long) itr.next();
				//System.out.println(ll);
				crit = session.createCriteria(OrderFileAttachment.class);
				ProjectionList proj = Projections.projectionList();
				proj.add(Projections.property("id").as("id"));
				proj.add(Projections.property("fileName").as("fileName"));
				proj.add(Projections.property("filePath").as("filePath"));
				crit.setProjection(proj);
				crit.add(Restrictions.eq("id", orderFileAttachmentId));
				crit.setResultTransformer(new AliasToBeanResultTransformer(OrderFileAttachment.class));
				OrderFileAttachment orderFileAttachment = (OrderFileAttachment) crit.list().get(0);
				resList.add(orderFileAttachment);
			}
			entitiesMap.put("additionalfiles", new LinkedHashSet(resList));

		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order attachments for order id " + orderFileQueueId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order attachments for order id " + orderFileQueueId, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		finally{
			session.close();
		}
		return entitiesMap;
	}

	/**
	 * @param list
	 * @return list with unique elements
	 */
	public List getUniqueList(List<String> list) {
		Set<Long> set = new HashSet<Long>();
		for (int i = 0; i < list.size(); i++) {
			String str = list.get(i);
			String[] st = str.split(",");
			for (int p = 0; p < st.length; p++) {
				if (NumberUtils.isNumber(st[p])) {
					set.add(Long.parseLong(st[p]));
				}
			}
		}
		List newList = new ArrayList(set);

		return newList;
	}
	
	@Override
	public void insertEmailBody(OrderEmailQueue orderEmailQueue,String emailBody,ProductLine productLineObj, String filePath){
		OrderFileAttachment obj=new OrderFileAttachment();
		obj.setVarOrderEmailQueue(orderEmailQueue);
		obj.setFilePath(filePath);
		//obj.setVarProductLine(productLineObj);
		obj.setCreatedDate(new Date());
		obj.setStatus(ApplicationConstants.DEFAULT_WEBORDER_EMAILBODY_STATUS);
		obj.setFileContentType(ApplicationConstants.DEFAULT_EMAILBODY_CONTENT_TYPE);
		obj.setFileName("CompleteEmail.html");
		obj.setCreatedBy(ApplicationConstants.DEFAULT_USER_NAME);
		obj.setFileExtension(ApplicationConstants.DEFAULT_EMAIL_FILE_EXTENSION);
		create(obj);
		createHTMLFile(emailBody, filePath);
}
	//Method for updating emailqueue status to disregard if all the corresponding attachments are disregard
	@Override
	public void checkDisregardMail(Long entityId) {
		Session session = null;
		Criteria criteria = null;
		try {
			session = getSessionFactory().getCurrentSession();
			OrderEmailQueue orderEmailQueue = (OrderEmailQueue) session.get(OrderEmailQueue.class, entityId);
			criteria = session.createCriteria(OrderFileAttachment.class)
					.add(Restrictions.eq("varOrderEmailQueue", orderEmailQueue))
					.add(Restrictions.neOrIsNotNull("fileContentType", "Disregard"));
			List list = criteria.list();
			if (list.size() == 0 | list == null) {
				String s = "update OrderEmailQueue set status=:status where id =:id ";
				Query q = session.createQuery(s);
				q.setString("status", ApplicationConstants.ORDEREMAILQUEUE_DISREGARDED_STATUS);
				q.setLong("id", entityId);
				q.executeUpdate();
				System.out.println("All Disregard");
			} else {
				if (!orderEmailQueue.getStatus().equals(ApplicationConstants.ORDEREMAILQUEUE_UNIDENTIFIED_STATUS)) {
					String s = "update OrderEmailQueue set status=:status where id =:id ";
					Query q = session.createQuery(s);
					q.setString("status", ApplicationConstants.ORDEREMAILQUEUE_UNIDENTIFIED_STATUS);
					q.setLong("id", entityId);
					q.executeUpdate();
				}
				System.out.println("Not All Disregard");
			}

		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching order attachments for order id ");
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching order attachments for order id ");
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	/**Method for creating html file from string
	 * @param emailBody
	 * @param filePath
	 */
	private void createHTMLFile(String emailBody, String filePath) {
		FileWriter fWriter = null;
		BufferedWriter writer = null;
		try {
			emailBody = emailBody.replaceAll("\n", "</br>");
			fWriter = new FileWriter(filePath + File.separator + "CompleteEmail.html");
			writer = new BufferedWriter(fWriter);
			writer.write("<html>\n" + emailBody + "\n</html>");
			writer.newLine();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (writer != null) {
				try {
					writer.close();
				} catch (IOException e) {
					// ignore
				}
			}
		}
	}
	
}
