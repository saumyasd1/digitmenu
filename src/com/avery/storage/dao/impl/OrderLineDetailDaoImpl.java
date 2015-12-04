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
	
}
