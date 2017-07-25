package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
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
import com.avery.storage.entities.OrderConfiguration;

@Repository
public class OrderConfigurationDaoImpl extends GenericDaoImpl<OrderConfiguration, Long>
		implements OrderConfigurationDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		Map entitiesMap = new HashMap();
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(OrderConfiguration.class);
		entitiesMap.put("variable", new LinkedHashSet(criteria.list()));
		return null;
	}

	@Override
	public List<OrderConfiguration> readByPropertyName(String propertyName) throws Exception {

		Session session = null;
		Criteria criteria = null;
		try {
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderConfiguration.class);
			criteria.add(Restrictions.eq("propertyName", propertyName));
			return criteria.list();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching values for propert name::" + propertyName, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching values for propert name::" + propertyName, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	@Override
	public Long create(OrderConfiguration newInstance) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public OrderConfiguration read(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<OrderConfiguration> readByPropertyName(String propertyName, Long systemId, Long orgCodeId)
			throws Exception {
		// TODO Auto-generated method stub
		Session session = null;
		Criteria criteria = null;
		try {
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderConfiguration.class);

			criteria.add(Restrictions.eq("systemId", systemId));
			criteria.add(Restrictions.eq("propertyName", propertyName));
			criteria.add(Restrictions.eq("orgCodeId", orgCodeId));
			return criteria.list();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching order conf for system id " + systemId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching order conf for system id " + systemId, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

	}

}
