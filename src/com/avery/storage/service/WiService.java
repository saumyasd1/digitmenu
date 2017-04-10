package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiDao;
import com.avery.storage.entities.Wi;

/**
 * @author Vishal
 *
 */
@Component
public class WiService extends GenericEntityService<Wi, Long> {

	private WiDao wiDao;

	public WiDao getWiDao() {
		return wiDao;
	}

	@Autowired
	public void setWiDao(WiDao wiDao) {
		this.wiDao = wiDao;
	}

	@Transactional
	public Wi create(String wiData) throws Exception {
		return getWiDao().create(wiData);
	}
	
	@Transactional
	public Map getDataForViewForm(Long entityId){
		return getWiDao().getDataForViewForm(entityId);
	}

	@Transactional
	public Long update(String data) throws Exception {
		// TODO Auto-generated method stub
		return getWiDao().update(data);
	}

}
