package com.avery.storage.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Address;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;

@Repository
public class AddressDaoImpl extends GenericDaoImpl<Address, Long> implements AddressDao {

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
			String siteId = searchMap.get("siteId");
			if (siteId != null && !siteId.equals("") && !siteId.isEmpty()) {
				criteria.add(Restrictions.eq("siteId", Integer.parseInt(siteId)));
			}
		}
		String siteId = (String) queryMap.getFirst("siteId");
		if (!siteId.equals("") && siteId != null && !siteId.isEmpty()) {
			criteria.add(Restrictions.eq("siteId", Integer.parseInt(siteId)));
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
				.add(Projections.property("id"), "id")
				.add(Projections.property("shippingInstructions"), "shippingInstructions")
				.add(Projections.property("phone2"), "phone2");

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

		}
		if (queryMap.getFirst("partnerName") != null) {
			String partnerName = (String) queryMap.getFirst("partnerName");
			String partnerUniqueName = partnerName;
			criteria.add(Restrictions.eq("varPartner.partnerName", partnerUniqueName));

		}

		if (queryMap.getFirst("partnerId") != null) {
			String partnerId = (String) queryMap.getFirst("partnerId");
			Long partnerUniqueId = Long.parseLong(partnerId);
			criteria.add(Restrictions.eq("varPartner.id", partnerUniqueId));

		}
		entitiesMap.put("totalCount", totalCount);
		entitiesMap.put("address", list);

		return entitiesMap;
	}

	@Override
	public List<Address> getAddress(String siteId) {
		Map<String, Object> responseMap = new HashMap<String, Object>();
		Session session = null;
		Criteria criteria = null;
		Address address = null;
		List<Address> addresslist = new ArrayList<Address>();
		List<Address> addressList = new ArrayList<Address>();
		Integer userSiteId = Integer.parseInt(siteId);
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(Address.class);
		Conjunction disCriteria = Restrictions.conjunction();
		disCriteria.add(Restrictions.eq("siteId", userSiteId));
		criteria.add(disCriteria);
		addressList = criteria.list();
		for (Address addressIter : addressList) {
			if (addressIter != null) {
				address = addressIter;
				address.setId(address.getId());
				address.setOrgCodeId(address.getVarOrgCode().getId());
				address.setPartnerId(address.getVarPartner().getId());
				address.setPartnerName(address.getVarPartner().getPartnerName());
				address.setOrgCodeName(address.getVarOrgCode().getName());
				address.setSystem(address.getSystem());
				addresslist.add(address);
			}

		}
		try {
			responseMap.put("address", addresslist);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return addresslist;
	}

	@Override
	public Boolean checkDuplicateSiteId(Address addrObj) {
		Session session = null;
		Criteria criteria = null;
		int totalCount = 0;
		String siteNumber = addrObj.getSiteNumber();
		String address1 = addrObj.getAddress1();
		String address2 = addrObj.getAddress2();
		String address3 = addrObj.getAddress3();
		String address4 = addrObj.getAddress4();
		String siteType = addrObj.getSiteType();
		String addressValue = address1.concat(" " + address2 +" "+ address3+" "+address4);
		Long id = addrObj.getId();
		Boolean siteExist = false;
		List<Address> address = null;
		session = getSessionFactory().getCurrentSession();
		
		criteria = session.createCriteria(Address.class);
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
				.add(Projections.property("id"), "id")
				.add(Projections.property("shippingInstructions"), "shippingInstructions")
				.add(Projections.property("phone2"), "phone2");
		criteria.createAlias("varOrgCode", "varOrgCode");
		if (siteNumber != null && !"".equals(siteNumber) && siteType!=null && !"".equals(siteType) && address1 != null && !"".equals(address1)) {
			Conjunction disCriteria = Restrictions.conjunction();
			disCriteria.add(Restrictions.eq("siteType", siteType));
			disCriteria.add(Restrictions.eq("siteNumber", siteNumber));
			disCriteria.add(Restrictions.eq("address1", address1));
			if(address2 != null && !"".equals(address2) && address2 != null ){
			disCriteria.add(Restrictions.eq("address2", address2));
			}
			if(address3 != null && !"".equals(address3) && address3 != null){
				disCriteria.add(Restrictions.eq("address3", address3));
			}
			if(address4 != null && !"".equals(address4) && address4 != null ){
				disCriteria.add(Restrictions.eq("address4", address4));
			}
			if (id != 0) {
				disCriteria.add(Restrictions.ne("id", id));
			}
			criteria.add(disCriteria);
			address = criteria.list();
			totalCount = address.size();
			if (totalCount > 0)
				siteExist = true;
		}
		return siteExist;
	}

	
	@Override
	public Boolean checkDuplicateAddress(String billToSiteNumber, String shipToSiteNumber, Boolean billType,
			Boolean shipType, String siteId, String billToAddress, String billToAddress2, String billToAddress3,
			String shipToAddress, String shipToAddress2, String shipToAddress3) {
		Session session = null;
		Criteria criteria = null;
		int totalCount = 0;
		Address addrObj = new Address();
		Long id = addrObj.getId();
		Boolean siteExist = false;
		String siteType = "";
		List<Address> address = null;
		session = getSessionFactory().getCurrentSession();
		Conjunction disCriteria = Restrictions.conjunction();
		criteria = session.createCriteria(Address.class);
		if (billType) {
			siteType = "B";
			if (billToSiteNumber != null && !"".equals(billToSiteNumber) && siteType != null && !"".equals(siteType)
					&& billToAddress != null && !"".equals(billToAddress)) {
				disCriteria.add(Restrictions.eq("siteNumber", billToSiteNumber));
				disCriteria.add(Restrictions.eq("siteType", siteType));
				disCriteria.add(Restrictions.eq("address1", billToAddress));
				if (billToAddress2 != null && !"".equals(billToAddress2)) {
					disCriteria.add(Restrictions.eq("address2", billToAddress2));
				}
				if (billToAddress3 != null && !"".equals(billToAddress3)) {
					disCriteria.add(Restrictions.eq("address3", billToAddress3));
				}
				if (id != 0) {
					disCriteria.add(Restrictions.ne("id", id));
				}
				criteria.add(disCriteria);
				address = criteria.list();
				totalCount = address.size();
				if (totalCount > 0)
					siteExist = true;
			}
		}
		if (shipType) {
			siteType = "S";
			if (shipToSiteNumber != null && !"".equals(shipToSiteNumber) && siteType != null && !"".equals(siteType)
					&& shipToAddress != null && !"".equals(shipToAddress)) {
				disCriteria.add(Restrictions.eq("siteNumber", shipToSiteNumber));
				disCriteria.add(Restrictions.eq("siteType", siteType));
				disCriteria.add(Restrictions.eq("address1", shipToAddress));
				if (shipToAddress2 != null && !"".equals(shipToAddress2)) {
					disCriteria.add(Restrictions.eq("address2", shipToAddress2));
				}
				if (shipToAddress3 != null && !"".equals(shipToAddress3)) {
					disCriteria.add(Restrictions.eq("address3", shipToAddress3));
				}
				if (id != 0) {
					disCriteria.add(Restrictions.ne("id", id));
				}
				criteria.add(disCriteria);
				address = criteria.list();
				totalCount = address.size();
				if (totalCount > 0)
					siteExist = true;
			}
		}
		return siteExist;
	}

	

	

}
