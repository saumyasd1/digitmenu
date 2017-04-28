package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiBillShipMappingDao;
import com.avery.storage.entities.WiBillShipMapping;

/**
 * @author Vishal
 *
 */
@Component
public class WiBillShipMappingService extends GenericEntityService<WiBillShipMapping, Long> {

	private WiBillShipMappingDao wiBillShipMappingDao;

	public WiBillShipMappingDao getWiBillShipMappingDao() {
		return wiBillShipMappingDao;
	}

	@Autowired
	public void setWiBillShipMappingDao(WiBillShipMappingDao wiBillShipMappingDao) {
		this.wiBillShipMappingDao = wiBillShipMappingDao;
	}

	@Transactional
	public Map getEntitiesByWiId(Long entityId) {
		return getWiBillShipMappingDao().getEntitiesByWiId(entityId);
	}
	
}
