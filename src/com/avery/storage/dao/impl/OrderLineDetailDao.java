package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderLineDetail;

public interface OrderLineDetailDao extends GenericDao<OrderLineDetail, Long>{
	
	public List<OrderLineDetail> readAllVariableByOrderID(Long orderID);
	
	public Map readByVariableName(Long orderID,String variablfieldename);
	

}
