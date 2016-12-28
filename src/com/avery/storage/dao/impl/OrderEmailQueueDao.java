package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderEmailQueue;

public interface OrderEmailQueueDao extends GenericDao<OrderEmailQueue, Long>{
	
	public Map getUnidentifiedEntities();
	
	public void cancelEmail(String data, Long entityId);

	public void disregardEmail(String data, Long entityId);

}
