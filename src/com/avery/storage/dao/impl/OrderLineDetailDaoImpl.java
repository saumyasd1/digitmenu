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
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderLineDetail;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Repository
public class OrderLineDetailDaoImpl extends GenericDaoImpl<OrderLineDetail, Long> implements
		OrderLineDetailDao {
	
	@Override
	public List<OrderLineDetail> readAllVariableByOrderID(Long orderID){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderLineDetail.class);
			criteria.add(Restrictions.eq("orderQueueID", orderID.intValue()));
			criteria.setProjection( Projections.projectionList()
			        .add( Projections.distinct(Projections.property("variablefieldname")) ));
			return criteria.list();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line variable for order queue id " + orderID, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line variable for order queue id " + orderID, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}


	@Override
	public Map readByVariableName(Long orderID,String variablfieldename){
		Map infoMap=new HashMap();
		Session session = null;
		Criteria criteria = null;
		List<OrderLineDetail> list=null;
		Boolean showFiberPercentage=false;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderLineDetail.class);
			criteria.add(Restrictions.eq("orderQueueID", orderID.intValue()));
			criteria.add(Restrictions.eq("variablefieldname", variablfieldename));
			if(variablfieldename.toLowerCase().contains("fibre".toLowerCase())){
				criteria.add(Restrictions.ne("variabledatavalue", ""));
				criteria.add(Restrictions.ne("fiberPercent", "0"));
			}
			list= criteria.list();
			if(list.size()>0){
				OrderLineDetail orderLineDetail=list.get(0);
				String level=orderLineDetail.getLevel();
				if(level.equalsIgnoreCase("fibre")){
					showFiberPercentage=true;
				}
			}
			infoMap.put("OrderLineDetail", criteria.list());
			infoMap.put("showFiberPercentage", showFiberPercentage);
			return infoMap;
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line variable for order queue id " + orderID+" and variable name "+variablfieldename, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line variable for order queue id " + orderID+" and variable name "+variablfieldename, e);
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
	public void bulkUpdate(String jsonData){
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
				OrderLineDetail orderLineDetail = mapper.readValue(t,OrderLineDetail.class);
				currentObjId=orderLineDetail.getId();
				orderLineDetail=(OrderLineDetail) session.get(OrderLineDetail.class,currentObjId);
				updater = mapper.readerForUpdating(orderLineDetail);
				orderLineDetail = updater.readValue(t);
				orderLineDetail.preUpdateOp();
				session.update(orderLineDetail);
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
			List<OrderLineDetail> entities = readAllByOrderID(orderQueueId);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			for(OrderLineDetail orderLineDetail:entities){
				updater = mapper.readerForUpdating(orderLineDetail);
				orderLineDetail = updater.readValue(jsonData);
				orderLineDetail.preUpdateOp();
				session.update(orderLineDetail);
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
	public List<OrderLineDetail> readAllByOrderID(Long orderID){
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderLineDetail.class);
			criteria.add(Restrictions.eq("orderQueueID", orderID.intValue()));
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
	
	
}
