package com.avery.storage.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.persistence.Query;
import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.OrgInfo;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.RBO;
import com.avery.storage.entities.SystemInfo;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

@Repository
public class ProductLineDaoImpl extends GenericDaoImpl<ProductLine, Long> implements
		ProductLineDao {
	int partnerId;
	@Override
	public Map readAllByPartnerID(MultivaluedMap queryMap) throws Exception{
		Map entitiesMap=null;
		entitiesMap=getAllEntitiesWithCriteria(queryMap);
		return entitiesMap;
	}

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		Map entitiesMap =new HashMap();
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		String queryString=(String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(ProductLine.class);
		Partner partner = new Partner();
		String PartnerId=(String)queryMap.getFirst("partnerId");
		Long partnerId=Long.valueOf(PartnerId);
		partner.setId(partnerId);
		criteria.add(Restrictions.eq("varPartner", partner));
		String limit=(String)queryMap.getFirst("limit");
		String pageNo=(String) queryMap.getFirst("page");
		if(queryString!=null){
			Map<String,String> searchMap=ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType=searchMap.get("datecriteriavalue");
			if(dateType!=null && !dateType.equals("")){
				String sDate=searchMap.get("fromDate");
				String eDate=searchMap.get("toDate");
				criteria=HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String productLineType=searchMap.get("productLineType");
			if(productLineType!=null && !"".equals(productLineType)){
				criteria.add(Restrictions.ilike("productLineType", productLineType,MatchMode.ANYWHERE));
			}
		}
			totalCount=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
			criteria.addOrder(Order.desc("lastModifiedDate"));
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if(pageNO!=0){
        criteria.setFirstResult((pageNO - 1) * pageSize);
        criteria.setMaxResults(pageSize);
		}
        entitiesMap.put("totalCount", totalCount);
        entitiesMap.put("productlines", new LinkedHashSet(criteria.list()));
		return entitiesMap;

	}
	
	@Override
	public Boolean checkDuplicateValues(ProductLine productLine) throws Exception{
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		Boolean valueExist=false;
		Partner partnerobj=null;
		String partnerName="",rboName="",productLineType="";
		Long id=productLine.getId();
		List<ProductLine> productLineList = null;
		//partnerobj=productLine.getPartner();
		partnerName=partnerobj.getPartnerName();
		//rboName=productLine.getRboName();
		productLineType=productLine.getProductLineType();
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(ProductLine.class);
		Conjunction disCriteria = Restrictions.conjunction();
		criteria.createAlias("varPartner", "partner");
		disCriteria.add(Restrictions.eq("partner"+".partnerName",partnerName));
		disCriteria.add(Restrictions.eq("rboName", rboName));
		disCriteria.add(Restrictions.eq("productLineType", productLineType));
		if(id!=0){
			disCriteria.add(Restrictions.ne("id", id));
		}
		criteria.add(disCriteria);
		productLineList= criteria.list();
		totalCount=productLineList.size();
		if(totalCount>0)
			valueExist=true;
		return valueExist;
	}


	@Override
	public ProductLine create(String productLineData) {
		Session session = getSessionFactory().getCurrentSession();
		ProductLine pk=new ProductLine();
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String,Object> productLineMap=null;
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				false);
		try {
			pk = mapper.readValue(productLineData, ProductLine.class);
			productLineMap=ApplicationUtils.convertJSONtoObjectMaps(productLineData);
		
		int rboId=(productLineMap.get("rboId")==null?0:(int)productLineMap.get("rboId"));
		if(rboId!=0){
			RBO rbo=new RBO();
			rbo.setId(rboId);
			pk.setRbo(rbo);	
		}
		int partnerId=(productLineMap.get("partnerId")==null?0:Integer.parseInt((String)productLineMap.get("partnerId")));
		if(partnerId!=0){
			Partner partner=new Partner();
			partner.setId(partnerId);
			pk.setVarPartner(partner);	
		}
		String CSRPrimaryID=productLineMap.get("CSRPrimaryID")==null?"":(String)productLineMap.get("CSRPrimaryID");
		pk.setCSRPrimaryId(CSRPrimaryID);
		
		boolean waivemoa=productLineMap.get("waivemoa")==null?false:(boolean)productLineMap.get("waivemoa");
		pk.setWaiveMOA(waivemoa);
		boolean waivemoq=productLineMap.get("waivemoq")==null?false:(boolean)productLineMap.get("waivemoq");
		pk.setWaiveMOQ(waivemoq);
		boolean localbilling=productLineMap.get("localbilling")==null?false:(boolean)productLineMap.get("localbilling");
		pk.setLocalBilling(localbilling);
		boolean factorytransfer=productLineMap.get("factorytransfer")==null?false:(boolean)productLineMap.get("factorytransfer");
		pk.setFactoryTransfer(factorytransfer);
		boolean shipmentsample=productLineMap.get("shipmentsample")==null?false:(boolean)productLineMap.get("shipmentsample");
		pk.setShipmentSample(shipmentsample);
		boolean llkk=productLineMap.get("llkk")==null?false:(boolean)productLineMap.get("llkk");
		pk.setLLKK(llkk);
		
		String CSRSecondaryID=productLineMap.get("CSRSecondaryID")==null?"":(String)productLineMap.get("CSRSecondaryID");
		pk.setCSRSecondaryId(CSRSecondaryID);
		
		pk.setCreatedDate(new Date());
		String productLineType=productLineMap.get("productLineType")==null?"":(String)productLineMap.get("productLineType");
		pk.setProductLineType(productLineType);
		
		String email=productLineMap.get("email")==null?"":(String)productLineMap.get("email");
		pk.setEmail(email);
		
		session.saveOrUpdate(pk);
		List ordersystemList=(ArrayList)productLineMap.get("orderSystemInfo");
		for(int i=0;i<ordersystemList.size();i++){
			LinkedHashMap systemMap=(LinkedHashMap) ordersystemList.get(i);
			addOrderSystemInfo(session,systemMap,pk);
		}
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		// session.getTransaction().commit();
		return pk;
	}
	@Override
	public ProductLine read(Long id) {
		Session session = getSessionFactory().getCurrentSession();//single-entity
		session.enableFetchProfile( "single-entity" );
		// session.beginTransaction();
		ProductLine entity = (ProductLine) session.get(getType(), id);
		// session.getTransaction().commit();
		return entity;
	}
	
	@Override
	public ProductLine update(String productLineData,Long id) throws Exception{
		Session session = getSessionFactory().getCurrentSession();
		ProductLine pk = (ProductLine) session.get(getType(), id);
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String,Object> productLineMap=null;
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				false);
		ObjectReader updater = mapper.readerForUpdating(pk);
		// build updated entity object from input data
		pk = updater.readValue(productLineData);
		productLineMap=ApplicationUtils.convertJSONtoObjectMaps(productLineData);
		
		int rboId=(productLineMap.get("rboId")==null?0:(int)productLineMap.get("rboId"));
		if(rboId!=0){
			RBO rbo=new RBO();
			rbo.setId(rboId);
			pk.setRbo(rbo);	
		}
		pk.setLastModifiedDate(new Date());
		update(pk);
		List ordersystemList=(ArrayList)productLineMap.get("orderSystemInfo");
		if(productLineMap.get("siteChanged")==null?false:(boolean)productLineMap.get("siteChanged")){
			String hql = "delete from OrderSystemInfo where varProductLine.id=:id";
		    org.hibernate.Query query = session.createQuery(hql);
		    query.setLong("id",id);
		    int rowCount = query.executeUpdate();
			
			for(int i=0;i<ordersystemList.size();i++){
				LinkedHashMap systemMap=(LinkedHashMap) ordersystemList.get(i);
				addOrderSystemInfo(session,systemMap,pk);
			}
		}else{
			for(int i=0;i<ordersystemList.size();i++){
				LinkedHashMap systemMap=(LinkedHashMap) ordersystemList.get(i);
				if(systemMap.get("newRecord")==null?false:(boolean)systemMap.get("newRecord"))
					addOrderSystemInfo(session,systemMap,pk);
				else
					updateOrderSystemInfo(session,systemMap);
			}
			
		}
		// session.getTransaction().commit();
		return pk;
	}
	
	private OrderSystemInfo addOrderSystemInfo(Session session,Map systemMap,ProductLine pk) throws Exception{
		OrderSystemInfo sys=new OrderSystemInfo();
		String csrName=systemMap.get("csrName")==null?"":(String)systemMap.get("csrName");
		sys.setCsrName(csrName);
		String packingInstruction=systemMap.get("packingInstruction")==null?"":(String)systemMap.get("packingInstruction");
		sys.setPackingInstruction(packingInstruction);
		String variableDataBreakdown=systemMap.get("variableDataBreakdown")==null?"":(String)systemMap.get("variableDataBreakdown");
		sys.setVariableDataBreakdown(variableDataBreakdown);
		String manufacturingNotes=systemMap.get("manufacturingNotes")==null?"":(String)systemMap.get("manufacturingNotes");
		sys.setManufacturingNotes(manufacturingNotes);
		String invoiceNote=systemMap.get("invoiceNote")==null?"":(String)systemMap.get("invoiceNote");
		sys.setInvoiceNote(invoiceNote);
		String shippingMark=systemMap.get("shippingMark")==null?"":(String)systemMap.get("shippingMark");
		sys.setShippingMark(shippingMark);
		String splitShipSetBy=systemMap.get("splitShipSetBy")==null?"":(String)systemMap.get("splitShipSetBy");
		sys.setSplitShipSetBy(splitShipSetBy);
		sys.setVarProductLine(pk);
		sys.setCreatedDate(new Date());
		
		SystemInfo sysInfo=new SystemInfo();
		Long systemId=systemMap.get("systemId")==null?0L:((Integer)systemMap.get("systemId")).longValue();
		sysInfo=(SystemInfo) session.get(SystemInfo.class, systemId);
		sys.setVarSystem(sysInfo);
		Long OrderSystemInfoId=(Long)session.save(sys);
		sys.setId(OrderSystemInfoId);
		List orgInfoList=(ArrayList)systemMap.get("orgInfo");
		for(int j=0;j<orgInfoList.size();j++){
			LinkedHashMap orgMap=(LinkedHashMap) orgInfoList.get(j);
			addOrgInfo(session,orgMap,sys);
		}
		return sys;
	}
	
	private OrgInfo addOrgInfo(Session session, Map orgMap,OrderSystemInfo sys) throws Exception{
		OrgInfo org = new OrgInfo();
		int orgCodeId=(orgMap.get("orgCodeId")==null?0:(int)orgMap.get("orgCodeId"));
		org.setOrgCodeId(orgCodeId);
		
		String legacybilltocode=orgMap.get("billToCode")==null?"":(String)orgMap.get("billToCode");
		org.setBillToCode(legacybilltocode);
		
		String legacyshiptocode=orgMap.get("shipToCode")==null?"":(String)orgMap.get("shipToCode");
		org.setShipToCode(legacyshiptocode);
		
		org.setDefault(orgMap.get("default")==null?false:(Boolean)orgMap.get("default"));
		
		String freightterms=orgMap.get("freightTerm")==null?"":(String)orgMap.get("freightTerm");
		org.setFreightTerm(freightterms);
		
		String shippinginstructions=orgMap.get("shippingMethod")==null?"":(String)orgMap.get("shippingMethod");
		org.setShippingInstruction(shippinginstructions);
		
		String shippingmethod=orgMap.get("shippingInstruction")==null?"":(String)orgMap.get("shippingInstruction");
		org.setShippingMethod(shippingmethod);
		
		org.setVarOrderSystemInfo(sys);
		session.save(org);
		return org;
	}
	
	private OrderSystemInfo updateOrderSystemInfo(Session session,Map systemMap) throws Exception{
		Long id=Long.valueOf((int)systemMap.get("id"));
		OrderSystemInfo sys=null;
//		session.evict(sys);
		ObjectMapper mapper = new ObjectMapper();
		
		try {
		String orderSystemData=ApplicationUtils.convertObjectMapstoJSON(systemMap);
		
		sys = (OrderSystemInfo) session.get(OrderSystemInfo.class, id);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				false);
		ObjectReader updater = mapper.readerForUpdating(sys);
		// build updated entity object from input data
		
		
		sys = updater.readValue(orderSystemData);
		sys.setLastModifiedDate(new Date());
		session.update(sys);
		List orgInfoList=(ArrayList)systemMap.get("orgInfo");
		if(orgInfoList!=null)
		for(int j=0;j<orgInfoList.size();j++){
			LinkedHashMap orgMap=(LinkedHashMap) orgInfoList.get(j);
			if(orgMap.get("newRecord")==null?false:(boolean)orgMap.get("newRecord"))
				addOrgInfo(session,orgMap,sys);
			else{
				List<OrgInfo> orgInfoSessionList=sys.getListOrgInfo();
				updateOrderInfo(session,orgMap);
			}
				
		}
		
	}catch(Exception e){
		throw e;
	}
		return sys;
	}
	private OrgInfo updateOrderInfo(Session session,Map systemMap) throws Exception{
		//session.clear();
		ObjectMapper mapper = new ObjectMapper();
		OrgInfo org=null;
		try {
		String orgInfoData=ApplicationUtils.convertObjectMapstoJSON(systemMap);
		Long id=Long.valueOf((int)systemMap.get("id"));
		org = (OrgInfo) session.load(OrgInfo.class, id);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				false);
		ObjectReader updater = mapper.readerForUpdating(org);
		// build updated entity object from input data
		
		
		org = updater.readValue(orgInfoData);
		org.setLastModifiedDate(new Date());
		session.update(org);
		
		
	}catch(Exception e){
		throw e;
	}
		return org;
	}

}
