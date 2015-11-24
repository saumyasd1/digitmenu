package com.avery.storage.dao.impl;

import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Partner;

public interface PartnerDao extends GenericDao<Partner, Long>{
	
	public Boolean checkDuplicatePartnerName(String partnerName) throws Exception;

}
