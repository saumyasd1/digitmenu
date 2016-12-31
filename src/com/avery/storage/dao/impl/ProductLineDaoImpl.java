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
			OrderSystemInfo sys=new OrderSystemInfo();
			LinkedHashMap systemMap=(LinkedHashMap) ordersystemList.get(i);
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
			List orgInfoList=(ArrayList)systemMap.get("orgInfo");
			for(int j=0;j<orgInfoList.size();j++){
				OrgInfo org=new OrgInfo();
				LinkedHashMap orgMap=(LinkedHashMap) orgInfoList.get(j);
				
				int orgCodeId=(orgMap.get("orgCodeId")==null?0:(int)orgMap.get("orgCodeId"));
				org.setOrgCodeId(orgCodeId);
				
				String legacybilltocode=orgMap.get("legacybilltocode")==null?"":(String)orgMap.get("legacybilltocode");
				org.setBillToCode(legacybilltocode);
				
				String legacyshiptocode=orgMap.get("legacyshiptocode")==null?"":(String)orgMap.get("legacyshiptocode");
				org.setShipToCode(legacyshiptocode);
				
				org.setDefault((Boolean)orgMap.get("default"));
				
				String freightterms=orgMap.get("freightterms")==null?"":(String)orgMap.get("freightterms");
				org.setFreightTerm(freightterms);
				
				String shippinginstructions=orgMap.get("shippinginstructions")==null?"":(String)orgMap.get("shippinginstructions");
				org.setShippingInstruction(shippinginstructions);
				
				String shippingmethod=orgMap.get("shippingmethod")==null?"":(String)orgMap.get("shippingmethod");
				org.setShippingMethod(shippingmethod);
				sys.setId(OrderSystemInfoId);
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
