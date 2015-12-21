package com.avery.storage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderLineDao;
import com.avery.storage.entities.OrderLine;

@Component
public class OrderLineService extends GenericEntityService<OrderLine, Long>{
	
	private OrderLineDao orderLineDao;

	public OrderLineDao getOrderLineDao() {
		return orderLineDao;
	}

	@Autowired
	public void setOrderLineDao(OrderLineDao orderLineDao) {
		this.orderLineDao = orderLineDao;
	}


	@Transactional
	public List<OrderLine> readAllByOrderID(Long entityId){
		
		return getOrderLineDao().readAllByOrderID(entityId);
		
	} 
	
	@Transactional
	public void bulkUpdate(String jsonData,Map<String,Boolean> flagMap){
		
		getOrderLineDao().bulkUpdate(jsonData, flagMap);
		
	}
	
	@Transactional
	public void bulkUpdateAll(String jsonData,Map<String,Boolean> flagMap,Long orderQueueId){
		
		getOrderLineDao().bulkUpdateAllById(jsonData,flagMap,orderQueueId);
		
	}

}
