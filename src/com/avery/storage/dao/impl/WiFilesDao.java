package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.WiFiles;

/**
 * @author Vishal
 *
 */
public interface WiFilesDao extends GenericDao<WiFiles, Long> {

	public List getFilesListByWiId(long wiId);

}
