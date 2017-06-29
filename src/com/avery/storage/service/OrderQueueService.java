package com.avery.storage.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.core.MultivaluedMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderQueueDao;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.SalesOrder;

@Component
public class OrderQueueService extends GenericEntityService<OrderQueue, Long>{
	
	private OrderQueueDao orderQueueDao;

	public OrderQueueDao getOrderQueueDao() {
		return orderQueueDao;
	}

	@Autowired
	public void setOrderQueueDao(OrderQueueDao orderQueueDao) {
		this.orderQueueDao = orderQueueDao;
	}
	
	@Transactional
	public void submitOrderToSystem(String data,Long entityId){
		getOrderQueueDao().submitOrderToSystem(data,entityId);
	}
	
	@Transactional
	public void cancelOrder(String data,Long entityId) throws Exception{
		getOrderQueueDao().cancelOrder(data,entityId);
	}
	
	@Transactional
	public Set<OrderQueue> getList(int lastDays,Set<String> status,MultivaluedMap<String, String> queryParamMap)throws Exception{
		return getOrderQueueDao().getList(lastDays,status,queryParamMap);
	}
		
	@Transactional
	public List<OrderQueue> getAllEntitiesListWithCriteria(MultivaluedMap queryMap) throws Exception{
			return getOrderQueueDao().getAllEntitiesListWithCriteria(queryMap);
	}
		
	@Transactional
	public List getAllEntitiesListForDailyReport(MultivaluedMap queryMap) throws Exception{
		return getOrderQueueDao().getAllEntitiesListForDailyReport(queryMap);
	}
	
	@Transactional
	public List getAllEntitiesListForOpenReport(MultivaluedMap queryMap) throws Exception{
		return 	getOrderQueueDao().getAllEntitiesListForOpenReport(queryMap);
	}
	
	@Transactional
	public Map viewOrdersByEmailQueueId(int emailQueueId){
		return getOrderQueueDao().getViewOrdersByEmailId(emailQueueId);
	}
	
	@Transactional
	public void identifyEmail(String data,Long entityId){
		getOrderQueueDao().identifyEmail(data,entityId);
	}
	
	@Transactional
	public Map getAllEntities(){
		return getOrderQueueDao().getAllEntitiesList();
	}
	
	
	//Method added for getting mailbody path for downloading
	@Transactional
	public String getMailBodyFilePathByTrackId(long trackid){
		return getOrderQueueDao().getMailBodyPath(trackid);
	}
	
	//Method for getting order file path to be downloaded
	@Transactional
	public String getOrderFilePathByOrderFileQueueId(long orderFileQueueId){
		return getOrderQueueDao().getOrderFilePath(orderFileQueueId);
	}
	
	//Method for getting order file count (@Saumya)
	@Transactional
	public int getAdditionalFileCount(Long orderQueueId){
		return getOrderQueueDao().getAdditionalFileCount(orderQueueId);
	}
	
}
