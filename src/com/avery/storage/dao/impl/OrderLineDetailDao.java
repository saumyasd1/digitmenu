package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderLineDetail;

public interface OrderLineDetailDao extends GenericDao<OrderLineDetail, Long>{
	
	public List<OrderLineDetail> readAllVariableByOrderID(Long orderID);
	
	public List<OrderLineDetail> readByVariableName(Long orderID,String variablfieldename);
	

}
