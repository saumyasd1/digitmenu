package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.SystemInfo;

public interface SystemInfoDao extends GenericDao<SystemInfo, Long>{
	
	public List<SystemInfo> readAllBySiteId(Long siteId);
	public Map getAllEntitiesList();
}
