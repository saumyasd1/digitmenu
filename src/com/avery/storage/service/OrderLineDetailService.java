package com.avery.storage.service;

import java.util.List;

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
	
	public List<OrderLineDetail> readByVariableName(Long entityId,String variablfieldename){
		
		return getOrderLineDetailDao().readByVariableName(entityId,variablfieldename);
	}


}
