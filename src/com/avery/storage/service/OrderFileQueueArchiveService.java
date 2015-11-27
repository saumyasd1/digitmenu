package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.OrderFileQueueArchiveDao;
import com.avery.storage.entities.OrderFileQueueArchive;

@Component
public class OrderFileQueueArchiveService extends GenericEntityService<OrderFileQueueArchive, Long>{
	
	private OrderFileQueueArchiveDao orderFileQueueArchiveDao;

	public OrderFileQueueArchiveDao getOrderFileQueueArchiveDao() {
		return orderFileQueueArchiveDao;
	}

	@Autowired
	public void setOrderFileQueueArchiveDao(OrderFileQueueArchiveDao orderFileQueueArchiveDao) {
		this.orderFileQueueArchiveDao = orderFileQueueArchiveDao;
	}

}
