package com.avery.storage.service;

import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.SystemInfoDao;
import com.avery.storage.entities.SystemInfo;

@Component
public class SystemInfoService extends GenericEntityService<SystemInfo, Long>{
	
	private SystemInfoDao sytemInfoDao;

	public SystemInfoDao getSystemInfoDao() {
		return sytemInfoDao;
	}

	@Autowired
	public void setSystemInfoDao(SystemInfoDao sytemInfoDao) {
		this.sytemInfoDao = sytemInfoDao;
	}


	@Transactional
	public List<SystemInfo> readAllBySiteId(Long entityId){
		
		return getSystemInfoDao().readAllBySiteId(entityId);
		
	}
	
	@Transactional
	public List<SystemInfo> getDistinctSystem(){
		
		return getSystemInfoDao().getDistinctSystem();
		
	}

}
