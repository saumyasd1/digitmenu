package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.ProductLine;

public interface OrderLineDao extends GenericDao<OrderLine, Long>{
	
	public List<OrderLine> readAllByOrderID(Long orderID);

}
