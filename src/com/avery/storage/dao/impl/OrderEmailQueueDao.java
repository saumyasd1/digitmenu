package com.avery.storage.dao.impl;

import java.util.Date;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderEmailQueue;

public interface OrderEmailQueueDao extends GenericDao<OrderEmailQueue, Long>{
	
	public Map getUnidentifiedEntities(MultivaluedMap queryMap) throws Exception;
	
	public void cancelEmail(String data, Long entityId);

	public void disregardEmail(String data, Long entityId);
	
	public void identifyEmail(String data, Long entityId);
	
	public void assignCsrValue(Long entityId, String csrId);
	
	public void updateAcknowledgementDate(Long entityId, Date acknowledgementDate);

}
