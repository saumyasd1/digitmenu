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

import com.avery.logging.AppLogger;
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
	public void addMenuRole(String data, Long entityId) {

		ObjectMapper mapper = new ObjectMapper();
		boolean home = false, emailqueue = false, taskmanager = false, orderqueue = false, weborder = false, partner = false, address = false;
		Session session = null;
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				false);
		Map<String, String> jsonMap = null;
		try {
			jsonMap = ApplicationUtils.convertJSONtoMaps(data);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		home = Boolean.parseBoolean((String) jsonMap.get("home"));
		if (home == true) {
			session = getSessionFactory().getCurrentSession();
			MenuRole menuRoleObj = new MenuRole();
			Menu menuObj = new Menu();
			Long currentMenuId = Long.parseLong("1");
			menuObj.setId(currentMenuId);
			menuRoleObj.setMenu(menuObj);
			menuRoleObj.setRole(Long.toString(entityId));
			menuRoleObj.setCreatedDate(new Date());
			session.save(menuRoleObj);
		}
		taskmanager = Boolean.parseBoolean((String) jsonMap.get("taskmanager"));
		if (taskmanager == true) {
			session = getSessionFactory().getCurrentSession();
			MenuRole menuRoleObj = new MenuRole();
			Menu menuObj = new Menu();
			Long currentMenuId = Long.parseLong("2");
			menuObj.setId(currentMenuId);
			menuRoleObj.setMenu(menuObj);
			menuRoleObj.setRole(Long.toString(entityId));
			menuRoleObj.setCreatedDate(new Date());
			session.save(menuRoleObj);
		}
		emailqueue = Boolean.parseBoolean((String) jsonMap.get("emailqueue"));
		if (emailqueue == true) {
			session = getSessionFactory().getCurrentSession();
			MenuRole menuRoleObj = new MenuRole();
			Menu menuObj = new Menu();
			Long currentMenuId = Long.parseLong("3");
			menuObj.setId(currentMenuId);
			menuRoleObj.setMenu(menuObj);
			menuRoleObj.setRole(Long.toString(entityId));
			menuRoleObj.setCreatedDate(new Date());
			session.save(menuRoleObj);
		}
		orderqueue = Boolean.parseBoolean((String) jsonMap.get("orderqueue"));
		if (orderqueue == true) {
			session = getSessionFactory().getCurrentSession();
			MenuRole menuRoleObj = new MenuRole();
			Menu menuObj = new Menu();
			Long currentMenuId = Long.parseLong("4");
			menuObj.setId(currentMenuId);
			menuRoleObj.setMenu(menuObj);
			menuRoleObj.setRole(Long.toString(entityId));
			menuRoleObj.setCreatedDate(new Date());
			session.save(menuRoleObj);
		}
		weborder = Boolean.parseBoolean((String) jsonMap.get("weborder"));
		if (weborder == true) {
			session = getSessionFactory().getCurrentSession();
			MenuRole menuRoleObj = new MenuRole();
			Menu menuObj = new Menu();
			Long currentMenuId = Long.parseLong("5");
			menuObj.setId(currentMenuId);
			menuRoleObj.setMenu(menuObj);
			menuRoleObj.setRole(Long.toString(entityId));
			menuRoleObj.setCreatedDate(new Date());
			session.save(menuRoleObj);
		}
		partner = Boolean.parseBoolean((String) jsonMap.get("partner"));
		if (partner == true) {
			session = getSessionFactory().getCurrentSession();
			MenuRole menuRoleObj = new MenuRole();
			Menu menuObj = new Menu();
			Long currentMenuId = Long.parseLong("6");
			menuObj.setId(currentMenuId);
			menuRoleObj.setMenu(menuObj);
			menuRoleObj.setRole(Long.toString(entityId));
			menuRoleObj.setCreatedDate(new Date());
			session.save(menuRoleObj);
		}
		address = Boolean.parseBoolean((String) jsonMap.get("address"));
		if (address == true) {
			session = getSessionFactory().getCurrentSession();
			MenuRole menuRoleObj = new MenuRole();
			Menu menuObj = new Menu();
			Long currentMenuId = Long.parseLong("7");
			menuObj.setId(currentMenuId);
			menuRoleObj.setMenu(menuObj);
			menuRoleObj.setRole(Long.toString(entityId));
			menuRoleObj.setCreatedDate(new Date());
			session.save(menuRoleObj);
		}
	}

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
			List<MenuRole> menuRolelist = new ArrayList<MenuRole>();
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
					menuRolelist.add(menu);
					menuArrList.add(StringUtils.capitalize(menuRole.getMenu()
							.getTitle().replaceAll("\\s+", ""))
							+ ":" + menuRole.getMenu().getId());
				}

			}
			Map<String, String> map = new HashMap<String, String>();
			for (String i : menuArrList) {
				map.put(i.toLowerCase().toString().split("\\:")[0], i
						.toLowerCase().toString().split("\\:")[1]);
			}
			return map;

		} finally {
			session.close();
		}
	}

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
		String rId = Long.toString(entityId);
		Map<String, String> jsonMap = null;
		try {
			jsonMap = ApplicationUtils.convertJSONtoMaps(data);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		home = Boolean.parseBoolean((String) jsonMap.get("home"));
		if (home == true) {
			Long currentMenuId = Long.parseLong("1");
			menuObj.setId(currentMenuId);
			int menuObj2 = 1;
			String st = "select distinct id from MenuRole where menuMasterId="
					+ menuObj2 + "and roleId=" + rId;
			Query qt = session.createQuery(st);
			List list = qt.list();
			if (list.isEmpty()) {
				MenuRole menuRoleObj = new MenuRole();
				currentMenuId = Long.parseLong("1");
				menuObj.setId(currentMenuId);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(Long.toString(entityId));
				menuRoleObj.setCreatedDate(new Date());
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}

		} else {
			rId = Long.toString(entityId);
			int menuObj2 = 1;
			String s = "delete from MenuRole where roleId = " + rId
					+ "and menuMasterId=" + menuObj2;
			Query q = session.createQuery(s);
			q.executeUpdate();
		}
		taskmanager = Boolean.parseBoolean((String) jsonMap.get("taskmanager"));
		if (taskmanager == true) {
			Long currentMenuId = Long.parseLong("2");
			menuObj.setId(currentMenuId);
			int menuObj2 = 2;
			String st = "select distinct id from MenuRole where menuMasterId="
					+ menuObj2 + "and roleId=" + rId;
			Query qt = session.createQuery(st);
			List list = qt.list();
			if (list.isEmpty()) {
				MenuRole menuRoleObj = new MenuRole();
				currentMenuId = Long.parseLong("2");
				menuObj.setId(currentMenuId);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(Long.toString(entityId));
				menuRoleObj.setCreatedDate(new Date());
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			rId = Long.toString(entityId);
			int menuObj2 = 2;
			String s = "delete from MenuRole where roleId = " + rId
					+ "and menuMasterId=" + menuObj2;
			Query q = session.createQuery(s);
			q.executeUpdate();
		}
		emailqueue = Boolean.parseBoolean((String) jsonMap.get("emailqueue"));
		if (emailqueue == true) {
			Long currentMenuId = Long.parseLong("3");
			menuObj.setId(currentMenuId);
			int menuObj2 = 3;
			String st = "select distinct id from MenuRole where menuMasterId="
					+ menuObj2 + "and roleId=" + rId;
			Query qt = session.createQuery(st);
			List list = qt.list();
			if (list.isEmpty()) {
				MenuRole menuRoleObj = new MenuRole();
				currentMenuId = Long.parseLong("3");
				menuObj.setId(currentMenuId);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(Long.toString(entityId));
				menuRoleObj.setCreatedDate(new Date());
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			rId = Long.toString(entityId);
			int menuObj2 = 3;
			String s = "delete from MenuRole where roleId = " + rId
					+ "and menuMasterId=" + menuObj2;
			Query q = session.createQuery(s);
			q.executeUpdate();
		}
		orderqueue = Boolean.parseBoolean((String) jsonMap.get("orderqueue"));
		if (orderqueue == true) {
			Long currentMenuId = Long.parseLong("4");
			menuObj.setId(currentMenuId);
			int menuObj2 = 4;
			String st = "select distinct id from MenuRole where menuMasterId="
					+ menuObj2 + "and roleId=" + rId;
			Query qt = session.createQuery(st);
			List list = qt.list();
			if (list.isEmpty()) {
				MenuRole menuRoleObj = new MenuRole();
				currentMenuId = Long.parseLong("4");
				menuObj.setId(currentMenuId);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(Long.toString(entityId));
				menuRoleObj.setCreatedDate(new Date());
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			rId = Long.toString(entityId);
			int menuObj2 = 4;
			String s = "delete from MenuRole where roleId = " + rId
					+ "and menuMasterId=" + menuObj2;
			Query q = session.createQuery(s);
			q.executeUpdate();
		}
		weborder = Boolean.parseBoolean((String) jsonMap.get("weborder"));
		if (weborder == true) {
			Long currentMenuId = Long.parseLong("5");
			menuObj.setId(currentMenuId);
			int menuObj2 = 5;
			String st = "select distinct id from MenuRole where menuMasterId="
					+ menuObj2 + "and roleId=" + rId;
			Query qt = session.createQuery(st);
			List list = qt.list();
			if (list.isEmpty()) {
				MenuRole menuRoleObj = new MenuRole();
				currentMenuId = Long.parseLong("5");
				menuObj.setId(currentMenuId);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(Long.toString(entityId));
				menuRoleObj.setCreatedDate(new Date());
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			rId = Long.toString(entityId);
			int menuObj2 = 5;
			String s = "delete from MenuRole where roleId = " + rId
					+ "and menuMasterId=" + menuObj2;
			Query q = session.createQuery(s);
			q.executeUpdate();
		}
		partner = Boolean.parseBoolean((String) jsonMap.get("partner"));
		if (partner == true) {
			Long currentMenuId = Long.parseLong("6");
			menuObj.setId(currentMenuId);
			int menuObj2 = 6;
			String st = "select distinct id from MenuRole where menuMasterId="
					+ menuObj2 + "and roleId=" + rId;
			Query qt = session.createQuery(st);
			List list = qt.list();
			if (list.isEmpty()) {
				MenuRole menuRoleObj = new MenuRole();
				currentMenuId = Long.parseLong("6");
				menuObj.setId(currentMenuId);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(Long.toString(entityId));
				menuRoleObj.setCreatedDate(new Date());
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			rId = Long.toString(entityId);
			int menuObj2 = 6;
			String s = "delete from MenuRole where roleId = " + rId
					+ "and menuMasterId=" + menuObj2;
			Query q = session.createQuery(s);
			q.executeUpdate();
		}
		address = Boolean.parseBoolean((String) jsonMap.get("address"));
		if (address == true) {
			Long currentMenuId = Long.parseLong("7");
			menuObj.setId(currentMenuId);
			int menuObj2 = 7;
			String st = "select distinct id from MenuRole where menuMasterId="
					+ menuObj2 + "and roleId=" + rId;
			Query qt = session.createQuery(st);
			List list = qt.list();
			if (list.isEmpty()) {
				MenuRole menuRoleObj = new MenuRole();
				currentMenuId = Long.parseLong("7");
				menuObj.setId(currentMenuId);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(Long.toString(entityId));
				menuRoleObj.setCreatedDate(new Date());
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			rId = Long.toString(entityId);
			int menuObj2 = 7;
			String s = "delete from MenuRole where roleId = " + rId
					+ "and menuMasterId=" + menuObj2;
			Query q = session.createQuery(s);
			q.executeUpdate();
		}
		/*

		ObjectMapper mapper = new ObjectMapper();
		boolean home = false, emailqueue = false, taskmanager = false, orderqueue = false, weborder = false, partner = false, address = false;
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Menu menuObj = new Menu();
		MenuRole menuRoleObj = new MenuRole();
		String roleId = Long.toString(entityId);
		Map<String, String> jsonMap = null;
		Date date = new Date(); 
		try {
			jsonMap = ApplicationUtils.convertJSONtoMaps(data);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		home = Boolean.parseBoolean((String) jsonMap.get("home"));
		taskmanager = Boolean.parseBoolean((String) jsonMap.get("taskmanager"));
		emailqueue = Boolean.parseBoolean((String) jsonMap.get("emailqueue"));
		orderqueue = Boolean.parseBoolean((String) jsonMap.get("orderqueue"));
		weborder = Boolean.parseBoolean((String) jsonMap.get("weborder"));
		partner = Boolean.parseBoolean((String) jsonMap.get("partner"));
		address = Boolean.parseBoolean((String) jsonMap.get("address"));

		 Home checks edit and delete info starts
		if (home == true) {
			String queryString = "select distinct id from MenuRole where menuMasterId = 1 and roleId = " + roleId;
			Query query = session.createQuery(queryString);
			List list = query.list();
			if (list.isEmpty()) {
				menuObj.setId(1);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(roleId);
				menuRoleObj.setCreatedDate(date);
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			String queryString = "delete from MenuRole where roleId = " + roleId + "and menuMasterId= 1 " ;
			Query query = session.createQuery(queryString);
			query.executeUpdate();
		}
		 Home checks edit and delete info ends
		
		 taskmanager checks edit and delete info starts
		if (taskmanager == true) {
			String queryString = "select distinct id from MenuRole where menuMasterId = 2 and roleId=" + roleId;
			Query query = session.createQuery(queryString);
			List list = query.list();
			if (list.isEmpty()) {
				menuObj.setId(2);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(roleId);
				menuRoleObj.setCreatedDate(date);
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			String queryString = "delete from MenuRole where roleId = " + roleId + "and menuMasterId = 2" ;
			Query query = session.createQuery(queryString);
			query.executeUpdate();
		}
		 taskmanager checks edit and delete info ends
		 emailqueue checks edit and delete info starts	
		if (emailqueue == true) {
			String queryString = "select distinct id from MenuRole where menuMasterId= 3 and roleId=" + roleId;
			Query query = session.createQuery(queryString);
			List list = query.list();
			if (list.isEmpty()) {
				menuObj.setId(3);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(roleId);
				menuRoleObj.setCreatedDate(date);
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			Long currentMenuId = Long.parseLong("3");
			String queryString = "delete from MenuRole where roleId = " + roleId + "and menuMasterId = 3 ";
			Query query = session.createQuery(queryString);
			query.executeUpdate();
		}
		 emailqueue checks edit and delete info ends
		
		 orderqueue checks edit and delete info starts
		if (orderqueue == true) {
			String queryString = "select distinct id from MenuRole where menuMasterId = 4 and roleId=" + roleId;
			Query query = session.createQuery(queryString);
			List list = query.list();
			if (list.isEmpty()) {
				menuObj.setId(4);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(roleId);
				menuRoleObj.setCreatedDate(date);
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			String queryString = "delete from MenuRole where roleId = " + roleId + "and menuMasterId = 4 ";
			Query query = session.createQuery(queryString);
			query.executeUpdate();
		}
		 orderqueue checks edit and delete info ends
		 weborder checks edit and delete info starts
		if (weborder == true) {
			String queryString = "select distinct id from MenuRole where menuMasterId = 5 and roleId=" + roleId;
			Query query = session.createQuery(queryString);
			List list = query.list();
			if (list.isEmpty()) {
				menuObj.setId(5);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(roleId);
				menuRoleObj.setCreatedDate(date);
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			String queryString = "delete from MenuRole where roleId = " + roleId +" menuMasterId = 5 ";
			Query query = session.createQuery(queryString);
			query.executeUpdate();
		}
		 weborder checks edit and delete info ends
		 partner checks edit and delete info starts
		if (partner == true) {
			String queryString = "select distinct id from MenuRole where menuMasterId = 6 and roleId=" + roleId;
			Query query = session.createQuery(queryString);
			List list = query.list();
			if (list.isEmpty()) {
				menuObj.setId(6);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(roleId);
				menuRoleObj.setCreatedDate(date);
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			String queryString = "delete from MenuRole where roleId = " + roleId + "and menuMasterId = 6 ";
			Query query = session.createQuery(queryString);
			query.executeUpdate();
		}
		 partner checks edit and delete info ends
		 address checks edit and delete info starts
		if (address == true) {
			String queryString = "select distinct id from MenuRole where menuMasterId = 7 and roleId=" + roleId;
			Query query = session.createQuery(queryString);
			List list = query.list();
			if (list.isEmpty()) {
				menuObj.setId(7);
				menuRoleObj.setMenu(menuObj);
				menuRoleObj.setRole(roleId);
				menuRoleObj.setCreatedDate(date);
				session.save(menuRoleObj);
			} else {
				AppLogger.getSystemLogger().info("Value already exists in database...");
			}
		} else {
			String queryString = "delete from MenuRole where roleId = " + roleId + "and menuMasterId = 7 ";
			Query query = session.createQuery(queryString);
			query.executeUpdate();
		}
		 address checks edit and delete info ends
	*/}
	/*public int lastId(){
		int id = 0;
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		String queryString = "select id from MenuRole ";
		Query query = session.createQuery(queryString);
		id= query.list();
		return id;
	}*/

}
