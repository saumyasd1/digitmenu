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
import com.avery.storage.entities.WiOrg;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Repository
public class WiOrgDaoImpl extends GenericDaoImpl<WiOrg, Long> implements WiOrgDao {

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
		ProjectionList proj = Projections.projectionList().add(Projections.property("varWiOrgInfo.orgName"), "orgName")
				.add(Projections.property("varWiOrgInfo.siteName"), "siteName")
				.add(Projections.property("varWiOrgInfo.systemName"), "systemName")
				.add(Projections.property("varWiOrgInfo.id"), "parentId").add(Projections.property("id"), "id")
				.add(Projections.property("shippingInstruction"), "shippingInstruction")
				.add(Projections.property("shippingMethod"), "shippingMethod")
				.add(Projections.property("freightTerm"), "freightTerm")
				.add(Projections.property("billToCode"), "billToCode")
				.add(Projections.property("shipToCode"), "shipToCode")
				.add(Projections.property("defaultSelected"), "defaultSelected");
		try {
			session = getSessionFactory().getCurrentSession();
			Criteria criteria = session.createCriteria(WiOrg.class).createAlias("varWiOrgInfo", "varWiOrgInfo")
					.createAlias("varWi", "varWi").add(Restrictions.eq("varWi.id", entityId));
			criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(WiOrg.class));
			entitiesMap.put("org", new LinkedHashSet(criteria.list()));
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return entitiesMap;
	}

}
