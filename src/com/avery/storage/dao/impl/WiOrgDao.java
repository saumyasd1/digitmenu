package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.WiOrg;

/**
 * @author Vishal
 *
 */
public interface WiOrgDao extends GenericDao<WiOrg, Long> {

	public Map getEntitiesByWiId(Long entityId);

}
