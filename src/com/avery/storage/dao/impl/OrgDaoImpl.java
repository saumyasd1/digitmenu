package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
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
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.Org;
import com.avery.storage.entities.OrgInfo;
import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.SystemInfo;
import com.avery.storage.service.ProductLineService;

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
		return null;
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
	
}
