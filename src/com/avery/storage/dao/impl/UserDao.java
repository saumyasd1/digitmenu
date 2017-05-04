package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Menu;
import com.avery.storage.entities.User;

/**
 * 28 DEC -2015
 * 
 * @author Amit Trivedi
 */
public interface UserDao extends GenericDao<User, Long> {

	public Boolean checkDuplicate(String email) throws Exception;

	public User findUserByEmail(String email) throws Exception;

	public boolean checkDuplicateUser(User userObj) throws Exception;

	public List<User> getSortedList();

	public String getApplicationDefaultTimeZone() throws Exception;

	public List<Menu> getMenuRole(String roleId);

}