package com.avery.storage.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderQueueDao;
import com.avery.storage.entities.OrderQueue;

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
	
	@Transactional
	public Set<OrderQueue> getList(int lastDays,Set<String> status)throws Exception{
		return getOrderQueueDao().getList(lastDays,status);
	}
}
