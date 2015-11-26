package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.SalesOrder;

public interface SalesOrderDao extends GenericDao<SalesOrder, Long>{
	
	public List<SalesOrder> readAllByOrderID(Long orderID);

}
