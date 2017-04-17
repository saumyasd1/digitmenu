package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiUserDao;
import com.avery.storage.entities.WiUser;

/**
 * @author Vishal
 *
 */
@Component
public class WiUserService extends GenericEntityService<WiUser, Long> {

	private WiUserDao wiUserDao;

	public WiUserDao getWiUserDao() {
		return wiUserDao;
	}

	@Autowired
	public void setWiUserDao(WiUserDao wiUserDao) {
		this.wiUserDao = wiUserDao;
	}

	@Transactional
	public Map getAssigneeList(String roleId) {
		return wiUserDao.getAssigneeList(roleId);
	}

}
