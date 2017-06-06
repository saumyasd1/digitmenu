package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.SystemCsrCode;

@Repository
public class SystemCsrCodeDaoImpl extends GenericDaoImpl<SystemCsrCode, Long> implements SystemCsrCodeDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		return null;
	}

	@Override
	public Map<String, Object> getBySystemAndOrgCodeId(int systemId, int orgId) {	
		Map<String, Object> entitiesMap = new HashMap<String, Object>();
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(SystemCsrCode.class);
			Conjunction conjunction = Restrictions.conjunction();
			conjunction.add(Restrictions.eq("isActive", "true"))
					   .add(Restrictions.eq("systemId", systemId))
					   .add(Restrictions.eq("orgId", orgId));
			criteria.add(conjunction);
			entitiesMap.put("data", criteria.list());
		}
		catch(Exception e){
			AppLogger.getSystemLogger().error("Some error occured while fetching the data -> "+e);
			throw new WebApplicationException();
		}
		return entitiesMap;
	}

}
