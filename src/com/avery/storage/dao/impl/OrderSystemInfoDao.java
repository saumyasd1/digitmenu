package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderSystemInfo;

/**
 * @author Vishal
 *
 */
public interface OrderSystemInfoDao extends GenericDao<OrderSystemInfo, Long> {

	public Map getByProductlineId(long productlineId);
	
}
