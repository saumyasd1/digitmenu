package com.avery.storage.dao.impl;

import java.util.Date;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.core.MultivaluedMap;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderEmailQueue;

/**
 * @author Vishal
 *
 */
public interface OrderEmailQueueDao extends GenericDao<OrderEmailQueue, Long> {

	public Map getUnidentifiedEntities(MultivaluedMap queryMap) throws Exception;

	public void cancelEmail(String data, Long entityId);

	public void disregardEmail(String data, Long entityId);

	public void identifyEmail(String data, Long entityId);

	public void assignCsrValue(Long entityId, String csrId, String userId, boolean changeStatus, String lastModifiedBy);

	public void updateAcknowledgementDate(Long entityId, Date acknowledgementDate);

	Set<OrderEmailQueue> getList(int lastDays, Set<String> status, MultivaluedMap<String, String> queryParamMap)
			throws Exception;

}
