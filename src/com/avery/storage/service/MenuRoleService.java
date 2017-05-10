package com.avery.storage.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.MenuRoleDao;
import com.avery.storage.entities.MenuRole;

@Component
public class MenuRoleService extends GenericEntityService<MenuRole, Long> {

	private MenuRoleDao menuRoleDao;

	public MenuRoleDao getMenuRoleDao() {
		return menuRoleDao;
	}

	@Autowired
	public void setMenuRoleDao(MenuRoleDao menuRoleDao) {
		this.menuRoleDao = menuRoleDao;
	}
	
	@Transactional
	public void deleteMenuRole(Long entityId){
		getMenuRoleDao().deleteMenuRole(entityId);
	}

}
