package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.SystemCsrCodeDao;
import com.avery.storage.entities.SystemCsrCode;

@Component
public class SystemCsrCodeService extends GenericEntityService<SystemCsrCode, Long>{
	
	public SystemCsrCodeDao systemCsrCodeDao;
	
	public SystemCsrCodeDao getSystemCsrCodeDao() {
		return systemCsrCodeDao;
	}

	@Autowired
	public void setSystemCsrCodeDao(SystemCsrCodeDao systemCsrCodeDao) {
		this.systemCsrCodeDao = systemCsrCodeDao;
	}

	@Transactional
	public Map<String, Object> getBySystemAndOrgCodeId(long systemId, long orgId){
		return getSystemCsrCodeDao().getBySystemAndOrgCodeId(systemId, orgId);
	}
	
	@Transactional
	public String getSystemcsrcodeById(String id){
		return systemCsrCodeDao.getSystemcsrcodeById(id);
	}
	
	@Transactional
	public boolean updateOwnerStatus(String systemCsrCodeOwner, String oldSystemCsrCodeOwner){
		return systemCsrCodeDao.updateOwnerStatus(systemCsrCodeOwner, oldSystemCsrCodeOwner);
	}
	
}
