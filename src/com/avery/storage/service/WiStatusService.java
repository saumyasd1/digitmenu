package com.avery.storage.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.WiStatusDao;
import com.avery.storage.entities.WiStatus;

/**
 * @author Vishal
 *
 */
@Component
public class WiStatusService extends GenericEntityService<WiStatus, Long> {

	private WiStatusDao wiStatusDao;

	public WiStatusDao getWiStatusDao() {
		return wiStatusDao;
	}

	@Autowired
	public void setWiStatusDao(WiStatusDao wiStatusDao) {
		this.wiStatusDao = wiStatusDao;
	}

	@Transactional
	public HashMap<String, Map> getStatusCodes() {
		return wiStatusDao.getStatusCode();
	}

	@Transactional
	public Map getStatusListByRoleId(String roleId) {
		return getWiStatusDao().getStatusListByRoleId(roleId);
	}

}
