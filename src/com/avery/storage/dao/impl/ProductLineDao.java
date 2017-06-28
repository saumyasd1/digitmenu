package com.avery.storage.dao.impl;

import java.util.List;
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
	
	public List getAllDistantPartners(MultivaluedMap queryMap) throws Exception;
	
	public List getAllRBOByPartner(int partnerId) throws Exception;
	
	public List getAllProductLineByRBO(int partnerId,int rbo) throws Exception;
	
	public List getRelatedDataStructures(Long partnerId,Long rbo) throws Exception;
	
	public Map getDataStructureListBasedOnAttachmentId(Long fileAttachmentId) throws Exception;

	Map getRboListById(String partnerId) throws Exception;
}
