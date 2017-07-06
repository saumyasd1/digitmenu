package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.RBO;

/**
 * @author Vishal
 *
 */
@Repository
public class RBODaoImpl extends GenericDaoImpl<RBO, Long> implements RBODao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		return null;
	}

	@Override
	public Map getRboByPartnerId(Long partnerId) {
		Map entitiesMap = new HashMap();
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(RBO.class)
					.createAlias("productLine", "productLine")
					.createAlias("productLine.varPartner", "varPartner")
					.add(Restrictions.eq("varPartner.id", partnerId));
			entitiesMap.put("rbo", new LinkedHashSet(criteria.list()));
		}
		catch(Exception e){
			AppLogger.getSystemLogger().error("Error while fetching the rbo list -> "+e);
		}
		return entitiesMap;
	}

}
