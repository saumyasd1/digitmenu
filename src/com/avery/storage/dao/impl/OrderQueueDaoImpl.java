package com.avery.storage.dao.impl;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
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
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.SalesOrder;
import com.avery.utils.ApplicationConstants;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.DateUtils;
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
		int totalCount=0;
		String limit=(String)queryMap.getFirst("limit");
		String pageNo=(String) queryMap.getFirst("page");
		Criteria criteria= getCriteria(queryMap);
		totalCount=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		criteria.addOrder(Order.desc("lastModifiedDate"));
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if(pageNO!=0){
        criteria.setFirstResult((pageNO - 1) * pageSize);
        criteria.setMaxResults(pageSize);
		}
		List list = criteria.list();
		OrderQueue orderQueue = null;
		for (Object obj : list) {
			orderQueue = (OrderQueue) obj;
			long id = orderQueue.getId();
			orderQueue.setOrderLineCount(getCountBasedOnOrderId(OrderLine.class,id,"orderQueueForOrderLine.id"));
			orderQueue.setSalesOrderCount(getCountBasedOnOrderId(SalesOrder.class,id,"orderQueueID"));
		}
        entitiesMap.put("totalCount", totalCount);
        entitiesMap.put("orders", new LinkedHashSet(list));
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
			String orderLineUpdateQueryString = "update OrderLine set status=:value where orderQueueForOrderLine=:id";
			Query orderLineUpdateQuery = session.createQuery(orderLineUpdateQueryString);
			orderLineUpdateQuery.setString("value",status);
			orderLineUpdateQuery.setLong("id",entityId);
			orderLineUpdateQuery.executeUpdate();
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
			if(orderQueueObj.getComment()!=null)
				commentString=orderQueueObj.getComment().replace("::", "\n");
			orderQueueObj.setComment(commentString);
			orderQueueObj.preUpdateOp();
			session.update(orderQueueObj);
			orderQueueObj.postUpdateOp();
			commentString="";
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
	private int getCountBasedOnOrderId(Class clazz,Long OrderId,String propertyName) throws Exception{
		int count=0;
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(clazz);
		criteria.add(Restrictions.eq(propertyName, OrderId));
		count=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		return count;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Set<OrderQueue> getList(int lastDays,Set<String> status) throws Exception {
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(OrderQueue.class);
		ProjectionList projectionList = Projections.projectionList();
		projectionList
				.add(Projections.property("receivedDate"), "receivedDate");
		projectionList.add(Projections.property("id"), "id");
		projectionList.add(Projections.property("status"), "status");
		Date endDate = new Date(System.currentTimeMillis());
		Date startDate = DateUtils.getPreviousDate(endDate, lastDays);
		criteria.add(Restrictions.in("status", status));
		criteria.add(Restrictions.between("receivedDate", startDate, endDate));
		criteria.setProjection(projectionList);
		criteria.setResultTransformer(Transformers
				.aliasToBean(OrderQueue.class));
		return new HashSet<OrderQueue>(criteria.list());
	}
	
	public Criteria getCriteria(MultivaluedMap queryMap) throws IOException, Exception{
		Session session=null;
		Criteria criteria=null;
		String queryString=(String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(OrderQueue.class);
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
				criteria.add(Restrictions.ilike("ponumber",PONumber,MatchMode.ANYWHERE));
			}
		}
		else{
			 Date date = new Date();
		        String todate = HibernateUtils.sdfDate.format(date);
		        Calendar cal = Calendar.getInstance();
		        cal.add(Calendar.DATE, -7);
		        Date todate1 = cal.getTime();    
		        String strDate = HibernateUtils.sdfDate.format(todate1);
		    String endDate = HibernateUtils.sdfDate.format(date);
		    criteria=HibernateUtils.getCriteriaBasedOnDate(criteria, "receivedDate", strDate, endDate);
		}
		return criteria;
	}
	
	@Override
	public List getAllEntitiesListWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		Criteria criteria= getCriteria(queryMap);
		criteria.addOrder(Order.desc("lastModifiedDate"));
		List list = criteria.list();
		return list;
	}
	
	@Override
	public List<OrderQueue> getAllEntitiesListForDailyReport() throws Exception{
		Criteria criteria= getDailyReportCriteria();
		criteria.addOrder(Order.desc("lastModifiedDate"));
		List<OrderQueue> list = criteria.list();
		return list;
	}
	
	public Criteria getDailyReportCriteria() throws ParseException{
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria=session.createCriteria(OrderQueue.class);
	    Date now = new Date();
	    String strDate = HibernateUtils.sdfDate.format(now);
	    criteria=HibernateUtils.getCriteriaBasedOnDate(criteria, "receivedDate", strDate, strDate);
		return criteria;
	}
	
	public Criteria getOpenReportCriteria(MultivaluedMap queryMap) throws Exception{
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria=getCriteria(queryMap);
		criteria.add(Restrictions.ne("status",ApplicationConstants.CANCEL_STATUS_CODE));
		criteria.add(Restrictions.ne("status",ApplicationConstants.BOOKED_STATUS_CODE));
		return criteria;
	}
	
	@Override
	public List<OrderQueue> getAllEntitiesListForOpenReport(MultivaluedMap queryMap) throws Exception{
		Criteria criteria= getOpenReportCriteria(queryMap);
		criteria.addOrder(Order.desc("lastModifiedDate"));
		List<OrderQueue> list = criteria.list();
		return list;
	}
}
