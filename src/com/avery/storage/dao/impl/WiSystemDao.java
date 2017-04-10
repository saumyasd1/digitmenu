package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.WiSystem;

/**
 * @author Vishal
 *
 */
public interface WiSystemDao extends GenericDao<WiSystem, Long> {

	public Map getEntitiesByWiId(Long entityId);

}
