package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiOrgDao;
import com.avery.storage.entities.WiOrg;

/**
 * @author Vishal
 *
 */
@Component
public class WiOrgService extends GenericEntityService<WiOrg, Long> {
	
	private WiOrgDao wiOrgDao;

	public WiOrgDao getWiOrgDao() {
		return wiOrgDao;
	}

	@Autowired
	public void setWiOrgDao(WiOrgDao wiOrgDao) {
		this.wiOrgDao = wiOrgDao;
	}
	
	@Transactional
	public Map getEntitiesByWiId(Long entityId){
		return getWiOrgDao().getEntitiesByWiId(entityId);
	}

}
