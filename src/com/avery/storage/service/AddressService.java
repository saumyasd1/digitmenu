package com.avery.storage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.AddressDao;
import com.avery.storage.entities.Address;
import com.avery.storage.entities.User;

@Component
public class AddressService extends GenericEntityService<Address, Long>{
	private AddressDao addressDao;

	public AddressDao getAddressDao() {
		return addressDao;
	}

	@Autowired
	public void setAddressDao(AddressDao addressDao) {
		this.addressDao = addressDao;
	}

	@Transactional
	public List<Address> getAddress(String siteId) {
		return getAddressDao().getAddress(siteId);
	}

	@Transactional
	public Boolean checkDuplicateSiteId(Address addrObj){
		return getAddressDao().checkDuplicateSiteId(addrObj);
	}
	
	@Transactional
	public Boolean checkDuplicateAddress(String billToSiteNumber, String shipToSiteNumber, Boolean billType, Boolean shipType, String siteId, String billToAddress, String billToAddress2, String billToAddress3, String shipToAddress, String shipToAddress2, String shipToAddress3){
		return getAddressDao().checkDuplicateAddress(billToSiteNumber, shipToSiteNumber, billType, shipType, siteId, billToAddress, billToAddress2, billToAddress3, shipToAddress, shipToAddress2, shipToAddress3);
	}
}
