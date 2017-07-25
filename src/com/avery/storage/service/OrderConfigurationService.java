package com.avery.storage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderConfigurationDao;
import com.avery.storage.entities.OrderConfiguration;



@Component
public class OrderConfigurationService extends GenericEntityService<OrderConfiguration, Long>{
	
	private OrderConfigurationDao orderConfigurationDao;

	public OrderConfigurationDao getOrderConfigurationDao() {
		return orderConfigurationDao;
	}

	@Autowired
	public void setOrderConfigurationDao(OrderConfigurationDao orderConfigurationDao) {
		this.orderConfigurationDao = orderConfigurationDao;
	}

	@Transactional
	public List<OrderConfiguration> readByPropertyName(String propertyName) throws Exception {
		return orderConfigurationDao.readByPropertyName(propertyName);
	}
	@Transactional
	public List<OrderConfiguration> readByPropertyName(String propertyName, Long SystemId,Long OrgCodeId) throws Exception {
		return orderConfigurationDao.readByPropertyName(propertyName,SystemId,OrgCodeId);
	}

	@Transactional
	public OrderConfiguration readByPropertyNameSystemIdOrgCodeId(String propertyName, Long SystemId,Long OrgCodeId) throws Exception {
		return orderConfigurationDao.readByPropertyNameSystemIdOrgCodeId(propertyName,SystemId,OrgCodeId);
	}
}
