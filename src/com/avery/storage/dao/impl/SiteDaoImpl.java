package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Site;

@Repository
public class SiteDaoImpl extends GenericDaoImpl<Site, Long> implements
	SiteDao {

	
	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		Map entitiesMap = new HashMap();
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(Site.class);
				

		entitiesMap.put("site", new LinkedHashSet(criteria.list()));
		//entitiesMap.put("partner", criteria1.list());
		return entitiesMap;
	}

	

}
