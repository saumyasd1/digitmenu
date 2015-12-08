package com.avery.storage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderQueueDao;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.SalesOrder;

@Component
public class OrderQueueService extends GenericEntityService<OrderQueue, Long>{
	
	private OrderQueueDao orderQueueDao;

	public OrderQueueDao getOrderQueueDao() {
		return orderQueueDao;
	}

	@Autowired
	public void setOrderQueueDao(OrderQueueDao orderQueueDao) {
		this.orderQueueDao = orderQueueDao;
	}
	
	@Transactional
	public void submitOrderToSystem(String data,Long entityId){
		getOrderQueueDao().submitOrderToSystem(data,entityId);
	}
	
	@Transactional
	public void cancelOrder(String data,Long entityId){
		getOrderQueueDao().cancelOrder(data,entityId);
	}
}
