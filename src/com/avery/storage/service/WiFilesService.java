package com.avery.storage.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiFilesDao;
import com.avery.storage.entities.WiFiles;

/**
 * @author Vishal
 *
 */
@Component
public class WiFilesService extends GenericEntityService<WiFiles, Long> {

	private WiFilesDao wiFilesDao;

	public WiFilesDao getWiFilesDao() {
		return wiFilesDao;
	}

	@Autowired

	public void setWiFilesDao(WiFilesDao wiFilesDao) {
		this.wiFilesDao = wiFilesDao;
	}

	@Transactional
	public List getFilesListByWiId(long wiId) {
		return getWiFilesDao().getFilesListByWiId(wiId);
	}

}
