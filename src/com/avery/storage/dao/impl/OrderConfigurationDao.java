package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderConfiguration;

public interface OrderConfigurationDao extends GenericDao<OrderConfiguration, Long> {
	
	public List<OrderConfiguration> readByPropertyName(String propertyName) throws Exception;
	public List<OrderConfiguration> readByPropertyName(String propertyName, Long systemId, Long orgCodeId) throws Exception;

}