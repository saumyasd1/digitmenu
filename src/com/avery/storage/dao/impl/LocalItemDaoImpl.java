package com.avery.storage.dao.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.LocalItem;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.sun.research.ws.wadl.Application;

/**
 * @author Vishal
 *
 */
@Repository
public class LocalItemDaoImpl extends GenericDaoImpl<LocalItem, Long> implements LocalItemDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map<String, Object> entitiesMap = new HashMap<String, Object>();
		int totalCount = 0;
		Criteria criteria = getCriteria(queryMap);

		criteria.addOrder(Order.desc("lastModifiedDate"));

		String limit = (String) queryMap.getFirst("limit");
		String pageNo = (String) queryMap.getFirst("page");

		totalCount = HibernateUtils.getAllRecordsCountWithCriteria(criteria);

		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if (pageNO != 0) {
			criteria.setFirstResult((pageNO - 1) * pageSize);
			criteria.setMaxResults(pageSize);
		}

		entitiesMap.put("totalCount", totalCount);
		entitiesMap.put("localitem", criteria.list());
		return entitiesMap;
	}

	public Criteria getCriteria(MultivaluedMap queryMap) throws IOException, Exception {
		Session session = null;
		Criteria criteria = null;
		String queryString = (String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(LocalItem.class);
		if (queryString != null) {
			Map<String,String> searchMap=ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType=searchMap.get("datecriteriavalue");
			if(dateType!=null && !dateType.equals("")){
				String sDate=searchMap.get("fromDate")+" 00:00:00";
				String eDate=searchMap.get("toDate")+" 00:00:00";
				criteria=HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String id=searchMap.get("id");
			if(id!=null && !"".equals(id) && NumberUtils.isNumber(id)){
				Long entityId = Long.parseLong(id);
				criteria.add(Restrictions.eq("id",entityId));
			}
			
			String partnerName=searchMap.get("partnerName");
			if(partnerName!=null && !"".equals(partnerName.trim())){
				criteria.add(Restrictions.ilike("partnerName",partnerName,MatchMode.ANYWHERE));
			}
			
			String rboName=searchMap.get("rboName");
			if(rboName!=null && !"".equals(rboName.trim())){
				criteria.add(Restrictions.ilike("rboName",rboName,MatchMode.ANYWHERE));
			}
			
			String customerItemNO=searchMap.get("customerItemNO");
			if(customerItemNO!=null && !"".equals(customerItemNO.trim())){
				criteria.add(Restrictions.ilike("customerItemNO",customerItemNO,MatchMode.ANYWHERE));
			}
			
			String glid=searchMap.get("glid");
			if(glid!=null && !"".equals(glid.trim())){
				criteria.add(Restrictions.ilike("glid",glid,MatchMode.ANYWHERE));
			}
			
			String identifierValue=searchMap.get("identifierValue");
			if(identifierValue!=null && !"".equals(identifierValue.trim())){
				criteria.add(Restrictions.ilike("identifierValue",identifierValue,MatchMode.ANYWHERE));
			}
			
			String orgCode=searchMap.get("orgCode");
			List<String> orgCodeArr = ApplicationUtils.convertStringToList(orgCode);
			if(orgCode!=null && !"".equals(orgCode.trim())){
				criteria.add(Restrictions.in("orgCode",orgCodeArr));
			}
			
			String system=searchMap.get("systemName");
			List<String> systemArr = ApplicationUtils.convertStringToList(system);
			if(system!=null && !"".equals(system.trim())){
				criteria.add(Restrictions.in("system",systemArr));
			}
		}else
		{
			String system = (String) queryMap.getFirst("systemName");			
			List<String> systemArr = ApplicationUtils.convertStringToList(system);
			if(system!=null && !"".equals(system.trim())){
				criteria.add(Restrictions.in("system",systemArr));
			}
			String orgCode = (String) queryMap.getFirst("orgCode");
			List<String> orgCodeArr = ApplicationUtils.convertStringToList(orgCode);
			if(orgCode!=null && !"".equals(orgCode.trim())){
				criteria.add(Restrictions.in("orgCode",orgCodeArr));
			}
		}
		return criteria;
	}
	
	@Override
	public void deleteRecords(String recordId) {
		Session session = null;
		try{
			session = getSessionFactory().getCurrentSession();
			String[] records=recordId.replace("{", "").replace("}", "").replace("recordId", "").replace(":", "").replace("\"", "").replace(" ", "").split(",");
			Integer[] idArray =new Integer[records.length];
			for(int i = 0; i<records.length ; i++){
				idArray[i] = Integer.parseInt(records[i]);
			}
			for(int i = 0; i<idArray.length ; i++){
			String s = "DELETE FROM LocalItem WHERE id=:id"; 
			Query q = session.createQuery(s);
			q.setInteger("id", idArray[i]);
			q.executeUpdate();
			}
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error while deleting records", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error while deleting records", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
	}

}
