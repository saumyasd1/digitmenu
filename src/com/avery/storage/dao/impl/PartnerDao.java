package com.avery.storage.dao.impl;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Partner;

public interface PartnerDao extends GenericDao<Partner, Long>{
	
	public Boolean checkDuplicatePartnerName(Partner partnerName) throws Exception;


}
