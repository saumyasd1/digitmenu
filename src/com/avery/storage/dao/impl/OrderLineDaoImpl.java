package com.avery.storage.dao.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Address;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.Partner;
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
			session = getSessionFactory().getCurrentSession();;
			criteria = session.createCriteria(OrderLine.class);
			OrderQueue orderQueue = new OrderQueue();
			orderQueue.setId(orderID);
			criteria.add(Restrictions.eq("orderQueueForOrderLine", orderQueue));
			return criteria.list();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line for order queue id " + orderID, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line for order queue id " + orderID, e);
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
						insertBillAddress(orderLine);
					if(insertShipAddress)
						insertShipAddress(orderLine);
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
	
	private void insertIntoAddress(OrderLine orderLine){
		Session session = getSessionFactory().getCurrentSession();
		Address adrObj=new Address();
		adrObj.setBillToSiteNumber(orderLine.getOracleBilltoSiteNumber());
		adrObj.setShipToSiteNumber(orderLine.getOracleShiptoSiteNumber());
		adrObj.setAddress1(orderLine.getBillToAddress1());
		adrObj.setAddress2(orderLine.getBillToAddress2());
		adrObj.setAddress3(orderLine.getBillToAddress3());
		adrObj.setCity(orderLine.getBillToCity());
		adrObj.setCountry(orderLine.getBillToCountry());
		adrObj.setState(orderLine.getBillToState());
		adrObj.setBillToContact(orderLine.getBillToContact());
		adrObj.setBillToFax(orderLine.getBillToFax());
		adrObj.setBillToPhone1(orderLine.getBillToTelephone());
		adrObj.setBillToEmail(orderLine.getBillToEmail());
		adrObj.setShipToContact(orderLine.getShipToContact());
		adrObj.setShipToPhone1(orderLine.getShipToTelephone());
		adrObj.setShippingMethod(orderLine.getShippingMethod());
		adrObj.setFreightTerms(orderLine.getFreightTerms());
		adrObj.setShippingInstructions(orderLine.getShippingInstructions());
		adrObj.setDescription("Inserted By Adeptia");
		adrObj.setCreatedBy("Adeptia");
		adrObj.setCreatedDate(new Date());
		adrObj.setOrgCode(orderLine.getDivisionforInterfaceERPORG());
		Partner partnerObj=new Partner();
		Long partnerId=0L;
		if(orderLine.getPartnerID()!=null)
			partnerId=Long.parseLong(orderLine.getPartnerID());
		partnerObj.setId(partnerId);
		adrObj.setPartner(partnerObj);
		session.save(adrObj);
	}
	private void insertShipAddress(OrderLine orderLine){
		String shipToAddress1=orderLine.getShipToAddress1();
		String shipToAddress2=orderLine.getShipToAddress2();
		String address=(shipToAddress2==null?"":shipToAddress2)+(shipToAddress1==null?"":shipToAddress1);
		if(!address.equals("")){
			Session session = getSessionFactory().getCurrentSession();
			Address adrObj=new Address();
			adrObj.setSiteNumber(orderLine.getOracleShiptoSiteNumber());
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
			adrObj.setOrgCode(orderLine.getDivisionforInterfaceERPORG());
			Partner partnerObj=new Partner();
			Long partnerId=0L;
			if(orderLine.getPartnerID()!=null)
				partnerId=Long.parseLong(orderLine.getPartnerID());
			partnerObj.setId(partnerId);
			adrObj.setPartner(partnerObj);
			session.save(adrObj);
		}
	}
	private void insertBillAddress(OrderLine orderLine){
		String billToAddress1=orderLine.getBillToAddress1();
		String billToAddress2=orderLine.getBillToAddress2();
		String address=(billToAddress2==null?"":billToAddress2)+(billToAddress1==null?"":billToAddress1);
		if(!address.equals("")){
			Session session = getSessionFactory().getCurrentSession();
			Address adrObj=new Address();
			adrObj.setSiteNumber(orderLine.getOracleBilltoSiteNumber());
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
			adrObj.setOrgCode(orderLine.getDivisionforInterfaceERPORG());
			adrObj.setSiteType("B");
			Partner partnerObj=new Partner();
			Long partnerId=0L;
			if(orderLine.getPartnerID()!=null)
				partnerId=Long.parseLong(orderLine.getPartnerID());
			partnerObj.setId(partnerId);
			adrObj.setPartner(partnerObj);
			session.save(adrObj);
		}
	}
	@Override
	public void bulkUpdateAllById(String jsonData,Map<String,Boolean> flagMap,Long orderQueueId){
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader updater=null;
		Session session = null;
		boolean insertBillAddress=false,insertShipAddress=false,insertAddress=true;
		try{
			OrderLine tempObj=mapper.readValue(jsonData,OrderLine.class);;
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
						insertBillAddress(orderLine);
					if(insertShipAddress)
						insertShipAddress(orderLine);
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
