package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Address;

public interface AddressDao extends GenericDao<Address, Long>{

	List<Address> getAddress(String siteId);
	
}
