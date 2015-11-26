package com.avery.storage.dao.impl;

import java.util.List;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
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
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderLineDetail;
import com.avery.storage.entities.SalesOrderDetail;

@Repository
public class SalesOrderDetailDaoImpl extends GenericDaoImpl<SalesOrderDetail, Long> implements
	SalesOrderDetailDao {
	
	@Override
	public List<SalesOrderDetail> readAllVariableByOrderID(Long orderID){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().openSession();
			criteria = session.createCriteria(SalesOrderDetail.class);
			criteria.add(Restrictions.eq("processQueueID", orderID.intValue()));
			criteria.setProjection( Projections.projectionList()
			        .add( Projections.distinct(Projections.property("variablefieldname")) ));
			return criteria.list();
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
	
	@Override
	public List<SalesOrderDetail> readByVariableName(Long orderID,String variablfieldename){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().openSession();
			criteria = session.createCriteria(SalesOrderDetail.class);
			criteria.add(Restrictions.eq("processQueueID", orderID.intValue()));
			criteria.add(Restrictions.eq("variablefieldname", variablfieldename));
			return criteria.list();
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

	
}
