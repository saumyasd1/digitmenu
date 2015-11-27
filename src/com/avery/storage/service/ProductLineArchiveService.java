package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.ProductLineArchiveDao;
import com.avery.storage.entities.ProductLineArchive;

@Component
public class ProductLineArchiveService extends GenericEntityService<ProductLineArchive, Long>{
	
	private ProductLineArchiveDao productLineArchiveDao;

	public ProductLineArchiveDao getProductLineArchiveDao() {
		return productLineArchiveDao;
	}

	@Autowired
	public void setProductLineArchiveDao(ProductLineArchiveDao productLineArchiveDao) {
		this.productLineArchiveDao = productLineArchiveDao;
	}

}
