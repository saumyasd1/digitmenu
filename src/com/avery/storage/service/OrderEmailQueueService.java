package com.avery.storage.service;

import java.util.Date;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.core.MultivaluedMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderEmailQueueDao;
import com.avery.storage.entities.OrderEmailQueue;

/**
 * @author Vishal
 *
 */
@Component
public class OrderEmailQueueService extends GenericEntityService<OrderEmailQueue, Long> {

	private OrderEmailQueueDao orderEmailQueueDao;

	public OrderEmailQueueDao getOrderEmailQueueDao() {
		return orderEmailQueueDao;
	}

	@Autowired
	public void setOrderEmailQueueDao(OrderEmailQueueDao orderEmailQueueDao) {
		this.orderEmailQueueDao = orderEmailQueueDao;
	}

	@Transactional
	public Map getWithUnidentifiedStatus(MultivaluedMap queryMap) throws Exception {
		return getOrderEmailQueueDao().getUnidentifiedEntities(queryMap);
	}

	@Transactional
	public void cancelEmail(String data, Long entityId) {
		getOrderEmailQueueDao().cancelEmail(data, entityId);
	}

	@Transactional
	public void disregardEmail(String data, Long entityId) {
		getOrderEmailQueueDao().disregardEmail(data, entityId);
	}

	@Transactional
	public void identifyEmail(String data, Long entityId) {
		getOrderEmailQueueDao().identifyEmail(data, entityId);
	}

	@Transactional
	public void assignCsrByEmailQueueId(Long entityId, String csrId, String userId, boolean changeStatus, String lastModifiedBy) {
		getOrderEmailQueueDao().assignCsrValue(entityId, csrId, userId, changeStatus, lastModifiedBy);
	}

	@Transactional
	public void updateAcknowledgementDate(Long entityId, Date acknowledgementDate) {
		getOrderEmailQueueDao().updateAcknowledgementDate(entityId, acknowledgementDate);
	}

	@Transactional
	public Set<OrderEmailQueue> getList(int lastDays, Set<String> status, MultivaluedMap<String, String> queryParamMap)
			throws Exception {
		return getOrderEmailQueueDao().getList(lastDays, status, queryParamMap);
	}
}
