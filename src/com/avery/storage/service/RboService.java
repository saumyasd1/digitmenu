package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.RBODao;
import com.avery.storage.entities.RBO;

/**
 * @author Vishal
 *
 */
@Component
public class RboService extends GenericEntityService<RBO, Long> {
	
	private RBODao rboDao;
	
	public RBODao getRboDao() {
		return rboDao;
	}

	@Autowired
	public void setRboDao(RBODao rboDao) {
		this.rboDao = rboDao;
	}

	@Transactional
	public Map getRboByPartnerId(Long partnerId) {
		return getRboDao().getRboByPartnerId(partnerId);
	}

}
