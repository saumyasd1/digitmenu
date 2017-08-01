package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Address;

public interface AddressDao extends GenericDao<Address, Long>{

	List<Address> getAddress(String siteId);
	Boolean checkDuplicateSiteId(Address addrObj);
	Boolean checkDuplicateAddress(String billToSiteNumber,String shipToSiteNumber, Boolean billType, Boolean shipType, String siteId, String billToAddress, String billToAddress2, String billToAddress3, String shipToAddress, String shipToAddress2, String shipToAddress3);
	
}
