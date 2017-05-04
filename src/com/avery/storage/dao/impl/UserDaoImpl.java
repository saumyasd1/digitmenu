package com.avery.storage.dao.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Menu;
import com.avery.storage.entities.MenuRole;
import com.avery.storage.entities.User;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

/**
 * 28 DEC -2015
 * 
 * @author Amit Trivedi
 */
@SuppressWarnings("unchecked")
@Repository
public class UserDaoImpl extends GenericDaoImpl<User, Long> implements UserDao {

	@SuppressWarnings({ "rawtypes" })
	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		Map entitiesMap = new HashMap();
		Criteria criteria = null;
		int totalCount = 0;
		criteria = getCriteria(queryMap);
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
			System.out.println(csrId);

		}

		entitiesMap.put("totalCount", totalCount);
		entitiesMap.put("users", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}

	@Override
	public Boolean checkDuplicate(String email) throws Exception {
		Session session = null;
		Criteria criteria = null;
		int totalCount = 0;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		if (email != null && !"".equals(email)) {
			criteria.add(Restrictions.eq("email", email));
			totalCount = criteria.list().size();
		}
		return (totalCount > 0);
	}

	@Override
	public User findUserByEmail(String email) throws Exception {
		System.out.println("email  " + email);
		Session session = null;
		Criteria criteria = null;
		User user = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		if (email != null && !"".equals(email)) {
			user = (User) criteria.add(Restrictions.eq("email", email)).uniqueResult();
		}
		return user;
	}

	@Override
	public boolean checkDuplicateUser(User userObj) throws Exception {
		Session session = null;
		Criteria criteria = null;
		int totalCount = 0;
		String Email = userObj.getEmail();
		Long id = userObj.getId();
		Boolean partnerExist = false;
		List<User> user = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		if (Email != null && !"".equals(Email)) {
			Conjunction disCriteria = Restrictions.conjunction();
			disCriteria.add(Restrictions.eq("email", Email));
			if (id != 0) {
				disCriteria.add(Restrictions.ne("id", id));
			}
			criteria.add(disCriteria);
			user = criteria.list();
			totalCount = user.size();
			if (totalCount > 0)
				partnerExist = true;
		}
		return partnerExist;
	}

	@SuppressWarnings({ "rawtypes" })
	public Criteria getCriteria(MultivaluedMap queryMap) throws IOException,
			Exception {
		Session session = null;
		Criteria criteria = null;
		String queryString = (String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		if (queryString != null) {
			Map<String, String> searchMap = ApplicationUtils
					.convertJSONtoMaps(queryString);
			String dateType = searchMap.get("datecriteriavalue");
			if (dateType != null && !dateType.equals("")) {
				String sDate = searchMap.get("fromDate");
				String eDate = searchMap.get("toDate");
				criteria = HibernateUtils.getCriteriaBasedOnDate(criteria,
						dateType, sDate, eDate);
			}
			String email = searchMap.get("email");
			if (email != null && !"".equals(email)) {
				criteria.add(Restrictions.ilike("email", email,
						MatchMode.ANYWHERE));
			}
		}
		return criteria;
	}

	@Override
	public List<User> getSortedList() {
		Session session = null;
		Criteria criteria = null;
		try {
			session = getSessionFactory().getCurrentSession();
			criteria = session
					.createCriteria(User.class, "u")
					.setProjection(
							Projections
									.projectionList()
									.add(Projections.property("id"), ("id"))
									.add(Projections.property("firstName"),
											"firstName")
									.add(Projections.property("lastName"),
											"lastName")
									.add(Projections.property("middleName"),
											"middleName"))
					.setResultTransformer(Transformers.aliasToBean(User.class));
			criteria.addOrder(Order.asc("firstName"));
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return criteria.list();
	}

	public List<Menu> getMenuRole(String roleId) {
		System.out.println("roleId   " + roleId);
		Session session = null;
		Criteria criteria = null;
		Menu menu = null;
		List<Menu> menulist = new ArrayList<Menu>();
		System.out.println("roleId  1 ::  " + roleId);
		List<MenuRole> menuRoleList = new ArrayList<MenuRole>();
		session = getSessionFactory().openSession();
		criteria = session.createCriteria(MenuRole.class);
		Conjunction disCriteria = Restrictions.conjunction();
		disCriteria.add(Restrictions.eq("role", roleId));
		criteria.add(disCriteria);
		menuRoleList = criteria.list();
		for (MenuRole menuRole : menuRoleList) {
			if (menuRole != null) {
				menu = menuRole.getMenu();
				menu.setId(menuRole.getMenu().getId());
				menu.setTitle(menuRole.getMenu().getTitle());
				menu.setImage(menuRole.getMenu().getImage());
				menu.setXtype(menuRole.getMenu().getXtype());
				menu.setView(menuRole.getMenu().getView());
				menu.setSel(menuRole.getMenu().getSel());
				menulist.add(menu);
			}

		}
		return menulist;
	}

	@Override
	public String getApplicationDefaultTimeZone() throws Exception {
		Session session = null;
		String result = "";
		try {
			AppLogger.getSystemLogger().debug(
					"Getting timezone offset from datbase ");
			session = getSessionFactory().getCurrentSession();
			String s = "SELECT TIMEDIFF( UTC_TIMESTAMP, NOW())";
			SQLQuery query = session.createSQLQuery(s);
			List<Date> list = query.list();
			Iterator<Date> itr = list.iterator();
			while (itr.hasNext()) {
				Date date = (Date) itr.next();
				String dateToString = date.toString();
				String dateToSubString = dateToString.substring(0, dateToString.length() - 3);
				result = "GMT-" + dateToSubString;
				AppLogger.getSystemLogger().debug(
						"Timezone offset of database  is "+result +".");
				return result;
			}
		} catch (Exception e) {
			try {
				String q1 = "SELECT TIMEDIFF( NOW(),UTC_TIMESTAMP)";
				SQLQuery query = session.createSQLQuery(q1);
				List<Date> list = query.list();
				Iterator<Date> itr = list.iterator();
				while (itr.hasNext()) {
					Date date = (Date) itr.next();
					String dateToString = date.toString();
					String dateToSubString = dateToString.substring(0,
							dateToString.length() - 3);
					result = "GMT+" + dateToSubString;
					AppLogger.getSystemLogger().debug(
							"Timezone offset of database  is "+result +".");
					return result;
				}
			} catch (Exception ex) {
				throw new Exception("Error while get time zone from database "
						+ e.getMessage(), e);
			}
		}
		return result;
	}
}
