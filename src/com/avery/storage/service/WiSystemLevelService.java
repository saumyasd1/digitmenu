package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiSystemLevelDao;
import com.avery.storage.entities.WiSystemLevel;

/**
 * @author Vishal
 *
 */
@Component
public class WiSystemLevelService extends GenericEntityService<WiSystemLevel, Long> {

	private WiSystemLevelDao wiSystemLevelDao;

	public WiSystemLevelDao getWiSystemLevelDao() {
		return wiSystemLevelDao;
	}

	@Autowired
	public void setWiSystemLevelDao(WiSystemLevelDao wiSystemLevelDao) {
		this.wiSystemLevelDao = wiSystemLevelDao;
	}

	@Transactional
	public Map getEntitiesByWiId(Long entityId) {
		// TODO Auto-generated method stub
		return getWiSystemLevelDao().getEntitiesByWiId(entityId);
	}

	@Transactional
	public boolean saveFileData(String entityId, String wiId, String filePath, String fileName) {
		return getWiSystemLevelDao().saveFileData(entityId, wiId, filePath, fileName);
	}

}
