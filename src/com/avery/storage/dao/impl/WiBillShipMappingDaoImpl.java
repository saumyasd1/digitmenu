package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.WiBillShipMapping;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Repository
public class WiBillShipMappingDaoImpl extends GenericDaoImpl<WiBillShipMapping, Long> implements WiBillShipMappingDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	public Map getEntitiesByWiId(Long entityId){
		Map entitiesMap = new HashMap();
		Session session = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			session = getSessionFactory().getCurrentSession();
			Criteria criteria = session.createCriteria(WiBillShipMapping.class).createAlias("varWi", "varWi")
					.add(Restrictions.eq("varWi.id", entityId));
			entitiesMap.put("data", new LinkedHashSet(criteria.list()));
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return entitiesMap;
	}

}
