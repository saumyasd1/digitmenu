package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.ProductLineArchive;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

@Repository
public class ProductLineArchiveDaoImpl extends GenericDaoImpl<ProductLineArchive, Long> implements
ProductLineArchiveDao {

	@Override
	public Long create(ProductLineArchive newInstance) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProductLineArchive read(Long id) {
		// TODO Auto-generated method stub
		return null;
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
		criteria = session.createCriteria(ProductLineArchive.class);
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
				criteria.add(Restrictions.ilike("productlinetype", productLineType,MatchMode.ANYWHERE));
			}
		}
		    criteria.addOrder(Order.desc("lastModifiedDate"));
			totalCount=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if(pageNO!=0){
        criteria.setFirstResult((pageNO - 1) * pageSize);
        criteria.setMaxResults(pageSize);
		}
        entitiesMap.put("totalCount", totalCount);
        entitiesMap.put("ar_partner_rboproductline", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}
}
