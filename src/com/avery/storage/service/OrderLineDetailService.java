package com.avery.storage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderLineDetailDao;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderLineDetail;

@Component
public class OrderLineDetailService extends GenericEntityService<OrderLineDetail, Long>{
	
	private OrderLineDetailDao orderLineDetailDao;

	public OrderLineDetailDao getOrderLineDetailDao() {
		return orderLineDetailDao;
	}

	@Autowired
	public void setOrderLineDetailDao(OrderLineDetailDao orderLineDetailDao) {
		this.orderLineDetailDao = orderLineDetailDao;
	}


	@Transactional
	public List<OrderLineDetail> readAllVariableByOrderID(Long entityId){
		
		return getOrderLineDetailDao().readAllVariableByOrderID(entityId);
		
	} 
	@Transactional
	public List<OrderLineDetail> readAllByOrderID(Long entityId){
		
		return getOrderLineDetailDao().readAllByOrderID(entityId);
		
	} 
	
	@Transactional
	public Map readByVariableName(Long entityId,String variablfieldename){
		
		return getOrderLineDetailDao().readByVariableName(entityId,variablfieldename);
	}

	@Transactional
	public void bulkUpdate(String jsonData) {
		getOrderLineDetailDao().bulkUpdate(jsonData);
		
	}

	@Transactional
	public void bulkUpdateAll(String jsonData, Long orderQueueId,String variableName) {
		 getOrderLineDetailDao().bulkUpdateAllById(jsonData,orderQueueId,variableName);
		
	}


}
