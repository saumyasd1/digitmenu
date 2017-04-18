package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Wi;

/**
 * @author Vishal
 *
 */
public interface WiDao extends GenericDao<Wi, Long> {

	public long create(String wiData) throws Exception;

	public Map getDataForViewForm(Long entityId);

	public Long update(String data) throws Exception;

	public boolean saveFileData(String wiId, String directoryPath, String fileName, String fileType);

	public boolean submitWi(String data);
}
