package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiSystemInfoDao;
import com.avery.storage.entities.WiSystemInfo;

/**
 * @author Vishal
 *
 */
@Component
public class WiSystemInfoService extends GenericEntityService<WiSystemInfo, Long> {

	private WiSystemInfoDao WiSystemInfoDao;

	public WiSystemInfoDao getWiSystemInfoDao() {
		return WiSystemInfoDao;
	}
	
	@Autowired
	public void setWiOrgInfoDao(WiSystemInfoDao WiSystemInfoDao) {
		this.WiSystemInfoDao = WiSystemInfoDao;
	}
}
