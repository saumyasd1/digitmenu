package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.PartnerDao;
import com.avery.storage.entities.Partner;



@Component
public class PartnerService extends GenericEntityService<Partner, Long>{
	
	private PartnerDao partnerDao;

	public PartnerDao getPartnerDao() {
		return partnerDao;
	}

	@Autowired
	public void setPartnerDao(PartnerDao partnerDao) {
		this.partnerDao = partnerDao;
	}
	
	@Transactional
	public Boolean checkDuplicatePartnerName(Partner partnerName) throws Exception {
		return partnerDao.checkDuplicatePartnerName(partnerName);
	}


}
