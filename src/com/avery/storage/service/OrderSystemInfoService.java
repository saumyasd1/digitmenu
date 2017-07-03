package com.avery.storage.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.OrderSystemInfoDao;
import com.avery.storage.entities.OrderSystemInfo;

/**
 * @author Vishal
 *
 */
@Component
public class OrderSystemInfoService extends GenericEntityService<OrderSystemInfo, Long> {

	private OrderSystemInfoDao orderSystemInfoDao;

	public OrderSystemInfoDao getOrderSystemInfoDao() {
		return orderSystemInfoDao;
	}

	@Autowired
	public void setOrderSystemInfoDao(OrderSystemInfoDao orderSystemInfoDao) {
		this.orderSystemInfoDao = orderSystemInfoDao;
	}
	
	@Transactional
	public Map getByProductlineId(long productlineId){
		return getOrderSystemInfoDao().getByProductlineId(productlineId);
	}

}
