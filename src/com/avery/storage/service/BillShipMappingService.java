package com.avery.storage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.BillShipMappingDao;
import com.avery.storage.entities.BillShipMapping;

/**
 * @author Vishal
 *
 */
@Component
public class BillShipMappingService extends GenericEntityService<BillShipMapping, Long> {

	private BillShipMappingDao billShipMappingDao;

	public BillShipMappingDao getBillShipMappingDao() {
		return billShipMappingDao;
	}

	@Autowired
	public void setBillShipMappingDao(BillShipMappingDao billShipMappingDao) {
		this.billShipMappingDao = billShipMappingDao;
	}

	@Transactional
	public List<BillShipMapping> getEntitiesByProductlineId(Long productlineId) {
		return getBillShipMappingDao().getEntitiesByProductlineId(productlineId);
	}
	
}
