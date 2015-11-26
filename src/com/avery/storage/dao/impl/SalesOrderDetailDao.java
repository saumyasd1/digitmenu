package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.SalesOrderDetail;

public interface SalesOrderDetailDao extends GenericDao<SalesOrderDetail, Long>{
	
	public List<SalesOrderDetail> readAllVariableByOrderID(Long orderID);
	
	public List<SalesOrderDetail> readByVariableName(Long orderID,String variablfieldename);

}
