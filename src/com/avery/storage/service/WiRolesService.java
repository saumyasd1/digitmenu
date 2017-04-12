package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiRolesDao;
import com.avery.storage.entities.WiRoles;

/**
 * @author Vishal
 *
 */
@Component
public class WiRolesService extends GenericEntityService<WiRoles, Long> {

	private WiRolesDao wiRolesDao;

	public WiRolesDao getWiRolesDao() {
		return wiRolesDao;
	}

	@Autowired
	public void setWiRolesDao(WiRolesDao wiRolesDao) {
		this.wiRolesDao = wiRolesDao;
	}

}
