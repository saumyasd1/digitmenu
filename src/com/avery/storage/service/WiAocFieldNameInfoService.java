package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiAocFieldNameInfoDao;
import com.avery.storage.entities.WiAocFieldNameInfo;

/**
 * @author Vishal
 *
 */
@Component
public class WiAocFieldNameInfoService extends GenericEntityService<WiAocFieldNameInfo, Long> {

	private WiAocFieldNameInfoDao wiAocFieldNameInfoDao;

	public WiAocFieldNameInfoDao getWiAocFieldNameInfoDao() {
		return wiAocFieldNameInfoDao;
	}

	@Autowired
	public void setWiAocFieldNameInfoDao(WiAocFieldNameInfoDao wiAocFieldNameInfoDao) {
		this.wiAocFieldNameInfoDao = wiAocFieldNameInfoDao;
	}
}
