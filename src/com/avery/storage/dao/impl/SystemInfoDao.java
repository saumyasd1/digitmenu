package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.SystemInfo;

public interface SystemInfoDao extends GenericDao<SystemInfo, Long>{
	
	public List<SystemInfo> readAllBySiteId(Long siteId);
}
