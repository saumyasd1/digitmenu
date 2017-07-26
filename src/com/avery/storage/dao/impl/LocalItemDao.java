package com.avery.storage.dao.impl;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.LocalItem;

/**
 * @author Vishal
 *
 */
public interface LocalItemDao extends GenericDao<LocalItem, Long> {

	public void deleteRecords(String recordId);
}
