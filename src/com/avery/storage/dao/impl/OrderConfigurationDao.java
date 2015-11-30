package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderConfiguration;

public interface OrderConfigurationDao extends GenericDao<OrderConfiguration, Long> {
	
	public List<OrderConfiguration> readByPropertyName(String propertyName) throws Exception;

}