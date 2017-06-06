package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.SystemCsrCodeDao;
import com.avery.storage.entities.RBO;

@Component
public class SystemCsrCodeService extends GenericEntityService<RBO, Long>{
	
	public SystemCsrCodeDao systemCsrCodeDao;
	
	public SystemCsrCodeDao getSystemCsrCodeDao() {
		return systemCsrCodeDao;
	}

	@Autowired
	public void setSystemCsrCodeDao(SystemCsrCodeDao systemCsrCodeDao) {
		this.systemCsrCodeDao = systemCsrCodeDao;
	}

	@Transactional
	public Map<String, Object> getBySystemAndOrgCodeId(int systemId, int orgId){
		return getSystemCsrCodeDao().getBySystemAndOrgCodeId(systemId, orgId);
	}
	
}
