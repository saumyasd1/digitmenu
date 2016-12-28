package com.avery.storage.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

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
		RBO rbo=new RBO();
		Partner partner=new Partner();
		partner.setId(Integer.parseInt((String)productLineMap.get("partnerId")));
		rbo.setId((int)productLineMap.get("rboId"));
		pk.setRbo(rbo);
		pk.setVarPartner(partner);
		pk.setCSRPrimaryId((String)productLineMap.get("CSRPrimaryID"));
		pk.setWaiveMOA((boolean)productLineMap.get("waivemoa"));
		pk.setWaiveMOQ((boolean)productLineMap.get("waivemoq"));
		pk.setLocalBilling((boolean)productLineMap.get("localbilling"));
		pk.setFactoryTransfer((boolean)productLineMap.get("factorytransfer"));
		pk.setShipmentSample((boolean)productLineMap.get("shipmentsample"));
		pk.setLLKK((boolean)productLineMap.get("llkk"));
		pk.setCSRSecondaryId((String)productLineMap.get("CSRSecondaryID"));
		pk.setCreatedDate(new Date());
		pk.setProductLineType((String)productLineMap.get("productLineType"));
		pk.setEmail((String)productLineMap.get("email"));
		session.saveOrUpdate(pk);
		List ordersystemList=(ArrayList)productLineMap.get("orderSystemInfo");
		for(int i=0;i<ordersystemList.size();i++){
			OrderSystemInfo sys=new OrderSystemInfo();
			LinkedHashMap systemMap=(LinkedHashMap) ordersystemList.get(i);
			sys.setCsrName((String)systemMap.get("csrName"));
			sys.setPackingInstruction((String)systemMap.get("packingInstruction"));
			sys.setVariableDataBreakdown((String)systemMap.get("variableDataBreakdown"));
			sys.setManufacturingNotes((String)systemMap.get("manufacturingNotes"));
			sys.setInvoiceNote((String)systemMap.get("invoiceNote"));
			sys.setShippingMark((String)systemMap.get("shippingMark"));
			sys.setVarProductLine(pk);
			sys.setCreatedDate(new Date());
//			sys.setArtworkHold((Boolean)systemMap.get("artworkHold"));
			sys.setSplitShipSetBy((String)systemMap.get("splitShipSetBy"));
			SystemInfo sysInfo=new SystemInfo();
			sysInfo=(SystemInfo) session.get(SystemInfo.class, ((Integer)systemMap.get("systemId")).longValue());
			sys.setVarSystem(sysInfo);
			Long systemId=(Long)session.save(sys);
			List orgInfoList=(ArrayList)systemMap.get("orgInfo");
			for(int j=0;j<orgInfoList.size();j++){
				OrgInfo org=new OrgInfo();
				LinkedHashMap orgMap=(LinkedHashMap) orgInfoList.get(j);
				org.setOrgCodeId((Integer)orgMap.get("orgCodeId"));
				org.setBillToCode((String)orgMap.get("legacybilltocode"));
				org.setShipToCode((String)orgMap.get("legacyshiptocode"));
				org.setDefault((Boolean)orgMap.get("default"));
				org.setFreightTerm((String)orgMap.get("freightterms"));
				org.setShippingInstruction((String)orgMap.get("shippinginstructions"));
				org.setShippingMethod((String)orgMap.get("shippingmethod"));
				sys.setId(systemId);
				org.setVarOrderSystemInfo(sys);
				session.save(org);
			}
		}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		// session.getTransaction().commit();
		return pk;
	}

	
}
