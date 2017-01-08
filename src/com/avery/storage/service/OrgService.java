package com.avery.storage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrgDao;
import com.avery.storage.entities.Org;

@Component
public class OrgService extends GenericEntityService<Org, Long>{
	
	private OrgDao orgDao;

	public OrgDao getOrgDao() {
		return orgDao;
	}

	@Autowired
	public void setOrgDao(OrgDao orgDao) {
		this.orgDao = orgDao;
	}


	@Transactional
	public List<Org> readAllBySystemId(Long entityId){
		
		return getOrgDao().readAllBySystemId(entityId);
		
	} 

	@Transactional
	public List<Org> getOrgByProductLineId(Long productLineId) throws Exception{
		
		return getOrgDao().getOrgByProductLineId(productLineId);
		
	}
	

}
