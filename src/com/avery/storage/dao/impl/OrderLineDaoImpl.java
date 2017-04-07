package com.avery.storage.dao.impl;

import java.util.Date;
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
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Address;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.Org;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.SystemInfo;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Repository
public class OrderLineDaoImpl extends GenericDaoImpl<OrderLine, Long> implements
		OrderLineDao {
	
	@Override
	public List<OrderLine> readAllByOrderID(Long orderID){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderLine.class)
					.createAlias("orgCode", "orgCode");
			OrderQueue orderQueue = new OrderQueue();
			orderQueue.setId(orderID);
			criteria.add(Restrictions.eq("varOrderFileQueue.id", orderID));
			
			List<OrderLine> list = criteria.list();
			
			// getting colorCode, iconName and values as required at the GUI
			HashMap<String, Map> statusList = ApplicationUtils.statusCode;
			if (statusList == null)
				throw new Exception("Unable to fetch Status List");
			for (OrderLine orderLine : list) {
				String status = orderLine.getStatus();
				if (status == null | status.equals(""))
					throw new Exception("Unidentified value found for the statuscode::" + status);
				Map<String, String> statusCodes = statusList.get(status);
				if (statusCodes == null)
					throw new Exception("No data found in the status table for status:: " + status);
				String iconName = statusCodes.get("iconName");
				String colorCode = statusCodes.get("colorCode");
				String codeValue = statusCodes.get("codeValue");
				orderLine.setIconName(iconName);
				orderLine.setColorCode(colorCode);
				orderLine.setCodeValue(codeValue);
				//Getting target system name using the target system id
				String targetSystem = orderLine.getTargetSystem();
				if(targetSystem != null && NumberUtils.isNumber(targetSystem)){
					Long orderSystemInfoId = Long.parseLong(targetSystem);
					OrderSystemInfo orderSystemInfo = (OrderSystemInfo) session.get(OrderSystemInfo.class, orderSystemInfoId);
					SystemInfo systemInfo = orderSystemInfo.getVarSystem();
					orderLine.setTargetSystemName(systemInfo.getName());
				}

			}

			return list;
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching order line for order queue id " + orderID, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching order line for order queue id " + orderID, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}
	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		return null;
	}
	
	@Override
	public void bulkUpdate(String jsonData,Map<String,Boolean> insertAddress, String partnerId, String systemId, String siteId, String orgCodeId){
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
			boolean insertShipAddress=false,insertBillAddress=false;
			for(int i=0;i<objArray.length;i++){
				t=objArray[i];
				OrderLine orderLine = mapper.readValue(t,OrderLine.class);
				currentObjId=orderLine.getId();
				if(i==0){ 
					insertBillAddress=insertAddress.get("insertBillAddress");
				}
				if(i==0){ 
					insertShipAddress=insertAddress.get("insertShipAddress");
				}
				orderLine=(OrderLine) session.get(OrderLine.class,currentObjId);
				updater = mapper.readerForUpdating(orderLine);
				orderLine = updater.readValue(t);
				orderLine.preUpdateOp();
				session.update(orderLine);
				orderLine.postUpdateOp();
				if(i==0){
					if(insertBillAddress)
						insertBillAddress(orderLine,partnerId, systemId, siteId, orgCodeId);
					if(insertShipAddress)
						insertShipAddress(orderLine,partnerId, systemId, siteId, orgCodeId);
				}
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

	private void insertShipAddress(OrderLine orderLine, String partnerId, String systemId, String siteId, String orgCodeId){
		
		String shipToAddress1=orderLine.getShipToAddress1();
		String shipToAddress2=orderLine.getShipToAddress2();
		String address=(shipToAddress2==null?"":shipToAddress2)+(shipToAddress1==null?"":shipToAddress1);
		if(!address.equals("")){
			Session session = getSessionFactory().getCurrentSession();
			Address adrObj=new Address();
			OrderQueue orderqueue = new OrderQueue();
			adrObj.setSiteNumber(orderLine.getOracleShipToSiteNumber());
			adrObj.setAddress1(orderLine.getShipToAddress1());
			adrObj.setAddress2(orderLine.getShipToAddress2());
			adrObj.setAddress3(orderLine.getShipToAddress3());
			adrObj.setCity(orderLine.getShipToCity());
			adrObj.setCountry(orderLine.getShipToCountry());
			adrObj.setState(orderLine.getShipToState());
			adrObj.setFax(orderLine.getShipToFax());
			adrObj.setPhone1(orderLine.getShipToTelephone());
			adrObj.setEmail(orderLine.getShipToEmail());
			adrObj.setContact(orderLine.getShipToContact());
			adrObj.setShippingMethod(orderLine.getShippingMethod());
			adrObj.setFreightTerms(orderLine.getFreightTerms());
			adrObj.setShippingInstructions(orderLine.getShippingInstructions());
			adrObj.setDescription("Inserted By Adeptia");
			adrObj.setCreatedBy("Adeptia");
			adrObj.setCreatedDate(new Date());
			adrObj.setSiteType("S");
		    adrObj.setOrgCode(orderLine.getDivisionForInterfaceERPORG());
		    Partner partnerObj=new Partner();
			Org orgObj=new Org();
			Long currentPartnerId=Long.parseLong(partnerId);
			int currentSystemId=Integer.parseInt(systemId);
			int currentSiteId=Integer.parseInt(siteId);
			Long currentOrgCodeId=Long.parseLong(orgCodeId);
			partnerObj.setId(currentPartnerId);
			orgObj.setId(currentOrgCodeId);
			adrObj.setVarOrgCode(orgObj);
			adrObj.setVarPartner(partnerObj);
			adrObj.setSystem(currentSystemId);
			adrObj.setSiteId(currentSiteId);
			session.save(adrObj);
		}
	}
	private void insertBillAddress(OrderLine orderLine, String partnerId, String systemId, String siteId, String orgCodeId){
		OrderQueue orderqueue = new OrderQueue();
		String billToAddress1=orderLine.getBillToAddress1();
		String billToAddress2=orderLine.getBillToAddress2();
		String address=(billToAddress2==null?"":billToAddress2)+(billToAddress1==null?"":billToAddress1);
		if(!address.equals("")){
			Session session = getSessionFactory().getCurrentSession();
			Address adrObj=new Address();
			adrObj.setSiteNumber(orderLine.getOracleBillToSiteNumber());
			adrObj.setAddress1(billToAddress1);
			adrObj.setAddress2(billToAddress2);
			adrObj.setAddress3(orderLine.getBillToAddress3());
			adrObj.setCity(orderLine.getBillToCity());
			adrObj.setCountry(orderLine.getBillToCountry());
			adrObj.setState(orderLine.getBillToState());
			adrObj.setFax(orderLine.getBillToFax());
			adrObj.setPhone1(orderLine.getBillToTelephone());
			adrObj.setEmail(orderLine.getBillToEmail());
			adrObj.setContact(orderLine.getBillToContact());
			adrObj.setShippingMethod(orderLine.getShippingMethod());
			adrObj.setFreightTerms(orderLine.getFreightTerms());
			adrObj.setShippingInstructions(orderLine.getShippingInstructions());
			adrObj.setDescription("Inserted By Adeptia");
			adrObj.setCreatedBy("Adeptia");
			adrObj.setCreatedDate(new Date());
			adrObj.setOrgCode(orderLine.getDivisionForInterfaceERPORG());
			adrObj.setSiteType("B");
			Partner partnerObj=new Partner();
			Org orgObj=new Org();
			Long currentPartnerId=Long.parseLong(partnerId);
     		int currentSystemId=Integer.parseInt(systemId);
			int currentSiteId=Integer.parseInt(siteId);
			Long currentOrgCodeId=Long.parseLong(orgCodeId);
			partnerObj.setId(currentPartnerId);
			orgObj.setId(currentOrgCodeId);
			adrObj.setSystem(currentSystemId);
			adrObj.setSiteId(currentSiteId);
            adrObj.setVarOrgCode(orgObj);
			adrObj.setVarPartner(partnerObj);
			session.save(adrObj);
		}
	}
	@Override
	public void bulkUpdateAllById(String jsonData,Map<String,Boolean> flagMap,Long orderQueueId, String partnerId, String systemId, String siteId, String orgCodeId){
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater=null;
		Session session = null;
		boolean insertBillAddress=false,insertShipAddress=false,insertAddress=true;
		try{
			if(insertAddress){ 
				insertBillAddress=flagMap.get("insertBillAddress");
			}
			if(insertAddress){ 
				insertShipAddress=flagMap.get("insertShipAddress");
			}
			session = getSessionFactory().getCurrentSession();
			List<OrderLine> entities = readAllByOrderID(orderQueueId);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			for(OrderLine orderLine:entities){
				updater = mapper.readerForUpdating(orderLine);
				orderLine = updater.readValue(jsonData);
				orderLine.preUpdateOp();
				session.update(orderLine);
				orderLine.postUpdateOp();
				if(insertAddress){
					if(insertBillAddress)
						insertBillAddress(orderLine,partnerId, systemId, siteId, orgCodeId);
					if(insertShipAddress)
						insertShipAddress(orderLine,partnerId, systemId, siteId, orgCodeId);
					insertAddress=false;
				}
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
