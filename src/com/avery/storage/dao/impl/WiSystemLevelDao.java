package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.WiSystemLevel;

/**
 * @author Vishal
 *
 */
public interface WiSystemLevelDao extends GenericDao<WiSystemLevel, Long> {

	public Map getEntitiesByWiId(Long entityId);

	public boolean saveFileData(String entityId, String wiId, String filePath, String fileName);
}
