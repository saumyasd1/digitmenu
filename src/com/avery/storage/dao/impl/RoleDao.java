package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Role;
import com.avery.storage.entities.User;


public interface RoleDao extends GenericDao<Role, Long>{
	
	public void addMenuRole(String data, Long entityId);
	
	public List<User> getUsers(Long roleId);
	
	public Map getMenuRoles(Long roleId);

	public void editMenuRole(String data, Long entityId);
}


