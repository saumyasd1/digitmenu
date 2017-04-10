package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiOrgInfoDao;
import com.avery.storage.entities.WiOrgInfo;

/**
 * @author Vishal
 *
 */
@Component
public class WiOrgInfoService extends GenericEntityService<WiOrgInfo, Long> {

	private WiOrgInfoDao wiOrgInfoDao;

	public WiOrgInfoDao getWiOrgInfoDao() {
		return wiOrgInfoDao;
	}

	@Autowired
	public void setWiOrgInfoDao(WiOrgInfoDao wiOrgInfoDao) {
		this.wiOrgInfoDao = wiOrgInfoDao;
	}

}
