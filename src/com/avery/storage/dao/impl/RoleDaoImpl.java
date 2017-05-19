package com.avery.storage.dao.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Menu;
import com.avery.storage.entities.MenuRole;
import com.avery.storage.entities.Role;
import com.avery.storage.entities.User;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@SuppressWarnings("unchecked")
@Repository
public class RoleDaoImpl extends GenericDaoImpl<Role, Long> implements RoleDao {

	@Override
	public List<User> getUsers(Long roleId) {
		Map<String, Object> responseMap = new HashMap<String, Object>();
		Session session = null;
		Criteria criteria = null;
		User menu = null;
		String role = Long.toString(roleId);
		List<User> userlist = new ArrayList<User>();
		List<User> userList = new ArrayList<User>();
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		Conjunction disCriteria = Restrictions.conjunction();
		disCriteria.add(Restrictions.eq("role", role));
		criteria.add(disCriteria);
		userList = criteria.list();
		for (User user : userList) {
			if (user != null) {
				menu = user;
				menu.setId(user.getId());
				menu.setRole(user.getRole());
				userlist.add(menu);
			}

		}
		responseMap.put("userList", userlist);
		return userlist;
	}

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		Map entitiesMap = new HashMap();
		Session session = getSessionFactory().getCurrentSession();
		int totalCount = 0;
		Criteria criteria = session.createCriteria(Role.class);

		if (queryMap.getFirst("id") != null) {
			criteria.add(Restrictions.ne("id", 1));
		}

		String limit = (String) queryMap.getFirst("limit");
		String pageNo = (String) queryMap.getFirst("page");
		totalCount = HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		criteria.addOrder(Order.desc("lastModifiedDate"));
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber)
				: 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer
				.parseInt(limit) : 0;
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
		entitiesMap.put("roleList", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}

	@Override
	public Map getMenuRoles(Long roleId) {
		Session session = null;
		Criteria criteria = null;
		MenuRole menu = null;
		// session = getSessionFactory().getCurrentSession();
		try {
			session = getSessionFactory().openSession();
			criteria = session.createCriteria(MenuRole.class);

			String role = Long.toString(roleId);
			List<MenuRole> menuRoleList = new ArrayList<MenuRole>();

			Conjunction disCriteria = Restrictions.conjunction();
			disCriteria.add(Restrictions.eq("role", role));
			criteria.add(disCriteria);
			menuRoleList = criteria.list();
			List<String> menuArrList = new ArrayList<String>();
			for (MenuRole menuRole : menuRoleList) {
				if (menuRole != null) {
					menu = menuRole;
					menu.setId(menuRole.getMenu().getId());
					menu.setRole(menuRole.getRole());
					menuArrList.add(StringUtils.capitalize(menuRole.getMenu()
							.getTitle().replaceAll("\\s+", ""))
							+ ":" + menuRole.getMenu().getId());
				}

			}
			Map<String, Boolean> map = new HashMap<String, Boolean>();
			for (String i : menuArrList) {
				map.put(i.toLowerCase().toString().split("\\:")[0], true);
			}
			return map;

		} finally {
			session.close();
		}
	}

	@Transactional
	@Override
	public void editMenuRole(String data, Long entityId) {
		ObjectMapper mapper = new ObjectMapper();
		boolean home = false, emailqueue = false, taskmanager = false, orderqueue = false, weborder = false, partner = false, address = false;
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				false);
		Menu menuObj = new Menu();
		String roleId = Long.toString(entityId);
		Map<String, String> jsonMap = null;
		Date date = new Date();
		try {
			jsonMap = ApplicationUtils.convertJSONtoMaps(data);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Long> mnlist = new ArrayList<Long>();
		home = Boolean.parseBoolean((String) jsonMap.get("home"));
		if (home == true)
			mnlist.add(1L);
		taskmanager = Boolean.parseBoolean((String) jsonMap.get("taskmanager"));
		if (taskmanager == true)
			mnlist.add(2L);
		emailqueue = Boolean.parseBoolean((String) jsonMap.get("emailqueue"));
		if (emailqueue == true)
			mnlist.add(3L);
		orderqueue = Boolean.parseBoolean((String) jsonMap.get("orderqueue"));
		if (orderqueue == true)
			mnlist.add(4L);
		weborder = Boolean.parseBoolean((String) jsonMap.get("weborder"));
		if (weborder == true)
			mnlist.add(5L);
		partner = Boolean.parseBoolean((String) jsonMap.get("partner"));
		if (partner == true)
			mnlist.add(6L);
		address = Boolean.parseBoolean((String) jsonMap.get("address"));
		if (address == true)
			mnlist.add(7L);
		String sql = "delete from MenuRole where roleId = " + roleId;
		Query query = session.createQuery(sql);
		query.executeUpdate();

		for (int i = 0; i < mnlist.size(); i++) {
			MenuRole menuRoleObj = new MenuRole();
			menuObj.setId(mnlist.get(i));
			menuRoleObj.setMenu(menuObj);
			menuRoleObj.setRole(roleId);
			menuRoleObj.setCreatedDate(date);
			session.save(menuRoleObj);
		}
	}

}
