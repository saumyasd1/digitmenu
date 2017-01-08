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
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.Site;
import com.avery.storage.entities.SystemInfo;

@Repository
public class SystemInfoDaoImpl extends GenericDaoImpl<SystemInfo, Long> implements
		SystemInfoDao {
	
	@Override
	public List<SystemInfo> readAllBySiteId(Long siteId){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();;
			criteria = session.createCriteria(SystemInfo.class)
					.createAlias("site", "site");
			criteria.add(Restrictions.eq("site.id", siteId));
			return criteria.list();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line for site id " + siteId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line for site id " + siteId, e);
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
		Criteria criteria = session.createCriteria(SystemInfo.class);

		entitiesMap.put("system", new LinkedHashSet(criteria.list()));
		
		return entitiesMap;
			}

	@Override
	public Long create(SystemInfo newInstance) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public SystemInfo read(Long id) {
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
