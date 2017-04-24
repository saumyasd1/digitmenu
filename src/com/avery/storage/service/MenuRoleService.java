package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.avery.storage.dao.impl.MenuRoleDao;
import com.avery.storage.entities.MenuRole;

public class MenuRoleService extends GenericEntityService<MenuRole, Long> {

	private MenuRoleDao menuRoleDao;

	public MenuRoleDao getMenuRoleDao() {
		return menuRoleDao;
	}

	@Autowired
	public void setMenuRoleDao(MenuRoleDao menuRoleDao) {
		this.menuRoleDao = menuRoleDao;
	}

}
