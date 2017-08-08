package com.avery.storage.dao.impl;

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
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
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
			session = getSessionFactory().getCurrentSession();
			Site site = new Site();
			ProjectionList proj = Projections.projectionList()
					.add(Projections.property("id"), "id")
					.add(Projections.property("name"), "name")
					.add(Projections.groupProperty("name"));
			criteria = session.createCriteria(SystemInfo.class)
					.setProjection(proj).setResultTransformer(Transformers.aliasToBean(SystemInfo.class));
			if(siteId != null && siteId != 0L)
			{
				site.setId(siteId);
				criteria.add(Restrictions.eq("site", site));
			}
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
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		return null;
	}
	
	@Override
	public List<SystemInfo> getDistinctSystem(){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			ProjectionList proj = Projections.projectionList()
					.add(Projections.property("id"), "id")
					.add(Projections.property("name"), "name")
					.add(Projections.groupProperty("name"));
			criteria = session.createCriteria(SystemInfo.class)
					.setProjection(proj).setResultTransformer(Transformers.aliasToBean(SystemInfo.class));
			return criteria.list();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching system name", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching system name", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}
}
