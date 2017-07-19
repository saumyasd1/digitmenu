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
import com.avery.logging.AppLogger;
import com.avery.storage.MixIn.ProductLineMixIn;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderFileAttachment;
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
public class ProductLineDaoImpl extends GenericDaoImpl<ProductLine, Long> implements ProductLineDao {
	int partnerId;

	@Override
	public Map readAllByPartnerID(MultivaluedMap queryMap) throws Exception {
		Map entitiesMap = null;
		entitiesMap = getAllEntitiesWithCriteria(queryMap);
		return entitiesMap;
	}

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map entitiesMap = new HashMap();
		Session session = null;
		Criteria criteria = null;
		int totalCount = 0;
		String queryString = (String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(ProductLine.class);
		criteria.createAlias("varPartner", "varPartner");
		criteria.createAlias("rbo", "rbo");
		/*
		 * Partner partner = new Partner(); // because of partner profile
		 * Appreance Change by Rajo String PartnerId = (String)
		 * queryMap.getFirst("partnerId"); Long partnerId =
		 * Long.valueOf(PartnerId); partner.setId(partnerId);
		 * criteria.add(Restrictions.eq("varPartner", partner));
		 */
		String limit = (String) queryMap.getFirst("limit");
		String pageNo = (String) queryMap.getFirst("page");
		if (queryString != null) {
			Map<String, String> searchMap = ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType = searchMap.get("datecriteriavalue");
			if (dateType != null && !dateType.equals("")) {
				String sDate = searchMap.get("fromDate") + " 00:00:00";
				String eDate = searchMap.get("toDate") + " 00:00:00";
				criteria = HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String productLineType = searchMap.get("productLineType");
			if (productLineType != null && !"".equals(productLineType)) {
				criteria.add(Restrictions.ilike("productLineType", productLineType, MatchMode.ANYWHERE));
			}
			String partnerDataStructure = searchMap.get("partnerDataStructure");
			if (partnerDataStructure != null && !"".equals(partnerDataStructure)) {
				criteria.add(Restrictions.eq("id", Long.parseLong(partnerDataStructure)));
			}
			String RBOName = searchMap.get("RBOName");
			if (RBOName != null && !"".equals(RBOName)) {
				criteria.add(Restrictions.ilike("rbo.rboName", RBOName, MatchMode.ANYWHERE));
			}
			String PartnerName = searchMap.get("PartnerName");
			if (PartnerName != null && !"".equals(PartnerName)) {
				criteria.add(Restrictions.ilike("varPartner.partnerName", PartnerName, MatchMode.ANYWHERE));
			}
		}
		totalCount = HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		criteria.addOrder(Order.desc("lastModifiedDate"));
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if (pageNO != 0) {
			criteria.setFirstResult((pageNO - 1) * pageSize);
			criteria.setMaxResults(pageSize);
		}
		entitiesMap.put("totalCount", totalCount);
		entitiesMap.put("productlines", criteria.list());
		return entitiesMap;

	}

	@Override
	public Boolean checkDuplicateValues(ProductLine productLine) throws Exception {
		Session session = null;
		Criteria criteria = null;
		int totalCount = 0;
		Boolean valueExist = false;
		Partner partnerobj = null;
		String dataStructureName = "";
		Long id = productLine.getId();
		// partnerobj=productLine.getPartner();
		dataStructureName = productLine.getDataStructureName();
		// rboName=productLine.getRboName();
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(ProductLine.class);
		Conjunction disCriteria = Restrictions.conjunction();
		disCriteria.add(Restrictions.eq("dataStructureName", dataStructureName));
		if (id != 0) {
			disCriteria.add(Restrictions.ne("id", id));
		}
		criteria.add(disCriteria);
		totalCount = criteria.list().size();
		if (totalCount > 0)
			valueExist = true;
		return valueExist;
	}

	@Override
	public List getAllDistantPartners(MultivaluedMap queryMap) throws Exception {
		Session session = getSessionFactory().getCurrentSession();
		String queryString = "";
		queryString = "select distinct varPartner.id, varPartner.partnerName from ProductLine where orderInMailBody<> true ";
		Query query = session.createQuery(queryString);
		List list = query.list();
		return list;
	}

	@Override
	public List getAllRBOByPartner(int partnerId) throws Exception {
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(ProductLine.class).createAlias("rbo", "rbo").setProjection(
				Projections.distinct(Projections.projectionList().add(Projections.property("rbo.id"), "id")
						.add(Projections.property("rbo.rboName"), "rboName")));
		Conjunction disCriteria = Restrictions.conjunction();
		disCriteria.add(Restrictions.eq("varPartner" + ".id", Long.valueOf(partnerId)));
		disCriteria.add(Restrictions.ne("orderInMailBody", true));
		criteria.add(disCriteria);
		return criteria.list();
	}

	public List getAllProductLineByRBO(int partnerId, int rbo) throws Exception {
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(ProductLine.class)
				.setProjection(Projections.distinct(
						Projections.projectionList().add(Projections.property("productLineType"), "productLineType")
								.add(Projections.property("productLineType"), "productLineType")));
		Conjunction disCriteria = Restrictions.conjunction();
		criteria.createAlias("varPartner", "varPartner");
		criteria.createAlias("rbo", "rbo");
		disCriteria.add(Restrictions.eq("varPartner.id", Long.valueOf(partnerId)));
		disCriteria.add(Restrictions.eq("rbo.id", Long.valueOf(rbo)));
		disCriteria.add(Restrictions.ne("orderInMailBody", true));
		criteria.add(disCriteria);
		return criteria.list();
	}

	public List getRelatedDataStructures(Long partnerId, Long rbo) {
		Session session = getSessionFactory().getCurrentSession();
		Query query = session.createQuery(
				"select new map(id as id, dataStructureName as dataStructureName, site as site, attachmentRequired as attachmentRequired ,"
						+ "orderFileNameExtension as orderFileNameExtension,attachmentFileNameExtension_1 as attachmentFileNameExtension_1) from ProductLine "
						+ " where varPartner.id=:partnerId and rbo.id=:rboId and orderInMailBody!=:orderInMailBody and active!=:active");
		query.setLong("partnerId", partnerId);
		query.setLong("rboId", rbo);
		query.setBoolean("orderInMailBody", true);
		query.setBoolean("active", false);
		List list = query.list();
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
				if (productLine != null) {
					Map<String, String> dataStructureValue = new HashMap<>();
					dataStructureValue.put("id", productLineId.toString());
					dataStructureValue.put("dataStructureName", productLine.getDataStructureName());
					dataStructures.add(dataStructureValue);
				}
			}
		} else {
			Criteria crit = session.createCriteria(ProductLine.class).add(Restrictions.ne("active", false))
					.setProjection(Projections.projectionList().add(Projections.property("id"), "id")
							.add(Projections.property("dataStructureName"), "dataStructureName"))
					.addOrder(Order.asc("dataStructureName"))
					.setResultTransformer(Transformers.aliasToBean(ProductLine.class));

			entitiesMap.put("dataStructures", new LinkedHashSet(crit.list()));
			return entitiesMap;
		}

		entitiesMap.put("dataStructures", dataStructures);

		return entitiesMap;
	}

	@Override
	public Map getRboListById(String partnerId) throws Exception {
		Map entitiesMap = new HashMap();
		Session session = null;
		Criteria criteria = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(ProductLine.class);
		String[] partnerIdList = partnerId.split(",");
		List<Long> idList = new ArrayList<Long>();
		for (int i = 0; i < partnerIdList.length; i++) {
			idList.add(Long.parseLong(partnerIdList[i]));
		}
		criteria.createAlias("varPartner", "varPartner");
		criteria.add(Restrictions.in("varPartner.id", idList));
		entitiesMap.put("productlines", criteria.list());
		return entitiesMap;

	}

	@Override
	public Boolean updateStatus(Long id, Boolean status) throws Exception {
		boolean success = false;
		Session session = null;
		try {
			session = getSessionFactory().getCurrentSession();
			ProductLine productLine = (ProductLine) session.get(ProductLine.class, id);
			productLine.setActive(status);
			// wi.setLastModifiedDate(now);
			session.update(productLine);
			// saveHistory(user, "", "", entityId, "cancel");
			success = true;
		} catch (Exception e) {
			// AppLogger.getSystemLogger().debug(MessageUtils.WICANCEL_FAILURE_MESSAGE
			// + " -> " + e);
			return false;
		}
		return success;
	}

	@Override
	public long create(String productLineData) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		Session session = null;
		ProductLine productLine = null;
		Long productlineId = null;
		try {
			session = getSessionFactory().getCurrentSession();
			mapper.addMixIn(ProductLine.class, ProductLineMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);
			HashMap<String, Object> entitiesMap = ApplicationUtils.convertJSONtoObjectMaps(productLineData);
			productLine = mapper.readValue(productLineData, ProductLine.class);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			// productlineId = productLineService.create(productLine);
			long partnerId = Long.parseLong((String) entitiesMap.get("partnerId"));
			long rboId = Long.parseLong((String) entitiesMap.get("rboId"));
			Partner partnerObj = new Partner();
			RBO rboObj = new RBO();
			partnerObj.setId(partnerId);
			rboObj.setId(rboId);
			productLine.setVarPartner(partnerObj);
			productLine.setRbo(rboObj);
			productLine.setCreatedDate(new Date());
			productlineId = productLineService.create(productLine);
			List orderSystemInfo = (ArrayList) entitiesMap.get("listOrderSystemInfo");
			saveListOrderSystemInfo(productlineId, orderSystemInfo, true);
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error while creating productline " + e);
			throw e;
		}
		return productlineId;
	}

	/**
	 * Method for save or update ordersysteminfo list
	 * 
	 * @param productlineId
	 * @param orderSystemInfo
	 * @param createdDateFlag
	 * @throws Exception
	 */
	public void saveListOrderSystemInfo(long productlineId, List orderSystemInfo, boolean createdFlag)
			throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		ProductLine productLineObj = new ProductLine();
		productLineObj.setId(productlineId);
		Session session = null;
		try {
			session = getSessionFactory().getCurrentSession();
			for (Object obj : orderSystemInfo) {
				OrderSystemInfo orderSystemInfoObj = new OrderSystemInfo();
				LinkedHashMap entityMap = (LinkedHashMap) obj;
				Integer systemId = (Integer) entityMap.get("systemId");
				orderSystemInfoObj = mapper.readValue(mapper.writeValueAsString(entityMap), OrderSystemInfo.class);
				if (systemId != null) {
					SystemInfo systemInfoObj = new SystemInfo();
					systemInfoObj.setId(systemId.longValue());
					orderSystemInfoObj.setVarSystem(systemInfoObj);
				}
				if (createdFlag) {
					orderSystemInfoObj.setCreatedDate(new Date());
					orderSystemInfoObj.setCreatedBy("Web");
				}
				orderSystemInfoObj.setLastModifiedBy("Web");
				orderSystemInfoObj.setLastModifiedDate(new Date());
				orderSystemInfoObj.setVarProductLine(productLineObj);
				session.saveOrUpdate(orderSystemInfoObj);
				List<OrgInfo> listOrgInfo = orderSystemInfoObj.getListOrgInfo();
				saveListOrgInfo(orderSystemInfoObj.getId(), listOrgInfo, createdFlag);
			}
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error while updating productline " + e);
			throw e;
		}
	}

	/**
	 * Methd for save update orginfo list
	 * 
	 * @param orderSystemInfoId
	 * @param listOrgInfo
	 * @param createdDateFlag
	 * @throws Exception
	 */
	public void saveListOrgInfo(long orderSystemInfoId, List<OrgInfo> listOrgInfo, boolean createdFlag)
			throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Session session = null;
		// Long entityId = 0L;
		try {
			OrderSystemInfo orderSystemInfoObj = new OrderSystemInfo();
			orderSystemInfoObj.setId(orderSystemInfoId);
			session = getSessionFactory().getCurrentSession();
			for (OrgInfo orgInfoObj : listOrgInfo) {
				// OrgInfo orgInfoObj = new OrgInfo();
				// LinkedHashMap entityMap = (LinkedHashMap) obj;
				// orgInfoObj =
				// mapper.readValue(mapper.writeValueAsString(entityMap),
				// OrgInfo.class);
				if (createdFlag) {
					orgInfoObj.setCreatedDate(new Date());
					orgInfoObj.setCreatedBy("Web");
				}
				orgInfoObj.setLastModifiedBy("Web");
				orgInfoObj.setLastModifiedDate(new Date());
				orgInfoObj.setVarOrderSystemInfo(orderSystemInfoObj);
				session.saveOrUpdate(orgInfoObj);
			}
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error while updating productline " + e);
			throw e;
		}
	}

	@Override
	public long update(String productLineData) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		Session session = null;
		ProductLine productLine = null;
		Long productlineId = null;
		try {
			session = getSessionFactory().getCurrentSession();
			mapper.addMixIn(ProductLine.class, ProductLineMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);
			HashMap<String, Object> entitiesMap = ApplicationUtils.convertJSONtoObjectMaps(productLineData);
			productlineId = Long.parseLong((String) entitiesMap.get("id"));
			productLine = (ProductLine) session.get(ProductLine.class, productlineId);
			ObjectReader updater = mapper.readerForUpdating(productLine);
			productLine = updater.readValue(productLineData);
			// productLine = mapper.readValue(productLineData,
			// ProductLine.class);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			// productlineId = productLineService.create(productLine);
			long partnerId = Long.parseLong((String) entitiesMap.get("partnerId"));
			long rboId = Long.parseLong((String) entitiesMap.get("rboId"));
			Partner partnerObj = new Partner();
			RBO rboObj = new RBO();
			partnerObj.setId(partnerId);
			rboObj.setId(rboId);
			productLine.setVarPartner(partnerObj);
			productLine.setRbo(rboObj);
			productLine.setLastModifiedDate(new Date());
			session.update(productLine);
			// productlineId = productLine.getId();
			List orderSystemInfo = (ArrayList) entitiesMap.get("listOrderSystemInfo");
			saveListOrderSystemInfo(productlineId, orderSystemInfo, false);
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error while updating productline " + e);
			throw e;
		}
		return productlineId;
	}
}
