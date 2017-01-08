package com.avery.storage.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Address;
import com.avery.storage.entities.Org;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.Site;
import com.avery.storage.entities.SystemInfo;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

@Repository
public class AddressDaoImpl extends GenericDaoImpl<Address, Long> implements
		AddressDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map entitiesMap =new HashMap();
		Session session=null;
		Criteria criteria=null;
        Criteria criteria_org = null;
        Criteria criteria_system = null;
        Criteria criteria_site = null;
		int totalCount=0;
		String queryString=(String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(Address.class);
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
			String partnerName=searchMap.get("partnerName");
			if(partnerName!=null && !"".equals(partnerName)){
				criteria.createAlias("partner", "partner");
	            criteria.add(Restrictions.ilike("partner"+".partnerName",partnerName,MatchMode.ANYWHERE));
//				criteria.add(Restrictions.ilike("partnerName", partnerName,MatchMode.ANYWHERE));
			}
			String address=searchMap.get("address");
			if(address!=null && !"".equals(address)){
				Disjunction disCriteria = Restrictions.disjunction();
				disCriteria.add(Restrictions.ilike("address1", address,MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address2", address,MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address3", address,MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address4", address,MatchMode.ANYWHERE));
				criteria.add(disCriteria);
			}
			
			String systemname=searchMap.get("address");
			if(address!=null && !"".equals(address)){
				Disjunction disCriteria = Restrictions.disjunction();
				disCriteria.add(Restrictions.ilike("address1", address,MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address2", address,MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address3", address,MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address4", address,MatchMode.ANYWHERE));
				criteria.add(disCriteria);
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
        entitiesMap.put("address", new LinkedHashSet(criteria.list()));
        
      
        return entitiesMap;
	}

	
}
