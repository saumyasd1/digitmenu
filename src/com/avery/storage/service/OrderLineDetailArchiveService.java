package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.OrderLineDetailArchiveDao;
import com.avery.storage.entities.OrderLineDetailArchive;

@Component
public class OrderLineDetailArchiveService extends GenericEntityService<OrderLineDetailArchive, Long>{
	
	private OrderLineDetailArchiveDao orderLineDetailArchiveDao;

	public OrderLineDetailArchiveDao getOrderLineDetailArchiveDao() {
		return orderLineDetailArchiveDao;
	}

	@Autowired
	public void setOrderLineDetailArchiveDao(OrderLineDetailArchiveDao orderLineDetailArchiveDao) {
		this.orderLineDetailArchiveDao = orderLineDetailArchiveDao;
	}

}
