package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.core.MultivaluedMap;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.SalesOrder;

public interface OrderQueueDao extends GenericDao<OrderQueue, Long>{
	
	public void submitOrderToSystem(String data,Long entityId);
	
	public void cancelOrder(String data, Long entityId);
	
	Set<OrderQueue> getList(int lastDays,Set<String> status,MultivaluedMap<String, String> queryParamMap)throws Exception;
	
	public List getAllEntitiesListWithCriteria(MultivaluedMap queryMap) throws Exception;
	
	public List getAllEntitiesListForDailyReport(MultivaluedMap queryMap) throws Exception;
	
	public List getAllEntitiesListForOpenReport(MultivaluedMap queryMap) throws Exception;
	
	public void identifyEmail(String data, Long entityId);
	
	public Map getViewOrdersByEmailId(int emailQueueId);
	
	public Map getAllEntitiesList();
	
	public String getMailBodyPath(long trackid);//getting mail body path
	
	public String getOrderFilePath(long orderFileQueueId);//getting order file path

	int getAdditionalFileCount(Long orderQueueId);//getting order file count
}
