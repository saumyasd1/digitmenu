package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Menu;
import com.avery.utils.HibernateUtils;

@SuppressWarnings("unchecked")
@Repository
public class MenuDaoImpl extends GenericDaoImpl<Menu, Long> implements MenuDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {

		Map entitiesMap = new HashMap();
		Session session = getSessionFactory().getCurrentSession();
		int totalCount = 0;
		Criteria criteria = session.createCriteria(Menu.class);
		String limit = (String) queryMap.getFirst("limit");
		String pageNo = (String) queryMap.getFirst("page");
		totalCount = HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		criteria.addOrder(Order.desc("lastModifiedDate"));
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber): 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if (pageNO != 0) {
			criteria.setFirstResult((pageNO - 1) * pageSize);
			criteria.setMaxResults(pageSize);
		}

		if (queryMap.getFirst("id") != null) {
			String id = (String) queryMap.getFirst("id");
			Long csrId = Long.parseLong(id);
			criteria.add(Restrictions.eq("id", csrId));
		}

		entitiesMap.put("totalCount", totalCount);
		entitiesMap.put("menulist", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}

}
