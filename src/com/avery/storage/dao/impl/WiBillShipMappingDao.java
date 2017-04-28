package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.WiBillShipMapping;

/**
 * @author Vishal
 *
 */
public interface WiBillShipMappingDao extends GenericDao<WiBillShipMapping, Long> {

	public Map getEntitiesByWiId(Long entityId);

}
