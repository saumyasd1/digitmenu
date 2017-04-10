package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.WiAocField;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Repository
public class WiAocFieldDaoImpl extends GenericDaoImpl<WiAocField, Long> implements WiAocFieldDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map getEntitiesByWiId(Long entityId) {
		Map entitiesMap = new HashMap();
		Session session = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			session = getSessionFactory().getCurrentSession();
			ProjectionList proj = Projections.projectionList()
					.add(Projections.property("varWiAocFieldNameInfo.id"), "parentId")
					.add(Projections.property("varWiAocFieldNameInfo.aocFieldName"), "aocFieldName")
					.add(Projections.property("id"), "id").add(Projections.property("validation"), "validation")
					.add(Projections.property("fieldValueExample"), "fieldValueExample")
					.add(Projections.property("logic"), "logic");
			Criteria criteria = session.createCriteria(WiAocField.class)
					.createAlias("varWiAocFieldNameInfo", "varWiAocFieldNameInfo").createAlias("varWi", "varWi")
					.add(Restrictions.eq("varWi.id", entityId));
			criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(WiAocField.class));
			entitiesMap.put("aocfields", new LinkedHashSet(criteria.list()));
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return entitiesMap;
	}

}
