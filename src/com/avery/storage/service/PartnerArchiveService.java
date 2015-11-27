package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.PartnerArchiveDao;
import com.avery.storage.entities.PartnerArchive;

@Component
public class PartnerArchiveService extends GenericEntityService<PartnerArchive, Long>{
	
	private PartnerArchiveDao partnerArchiveDao;

	public PartnerArchiveDao getPartnerArchiveDao() {
		return partnerArchiveDao;
	}

	@Autowired
	public void setOrderLineArchiveDao(PartnerArchiveDao partnerArchiveDao) {
		this.partnerArchiveDao = partnerArchiveDao;
	}

}
