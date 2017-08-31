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
import org.apache.commons.lang.math.NumberUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.Org;
import com.avery.storage.entities.SalesOrder;
import com.avery.storage.entities.SystemInfo;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Repository
public class SalesOrderDaoImpl extends GenericDaoImpl<SalesOrder, Long> implements
	SalesOrderDao {
	
	@Override
	public List<SalesOrder> readAllByOrderID(Long orderID) {

		Session session = null;
		Criteria criteria = null;
		try {
			session = getSessionFactory().getCurrentSession();
			OrderQueue orderQueue = new OrderQueue();
			orderQueue.setId(orderID);
			criteria = session.createCriteria(SalesOrder.class);
			criteria.add(Restrictions.eq("varOrderFileQueue", orderQueue));
			List<SalesOrder> list = criteria.list();

			// getting colorCode, iconName and values as required at the GUI
			HashMap<String, Map> statusList = ApplicationUtils.statusCode;
			if (statusList == null)
				throw new Exception("Unable to fetch Status List");
			for (SalesOrder salesOrder : list) {
				String status = salesOrder.getStatus();
				if (status == null | status.equals(""))
					throw new Exception("Unidentified value found for the statuscode");
				Map<String, String> statusCodes = statusList.get(status);
				if (statusCodes == null)
					throw new Exception("No data found in the status table for status:: " + status);
				String iconName = statusCodes.get("iconName");
				String colorCode = statusCodes.get("colorCode");
				String codeValue = statusCodes.get("codeValue");
				salesOrder.setIconName(iconName);
				salesOrder.setColorCode(colorCode);
				salesOrder.setCodeValue(codeValue);
				String divisionForInterfaceErporg = salesOrder.getDivisionForInterfaceErporg();
				if(divisionForInterfaceErporg != null && NumberUtils.isNumber(divisionForInterfaceErporg)){
					Long orgId = Long.parseLong(divisionForInterfaceErporg);
					Org org = (Org) session.get(Org.class, orgId);
					salesOrder.setDivisionForInterfaceErporgName(org.getName());
				}
				String targetSystem = salesOrder.getTargetSystem();
				if(targetSystem != null && NumberUtils.isNumber(targetSystem)){
					Long orderSystemInfoId = Long.parseLong(targetSystem);
					OrderSystemInfo orderSystemInfo = (OrderSystemInfo) session.get(OrderSystemInfo.class, orderSystemInfoId);
					SystemInfo systemInfo = orderSystemInfo.getVarSystem();
					salesOrder.setTargetSystemName(systemInfo.getName());
				}
				Long sortingId = salesOrder.getVarOrderLine().getSortingId();
				if(sortingId == null){
					sortingId = salesOrder.getVarOrderLine().getId();
				}
				salesOrder.setSortingId(sortingId);
			}

			return list;
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching sales order for order queue id " + orderID, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching sales order for order queue id " + orderID, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

	}


	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void bulkUpdate(String jsonData) {
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
			for(int i=0;i<objArray.length;i++){
				t=objArray[i];
				SalesOrder salesOrder = mapper.readValue(t,SalesOrder.class);
				currentObjId=salesOrder.getId();
				salesOrder=(SalesOrder) session.get(SalesOrder.class,currentObjId);
				updater = mapper.readerForUpdating(salesOrder);
				salesOrder = updater.readValue(t);
				salesOrder.preUpdateOp();
				session.update(salesOrder);
				salesOrder.postUpdateOp();
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
	public void bulkUpdateAllById(String jsonData,Long orderQueueId){
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater=null;
		Session session = null;
		try{
			session = getSessionFactory().getCurrentSession();
			List<SalesOrder> entities = readAllByOrderID(orderQueueId);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			for(SalesOrder salesOrder:entities){
				updater = mapper.readerForUpdating(salesOrder);
				salesOrder = updater.readValue(jsonData);
				salesOrder.preUpdateOp();
				session.update(salesOrder);
				salesOrder.postUpdateOp();
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
	public int getCountByOrderID(Long orderID){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(SalesOrder.class);
			criteria.add(Restrictions.eq("orderQueueID", orderID));
			int totalCount=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
			return totalCount;
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching sales order for order queue id " + orderID, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching sales order for order queue id " + orderID, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}
}
