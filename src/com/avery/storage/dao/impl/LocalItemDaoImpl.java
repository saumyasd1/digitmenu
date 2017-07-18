package com.avery.storage.dao.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.apache.commons.lang.math.NumberUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.LocalItem;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

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
		}
		return criteria;
	}

}
