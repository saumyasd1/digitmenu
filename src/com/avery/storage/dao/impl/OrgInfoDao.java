package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrgInfo;

public interface OrgInfoDao extends GenericDao<OrgInfo, Long>{
	
	public List<OrgInfo> readOrgInfoByProductLneId(Long productLineId,Long OrgId ) throws Exception;
	
	public Map<String, Object> readAllOrgInfoAndOrgName();
	
}
