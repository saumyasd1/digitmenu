package com.avery.storage.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.apache.commons.lang.math.NumberUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.app.config.SpringConfig;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.OrgInfo;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.RBO;
import com.avery.storage.entities.SystemInfo;
import com.avery.storage.service.ProductLineService;
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
				String sDate=searchMap.get("fromDate")+" 00:00:00";
				String eDate=searchMap.get("toDate")+" 00:00:00";
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
		String dataStructureName="";
		Long id=productLine.getId();
		//partnerobj=productLine.getPartner();
		dataStructureName=productLine.getDataStructureName();
		//rboName=productLine.getRboName();
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(ProductLine.class);
		Conjunction disCriteria = Restrictions.conjunction();
		disCriteria.add(Restrictions.eq("dataStructureName",dataStructureName));
		if(id!=0){
			disCriteria.add(Restrictions.ne("id", id));
		}
		criteria.add(disCriteria);
		totalCount=criteria.list().size();
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
		String CSRPrimaryID=productLineMap.get("csrPrimaryID")==null?"":(String)productLineMap.get("csrPrimaryID");
		pk.setCsrPrimaryId(CSRPrimaryID);
		
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
		pk.setLlkk(llkk);
		
		String CSRSecondaryID=productLineMap.get("csrSecondaryID")==null?"":(String)productLineMap.get("csrSecondaryID");
		pk.setCsrSecondaryId(CSRSecondaryID);
		
		pk.setCreatedDate(new Date());
		String productLineType=productLineMap.get("productLineType")==null?"":(String)productLineMap.get("productLineType");
		pk.setProductLineType(productLineType);
		
		String email=productLineMap.get("email")==null?"":(String)productLineMap.get("email");
		pk.setEmail(email);
		pk=saveOrUpdateAdvancedProperties(pk,productLineMap);
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
		
		ProductLine entity = (ProductLine) session.get(getType(), id);
		if(entity.isFileOrderMatchRequired()){
			String fileOrderMatchLocation=entity.getFileOrderMatchLocation();
			if(fileOrderMatchLocation!=null){
			String[] fileOrderMatchLocationArray=fileOrderMatchLocation.split(";");
			if(fileOrderMatchLocationArray!=null && fileOrderMatchLocationArray.length==3){
				String[] fileOrderMatchSheetArray=fileOrderMatchLocationArray[0].split(":");
				entity.setFileOrderMatchSheet(fileOrderMatchSheetArray[1]);
				String[] fileOrderMatchArray=fileOrderMatchLocationArray[1].split(":");
				entity.setFileOrderMatch(fileOrderMatchArray[1]);
				String[] fileOrderMatchCellArray=fileOrderMatchLocationArray[2].split(":");
				entity.setFileOrderMatchCell(fileOrderMatchCellArray[1]);
			}
			}
		}
		if(entity.isFileProductLineMatchRequired()){
			String fileProductLineMatchLocation=entity.getFileProductLineMatchLocation();
			if(fileProductLineMatchLocation!=null){
			String[] fileProductLineMatchLocationArray=fileProductLineMatchLocation.split(";");
			if(fileProductLineMatchLocationArray!=null && fileProductLineMatchLocationArray.length==3){
				String[] fileProductlineSheetMatchArray=fileProductLineMatchLocationArray[0].split(":");
				entity.setFileProductlineSheetMatch(fileProductlineSheetMatchArray[1]);
				String[] fileProductlineMatchArray=fileProductLineMatchLocationArray[1].split(":");
				entity.setFileProductlineMatch(fileProductlineMatchArray[1]);
				String[] fileProductlineCellMatchArray=fileProductLineMatchLocationArray[2].split(":");
				entity.setFileProductlineCellMatch(fileProductlineCellMatchArray[1]);
			}
			}
		}
		
		if(entity.isFileRBOMatchRequired()){
			String fileRBOMatchLocation=entity.getFileRBOMatchLocation();
			if(fileRBOMatchLocation!=null){
			String[] fileRBOMatchLocationArray=fileRBOMatchLocation.split(";");
			if(fileRBOMatchLocationArray!=null && fileRBOMatchLocationArray.length==3){
				String[] fileRBOSheetMatchArray=fileRBOMatchLocationArray[0].split(":");
				entity.setFileRBOSheetMatch(fileRBOSheetMatchArray[1]);
				String[] fileRBOMatchArray=fileRBOMatchLocationArray[1].split(":");
				entity.setFileRBOMatch(fileRBOMatchArray[1]);
				String[] fileRBOCellMatchArray=fileRBOMatchLocationArray[2].split(":");
				entity.setFileRBOCellMatch(fileRBOCellMatchArray[1]);
			}
		}
		}
		boolean isAttachmentFileProductlineMatchRequired=entity.isAttachmentFileProductlineMatchRequired()==null?false:entity.isAttachmentFileProductlineMatchRequired();
		if(isAttachmentFileProductlineMatchRequired){
			String attachmentFileProductlineMatchLocation=entity.getAttachmentFileProductlineMatchLocation();
			if(attachmentFileProductlineMatchLocation!=null){
			String[] attachmentFileProductlineMatchLocationArray=attachmentFileProductlineMatchLocation.split(";");
			if(attachmentFileProductlineMatchLocationArray!=null && attachmentFileProductlineMatchLocationArray.length==3){
				String[] attachmentFileProductlineMatchSheetArray=attachmentFileProductlineMatchLocationArray[0].split(":");
				entity.setAttachmentFileProductlineMatchSheet(attachmentFileProductlineMatchSheetArray[1]);
				String[] attachmentFileProductlineMatchArray=attachmentFileProductlineMatchLocationArray[1].split(":");
				entity.setAttachmentFileProductlineMatch(attachmentFileProductlineMatchArray[1]);
				String[] attachmentFileProductlineMatchCellArray=attachmentFileProductlineMatchLocationArray[2].split(":");
				entity.setAttachmentFileProductlineMatchCell(attachmentFileProductlineMatchCellArray[1]);
			}
		}
		}
		if(entity.isAttachmentFileOrderMatchRequired()){
			String attachmentFileOrderMatch=entity.getAttachmentFileOrderMatchLocation();
			if(attachmentFileOrderMatch!=null){
			String[] attachmentFileOrderMatchLocationArray=attachmentFileOrderMatch.split(";");
			if(attachmentFileOrderMatchLocationArray!=null && attachmentFileOrderMatchLocationArray.length==3){
				String[] attachmentFileOrderMatchSheetArray=attachmentFileOrderMatchLocationArray[0].split(":");
				entity.setAttachmentFileOrderMatchSheet(attachmentFileOrderMatchSheetArray[1]);
				String[] attachmentFileOrderMatchArray=attachmentFileOrderMatchLocationArray[1].split(":");
				entity.setAttachmentFileOrderMatch(attachmentFileOrderMatchArray[1]);
				String[] attachmentFileOrderMatchCellArray=attachmentFileOrderMatchLocationArray[2].split(":");
				entity.setAttachmentFileOrderMatchCell(attachmentFileOrderMatchCellArray[1]);
			}
		}
		}
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
		pk=saveOrUpdateAdvancedProperties(pk,productLineMap);
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
		
		org.setDefault(orgMap.get("isDefault")==null?false:(Boolean)orgMap.get("isDefault"));
		
		String freightterms=orgMap.get("freightTerm")==null?"":(String)orgMap.get("freightTerm");
		org.setFreightTerm(freightterms);
		
		String shippinginstructions=orgMap.get("shippingInstruction")==null?"":(String)orgMap.get("shippingInstruction");
		org.setShippingInstruction(shippinginstructions);
		
		String shippingmethod=orgMap.get("shippingMethod")==null?"":(String)orgMap.get("shippingMethod");
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
		org.setDefault(systemMap.get("isDefault")==null?false:(Boolean)systemMap.get("isDefault"));
		session.update(org);
		
		
	}catch(Exception e){
		throw e;
	}
		return org;
	}
	
	private ProductLine saveOrUpdateAdvancedProperties(ProductLine pk,Map productLineMap){
		String fileOrderMatchCell=productLineMap.get("fileOrderMatchCell")==null?"":(String)productLineMap.get("fileOrderMatchCell");
		String fileOrderMatchSheet=productLineMap.get("fileOrderMatchSheet")==null?"":(String)productLineMap.get("fileOrderMatchSheet");
		String fileOrderMatch=productLineMap.get("fileOrderMatch")==null?"":(String)productLineMap.get("fileOrderMatch");
		if(fileOrderMatchSheet.equals("") && fileOrderMatchCell.equals("")){
			pk.setFileOrderMatch(fileOrderMatch);
			pk.setFileOrderMatchRequired(false);
		}else{
			pk.setFileOrderMatchLocation("Sheet Name :"+fileOrderMatchSheet+";Value:"+fileOrderMatch+";Cell :"+fileOrderMatchCell+";");
			pk.setFileOrderMatchRequired(true);
		}
		String fileProductlineMatch=productLineMap.get("fileProductlineMatch")==null?"":(String)productLineMap.get("fileProductlineMatch");
		String fileProductlineSheetMatch=productLineMap.get("fileProductlineSheetMatch")==null?"":(String)productLineMap.get("fileProductlineSheetMatch");
		String fileProductlineCellMatch=productLineMap.get("fileProductlineCellMatch")==null?"":(String)productLineMap.get("fileProductlineCellMatch");
		if(fileProductlineCellMatch.equals("") && fileProductlineSheetMatch.equals("")){
			pk.setFileProductlineMatch(fileProductlineMatch);
			pk.setFileProductLineMatchRequired(false);
		}else{
			pk.setFileProductLineMatchLocation("Sheet Name :"+fileProductlineSheetMatch+";Value:"+fileProductlineMatch+";Cell :"+fileProductlineCellMatch+";");
			pk.setFileProductLineMatchRequired(true);
		}
		String fileRBOMatch=productLineMap.get("fileRBOMatch")==null?"":(String)productLineMap.get("fileRBOMatch");
		String fileRBOSheetMatch=productLineMap.get("fileRBOSheetMatch")==null?"":(String)productLineMap.get("fileRBOSheetMatch");
		String fileRBOCellMatch=productLineMap.get("fileRBOCellMatch")==null?"":(String)productLineMap.get("fileRBOCellMatch");
		if(fileRBOSheetMatch.equals("") && fileRBOCellMatch.equals("")){
			pk.setFileRBOMatch(fileRBOMatch);
			pk.setFileRBOMatchRequired(false);
		}else{
			pk.setFileRBOMatchLocation("Sheet Name :"+fileRBOSheetMatch+";Value:"+fileRBOMatch+";Cell:"+fileRBOCellMatch+";");
			pk.setFileRBOMatchRequired(true);
		}
		String attachmentFileProductlineMatchSheet=productLineMap.get("attachmentFileProductlineMatchSheet")==null?"":(String)productLineMap.get("attachmentFileProductlineMatchSheet");
		String attachmentFileProductlineMatch=productLineMap.get("attachmentFileProductlineMatch")==null?"":(String)productLineMap.get("attachmentFileProductlineMatch");
		String attachmentFileProductlineMatchCell=productLineMap.get("attachmentFileProductlineMatchCell")==null?"":(String)productLineMap.get("attachmentFileProductlineMatchCell");
		if(!(attachmentFileProductlineMatchCell.equals("") && attachmentFileProductlineMatchSheet.equals(""))){
			pk.setAttachmentFileProductlineMatchLocation("Sheet Name : "+attachmentFileProductlineMatchSheet+";Value:"+attachmentFileProductlineMatch+";Cell : "+attachmentFileProductlineMatchCell+";");
			pk.setAttachmentFileProductlineMatchRequired(true);
		}
		String attachmentFileOrderMatchCell=productLineMap.get("attachmentFileOrderMatchCell")==null?"":(String)productLineMap.get("attachmentFileOrderMatchCell");
		String attachmentFileOrderMatchSheet=productLineMap.get("attachmentFileOrderMatchSheet")==null?"":(String)productLineMap.get("attachmentFileOrderMatchSheet");
		String attachmentFileOrderMatch=productLineMap.get("attachmentFileOrderMatch")==null?"":(String)productLineMap.get("attachmentFileOrderMatch");
		if(attachmentFileOrderMatchCell.equals("") && attachmentFileOrderMatchSheet.equals("")){
			pk.setAttachmentFileOrderMatch(fileRBOMatch);
			pk.setAttachmentFileOrderMatchRequired(false);
		}else{
			pk.setAttachmentFileOrderMatchLocation("Sheet Name : "+attachmentFileOrderMatchSheet+";Value:"+attachmentFileOrderMatch+";Cell : "+attachmentFileOrderMatchCell+";");
			pk.setAttachmentFileOrderMatchRequired(true);
		}
		return pk;
	}

	@Override
	public List getAllDistantPartners() throws Exception {
		Session session= getSessionFactory().getCurrentSession();
		Query query=session.createQuery("select distinct varPartner.id, varPartner.partnerName from ProductLine where orderInMailBody<> true");  
		List list=query.list();
		return list;
	}
	
	@Override
	public List getAllRBOByPartner(int partnerId) throws Exception{
		Session session=getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(ProductLine.class)
				.createAlias("rbo", "rbo")
				.setProjection(Projections.distinct(Projections.projectionList()
					.add(Projections.property("rbo.id"),"id")
					.add(Projections.property("rbo.rboName"),"rboName")));
		Conjunction disCriteria = Restrictions.conjunction();
		disCriteria.add(Restrictions.eq("varPartner"+".id",Long.valueOf(partnerId)));
		disCriteria.add(Restrictions.ne("orderInMailBody", true));
		criteria.add(disCriteria);
		return criteria.list();
	}
	
	public List getAllProductLineByRBO(int partnerId,int rbo) throws Exception{
		Session session=getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(ProductLine.class)
				.setProjection(Projections.distinct(Projections.projectionList()
					.add(Projections.property("productLineType"),"productLineType")
					.add(Projections.property("productLineType"),"productLineType")));
		Conjunction disCriteria = Restrictions.conjunction();
		criteria.createAlias("varPartner", "varPartner");
		criteria.createAlias("rbo", "rbo");
		disCriteria.add(Restrictions.eq("varPartner.id",Long.valueOf(partnerId)));
		disCriteria.add(Restrictions.eq("rbo.id", Long.valueOf(rbo)));
		disCriteria.add(Restrictions.ne("orderInMailBody", true));
		criteria.add(disCriteria);
		return criteria.list();
	}
	
	public List getRelatedDataStructures(Long partnerId,Long rbo){
		Session session=getSessionFactory().getCurrentSession();
		Query query=session.createQuery("select new map(id as id, dataStructureName as dataStructureName,attachmentRequired as attachmentRequired ,"+
								"orderFileNameExtension as orderFileNameExtension,attachmentFileNameExtension_1 as attachmentFileNameExtension_1) from ProductLine "+
								" where varPartner.id=:partnerId and rbo.id=:rboId and orderInMailBody!=:orderInMailBody");
		query.setLong("partnerId", partnerId);
		query.setLong("rboId", rbo);
		query.setBoolean("orderInMailBody", true);
		List list=query.list();
		return list;
	}
	
	public Map getDataStructureListBasedOnAttachmentId(Long fileAttachmentId) throws Exception {
		Map entitiesMap = new HashMap();
		List dataStructures = new ArrayList();
		List<Long> productLineIds = new ArrayList<Long>();
		List<ProductLine> productline = null;
		Session session = null;
		Criteria criteria = null;
		String comment = "";
		session = getSessionFactory().getCurrentSession();
		OrderFileAttachment orderFileAttachment = new OrderFileAttachment();
		orderFileAttachment = (OrderFileAttachment) session.get(OrderFileAttachment.class, fileAttachmentId);
		comment = orderFileAttachment.getComment();
		if (comment == null)
			comment = "";
		if (comment.contains(",")) {
			String[] st = comment.split(",");
			for (int i = 0; i < st.length; i++) {
				if (NumberUtils.isNumber(st[i])) {
					Long productlineid = Long.parseLong(st[i]);
					productLineIds.add(productlineid);
				}
			}
		} else {
			if (NumberUtils.isNumber(comment)) {
				Long productlineid = Long.parseLong(comment);
				productLineIds.add(productlineid);
			}
		}
		if (productLineIds.size() > 0) {
			for (Long productLineId : productLineIds) {
				ProductLine productLine = new ProductLine();
				productLine = (ProductLine) session.get(ProductLine.class, productLineId);
				if (productLine != null && productLine.isActive()) {
					Map<String, String> dataStructureValue = new HashMap<>();
					dataStructureValue.put("id", productLineId.toString());
					dataStructureValue.put("dataStructureName", productLine.getDataStructureName());
					dataStructures.add(dataStructureValue);
				}
			}
		} else {
			Criteria crit = session.createCriteria(ProductLine.class)
					.setProjection(Projections.projectionList().add(Projections.property("id"), "id")
							.add(Projections.property("dataStructureName"), "dataStructureName"))
					.add(Restrictions.ne("active", false))
					.addOrder(Order.asc("dataStructureName"))
					.setResultTransformer(Transformers.aliasToBean(ProductLine.class));

			entitiesMap.put("dataStructures", new LinkedHashSet(crit.list()));
			return entitiesMap;
		}

		entitiesMap.put("dataStructures", dataStructures);

		return entitiesMap;
	}

}
