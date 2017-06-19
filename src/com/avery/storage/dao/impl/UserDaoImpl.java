package com.avery.storage.dao.impl;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
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
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 24 APR -2017
 * 
 * @author Saumya Dixit
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
			Long userId = Long.parseLong(id);
			criteria.add(Restrictions.eq("id", userId));
		}
		if (queryMap.getFirst("siteId") != null) {
		String siteId=(String) queryMap.getFirst("siteId");
		if (!siteId.equals("1"))
			criteria.add(Restrictions.eq("siteId", Integer.parseInt(siteId)));
		}
		totalCount = HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		entitiesMap.put("totalCount", totalCount);
		entitiesMap.put("users",criteria.list());
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
		Session session = null;
		Criteria criteria = null;
		User user = null;
		session = getSessionFactory().getCurrentSession();
		ProjectionList proj = Projections.projectionList()
				.add(Projections.property("id"), "id")
				.add(Projections.property("firstName"), "firstName")
				.add(Projections.property("lastName"), "lastName")
				.add(Projections.property("email"), "email")
				.add(Projections.property("role"), "role")
				.add(Projections.property("status"), "status")
				.add(Projections.property("middleName"), "middleName")
				.add(Projections.property("fileName"), "fileName")
				.add(Projections.property("filePath"), "filePath")
				.add(Projections.property("systemCsrCodeOwner"), "systemCsrCodeOwner")
				.add(Projections.property("systemCsrNonCodeOwner"), "systemCsrNonCodeOwner")
				.add(Projections.property("password"), "password")
				.add(Projections.property("siteId"), "siteId");
		criteria = session.createCriteria(User.class);
		if (email != null && !"".equals(email)) {
			criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(User.class));
			user = (User) criteria.add(Restrictions.eq("email", email))
					.uniqueResult();
			}
		return user;
	}

	@Override
	public int findUserBySiteId(int siteId) throws Exception {
		Session session = null;
		Criteria criteria = null;
		User user = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		if (siteId != 0 && !"".equals(siteId)) {
			user = (User) criteria.add(Restrictions.eq("siteId", siteId))
					.uniqueResult();
		}
		return siteId;
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
				criteria = HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String email = searchMap.get("email");
			if (email != null && !"".equals(email)) {
				criteria.add(Restrictions.ilike("email", email, MatchMode.ANYWHERE));
			}
		}
		return criteria;
	}

	@Override
	public List<User> getSortedList(int siteId,int roleId) {
		Session session = null;
		Criteria criteria = null;
		List<User> listofcsr=null;
		try {
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(User.class)
					.setProjection(
							Projections.projectionList()
									.add(Projections.property("id"), ("id"))
									.add(Projections.property("firstName"),"firstName")
									.add(Projections.property("systemCsrCodeOwner"),"systemCsrCodeOwner")
									.add(Projections.property("lastName"),"lastName")
									.add(Projections.property("middleName"),"middleName"));
			Conjunction disCriteria = Restrictions.conjunction();
			disCriteria.add(Restrictions.eq("role", "3"));
			if(siteId!=1)disCriteria.add(Restrictions.eq("siteId", siteId));
			criteria.add(Restrictions.isNotNull("systemCsrCodeOwner"));
			criteria.add(disCriteria);
			criteria.addOrder(Order.asc("firstName"));
			criteria.setResultTransformer(Transformers.aliasToBean(User.class));
			listofcsr=criteria.list();
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return listofcsr;
	}

	public List<Menu> getMenuRole(String roleId) {
		Session session = null;
		Criteria criteria = null;
		Menu menu = null;
		List<Menu> menulist = new ArrayList<Menu>();
		List<MenuRole> menuRoleList = new ArrayList<MenuRole>();
		session = getSessionFactory().getCurrentSession();
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
	public List<User> getUser(String siteId) {
		Map<String, Object> responseMap = new HashMap<String, Object>();
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		Session session = null;
		Criteria criteria = null;
		User user = null;
		List<User> userlist = new ArrayList<User>();
		List<User> userList = new ArrayList<User>();
		Integer userSiteId = Integer.parseInt(siteId);
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		Conjunction disCriteria = Restrictions.conjunction();
		disCriteria.add(Restrictions.eq("siteId", userSiteId));
		criteria.add(disCriteria);
		userList = criteria.list();
		for (User userIter : userList) {
			if (userIter != null) {
				user = userIter;
				user.setId(user.getId());
				user.setRole(user.getRole());
				user.setSiteId(user.getSiteId());
				userlist.add(user);
			}

		}
		responseMap.put("userList", userlist);
		try {
			mapper.writeValue(writer, userlist);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userlist;
	}

	@Override
	public String getApplicationDefaultTimeZone() {
		Session session = null;
		String timeZone;
		try {
			session = getSessionFactory().getCurrentSession();
			String s = "select defaultTimeZone from GlobalConfiguration";
			Query q = session.createQuery(s);
			List results = q.list();
			timeZone = (String) results.get(0);
			return timeZone;
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while fetching data from the database", ex);
			return TimeZone.getDefault().getID();
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while fetching data from the database", e);
			return TimeZone.getDefault().getID();
		}
	}
	
	public String getUsernameById(String userid){
		String username=null;
		long id;
		try
		{
			id=Long.valueOf(userid);
			Session session = getSessionFactory().getCurrentSession();
			Criteria criteria = session.createCriteria(User.class);
			User currentuser =(User)criteria.add(Restrictions.eq("id",id)).uniqueResult();
					if(currentuser.getMiddleName()!=null)
					{
						username=currentuser.getFirstName()+" "+currentuser.getMiddleName()+" "+currentuser.getLastName();
					}else{
						username=currentuser.getFirstName()+" "+currentuser.getLastName();
					}
		}catch(Exception e)
		{
			username=userid;
		}		
		return username;
	}

}
