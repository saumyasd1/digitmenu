package com.avery.storage.service;

import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.ProductLineDao;
import com.avery.storage.entities.ProductLine;

@Component
public class ProductLineService extends GenericEntityService<ProductLine, Long>{
	
	private ProductLineDao productLineDao;

	public ProductLineDao getProductLineDao() {
		return productLineDao;
	}

	@Autowired
	public void setProductLineDao(ProductLineDao productLineDao) {
		this.productLineDao = productLineDao;
	}

	@Transactional 
	public Map readAllByPartnerID(MultivaluedMap queryMap) throws Exception{
		
		return getProductLineDao().readAllByPartnerID( queryMap);
		
	} 
	@Transactional 
	public Boolean checkDuplicateValues(ProductLine productLine) throws Exception{
		
		return getProductLineDao().checkDuplicateValues(productLine);
		
	}
	
	@Transactional 
	public ProductLine create(String productLineData) throws Exception{
		
		return getProductLineDao().create(productLineData);
		
	}

	@Transactional
	public ProductLine read(Long id) {
		return getProductLineDao().read(id);
	}
	
	@Transactional 
	public ProductLine update(String productLineData,Long id) throws Exception{
		
		return getProductLineDao().update(productLineData,id);
		
	}
	
	@Transactional 
	public List getAllDistantPartners(MultivaluedMap queryMap) throws Exception{
		return getProductLineDao().getAllDistantPartners(queryMap);
	}
	
	@Transactional
	public List getAllRBOByPartner(int partnerId) throws Exception{
		return getProductLineDao().getAllRBOByPartner(partnerId);
	}
	
	@Transactional
	public List getAllProductLineByRBO(int partnerId,int rbo) throws Exception{
		return getProductLineDao().getAllProductLineByRBO(partnerId,rbo);
	}
	
	@Transactional
	public List getRelatedDataStructures(Long partnerId,Long rbo) throws Exception{
		return getProductLineDao().getRelatedDataStructures(partnerId,rbo);
	}
	
	@Transactional
	public Map getDataStructure(Long fileAttachmentId) throws Exception{
		return getProductLineDao().getDataStructureListBasedOnAttachmentId(fileAttachmentId);
	}
}
