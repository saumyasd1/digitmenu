package com.avery.storage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.SalesOrderDetailDao;
import com.avery.storage.entities.SalesOrderDetail;

@Component
public class SalesOrderDetailService extends GenericEntityService<SalesOrderDetail, Long>{
	
	private SalesOrderDetailDao salesOrderDetailDao;

	public SalesOrderDetailDao getSalesOrderDetailDao() {
		return salesOrderDetailDao;
	}

	@Autowired
	public void setSalesOrderDetailDao(SalesOrderDetailDao salesOrderDetailDao) {
		this.salesOrderDetailDao = salesOrderDetailDao;
	}


	@Transactional
	public List<SalesOrderDetail> readAllVariableByOrderID(Long entityId){
		
		return getSalesOrderDetailDao().readAllVariableByOrderID(entityId);
		
	} 
	
	public Map readByVariableName(Long entityId,String variablfieldename){
		
		return getSalesOrderDetailDao().readByVariableName(entityId,variablfieldename);
	}


}
