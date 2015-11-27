package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.OrderLineArchiveDao;
import com.avery.storage.entities.OrderLineArchive;

@Component
public class OrderLineArchiveService extends GenericEntityService<OrderLineArchive, Long>{
	
	private OrderLineArchiveDao orderLineArchiveDao;

	public OrderLineArchiveDao getOrderLineArchiveDao() {
		return orderLineArchiveDao;
	}

	@Autowired
	public void setOrderLineArchiveDao(OrderLineArchiveDao orderLineArchiveDao) {
		this.orderLineArchiveDao = orderLineArchiveDao;
	}

}
