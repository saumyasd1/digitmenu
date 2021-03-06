package com.avery.storage.service;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.RoleDao;
import com.avery.storage.entities.Role;
import com.avery.storage.entities.User;

@Component
public class RoleService extends GenericEntityService<Role, Long>{
	
private RoleDao roleDao;
	
	
	public RoleDao getRoleDao() {
		return roleDao;
	}

	@Autowired
	public void setRoleDao(RoleDao roleDao) {
		this.roleDao = roleDao;
	}
	@Transactional
	public List<User> getUsers(Long roleId) {
		return getRoleDao().getUsers(roleId);
	}
	@Transactional
	public Map getMenuRoles(Long roleId) {
		return getRoleDao().getMenuRoles(roleId);
	}
	@Transactional
	public void editMenuRole(String data,Long entityId){
		getRoleDao().editMenuRole(data,entityId);
	}
}
