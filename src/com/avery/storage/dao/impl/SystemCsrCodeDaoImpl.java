package com.avery.storage.dao.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.SystemCsrCode;
import com.avery.storage.entities.User;

/**
 * @author Vishal
 *
 */
@Repository
public class SystemCsrCodeDaoImpl extends GenericDaoImpl<SystemCsrCode, Long> implements SystemCsrCodeDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map<String, Object> entitiesMap = new HashMap<String, Object>();
		String systemCsrCombinedCodes = (String) queryMap.getFirst("systemCsrCombinedCodes");
		StringTokenizer st = new StringTokenizer(systemCsrCombinedCodes, ",");
		List<Long> list = new ArrayList<Long>();
		while (st.hasMoreTokens()) {
			try {
				list.add(Long.parseLong(st.nextToken()));
			} catch (NumberFormatException nfe) {
				throw new NumberFormatException();
			}
		}
		Session session = null;
		Criteria criteria = null;
		session = getSessionFactory().getCurrentSession();
		ProjectionList proj = Projections.projectionList();
		proj.add(Projections.property("csrCode"), "csrCode").add(Projections.property("id"), "id")
				.add(Projections.property("varSystemInfo.id"), "systemId")
				.add(Projections.property("varSystemInfo.name"), "systemName")
				.add(Projections.property("varOrg.id"), "orgCodeId")
				.add(Projections.property("varOrg.name"), "orgCode");
		criteria = session.createCriteria(SystemCsrCode.class).createAlias("varSystemInfo", "varSystemInfo")
				.createAlias("varOrg", "varOrg");
		criteria.add(Restrictions.in("id", list));
		criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(SystemCsrCode.class));
		entitiesMap.put("data", criteria.list());
		return entitiesMap;
	}

	@Override
	public Map<String, Object> getBySystemAndOrgCodeId(long systemId, long orgId) {
		Map<String, Object> entitiesMap = new HashMap<String, Object>();
		Session session = null;
		Criteria criteria = null;
		try {
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(SystemCsrCode.class).createAlias("varSystemInfo", "varSystemInfo")
					.createAlias("varOrg", "varOrg");
			Conjunction conjunction = Restrictions.conjunction();
			conjunction.add(Restrictions.eq("isActive", "true")).add(Restrictions.eq("varSystemInfo.id", systemId))
					.add(Restrictions.eq("varOrg.id", orgId));
			criteria.add(conjunction);
			entitiesMap.put("data", criteria.list());
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Some error occured while fetching the data -> " + e);
			throw new WebApplicationException();
		}
		return entitiesMap;
	}

	@Override
	public List<SystemCsrCode> readAll() {
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(SystemCsrCode.class).add(Restrictions.eq("isActive", "true"));
		return criteria.list();
	}

	@Override
	public String getSystemcsrcodeById(String id) {
		String[] Systemcsrcode = id.split(",");
		String systemCsrCodeName = "";
		String sendName = "";
		Long[] sysemcsrcodeId = new Long[Systemcsrcode.length];
		try {
			for (int k = 0; k < Systemcsrcode.length; k++) {
				sysemcsrcodeId[k] = Long.parseLong(Systemcsrcode[k]);
			}
			Session session = getSessionFactory().getCurrentSession();
			Criteria criteria = session.createCriteria(SystemCsrCode.class).add(Restrictions.in("id", sysemcsrcodeId));
			List<SystemCsrCode> systemcsrcodelist = criteria.list();
			for (int j = 0; j < systemcsrcodelist.size(); j++) {
				systemCsrCodeName = systemCsrCodeName + ",";
				SystemCsrCode systemCsrCode = (SystemCsrCode) systemcsrcodelist.get(j);
				systemCsrCodeName = systemCsrCodeName + systemCsrCode.getCsrCode();
			}
			sendName = systemCsrCodeName.substring(1);
		} catch (Exception e) {
			systemCsrCodeName = "";
		}
		return sendName;
	}

	@Override
	public boolean updateOwnerStatus(String systemCsrCodeOwner, String oldSystemCsrCodeOwner, String userId) {
		boolean flag = false;
		Session session = null;
		List<String> list = new ArrayList<String>();
		List<String> newList = new ArrayList<String>();
		if (oldSystemCsrCodeOwner != null && !"".equals(oldSystemCsrCodeOwner.trim()))
			list.addAll(Arrays.asList(oldSystemCsrCodeOwner.split(",")));
		if (systemCsrCodeOwner != null && !"".equals(systemCsrCodeOwner.trim()))
			list.addAll(Arrays.asList(systemCsrCodeOwner.split(",")));
		if (systemCsrCodeOwner != null && !"".equals(systemCsrCodeOwner.trim()))
			newList.addAll(Arrays.asList(systemCsrCodeOwner.split(",")));
		try {
			session = getSessionFactory().getCurrentSession();
			for (int i = 0; i < list.size(); i++) {
				String currentId = list.get(i);
				SystemCsrCode systemCsrCode = (SystemCsrCode) session.get(SystemCsrCode.class,
						Long.parseLong(currentId));
				User user = new User();
				if (newList.contains(currentId)) {
					systemCsrCode.setHasOwner("true");
					user.setId(Long.parseLong(userId));
					systemCsrCode.setVarUser(user);
				} else {
					systemCsrCode.setHasOwner("false");
					systemCsrCode.setVarUser(null);
				}
				session.update(systemCsrCode);
			}
			flag = true;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Some error occured while updating the owner status");
			e.printStackTrace();
		}
		return flag;
	}
}
