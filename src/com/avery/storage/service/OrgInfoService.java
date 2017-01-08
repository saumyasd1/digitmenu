package com.avery.storage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrgInfoDao;
import com.avery.storage.entities.OrgInfo;

@Component
public class OrgInfoService extends GenericEntityService<OrgInfo, Long>{
	
	private OrgInfoDao orgInfoDao;

	public OrgInfoDao getOrgInfoDao() {
		return orgInfoDao;
	}

	@Autowired
	public void setOrgInfoDao(OrgInfoDao orgInfoDao) {
		this.orgInfoDao = orgInfoDao;
	}

	@Transactional 
	public List<OrgInfo> readOrgInfoByProductLneId(Long productLineId,Long OrgId ) throws Exception{
		
		return getOrgInfoDao().readOrgInfoByProductLneId(productLineId,OrgId);
		
	} 

}
