package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.avery.storage.dao.impl.MenuDao;
import com.avery.storage.entities.Menu;

public class MenuService extends GenericEntityService<Menu, Long> {

	private MenuDao menuDao;

	public MenuDao getMenuDao() {
		return menuDao;
	}

	@Autowired
	public void setMenuDao(MenuDao menuDao) {
		this.menuDao = menuDao;
	}

}
