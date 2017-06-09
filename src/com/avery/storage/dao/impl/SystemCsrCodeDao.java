package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.SystemCsrCode;

public interface SystemCsrCodeDao extends GenericDao<SystemCsrCode, Long>{

	public Map<String, Object> getBySystemAndOrgCodeId(long systemId, long orgId);
	
	public String getSystemcsrcodeById(String id);
	
	public boolean updateOwnerStatus(String systemCsrCodeOwner, String oldSystemCsrCodeOwner);
}
