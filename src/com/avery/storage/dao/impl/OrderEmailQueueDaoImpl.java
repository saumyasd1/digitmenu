package com.avery.storage.dao.impl;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.NumberUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.SystemCsrCode;
import com.avery.storage.entities.User;
import com.avery.storage.service.CSRAcknowledgementService;
import com.avery.utils.ApplicationConstants;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.DateUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;
/**
 * @author Vishal
 *
 */
@Repository
public class OrderEmailQueueDaoImpl extends GenericDaoImpl<OrderEmailQueue, Long> implements
OrderEmailQueueDao {
	
	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map entitiesMap = new HashMap();
		int totalCount = 0;
		Criteria criteria = getCriteria(queryMap);//session.createCriteria(OrderEmailQueue.class);

		// Adding Projection to remove extra columns that are not required
		ProjectionList proj = Projections.projectionList();
		proj.add(Projections.property("id"), "id")
				.add(Projections.property("senderEmailId"), "senderEmailId")
				.add(Projections.property("subject"), "subject")
				.add(Projections.property("toMailId"), "toMailId")
				.add(Projections.property("siteId"), "siteId")
				.add(Projections.property("status"), "status")
				.add(Projections.property("ccMailId"), "ccMailId")
				.add(Projections.property("receivedDate"), "receivedDate")
				.add(Projections.property("readDate"), "readDate")
				.add(Projections.property("comment"), "comment")
				.add(Projections.property("acknowledgementDate"), "acknowledgementDate")
				.add(Projections.property("lastModifiedBy"), "lastModifiedBy")
				.add(Projections.property("lastModifiedDate"), "lastModifiedDate")
				.add(Projections.property("orderSource"), "orderSource")
				.add(Projections.property("emailSubjectProductLineMatch"), "emailSubjectProductLineMatch")
				.add(Projections.property("emailSubjectRBOMatch"), "emailSubjectRBOMatch")
				.add(Projections.property("emailBodyProductLineMatch"), "emailBodyProductLineMatch")
				.add(Projections.property("emailBodyRBOMatch"), "emailBodyRBOMatch");
		
		criteria.addOrder(Order.desc("lastModifiedDate"));
		
		
		criteria.add(Restrictions.neOrIsNotNull("status", ApplicationConstants.ORDEREMAILQUEUE_UNRECOGNIZED_STATUS));


		String limit = (String) queryMap.getFirst("limit");
		String pageNo = (String) queryMap.getFirst("page");
		String siteId = (String) queryMap.getFirst("siteId");
		String roleId = (String) queryMap.getFirst("roleId");
		if(!(roleId.equals("1") && siteId.equals(""))){
			criteria.add(Restrictions.eq("siteId", Integer.parseInt(siteId)));
		}

		totalCount = HibernateUtils.getAllRecordsCountWithCriteria(criteria);

		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if (pageNO != 0) {
			criteria.setFirstResult((pageNO - 1) * pageSize);
			criteria.setMaxResults(pageSize);
		}

		criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(OrderEmailQueue.class));
		//criteria.addOrder(Order.desc("lastModifiedDate"));

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
			orderQueue.setIconName(statusCodes.get("iconName"));
			orderQueue.setColorCode(statusCodes.get("colorCode"));
			orderQueue.setCodeValue(statusCodes.get("codeValue"));

			// orderqueue count added for the emailqueue screen "view order"
			// button
			long trackId = orderQueue.getId();
			int orderQueueCount = getOrderQueueCountByTrackId(trackId);
			orderQueue.setOrderQueueCount(orderQueueCount);
			
			String partnerName = "";
			partnerName = getPartnerNameByTrackId(trackId);
			orderQueue.setPartnerName(partnerName);
			String rboName = "";
			rboName = getRboNameByTrackId(trackId);
			orderQueue.setRboName(rboName);
			String csrName = "";
			csrName = getCSRNameByTrackId(trackId);
			orderQueue.setCsrName(csrName);

		}
		entitiesMap.put("totalCount", totalCount);
		entitiesMap.put("emailqueue",list);
		return entitiesMap;
	}
	
	@Override
	public Map getUnidentifiedEntities(MultivaluedMap queryMap) throws Exception{
		Map entitiesMap = new HashMap();
		/*Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = null;
		*/int totalCount = 0;
		Criteria criteria = getCriteria(queryMap);//session.createCriteria(OrderEmailQueue.class);
		
		ProjectionList proj = Projections.projectionList();
		proj.add(Projections.property("id"), "id")
				.add(Projections.property("senderEmailId"), "senderEmailId")
				.add(Projections.property("subject"), "subject")
				//.add(Projections.property("toMailId"), "toMailId")
				.add(Projections.property("status"), "status")
				.add(Projections.property("siteId"), "siteId")
				.add(Projections.property("ccMailId"), "ccMailId")
				.add(Projections.property("receivedDate"), "receivedDate")
				.add(Projections.property("readDate"), "readDate")
				.add(Projections.property("comment"), "comment")
				.add(Projections.property("createdDate"), "createdDate")
				//.add(Projections.property("acknowledgementDate"), "acknowledgementDate")
				.add(Projections.property("lastModifiedBy"), "lastModifiedBy")
				.add(Projections.property("lastModifiedDate"), "lastModifiedDate");
		
		
		criteria.add(Restrictions.eq("status", ApplicationConstants.ORDEREMAILQUEUE_UNRECOGNIZED_STATUS));// Status Code for Unrecognized mails
		criteria.addOrder(Order.desc("lastModifiedDate"));
		String siteId = (String) queryMap.getFirst("siteId");
		String roleId = (String) queryMap.getFirst("roleId");
		if(!(roleId.equals("1") && siteId.equals(""))){
			criteria.add(Restrictions.eq("siteId", Integer.parseInt(siteId)));
		}
		totalCount = HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		String limit = (String) queryMap.getFirst("limit");
		String pageNo = (String) queryMap.getFirst("page");
		criteria.setProjection(proj)
		.setResultTransformer(Transformers.aliasToBean(OrderEmailQueue.class));
		
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
				
				long trackId = orderQueue.getId();
				String csrName = "";
				csrName = getCSRNameByTrackId(trackId);
				orderQueue.setCsrName(csrName);

			}
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching Unidentified emails ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching Unidentified Emails ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		entitiesMap.put("emailqueue",list);
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
			String s = "update OrderEmailQueue set status=:value "+commentString+",lastModifiedDate=:date where id =:id "; 
			Query q = session.createQuery(s);
			q.setString("value",status);
			q.setTimestamp("date", new Date());//adding last modified date on cancel email
			if(!"".equals(comment)){
				q.setString("comment",comment);
			}
			q.setLong("id",entityId);
			q.executeUpdate();
			String s1 = "update OrderFileAttachment set comment=:comment where orderEmailQueueId =:id "; 
			Query q1 = session.createQuery(s1);
				q1.setString("comment","");
			q1.setLong("id",entityId);
			q1.executeUpdate();
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
	public void assignCsrValue(Long entityId, String csrId,String userId){
		Session session = null;
		try{
			session = getSessionFactory().getCurrentSession();
			OrderEmailQueue orderEmailQueueObj=null;
			orderEmailQueueObj=(OrderEmailQueue) session.get(OrderEmailQueue.class,entityId);
			orderEmailQueueObj.setAssignCSR(csrId);
			orderEmailQueueObj.setLastModifiedBy(userId);
			orderEmailQueueObj.setStatus(ApplicationConstants.ORDEREMAILQUEUE_UNIDENTIFIED_STATUS);
			orderEmailQueueObj.setLastModifiedDate(new Date());//last modified date added on assign csr click
			String s = "update OrderFileAttachment set status=:value where orderEmailQueueId =:id "; 
			Query q = session.createQuery(s);
			q.setString("value",ApplicationConstants.ORDERFILEATTACHMENT_UNIDENTIFIED_STATUS);
			q.setLong("id",entityId);
			q.executeUpdate();
			Long csrEntityId = Long.parseLong(csrId);
			User user = (User) session.get(User.class, csrEntityId);
			String toUserName = user.getEmail();
			String csrName = user.getFirstName();
			CSRAcknowledgementService csrAcknowledgementService = new CSRAcknowledgementService();
			csrAcknowledgementService.sendNotificationToCSR(entityId, toUserName, csrName);
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
	
	
	// Getting partner name using the tracking id
	/**
	 * @param trackId
	 * @return partner name
	 */
	public String getPartnerNameByTrackId(Long trackId) {
		String partnerName = "";
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		try {
			Criteria criteria = session.createCriteria(OrderEmailQueue.class)
					.createAlias("listOrderFileAttachment", "listOrderFileAttachment")
					.createAlias("listOrderFileAttachment.varProductLine", "varProductLine")
					.createAlias("varProductLine.varPartner", "varPartner").add(Restrictions.eq("id", trackId))
					.setProjection(Projections.property("varPartner.partnerName"));
			List list = criteria.list();
			partnerName = getCommaSeparatedUniqueValues(list);
			/*if (list != null && list.get(0) != null && (String) list.get(0) != "") {
				partnerName = (String) list.get(0);
			}*/

			return partnerName;
		} catch (IndexOutOfBoundsException e) {
			return "";
		}

	}
	
	// Getting rbo name using the tracking id
	/**
	 * @param trackId
	 * @return rbo name
	 */
	public String getRboNameByTrackId(Long trackId) {
		String rboName = "";
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		try {
			Criteria criteria = session.createCriteria(OrderEmailQueue.class)
					.createAlias("listOrderFileAttachment", "listOrderFileAttachment")
					.createAlias("listOrderFileAttachment.varProductLine", "varProductLine")
					.createAlias("varProductLine.varPartner", "varPartner").createAlias("varProductLine.rbo", "rbo")
					.add(Restrictions.eq("id", trackId))
					.setProjection(Projections.property("rbo.rboName").as("rboName"));
			List<String> list = criteria.list();
			rboName = getCommaSeparatedUniqueValues(list);
			
			return rboName;
		} catch (IndexOutOfBoundsException e) {
			return "";
		}
		catch(Exception e){
			return "";
		}

	}
	

	public Criteria getCriteria(MultivaluedMap queryMap) throws IOException, Exception{
		Session session=null;
		Criteria criteria=null;
		String queryString=(String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(OrderEmailQueue.class);
		if(queryString!=null){
			int flag = 0;
			Map<String,String> searchMap=ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType=searchMap.get("datecriteriavalue");
			if(dateType!=null && !dateType.equals("")){
				String sDate=searchMap.get("fromDate")+" 00:00:00";
				String eDate=searchMap.get("toDate")+" 00:00:00";
				criteria=HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String RBOName=searchMap.get("RBOName");
			if(RBOName!=null && !"".equals(RBOName)){
				flag = 1;
				criteria.createAlias("listOrderFileAttachment", "listOrderFileAttachment")
				.createAlias("listOrderFileAttachment.varProductLine", "productLine")
				.createAlias("productLine.varPartner", "partner")
				.createAlias("productLine.rbo", "rbo");
				criteria.add(Restrictions.ilike("rbo.rboName",RBOName,MatchMode.ANYWHERE));
			}

			String partnerName=searchMap.get("PartnerName");
			if(partnerName!=null && !"".equals(partnerName)){
				if(flag==0){
					criteria.createAlias("listOrderFileAttachment", "listOrderFileAttachment")
					.createAlias("listOrderFileAttachment.varProductLine", "productLine")
					.createAlias("productLine.varPartner", "partner");
				}
				criteria.add(Restrictions.ilike("partner.partnerName",partnerName,MatchMode.ANYWHERE));
			}
			String Subject=searchMap.get("Subject");
			if(Subject!=null && !"".equals(Subject)){
				criteria.add(Restrictions.ilike("subject",Subject,MatchMode.ANYWHERE));
			}
			String Status=searchMap.get("Status");
			if (Status != null && !"".equals(Status)) {
			//String[] status = Status.split(",");
			criteria.add(Restrictions.ilike("status", Status));
			}
			String days=searchMap.get("days");
			if(days!=null && !"".equals(days)){
			long lastDays= Long.parseLong(days);
			Date endDate = new Date(System.currentTimeMillis());
			endDate.setHours(0);
			endDate.setMinutes(0);
			endDate.setSeconds(0);
			Date startDate = DateUtils.getPreviousDate(endDate, lastDays);
			HibernateUtils.getCriteriaBasedOnDate(criteria, "createdDate", startDate, endDate);
			}
			String SenderEmailID=searchMap.get("SenderEmailID");
			if(SenderEmailID!=null && !"".equals(SenderEmailID)){
				criteria.add(Restrictions.ilike("senderEmailId",SenderEmailID,MatchMode.ANYWHERE));
			}
			String trackId=searchMap.get("id");
			if(trackId!=null && !"".equals(trackId) && NumberUtils.isNumber(trackId)){
				Long id = Long.parseLong(trackId);
				criteria.add(Restrictions.eq("id",id));
			}
			String assignCSR=searchMap.get("assignCSR");
			if(assignCSR!=null && !"".equals(assignCSR)){
				List<String> assignCSRList = ApplicationUtils.convertStringToList(assignCSR);
				criteria.add(Restrictions.in("assignCSR",assignCSRList));
			}
			String ccMailId=searchMap.get("ccMailId");
			if(ccMailId!=null && !"".equals(ccMailId)){
				criteria.add(Restrictions.ilike("ccMailId",ccMailId,MatchMode.ANYWHERE));
			}
			String siteId=searchMap.get("siteId");
			if(siteId!=null && !"".equals(siteId)){
				criteria.add(Restrictions.eq("siteId",Integer.parseInt(siteId)));
			}
		}
		/*else{
			 Date date = new Date();
		        String todate = HibernateUtils.sdfDate.format(date);
		        Calendar cal = Calendar.getInstance();
		        cal.add(Calendar.DATE, -7);
		        Date todate1 = cal.getTime();    
		        String strDate = HibernateUtils.sdfDate.format(todate1);
		    String endDate = HibernateUtils.sdfDate.format(date);
		    //criteria=HibernateUtils.getCriteriaBasedOnDate(criteria, "receivedDate", strDate, endDate);
		}*/
		return criteria;
	}
	
	/**Method to get csr name by track id
	 * @param trackId
	 * @return CSR Name
	 */
	public String getCSRNameByTrackId(Long trackId) {
		String csrName = "";
		String csrFirstName = "";
		String csrLastName = "";
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		OrderEmailQueue orderEmailQueue = (OrderEmailQueue) session.get(OrderEmailQueue.class, trackId);
		String csr = orderEmailQueue.getAssignCSR();
		if(csr==null | "".equals(csr) | !NumberUtils.isNumber(csr))
			return "";
		Long csrId = Long.parseLong(csr);
		try {
			User user = (User) session.get(User.class, csrId);
			if (user.getFirstName() != null && !"".equals(user.getFirstName())) {
				csrName += user.getFirstName();
			}
			if (user.getLastName() != null && !"".equals(user.getLastName())) {
				csrName += " "+user.getLastName();
			}
			return csrName;
		} catch (Exception e) {
			return "";
		}

	}
	
	/**
	 * @param list
	 * @return comma separated string of the unique items of the list
	 */
	public String getCommaSeparatedUniqueValues(List<String> list) {
		String resultString = "";
		if(list==null | list.size()==0)
			return "";
		try {
			Set<String> set = new HashSet<String>();
			set.addAll(list);

			list.clear();
			list.addAll(set);
			if (list != null && list.size() > 0) {
				for (String value : list) {
					resultString += value + ", ";
				}
				resultString = resultString.substring(0, resultString.length() - 2);
			}
		} catch (Exception e) {
			return "";
		}
		return resultString;
	}
	
	@Override
	public void updateAcknowledgementDate(Long entityId, Date acknowledgementDate){
		Session session = null;
		try{
			session = getSessionFactory().getCurrentSession();
			/*String s = "update OrderEmailQueue set acknowledgementDate=:value where id =:id "; 
			Query q = session.createQuery(s);
			q.setDate("value",acknowledgementDate);
			q.setLong("id",entityId);
			q.executeUpdate();*/
			OrderEmailQueue orderEmailQueue = (OrderEmailQueue) session.get(OrderEmailQueue.class, entityId);
			orderEmailQueue.setAcknowledgementDate(acknowledgementDate);
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while updating acknowledgement date", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while updating acknowledgement date", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Set<OrderEmailQueue> getList(int lastDays,Set<String> status,MultivaluedMap<String, String> queryParamMap) throws Exception {
		String queryString=(String) queryParamMap.getFirst("query");
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(OrderEmailQueue.class);
		ProjectionList projectionList = Projections.projectionList();
		projectionList.add(Projections.property("createdDate"), "createdDate");
		projectionList.add(Projections.property("id"), "id");
		projectionList.add(Projections.property("status"), "status");
		Date endDate = new Date(System.currentTimeMillis());
		endDate.setHours(0);
		endDate.setMinutes(0);
		endDate.setSeconds(0);
		Date startDate = DateUtils.getPreviousDate(endDate, lastDays);
		HibernateUtils.getCriteriaBasedOnDate(criteria, "createdDate", startDate, endDate);
		criteria.add(Restrictions.in("status", status));
		Map<String,String> searchMap=ApplicationUtils.convertJSONtoMaps(queryString);
		if (queryString != null) {
			boolean multiSelectFlag = false;
			boolean isCsrManager = false;
			multiSelectFlag = Boolean.parseBoolean(searchMap.get("multiSelectFlag"));
			String filterSiteId = (String) searchMap.get("filterSiteId");
			String filterCsrCode = (String) searchMap.get("filterCsrCode");
			isCsrManager = Boolean.parseBoolean(searchMap.get("csrManagerFlag"));
			if (filterSiteId != null && !"".equals(filterSiteId)) {
				criteria.add(Restrictions.eq("siteId", Integer.parseInt(filterSiteId)));
			}
			if (isCsrManager) {
				List<String> ids = ApplicationUtils.convertStringToList(filterCsrCode);
				List<Long> systemCsrCodeIds = new ArrayList<Long>();
				for (String id : ids) {
					systemCsrCodeIds.add(Long.parseLong(id));
				}
				Criteria crit = session.createCriteria(SystemCsrCode.class).createAlias("varUser", "varUser")
						.setProjection(Projections.projectionList().add(Projections.property("varUser.id")))
						.add(Restrictions.in("id", systemCsrCodeIds));
				List<Long> results = crit.list();
				List<String> userIds = new ArrayList<String>();
				for (Long systemCsrCode : results) {
					userIds.add(String.valueOf(systemCsrCode));
				}
				if (userIds.size() > 0)
					criteria.add(Restrictions.in("assignCSR", userIds));
			} else if (filterCsrCode != null && !"".equals(filterCsrCode)) {
				List<String> userIds = ApplicationUtils.convertStringToList(filterCsrCode);
				criteria.add(Restrictions.in("assignCSR", userIds));
			}
		} else {
			String siteId = (String) queryParamMap.getFirst("siteId");
			if (siteId != null)
				if (!siteId.equals("")) {
					criteria.add(Restrictions.eq("siteId", Integer.parseInt(siteId)));
				}
		}
		//criteria.add(Restrictions.between("createdDate", startDate, endDate));
		criteria.setProjection(projectionList);
		criteria.setResultTransformer(Transformers
				.aliasToBean(OrderEmailQueue.class));
		return new HashSet<OrderEmailQueue>(criteria.list());
	}

}
