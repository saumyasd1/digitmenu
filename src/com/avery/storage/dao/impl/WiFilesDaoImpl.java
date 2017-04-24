package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.WiFiles;

/**
 * @author Vishal
 *
 */
@Repository
public class WiFilesDaoImpl extends GenericDaoImpl<WiFiles, Long> implements WiFilesDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public List getFilesListByWiId(long wiId) {
		Session session = null;
		Criteria criteria = null;

		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(WiFiles.class)
				.createAlias("varWi", "varWi")
				.add(Restrictions.eq("varWi.id", wiId));
		return criteria.list();
	}

}
