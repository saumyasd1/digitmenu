package com.avery.storage.dao.impl;

import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.ProductLine;

public interface ProductLineDao extends GenericDao<ProductLine, Long>{
	
	public Map readAllByPartnerID(MultivaluedMap queryMap) throws Exception;

	public Boolean checkDuplicateValues(ProductLine productLine) throws Exception;
	
	public ProductLine create(String productLineData);
	
	public ProductLine read(Long id) ;

	public ProductLine update(String productLineData,Long id) throws Exception;
}
