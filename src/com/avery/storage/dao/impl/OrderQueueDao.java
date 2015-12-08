package com.avery.storage.dao.impl;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderQueue;

public interface OrderQueueDao extends GenericDao<OrderQueue, Long>{
	
	public void submitOrderToSystem(String data,Long entityId);
	
	public void cancelOrder(String data, Long entityId);

}
