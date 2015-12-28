package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.UserDao;
import com.avery.storage.entities.User;
/**
* 28 DEC -2015
* 
* @author Amit Trivedi
*/
@Component
public class UserService extends GenericEntityService<User, Long>{
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
	public User findUserByEmail(String email)throws Exception{
		return getUserDao().findUserByEmail(email);
		
	}
}
