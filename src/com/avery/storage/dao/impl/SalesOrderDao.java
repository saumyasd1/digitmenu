package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.SalesOrder;

public interface SalesOrderDao extends GenericDao<SalesOrder, Long>{
	
	public List<SalesOrder> readAllByOrderID(Long orderID);

	public void bulkUpdate(String data);

	public void bulkUpdateAllById(String jsonData, Long orderQueueId);
	
	public int getCountByOrderID(Long orderID);

}
