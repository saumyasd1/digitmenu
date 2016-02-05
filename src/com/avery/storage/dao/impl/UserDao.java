package com.avery.storage.dao.impl;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.User;
/**
* 28 DEC -2015
* 
* @author Amit Trivedi
*/
public interface UserDao extends GenericDao<User, Long>{
	
	public Boolean checkDuplicate(String email) throws Exception;
	
	public User findUserByEmail(String email) throws Exception;
	
	public boolean checkDuplicateUser(User userObj) throws Exception;

}

