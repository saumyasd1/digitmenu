package com.avery.storage.dao.impl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
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
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.SalesOrder;
import com.avery.storage.entities.SystemCsrCode;
import com.avery.utils.ApplicationConstants;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.DateUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mysql.fabric.xmlrpc.base.Array;

@Repository
public class OrderQueueDaoImpl extends GenericDaoImpl<OrderQueue, Long> implements OrderQueueDao {

	// Note:- This method is not currently being used but maybe used later so,
	// it needs to be kept
	@Override
	public Map getAllEntitiesList() {
		Map entitiesMap = new HashMap();
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(OrderQueue.class)
				.createAlias("varOrderFileAttachment", "varOrderFileAttachment")
				.createAlias("varOrderFileAttachment.varOrderEmailQueue", "orderemailqueue")
				.createAlias("varProductLine",
						"varProductLine")
				.createAlias("varProductLine.varPartner", "partner")
				.setProjection(
						Projections.projectionList().add(Projections.property("orderemailqueue.id"), "emailQueueId")
								.add(Projections.property("orderemailqueue.senderEmailId"), "senderEmailId")
								.add(Projections.property("partner.partnerName"), "partnerName")
								.add(Projections.property("id"), "id").add(Projections.property("subject"), "subject")
								.add(Projections.property("poNumber"), "poNumber")
								.add(Projections.property("prevOrderQueueId"), "prevOrderQueueId")
								.add(Projections.property("status"), "status")
								.add(Projections.property("submittedBy"), "submittedBy")
								.add(Projections.property("submittedDate"), "submittedDate")
								.add(Projections.property("feedbackAcknowledgementDate"), "feedbackAcknowledgementDate")
								.add(Projections.property("lastModifiedBy"), "lastModifiedBy")
								.add(Projections.property("lastModifiedDate"), "lastModifiedDate"))
				.setResultTransformer(Transformers.aliasToBean(OrderQueue.class));

		entitiesMap.put("orders", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}

	@Override
	@Transactional
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map entitiesMap = new HashMap();
		int totalCount = 0;
		String limit = (String) queryMap.getFirst("limit");
		String pageNo = (String) queryMap.getFirst("page");

		// Adding search map criteria for OrderQueue Screen
		Criteria criteria = getCriteria(queryMap);

		// Following code adds partner name, rboname, productline and
		// emailqueueid in the order queue
		ProjectionList proj = Projections.projectionList();
		proj.add(Projections.property("orderemailqueue.id"), "emailQueueId")
				.add(Projections.property("orderemailqueue.senderEmailId"), "senderEmailId")
				.add(Projections.property("orderemailqueue.siteId"), "siteId")
				.add(Projections.property("partner.partnerName"), "partnerName").add(Projections.property("id"), "id")
				.add(Projections.property("orderemailqueue.subject"), "subject")
				.add(Projections.property("orderemailqueue.orderSource"), "orderSource")
				.add(Projections.property("orderemailqueue.receivedDate"), "receivedDate")
				.add(Projections.property("comment"), "comment").add(Projections.property("error"), "error")
				.add(Projections.property("poNumber"), "poNumber")
				.add(Projections.property("prevOrderQueueId"), "prevOrderQueueId")
				.add(Projections.property("status"), "status").add(Projections.property("submittedBy"), "submittedBy")
				.add(Projections.property("submittedDate"), "submittedDate")
				.add(Projections.property("feedbackAcknowledgementDate"), "feedbackAcknowledgementDate")
				.add(Projections.property("lastModifiedBy"), "lastModifiedBy")
				.add(Projections.property("lastModifiedDate"), "lastModifiedDate")
				.add(Projections.property("rbo.rboName"), "rboName")
				.add(Projections.property("varProductLine.productLineType"), "productLineType")
				.add(Projections.property("varProductLine.defaultSystem"), "defaultSystem")
				.add(Projections.property("partner.id"), "partnerId")
				.add(Projections.property("csrCode"), "csrCode")
				.add(Projections.property("varProductLine.id"), "productLineId")
				.add(Projections.property("varProductLine.defaultShipToCode"), "defaultShipToCode")
				.add(Projections.property("varProductLine.defaultBillToCode"), "defaultBillToCode")
				.add(Projections.property("varProductLine.billshipRequired"), "billshipRequired")
				.add(Projections.property("createdDate"), "createdDate")

				.add(Projections.property("varOrderFileAttachment.fileName"), "orderFileName")
				.add(Projections.property("orderemailqueue.mailBody"), "mailBody")
				.add(Projections.property("varProductLine.orderInMailBody"), "orderInMailBody")
				.add(Projections.property("rbo.id"), "rboId");
		// getting filename of order file

		criteria.createAlias("varOrderFileAttachment", "varOrderFileAttachment")
				.createAlias("varOrderFileAttachment.varOrderEmailQueue", "orderemailqueue")
				.createAlias("varOrderFileAttachment.varProductLine", "varProductLine")
				.createAlias("varProductLine.varPartner", "partner").createAlias("varProductLine.rbo", "rbo");

		String siteId1 = (String) queryMap.getFirst("siteId");
		String roleId = (String) queryMap.getFirst("roleId");
		if (!siteId1.equals("") && !roleId.equals("1")) {
			criteria.add(Restrictions.eq("orderemailqueue.siteId", Integer.parseInt(siteId1)));
		}
		String emailQueueId =  (String) queryMap.getFirst("emailQueueId");
		if (emailQueueId != null && !"".equals(emailQueueId) && !emailQueueId.isEmpty()) {
			Long Id = Long.parseLong(emailQueueId);
			criteria.add(Restrictions.eq("orderemailqueue.id", Id));
		}

		// total count was returning 0 so, placed above set projection
		totalCount = HibernateUtils.getAllRecordsCountWithCriteria(criteria);

		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if (pageNO != 0) {
			criteria.setFirstResult((pageNO - 1) * pageSize);
			criteria.setMaxResults(pageSize);
		}

		criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(OrderQueue.class));
		criteria.addOrder(Order.desc("lastModifiedDate"));
		List<OrderQueue> list = criteria.list();

		// getting colorCode, iconName and values as required at the GUI
		HashMap<String, Map> statusList = ApplicationUtils.statusCode;
		if (statusList == null)
			throw new Exception("Unable to fetch Status List");

		for (OrderQueue orderQueue : list) {
			String status = orderQueue.getStatus();
			int comparisonSiteId = orderQueue.getSiteId();

			if (status == null | status.equals(""))
				throw new Exception("Unidentified value found for the statuscode");
			Map<String, String> statusCodes = statusList.get(status);
			if (statusCodes == null)
				throw new Exception("No data found in the status table for status:: " + status);
			orderQueue.setIconName(statusCodes.get("iconName"));
			orderQueue.setColorCode(statusCodes.get("colorCode"));
			orderQueue.setCodeValue(statusCodes.get("codeValue"));

			int additionalFileCount = 0;
			Long orderQueueId = orderQueue.getId();
			additionalFileCount = getAdditionalFileCount(orderQueueId);
			orderQueue.setAdditionalFileCount(additionalFileCount);

		}
		entitiesMap.put("orders", list);
		entitiesMap.put("totalCount", totalCount);
		return entitiesMap;
	}

	@Override
	public void submitOrderToSystem(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater = null;
		Session session = null;
		try {
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			session = getSessionFactory().getCurrentSession();
			OrderQueue orderQueueObj = null;
			orderQueueObj = (OrderQueue) session.get(OrderQueue.class, entityId);
			updater = mapper.readerForUpdating(orderQueueObj);
			orderQueueObj = updater.readValue(data);
			orderQueueObj.preUpdateOp();
			session.update(orderQueueObj);
			orderQueueObj.postUpdateOp();
			String status = orderQueueObj.getStatus();
			String s = "update SalesOrder set status=:value where orderQueueID=:id";
			Query q = session.createQuery(s);
			q.setString("value", status);
			q.setLong("id", entityId);
			q.executeUpdate();
			String orderLineUpdateQueryString = "update OrderLine set status=:value where orderQueueForOrderLine=:id";
			Query orderLineUpdateQuery = session.createQuery(orderLineUpdateQueryString);
			orderLineUpdateQuery.setString("value", status);
			orderLineUpdateQuery.setLong("id", entityId);
			orderLineUpdateQuery.executeUpdate();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error while Performing bulk update ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error while Performing bulk update ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

	}

	@Override
	public void cancelOrder(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater = null;
		Session session = null;
		String commentString = "";
		try {
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			session = getSessionFactory().getCurrentSession();
			OrderQueue orderQueueObj = null;
			orderQueueObj = (OrderQueue) session.get(OrderQueue.class, entityId);
			updater = mapper.readerForUpdating(orderQueueObj);
			orderQueueObj = updater.readValue(data);
			if (orderQueueObj.getComment() != null)
				commentString = orderQueueObj.getComment().replace("::", "\n");
			orderQueueObj.setComment(commentString);
			// orderQueueObj.setLastModifiedDate(new Date());//last modified
			// date added
			orderQueueObj.preUpdateOp();
			session.update(orderQueueObj);
			orderQueueObj.postUpdateOp();
			commentString = "";
			String comment = orderQueueObj.getComment();
			if (!"".equals(comment)) {
				commentString = ",comment=:comment ";
			}
			String s = "update OrderLine set status=:value " + commentString + " where orderQueueID=:id";
			Query q = session.createQuery(s);
			q.setString("value", ApplicationConstants.ORDERLINE_CANCEL_STATUS);
			if (!"".equals(comment)) {
				q.setString("comment", comment);
			}
			q.setLong("id", entityId);
			q.executeUpdate();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error while Performing bulk update ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error while Performing bulk update ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

	}

	private int getCountBasedOnOrderId(Class clazz, Long OrderId, String propertyName) throws Exception {
		int count = 0;
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(clazz);
		criteria.add(Restrictions.eq(propertyName, OrderId));
		count = HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		return count;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Set<OrderQueue> getList(int lastDays, Set<String> status, MultivaluedMap<String, String> queryParamMap)
			throws Exception {
		String queryString = (String) queryParamMap.getFirst("query");
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(OrderQueue.class);
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
		criteria.createAlias("varOrderFileAttachment", "varOrderFileAttachment")
				.createAlias("varOrderFileAttachment.varOrderEmailQueue", "varOrderEmailQueue");
		// .add(Restrictions.eq("varOrderEmailQueue.id", trackId));
		Map<String, String> searchMap = ApplicationUtils.convertJSONtoMaps(queryString);
		if (queryString != null) {
			boolean multiSelectFlag = false;
			boolean isCsrManager = false;
			multiSelectFlag = Boolean.parseBoolean(searchMap.get("multiSelectFlag"));
			String filterSiteId = (String) searchMap.get("filterSiteId");
			String filterCsrCode = (String) searchMap.get("filterCsrCode");
			isCsrManager = Boolean.parseBoolean(searchMap.get("csrManagerFlag"));
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
					criteria.add(Restrictions.in("csrCode", userIds));
			} else if (filterCsrCode != null && !"".equals(filterCsrCode)) {
				List<String> userIds = ApplicationUtils.convertStringToList(filterCsrCode);
				criteria.add(Restrictions.in("csrCode", userIds));
			}

			if (filterSiteId != null && !"".equals(filterSiteId) && !filterSiteId.isEmpty()) {
				criteria.add(Restrictions.eq("varOrderEmailQueue.siteId", Integer.parseInt(filterSiteId)));
			}
		} else {
			String siteId = (String) queryParamMap.getFirst("siteId");
			if (!siteId.equals("") && siteId != null && !siteId.isEmpty())
				{
					criteria.add(Restrictions.eq("varOrderEmailQueue.siteId", Integer.parseInt(siteId)));
				}
		}
		// criteria.add(Restrictions.between("createdDate", startDate,
		// endDate));
		criteria.setProjection(projectionList);
		criteria.setResultTransformer(Transformers.aliasToBean(OrderQueue.class));
		return new HashSet<OrderQueue>(criteria.list());
	}

	public Criteria getCriteria(MultivaluedMap queryMap) throws IOException, Exception {
		Session session = null;
		Criteria criteria = null;
		String queryString = (String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(OrderQueue.class);
		if (queryString != null) {
			Map<String, String> searchMap = ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType = searchMap.get("datecriteriavalue");
			if (dateType != null && !dateType.equals("")) {
				String sDate = searchMap.get("fromDate") + " 00:00:00";
				String eDate = searchMap.get("toDate") + " 00:00:00";
				criteria = HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String partnerName = searchMap.get("partnerName");
			if (partnerName != null && !"".equals(partnerName)) {
				// criteria.createAlias("partner", "partner");
				criteria.add(Restrictions.eq("partner.partnerName", partnerName));
			}
			String RBOName = searchMap.get("RBOName");
			if (RBOName != null && !"".equals(RBOName)) {
				criteria.add(Restrictions.ilike("rbo.rboName", RBOName, MatchMode.ANYWHERE));
			}
			String Subject = searchMap.get("Subject");
			if (Subject != null && !"".equals(Subject)) {
				criteria.add(Restrictions.ilike("orderemailqueue.subject", Subject, MatchMode.ANYWHERE));
			}
			String Status = searchMap.get("Status");
			if (Status != null && !"".equals(Status)) {
				String[] status = Status.split(",");
				criteria.add(Restrictions.in("status", status));
			}
			String days = searchMap.get("days");
			if (days != null && !"".equals(days)) {
				long lastDays = Long.parseLong(days);
				Date endDate = new Date(System.currentTimeMillis());
				endDate.setHours(0);
				endDate.setMinutes(0);
				endDate.setSeconds(0);
				Date startDate = DateUtils.getPreviousDate(endDate, lastDays);
				HibernateUtils.getCriteriaBasedOnDate(criteria, "createdDate", startDate, endDate);
			}
			String partnerDataStructure = searchMap.get("partnerDataStructure");
			if (partnerDataStructure != null && !"".equals(partnerDataStructure)) {
				// criteria.createAlias("productLine", "productLine");
				Long productLineId = Long.parseLong(partnerDataStructure);
				criteria.add(Restrictions.eq("varProductLine.id", productLineId));
			}
			String SenderEmailID = searchMap.get("SenderEmailID");
			if (SenderEmailID != null && !"".equals(SenderEmailID)) {
				criteria.add(Restrictions.ilike("orderemailqueue.senderEmailId", SenderEmailID, MatchMode.ANYWHERE));
			}
			String OrderTrackingID = searchMap.get("orderQueueId");
			if (OrderTrackingID != null && !"".equals(OrderTrackingID)) {
				Long Id = Long.parseLong(OrderTrackingID);
				Disjunction disCriteria = Restrictions.disjunction();
				disCriteria.add(Restrictions.eq("id", Id));
				disCriteria.add(Restrictions.eq("prevOrderQueueId", Id.intValue()));
				criteria.add(disCriteria);
			}
			String PONumber = searchMap.get("ponumber");
			if (PONumber != null && !"".equals(PONumber)) {
				criteria.add(Restrictions.ilike("poNumber", PONumber, MatchMode.ANYWHERE));
			}

			String assignCSR = searchMap.get("assignCSR");
			if (assignCSR != null && !"".equals(assignCSR)) {
				List<String> assignCSRList = ApplicationUtils.convertStringToList(assignCSR);
				criteria.add(Restrictions.in("csrCode",assignCSRList));
			}

			String emailQueueId = searchMap.get("emailQueueId");
			if (emailQueueId != null && !"".equals(emailQueueId)) {
				Long Id = Long.parseLong(emailQueueId);
				criteria.add(Restrictions.eq("orderemailqueue.id", Id));
			}
			String filterSiteId = (String) searchMap.get("siteId");
			if (filterSiteId!=null && !"".equals(filterSiteId) && !filterSiteId.isEmpty())
			{
				criteria.add(Restrictions.eq("orderemailqueue.siteId", Integer.parseInt(filterSiteId)));
			}

		}
		return criteria;
	}

	@Override
	public List getAllEntitiesListWithCriteria(MultivaluedMap queryMap) throws Exception {
		Criteria criteria = getCriteria(queryMap);
		criteria.addOrder(Order.desc("lastModifiedDate"));
		List list = criteria.list();
		return list;
	}

	@Override
	public List<OrderQueue> getAllEntitiesListForDailyReport(MultivaluedMap queryMap) throws Exception {
		Criteria criteria = getDailyReportCriteria(queryMap);
		criteria.addOrder(Order.desc("lastModifiedDate"));
		List<OrderQueue> list = criteria.list();
		return list;
	}

	public Criteria getDailyReportCriteria(MultivaluedMap queryMap) throws Exception {
		Session session = getSessionFactory().getCurrentSession();
		ProjectionList proj = Projections.projectionList();
		proj.add(Projections.property("orderemailqueue.id"), "emailQueueId")
				.add(Projections.property("csrCode"), "csrName")
				.add(Projections.property("orderemailqueue.siteId"), "siteId")
				.add(Projections.property("orderemailqueue.receivedDate"), "receivedDate")
				.add(Projections.property("orderemailqueue.senderEmailId"), "senderEmailId")
				.add(Projections.property("orderemailqueue.orderSource"), "orderSource")
				.add(Projections.property("partner.partnerName"), "partnerName").add(Projections.property("id"), "id")
				.add(Projections.property("orderemailqueue.subject"), "subject")
				.add(Projections.property("comment"), "comment").add(Projections.property("error"), "error")
				.add(Projections.property("poNumber"), "poNumber")
				.add(Projections.property("prevOrderQueueId"), "prevOrderQueueId")
				.add(Projections.property("status"), "status").add(Projections.property("submittedBy"), "submittedBy")
				.add(Projections.property("submittedDate"), "submittedDate")
				.add(Projections.property("createdDate"), "createdDate")
				.add(Projections.property("feedbackAcknowledgementDate"), "feedbackAcknowledgementDate")
				.add(Projections.property("lastModifiedBy"), "lastModifiedBy")
				.add(Projections.property("lastModifiedDate"), "lastModifiedDate")
				.add(Projections.property("rbo.rboName"), "rboName")
				.add(Projections.property("varProductLine.productLineType"), "productLineType")
				.add(Projections.property("partner.id"), "partnerId")
				.add(Projections.property("varProductLine.id"), "productLineId")
				.add(Projections.property("varOrderFileAttachment.fileName"), "orderFileName");
		Criteria criteria = session.createCriteria(OrderQueue.class);
		criteria.createAlias("varOrderFileAttachment", "varOrderFileAttachment")
				.createAlias("varOrderFileAttachment.varOrderEmailQueue", "orderemailqueue")
				.createAlias("varOrderFileAttachment.varProductLine", "varProductLine")
				.createAlias("varProductLine.varPartner", "partner")
				.createAlias("varProductLine.rbo", "rbo")
				.setProjection(proj).setResultTransformer(Transformers.aliasToBean(OrderQueue.class));
		Date now = DateUtils.getDefaultCurrentDate("MM/dd/yyyy" + " 00:00:00");
		String strDate = HibernateUtils.sdfDate.format(now);
		criteria = HibernateUtils.getCriteriaBasedOnDate(criteria, "orderemailqueue.receivedDate", strDate, strDate);
		String queryString = (String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		if (queryString != null) {
			Map<String, String> searchMap = ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType = searchMap.get("datecriteriavalue");
			String rbo = searchMap.get("RBOName");
			if (rbo != null && !"".equals(rbo)) {
				String[] rboName = rbo.split(",");
				criteria.add(Restrictions.in("rbo.rboName", rboName));
			}
			String status = searchMap.get("Status");
			if (status != null && !"".equals(status)) {
				String[] statusCode = status.split(",");
				criteria.add(Restrictions.in("status", statusCode));
			}
			String siteId = searchMap.get("siteId");
			if (siteId!=null && !"".equals(siteId) && !siteId.isEmpty()) {
				String[] siteIdList = siteId.split(",");
				List<Integer> siteList=new ArrayList<Integer>();
				for(int i=0; i<siteIdList.length; i++)
				{
					siteList.add(Integer.parseInt(siteIdList[i]));
				}
				criteria.add(Restrictions.in("orderemailqueue.siteId", siteList));
			}
			String PartnerId = searchMap.get("partnerId");
			if (PartnerId != null && !"".equals(PartnerId)) {
				String[] PartnerIdList = PartnerId.split(",");
				List<Long> partneList=new ArrayList<Long>();
				for(int i=0; i<PartnerIdList.length; i++)
				{
					partneList.add(Long.parseLong(PartnerIdList[i]));
				}
				criteria.add(Restrictions.in("partner.id", partneList));
			}
			String csrId = searchMap.get("csrId");
			if (csrId != null && !"".equals(csrId)) {
				String[] csrIdList = csrId.split(",");
				criteria.add(Restrictions.in("csrCode", csrIdList));
			}
		}
		return criteria;
	}

	public Criteria getOpenReportCriteria(MultivaluedMap queryMap) throws Exception {
		Session session = getSessionFactory().getCurrentSession();
		ProjectionList proj = Projections.projectionList();
		proj.add(Projections.property("orderemailqueue.id"), "emailQueueId")
				.add(Projections.property("csrCode"), "csrName")
				.add(Projections.property("orderemailqueue.siteId"), "siteId")
				.add(Projections.property("orderemailqueue.receivedDate"), "receivedDate")
				.add(Projections.property("orderemailqueue.senderEmailId"), "senderEmailId")
				.add(Projections.property("orderemailqueue.orderSource"), "orderSource")
				.add(Projections.property("partner.partnerName"), "partnerName")
				.add(Projections.property("id"), "id")
				.add(Projections.property("orderemailqueue.subject"), "subject")
				.add(Projections.property("comment"), "comment").add(Projections.property("error"), "error")
				.add(Projections.property("poNumber"), "poNumber")
				.add(Projections.property("prevOrderQueueId"), "prevOrderQueueId")
				.add(Projections.property("status"), "status").add(Projections.property("submittedBy"), "submittedBy")
				.add(Projections.property("submittedDate"), "submittedDate")
				.add(Projections.property("createdDate"), "createdDate")
				.add(Projections.property("feedbackAcknowledgementDate"), "feedbackAcknowledgementDate")
				.add(Projections.property("lastModifiedBy"), "lastModifiedBy")
				.add(Projections.property("lastModifiedDate"), "lastModifiedDate")
				.add(Projections.property("rbo.rboName"), "rboName")
				.add(Projections.property("varProductLine.productLineType"), "productLineType")
				.add(Projections.property("partner.id"), "partnerId")
				.add(Projections.property("varProductLine.id"), "productLineId")
				.add(Projections.property("varOrderFileAttachment.fileName"), "orderFileName");
		Criteria criteria = session.createCriteria(OrderQueue.class);
		criteria.createAlias("varOrderFileAttachment", "varOrderFileAttachment")
				.createAlias("varOrderFileAttachment.varOrderEmailQueue", "orderemailqueue")
				.createAlias("varOrderFileAttachment.varProductLine", "varProductLine")
				.createAlias("varProductLine.varPartner", "partner")
				.createAlias("varProductLine.rbo", "rbo")
				.setProjection(proj).setResultTransformer(Transformers.aliasToBean(OrderQueue.class));
		String queryString = (String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		if (queryString != null) {
			Map<String, String> searchMap = ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType = searchMap.get("datecriteriavalue");
			if (dateType != null && !dateType.equals("")) {
				String sDate = searchMap.get("fromDate");
				String eDate = searchMap.get("toDate");
				criteria = HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String rbo = searchMap.get("RBOName");
			if (rbo != null && !"".equals(rbo)) {				
				String[] rboName = rbo.split(",");
				criteria.add(Restrictions.in("rbo.rboName", rboName));
			}
			String status = searchMap.get("Status");
			if (status != null && !"".equals(status)) {
				String[] statusCode = status.split(",");
				criteria.add(Restrictions.in("status", statusCode));
			}			
			String siteId = searchMap.get("siteId");
			if (siteId!=null && !"".equals(siteId) && !siteId.isEmpty()) {
				String[] siteIdList = siteId.split(",");
				List<Integer> siteList=new ArrayList<Integer>();
				for(int i=0; i<siteIdList.length; i++)
				{
					siteList.add(Integer.parseInt(siteIdList[i]));
				}
				criteria.add(Restrictions.in("orderemailqueue.siteId", siteList));
			}
			String PartnerId = searchMap.get("partnerId");
			if (PartnerId != null && !"".equals(PartnerId)) {
				String[] PartnerIdList = PartnerId.split(",");
				List<Long> partneList=new ArrayList<Long>();
				for(int i=0; i<PartnerIdList.length; i++)
				{
					partneList.add(Long.parseLong(PartnerIdList[i]));
				}
				criteria.add(Restrictions.in("partner.id", partneList));
			}
			String csrId = searchMap.get("csrId");
			if (csrId != null && !"".equals(csrId)) {
				String[] csrIdList = csrId.split(",");
				criteria.add(Restrictions.in("csrCode", csrIdList));
			}
		}
		return criteria;
	}

	@Override
	public List<OrderQueue> getAllEntitiesListForOpenReport(MultivaluedMap queryMap) throws Exception {
		Criteria criteria = getOpenReportCriteria(queryMap);
		List<OrderQueue> list = criteria.list();
		return list;
	}
	
	@Override
	public void identifyEmail(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater = null;
		Session session = null;
		try {
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			session = getSessionFactory().getCurrentSession();
			OrderFileAttachment OrderFileAttachmentObj = null;
			OrderFileAttachmentObj = (OrderFileAttachment) session.get(OrderFileAttachment.class, entityId);
			updater = mapper.readerForUpdating(OrderFileAttachmentObj);
			OrderFileAttachmentObj = updater.readValue(data);
			OrderFileAttachmentObj.preUpdateOp();
			session.update(OrderFileAttachmentObj);
			OrderFileAttachmentObj.postUpdateOp();
			String status = OrderFileAttachmentObj.getStatus();
			String s = "update OrderFileAttachment set status=:value where id =:id ";
			Query q = session.createQuery(s);
			q.setString("value", status);
			q.setLong("id", entityId);
			q.executeUpdate();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error while processing order", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error while processing order", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

	}

	@Override
	public Map getViewOrdersByEmailId(int emailQueueId) {
		Map entitiesMap = new HashMap();
		Session session = null;

		Criteria criteria = session.createCriteria(OrderFileAttachment.class);
		return entitiesMap;
	}

	// implementation of get mail body path method
	@Override
	public String getMailBodyPath(long trackid) {
		Session session = null;
		try {
			session = getSessionFactory().getCurrentSession();
			Criteria criteria = session.createCriteria(OrderFileAttachment.class)
					.createAlias("varOrderEmailQueue", "varOrderEmailQueue")
					.add(Restrictions.eq("varOrderEmailQueue.id", trackid))
					.setProjection(Projections.projectionList().add(Projections.property("filePath"), "filePath"));
			List list = criteria.list();
			String dir = "";
			dir = (String) list.get(0);
			return dir;

		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error while fetching mailbody path", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error while fetching mailbody path", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

	}

	// get order file path method
	@Override
	public String getOrderFilePath(long orderFileQueueId) {
		String orderFilePath = "";
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		String filePath = "";
		String fileName = "";
		OrderQueue orderQueue = (OrderQueue) session.get(OrderQueue.class, orderFileQueueId);

		OrderFileAttachment orderFileAttachment = orderQueue.getVarOrderFileAttachment();
		filePath = orderFileAttachment.getFilePath();
		fileName = orderFileAttachment.getFileName();
		orderFilePath = filePath + File.separator + fileName;
		return orderFilePath;
	}

	/**
	 * @param orderQueueId
	 * @return additional file count for order queue
	 */
	@Override
	public int getAdditionalFileCount(Long orderQueueId) {
		Session session = null;
		Criteria criteria = null;
		try {
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderLine.class);
			criteria.add(Restrictions.eq("varOrderFileQueue.id", orderQueueId));
			criteria.add(Restrictions.isNotNull("additionalFileId"));
			ProjectionList projections = Projections.projectionList();
			projections.add(Projections.property("additionalFileId"), "additionalFileId");
			criteria.setProjection(projections);
			List<String> list = criteria.list();
			if (list == null | list.size() == 0)
				return 0;
			Set<Integer> set = new HashSet<Integer>();
			for (int i = 0; i < list.size(); i++) {
				String str = list.get(i);
				String[] st = str.split(",");
				for (int p = 0; p < st.length; p++) {
					if (NumberUtils.isNumber(st[p])) {
						set.add(Integer.parseInt(st[p]));
					}
				}
			}
			return set.size();
		} catch (Exception e) {
			return 0;
		}
	}
}
