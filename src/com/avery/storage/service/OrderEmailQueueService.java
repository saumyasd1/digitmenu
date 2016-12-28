package com.avery.storage.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderEmailQueueDao;
import com.avery.storage.entities.OrderEmailQueue;

@Component
public class OrderEmailQueueService extends GenericEntityService<OrderEmailQueue, Long>{
	
	private OrderEmailQueueDao orderEmailQueueDao;
	
	
	public OrderEmailQueueDao getOrderEmailQueueDao() {
		return orderEmailQueueDao;
	}


	@Autowired
	public void setOrderEmailQueueDao(OrderEmailQueueDao orderEmailQueueDao) {
		this.orderEmailQueueDao = orderEmailQueueDao;
	}


	@Transactional
	public Map getWithUnidentifiedStatus(){
		return getOrderEmailQueueDao().getUnidentifiedEntities();
	}
	
	@Transactional
	public void cancelEmail(String data,Long entityId){
		getOrderEmailQueueDao().cancelEmail(data,entityId);
	}

	@Transactional
	public void disregardEmail(String data,Long entityId){
		getOrderEmailQueueDao().disregardEmail(data,entityId);
	}
}
