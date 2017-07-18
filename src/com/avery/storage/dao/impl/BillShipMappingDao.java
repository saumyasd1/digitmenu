package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.BillShipMapping;

/**
 * @author Vishal
 *
 */
public interface BillShipMappingDao extends GenericDao<BillShipMapping, Long> {

	public List<BillShipMapping> getEntitiesByProductlineId(Long productlineId);

}
