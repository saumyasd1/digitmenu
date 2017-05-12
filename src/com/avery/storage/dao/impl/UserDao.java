package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Menu;
import com.avery.storage.entities.User;

/**
 * 24 APR -2017
 * 
 * @author Saumya Dixit
 */
public interface UserDao extends GenericDao<User, Long> {

	Boolean checkDuplicate(String email) throws Exception;

	User findUserByEmail(String email) throws Exception;

    boolean checkDuplicateUser(User userObj) throws Exception;

	List<User> getSortedList();

	String getApplicationDefaultTimeZone();
	
	int findUserBySiteId(int siteId) throws Exception;

	List<Menu> getMenuRole(String roleId);
	
	List<User> getUser(String siteId);

}