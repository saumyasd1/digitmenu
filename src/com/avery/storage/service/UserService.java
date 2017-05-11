package com.avery.storage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.UserDao;
import com.avery.storage.entities.Menu;
import com.avery.storage.entities.User;

/**
 * 24 APR -2017
 * 
 * @author Saumya Dixit
 */
@Component
public class UserService extends GenericEntityService<User, Long> {

	private UserDao userDao;

	public UserDao getUserDao() {
		return userDao;
	}

	@Autowired
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	@Transactional
	public Boolean checkDuplicate(String email) throws Exception {
		return userDao.checkDuplicate(email);
	}

	@Transactional
	public User findUserByEmail(String email) throws Exception {
		return getUserDao().findUserByEmail(email);
	}

	@Transactional
	public boolean checkDuplicateUser(User userObj) throws Exception {
		return getUserDao().checkDuplicateUser(userObj);
	}

	@Transactional
	public int findUserBySiteId(int siteId) throws Exception {
		return getUserDao().findUserBySiteId(siteId);
	}
	
	@Transactional
	public List<User> getSortedList() {
		return getUserDao().getSortedList();
	}

	@Transactional
	public String getApplicationDefaultTimeZone() {
		return getUserDao().getApplicationDefaultTimeZone();
	}

	public List<Menu> getMenuRole(String roleId) {
		return getUserDao().getMenuRole(roleId);
	}
	
	@Transactional
	public List<User> getUser(String siteId) {
		return getUserDao().getUser(siteId);
	}

}
