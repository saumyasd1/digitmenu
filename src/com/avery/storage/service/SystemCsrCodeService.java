package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.exception.CsrCodeNotFoundException;
import com.avery.storage.dao.impl.SystemCsrCodeDao;
import com.avery.storage.entities.SystemCsrCode;

/**
 * @author Vishal
 *
 */
@Component
public class SystemCsrCodeService extends GenericEntityService<SystemCsrCode, Long> {

	public SystemCsrCodeDao systemCsrCodeDao;

	public SystemCsrCodeDao getSystemCsrCodeDao() {
		return systemCsrCodeDao;
	}

	@Autowired
	public void setSystemCsrCodeDao(SystemCsrCodeDao systemCsrCodeDao) {
		this.systemCsrCodeDao = systemCsrCodeDao;
	}

	@Transactional
	public Map<String, Object> getBySystemAndOrgCodeId(long systemId, long orgId) {
		return getSystemCsrCodeDao().getBySystemAndOrgCodeId(systemId, orgId);
	}

	@Transactional
	public String getSystemcsrcodeById(String id) {
		return systemCsrCodeDao.getSystemcsrcodeById(id);
	}

	@Transactional
	public boolean updateOwnerStatus(String systemCsrCodeOwner, String oldSystemCsrCodeOwner, String userId) {
		return systemCsrCodeDao.updateOwnerStatus(systemCsrCodeOwner, oldSystemCsrCodeOwner, userId);
	}
	
	@Transactional
	public boolean checkIfCsrCodeExists(long systemId, long orgId, String csrCode) {
		return systemCsrCodeDao.checkIfCsrCodeExists(systemId, orgId, csrCode);
	}
	
	@Transactional
	public boolean removeCSRCode(String entityId) throws CsrCodeNotFoundException{
		return systemCsrCodeDao.removeCSRCode(entityId);
	}

}
