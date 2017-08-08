package com.avery.storage.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.Org;
import com.avery.storage.entities.OrgInfo;
import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.SystemInfo;
import com.avery.storage.entities.User;
import com.avery.storage.service.ProductLineService;
import com.avery.utils.HibernateUtils;

@Repository
public class OrgDaoImpl extends GenericDaoImpl<Org, Long> implements
		OrgDao {
	
	@Override
	public List<Org> readAllBySystemId(Long systemId){
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(Org.class);
			SystemInfo system = new SystemInfo();
			system.setId(systemId);
			criteria.add(Restrictions.eq("system", system));
			return criteria.list();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line for site id " + systemId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order line for site id " + systemId, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		Map entitiesMap = new HashMap();
		Criteria criteria = null;
		Session session = getSessionFactory().getCurrentSession();
		ProjectionList proj = Projections.projectionList()
				.add(Projections.property("id"), "id")
				.add(Projections.property("site.id"), "siteId")
				.add(Projections.property("name"), "name")
				.add(Projections.groupProperty("name"));
		criteria = session.createCriteria(Org.class).createAlias("system", "system").createAlias("system.site", "site")
				.setProjection(proj).setResultTransformer(Transformers.aliasToBean(Org.class));
		if (queryMap.getFirst("siteId") != null && queryMap.getFirst("siteId") != "") {
			String siteId = (String) queryMap.getFirst("siteId");
			if (!siteId.equals("") && siteId != null && !siteId.isEmpty())
				criteria.add(Restrictions.eq("site.id", Long.parseLong(siteId)));
		}
		entitiesMap.put("org", criteria.list());
		return entitiesMap;
	}
	
	@Override
	public List<Org> getOrgByProductLineId(Long productLineId) throws Exception{
		ProductLineService productLineService = (ProductLineService) SpringConfig
				.getInstance().getBean("productLineService");
		Set<Long> orgCodeSet=new TreeSet<Long>();
		ProductLine productLineObj=productLineService.read(productLineId);
		Set<OrderSystemInfo> orderSystemInfoList=productLineObj.getListOrderSystemInfo();
		Disjunction orConditions = Restrictions.disjunction();
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(Org.class);
//		orConditions.add(Restrictions.in("id", entity2Data));
//		orConditions.add(Restrictions.in("obj", entity3Data));
		
		for (OrderSystemInfo orderSystemInfoObj : orderSystemInfoList) {
			List<OrgInfo> orgInfoObjList=orderSystemInfoObj.getListOrgInfo();
			for(int j=0;j<orgInfoObjList.size();j++){
				OrgInfo orgInfoObj=orgInfoObjList.get(j);
				orgCodeSet.add(Long.valueOf(orgInfoObj.getOrgCodeId()));
			}
		}
		if(orgCodeSet.size()!=0)
		orConditions.add(Restrictions.in("id", orgCodeSet));
		criteria.add(orConditions);
		return criteria.list();
	}
	
	//Method added for gettting org list by ordersysteminfo id
	@Override
	public List<Org> getOrgByOrderSystemInfoId(Long orderSystemInfoId) throws Exception {

		List list = new ArrayList();
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(OrgInfo.class);
		criteria.createAlias("varOrderSystemInfo", "varOrderSystemInfo")
				.add(Restrictions.eq("varOrderSystemInfo.id", orderSystemInfoId));

		List<OrgInfo> orgInfoList = criteria.list();
		Set<OrgInfo> set = new HashSet<OrgInfo>();
		set.addAll(orgInfoList);
		for (OrgInfo orgInfo : set) {
			int orgCodeId = orgInfo.getOrgCodeId();

			Org org = (Org) session.get(Org.class, Long.valueOf(orgCodeId));
			HashMap<String, String> hashMap = new HashMap<String, String>();
			hashMap.put("id", org.getId() + "");
			hashMap.put("name", org.getName());
			list.add(hashMap);
		}
		return list;
	}

}
