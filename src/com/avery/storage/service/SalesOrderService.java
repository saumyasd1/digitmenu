package com.avery.storage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.SalesOrderDao;
import com.avery.storage.entities.SalesOrder;

@Component
public class SalesOrderService extends GenericEntityService<SalesOrder, Long>{
	
	private SalesOrderDao salesOrderDao;

	public SalesOrderDao getSalesOrderDao() {
		return salesOrderDao;
	}

	@Autowired
	public void setSalesOrderDao(SalesOrderDao salesOrderDao) {
		this.salesOrderDao = salesOrderDao;
	}



	@Transactional
	public List<SalesOrder> readAllByOrderID(Long entityId){
		
		return getSalesOrderDao().readAllByOrderID(entityId);
		
	}

	@Transactional
	public void bulkUpdate(String jsonData) {
		getSalesOrderDao().bulkUpdate(jsonData);
		
	}

	@Transactional
	public void bulkUpdateAll(String jsonData,Long orderQueueId){
		getSalesOrderDao().bulkUpdateAllById(jsonData,orderQueueId);
		
	}
	
	@Transactional
	public int getCountByOrderID(Long orderID){
		return getSalesOrderDao().getCountByOrderID(orderID);
		
	}
}
