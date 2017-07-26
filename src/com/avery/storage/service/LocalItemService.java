package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.LocalItemDao;
import com.avery.storage.entities.LocalItem;

/**
 * @author Vishal
 *
 */
@Component
public class LocalItemService extends GenericEntityService<LocalItem, Long> {
	
	private LocalItemDao localItemDao;

	public LocalItemDao getLocalItemDao() {
		return localItemDao;
	}

	@Autowired
	public void setLocalItemDao(LocalItemDao localItemDao) {
		this.localItemDao = localItemDao;
	}
	
	@Transactional
	public void deleteRecords(String recordId) {
		getLocalItemDao().deleteRecords(recordId);
	}
}
