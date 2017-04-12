package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.WiAocField;

/**
 * @author Vishal
 *
 */
public interface WiAocFieldDao extends GenericDao<WiAocField, Long> {
	
	public Map getEntitiesByWiId(Long entityId);

	public Boolean saveFileData(String entityId, String directoryPath, String fileName);

}
