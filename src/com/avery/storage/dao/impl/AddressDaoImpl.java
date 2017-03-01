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
		Map entitiesMap = new HashMap();
		Session session = null;
		Criteria criteria = null;
		Criteria criteria_org = null;
		Criteria criteria_system = null;
		Criteria criteria_site = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(Address.class);
		String queryString = (String) queryMap.getFirst("query");
		if (queryString != null) {
			Map<String, String> searchMap = ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType = searchMap.get("datecriteriavalue");
			if (dateType != null && !dateType.equals("")) {
				String sDate = searchMap.get("fromDate") + " 00:00:00";
				String eDate = searchMap.get("toDate") + " 00:00:00";
				criteria = HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String partnerName = searchMap.get("partnerName");
			if (partnerName != null && !"".equals(partnerName)) {
				criteria.add(Restrictions.ilike("varPartner.partnerName", partnerName, MatchMode.ANYWHERE));
			}
			String address = searchMap.get("address");
			if (address != null && !"".equals(address)) {
				Disjunction disCriteria = Restrictions.disjunction();
				disCriteria.add(Restrictions.ilike("address1", address, MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address2", address, MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address3", address, MatchMode.ANYWHERE));
				disCriteria.add(Restrictions.ilike("address4", address, MatchMode.ANYWHERE));
				criteria.add(disCriteria);
			}

			String siteType = searchMap.get("siteType");
			if (siteType != null && !"".equals(siteType)) {
				criteria.add(Restrictions.ilike("siteType", siteType, MatchMode.ANYWHERE));
			}

			String siteNumber = searchMap.get("siteNumber");
			if (siteNumber != null && !"".equals(siteNumber)) {
				criteria.add(Restrictions.ilike("siteNumber", siteNumber, MatchMode.ANYWHERE));
			}

		}

		int totalCount = 0;
		ProjectionList proj = Projections.projectionList();
		proj.add(Projections.property("varOrgCode.name"), "orgCodeName")
				.add(Projections.property("varPartner.partnerName"), "partnerName")
				.add(Projections.property("varOrgCode.id"), "orgCodeId")
				.add(Projections.property("varPartner.id"), "partnerId")
				.add(Projections.property("address1"), "address1").add(Projections.property("address2"), "address2")
				.add(Projections.property("address3"), "address3").add(Projections.property("address4"), "address4")
				.add(Projections.property("siteNumber"), "siteNumber").add(Projections.property("contact"), "contact")
				.add(Projections.property("phone1"), "phone1").add(Projections.property("fax"), "fax")
				.add(Projections.property("email"), "email").add(Projections.property("siteType"), "siteType")
				.add(Projections.property("description"), "description")
				.add(Projections.property("freightTerms"), "freightTerms").add(Projections.property("state"), "state")
				.add(Projections.property("city"), "city").add(Projections.property("siteId"), "siteId")
				.add(Projections.property("system"), "system").add(Projections.property("country"), "country")
				.add(Projections.property("shippingMethod"), "shippingMethod").add(Projections.property("zip"), "zip")
				.add(Projections.property("id"), "id");
		
		criteria.addOrder(Order.desc("lastModifiedDate"));
		
		criteria.createAlias("varOrgCode", "varOrgCode").createAlias("varPartner", "varPartner");

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

		criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(Address.class));
		List<Address> list = criteria.list();
		if (queryMap.getFirst("orgCodeName") != null) {
			String orgCode = (String) queryMap.getFirst("orgCodeName");
			String orgUniqueName = orgCode;
			criteria.add(Restrictions.eq("varOrgCode.name", orgUniqueName));
			System.out.println(orgUniqueName);

		}
		if (queryMap.getFirst("partnerName") != null) {
			String partnerName = (String) queryMap.getFirst("partnerName");
			String partnerUniqueName = partnerName;
			criteria.add(Restrictions.eq("varPartner.partnerName", partnerUniqueName));
			System.out.println(partnerUniqueName);

		}

		if (queryMap.getFirst("partnerId") != null) {
			String partnerId = (String) queryMap.getFirst("partnerId");
			Long partnerUniqueId = Long.parseLong(partnerId);
			criteria.add(Restrictions.eq("varPartner.id", partnerUniqueId));
			System.out.println(partnerUniqueId);

		}
		entitiesMap.put("totalCount", totalCount);
		entitiesMap.put("address", new LinkedHashSet(list));

		return entitiesMap;
	}
	
}
