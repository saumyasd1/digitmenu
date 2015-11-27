package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.SalesOrderArchiveDao;
import com.avery.storage.entities.SalesOrderArchive;

@Component
public class SalesOrderArchiveService extends GenericEntityService<SalesOrderArchive, Long>{
	
	private SalesOrderArchiveDao salesOrderArchiveDao;

	public SalesOrderArchiveDao getSalesOrderArchiveDao() {
		return salesOrderArchiveDao;
	}

	@Autowired
	public void setOrderFileQueueArchiveDao(SalesOrderArchiveDao salesOrderArchiveDao) {
		this.salesOrderArchiveDao = salesOrderArchiveDao;
	}

}
