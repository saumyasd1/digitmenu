package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.ProductLine;

public interface ProductLineDao extends GenericDao<ProductLine, Long>{
	
	public Map readAllByPartnerID(MultivaluedMap queryMap) throws Exception;

	public Boolean checkDuplicateValues(ProductLine productLine) throws Exception;

}
