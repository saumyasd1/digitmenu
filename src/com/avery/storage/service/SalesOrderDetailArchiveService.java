package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.SalesOrderDetailArchiveDao;
import com.avery.storage.entities.SalesOrderDetailArchive;

@Component
public class SalesOrderDetailArchiveService extends GenericEntityService<SalesOrderDetailArchive, Long>{
	
	private SalesOrderDetailArchiveDao salesOrderDetailArchiveDao;

	public SalesOrderDetailArchiveDao getSalesOrderDetailArchiveDao() {
		return salesOrderDetailArchiveDao;
	}

	@Autowired
	public void setSalesOrderDetailArchiveDao(SalesOrderDetailArchiveDao salesOrderDetailArchiveDao) {
		this.salesOrderDetailArchiveDao = salesOrderDetailArchiveDao;
	}

}
