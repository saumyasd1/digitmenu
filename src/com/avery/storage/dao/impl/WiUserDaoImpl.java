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
import com.avery.storage.entities.WiUser;

/**
 * @author Vishal
 *
 */
@Repository
public class WiUserDaoImpl extends GenericDaoImpl<WiUser, Long> implements WiUserDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map getAssigneeList(String roleId) {
		Map entitiesMap = new HashMap();
		Session session = null;
		Criteria criteria = null;
		session = getSessionFactory().getCurrentSession();
		ProjectionList proj = Projections.projectionList()
				.add(Projections.property("roles.id"), "roleId")
				.add(Projections.property("roles.roleName"), "roleName")
				.add(Projections.property("id"), "id")
				.add(Projections.property("firstName"), "firstName")
				.add(Projections.property("lastName"), "lastName");
		criteria = session.createCriteria(WiUser.class)
				.createAlias("listWiPermissions", "listWiPermissions")
				.createAlias("listWiPermissions.varWiRoles", "varWiRoles")
				.createAlias("varWiRoles", "roles")
				.add(Restrictions.eq("varWiRoles.id", Long.parseLong(roleId)));
		criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(WiUser.class));
		entitiesMap.put("assignee", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}

}
