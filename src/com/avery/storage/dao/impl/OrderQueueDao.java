package com.avery.storage.dao.impl;

import java.util.Set;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderQueue;

public interface OrderQueueDao extends GenericDao<OrderQueue, Long>{
	
	public void submitOrderToSystem(String data,Long entityId);
	
	public void cancelOrder(String data, Long entityId);
	
	Set<OrderQueue> getList(int lastDays)throws Exception;

}
