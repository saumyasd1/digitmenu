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
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.BillShipMapping;

/**
 * @author Vishal
 *
 */
@Repository
public class BillShipMappingDaoImpl extends GenericDaoImpl<BillShipMapping, Long> implements BillShipMappingDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<BillShipMapping> getEntitiesByProductlineId(Long productlineId){
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(BillShipMapping.class)
					.createAlias("varProductLine", "varProductLine")
					.add(Restrictions.eq("varProductLine.id", productlineId));
		}
		catch(Exception e){
			AppLogger.getSystemLogger().error("There was some error while fetching the data -> "+e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return criteria.list();
	}

}
