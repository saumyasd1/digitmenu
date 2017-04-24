package com.avery.storage.dao.impl;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

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
public class RoleDaoImpl extends GenericDaoImpl<Role, Long> implements
RoleDao {


	
	@Override
	public void addMenuRole(String data,Long entityId) {
		
		ObjectMapper mapper = new ObjectMapper();
		boolean Home =false, EmailQueue=false, TaskManager = false, OrderQueue = false, WebOrder = false, Partner = false, Address = false ;
		Session session = null;
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
		Map<String,String> jsonMap=null;
			try {
				jsonMap=ApplicationUtils.convertJSONtoMaps(data);
				} catch (IOException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
				Home=Boolean.parseBoolean((String)jsonMap.get("Home"));
				if(Home == true){
					session = getSessionFactory().getCurrentSession();
					MenuRole menuRoleObj=new MenuRole();
					Menu menuObj = new Menu();
					Long currentMenuId=Long.parseLong("1");
					menuObj.setId(currentMenuId);
					menuRoleObj.setMenu(menuObj);
					menuRoleObj.setRole(Long.toString(entityId));
					menuRoleObj.setCreatedDate(new Date());
					session.save(menuRoleObj);
				}
				TaskManager=Boolean.parseBoolean((String)jsonMap.get("TaskManager"));
				if(TaskManager == true){
					session = getSessionFactory().getCurrentSession();
					MenuRole menuRoleObj=new MenuRole();
					Menu menuObj = new Menu();
					Long currentMenuId=Long.parseLong("2");
					menuObj.setId(currentMenuId);
					menuRoleObj.setMenu(menuObj);
					menuRoleObj.setRole(Long.toString(entityId));
					menuRoleObj.setCreatedDate(new Date());
					session.save(menuRoleObj);
				}
				EmailQueue=Boolean.parseBoolean((String)jsonMap.get("EmailQueue"));
				if(EmailQueue == true){
					session = getSessionFactory().getCurrentSession();
					MenuRole menuRoleObj=new MenuRole();
					Menu menuObj = new Menu();
					Long currentMenuId=Long.parseLong("3");
					menuObj.setId(currentMenuId);
					menuRoleObj.setMenu(menuObj);
					menuRoleObj.setRole(Long.toString(entityId));
					menuRoleObj.setCreatedDate(new Date());
					session.save(menuRoleObj);
				}
				OrderQueue=Boolean.parseBoolean((String)jsonMap.get("OrderQueue"));
				if(OrderQueue == true){
					session = getSessionFactory().getCurrentSession();
					MenuRole menuRoleObj=new MenuRole();
					Menu menuObj = new Menu();
					Long currentMenuId=Long.parseLong("4");
					menuObj.setId(currentMenuId);
					menuRoleObj.setMenu(menuObj);
					menuRoleObj.setRole(Long.toString(entityId));
					menuRoleObj.setCreatedDate(new Date());
					session.save(menuRoleObj);
				}
				WebOrder=Boolean.parseBoolean((String)jsonMap.get("WebOrder"));
				if(WebOrder == true){
					session = getSessionFactory().getCurrentSession();
					MenuRole menuRoleObj=new MenuRole();
					Menu menuObj = new Menu();
					Long currentMenuId=Long.parseLong("5");
					menuObj.setId(currentMenuId);
					menuRoleObj.setMenu(menuObj);
					menuRoleObj.setRole(Long.toString(entityId));
					menuRoleObj.setCreatedDate(new Date());
					session.save(menuRoleObj);
				}
				Partner=Boolean.parseBoolean((String)jsonMap.get("Partner"));
				if(Partner == true){
					session = getSessionFactory().getCurrentSession();
					MenuRole menuRoleObj=new MenuRole();
					Menu menuObj = new Menu();
					Long currentMenuId=Long.parseLong("6");
					menuObj.setId(currentMenuId);
					menuRoleObj.setMenu(menuObj);
					menuRoleObj.setRole(Long.toString(entityId));
					menuRoleObj.setCreatedDate(new Date());
					session.save(menuRoleObj);
				}
				Address=Boolean.parseBoolean((String)jsonMap.get("Address"));
				if(Address == true){
					session = getSessionFactory().getCurrentSession();
					MenuRole menuRoleObj=new MenuRole();
					Menu menuObj = new Menu();
					Long currentMenuId=Long.parseLong("7");
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
		session = getSessionFactory().openSession();
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
		entitiesMap.put("roleList", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}
	
	

}
