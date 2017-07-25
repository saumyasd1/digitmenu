package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderLine;

public interface OrderLineDao extends GenericDao<OrderLine, Long>{
	
	public List<OrderLine> readAllByOrderID(Long orderID);
	public void bulkUpdate(String jsonData,Map<String,Boolean> insertAddress, Long orderQueueId, String partnerId, String systemId, String siteId, String orgCodeId, String lastModifiedBy);
	public void bulkUpdateAllById(String jsonData,Map<String,Boolean> insertAddress,Long orderQueueId, String partnerId, String systemId, String siteId, String orgCodeId, String lastModifiedBy);
}
