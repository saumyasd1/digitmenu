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
import com.avery.storage.entities.Org;
import com.avery.storage.entities.SystemInfo;

@Repository
public class OrgDaoImpl extends GenericDaoImpl<Org, Long> implements
		OrgDao {
	
	@Override
	public List<Org> readAllBySystemId(Long systemId){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();;
			criteria = session.createCriteria(Org.class);
			SystemInfo system = new SystemInfo();
			system.setId(systemId);
			criteria.add(Restrictions.eq("system", system));
			return criteria.list();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line for site id " + systemId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line for site id " + systemId, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	@Override
	public Map getAllEntitiesList()
			{
		Map entitiesMap = new HashMap();
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(Org.class);
				

		entitiesMap.put("org", new LinkedHashSet(criteria.list()));
		//entitiesMap.put("partner", criteria1.list());
		return entitiesMap;
			}

	@Override
	public Long create(Org newInstance) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Org read(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
}
