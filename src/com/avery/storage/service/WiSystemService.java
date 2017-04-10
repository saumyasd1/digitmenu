package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.WiSystemDao;
import com.avery.storage.entities.WiSystem;

/**
 * @author Vishal
 *
 */
@Component
public class WiSystemService extends GenericEntityService<WiSystem, Long> {

	private WiSystemDao wiSystemDao;
	
	public WiSystemDao getWiSystemDao() {
		return wiSystemDao;
	}

	@Autowired
	public void setWiSystemDao(WiSystemDao wiSystemDao) {
		this.wiSystemDao = wiSystemDao;
	}

	@Transactional
	public Map  getEntitiesByWiId(Long entityId) {
		// TODO Auto-generated method stub
		return getWiSystemDao().getEntitiesByWiId(entityId);
	}

}
