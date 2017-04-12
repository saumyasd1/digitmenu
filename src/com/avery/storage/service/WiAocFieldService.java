package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiAocFieldDao;
import com.avery.storage.entities.WiAocField;

/**
 * @author Vishal
 *
 */
@Component
public class WiAocFieldService extends GenericEntityService<WiAocField, Long> {
	
	private WiAocFieldDao wiAocFieldDao;
	
	public WiAocFieldDao getWiAocFieldDao() {
		return wiAocFieldDao;
	}

	@Autowired
	public void setWiAocFieldDao(WiAocFieldDao wiAocFieldDao) {
		this.wiAocFieldDao = wiAocFieldDao;
	}

	@Transactional
	public Map getEntitiesByWiId(Long entityId){
		return getWiAocFieldDao().getEntitiesByWiId(entityId);
	}

	@Transactional
	public Boolean saveFileData(String entityId, String directoryPath, String fileName) {
		return getWiAocFieldDao().saveFileData(entityId, directoryPath, fileName);
	}

}
