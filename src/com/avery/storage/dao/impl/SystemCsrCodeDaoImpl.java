package com.avery.storage.dao.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MultivaluedMap;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.app.config.SpringConfig;
import com.avery.exception.CsrCodeNotFoundException;
import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.SystemCsrCode;
import com.avery.storage.entities.User;
import com.avery.storage.service.UserService;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.MessageUtils;

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
			conjunction.add(Restrictions.eq("isActive", "true")
			  ).add(Restrictions.eq("varSystemInfo.id", systemId)) .add(Restrictions.eq("varOrg.id", orgId));
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
	
	@Override
	public boolean checkIfCsrCodeExists(long systemId, long orgId, String csrCode) {
		Session session = null;
		Criteria criteria = null;
		boolean recordExists = false;
		try {
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(SystemCsrCode.class).createAlias("varSystemInfo", "varSystemInfo")
					.createAlias("varOrg", "varOrg");
			Conjunction conjunction = Restrictions.conjunction();
			conjunction.add(Restrictions.eq("isActive", "true")
			 ).add(Restrictions.eq("varSystemInfo.id", systemId)).add(Restrictions.eq("varOrg.id", orgId)
			 ).add(Restrictions.eq("csrCode", csrCode));
			criteria.add(conjunction);
			if(criteria.list().size() > 0){
				recordExists = true;
			}
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Some error occured while fetching the data -> " + e);
			throw new WebApplicationException();
		}
		return recordExists;
	}
	
	@Override
	public boolean removeCSRCode(String entityId) throws CsrCodeNotFoundException{
		boolean flag = false, changeFlag = false;
		Session session = null;
		Criteria criteria = null;
		try{
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			session = getSessionFactory().getCurrentSession();
			Disjunction disCriteria = Restrictions.disjunction();
			disCriteria.add(Restrictions.ilike("systemCsrNonCodeOwner", entityId.toString(), MatchMode.ANYWHERE))
					.add(Restrictions.ilike("systemCsrCodeOwner", entityId.toString(), MatchMode.ANYWHERE));
			criteria = session.createCriteria(User.class)
					.add(disCriteria);
			List<User> userList = criteria.list();
			for(User user : userList){
				String systemCsrNonCodeOwner = user.getSystemCsrNonCodeOwner();
				String systemCsrCodeOwner = user.getSystemCsrCodeOwner();
				
				List<String> ownerCodeList = new ArrayList<String>();
				ownerCodeList.addAll(ApplicationUtils.convertStringToList(systemCsrCodeOwner));
				
				List<String> nonOwnerCodeList = new ArrayList<String>();
				nonOwnerCodeList.addAll(ApplicationUtils.convertStringToList(systemCsrNonCodeOwner));
//				List<String> codeList = new ArrayList(Arrays.asList(systemCsrNonCodeOwner.split(",")));
				if(nonOwnerCodeList.contains(entityId)){
					nonOwnerCodeList.remove(entityId);
					systemCsrNonCodeOwner = StringUtils.join(nonOwnerCodeList, ",");
					user.setSystemCsrNonCodeOwner(systemCsrNonCodeOwner);
					changeFlag = true;
				}
				
				if(ownerCodeList.contains(entityId)){
					ownerCodeList.remove(entityId);
					systemCsrCodeOwner = StringUtils.join(ownerCodeList, ",");
					user.setSystemCsrCodeOwner(systemCsrCodeOwner);
					changeFlag = true;
				}
				
				if(changeFlag){
					userService.update(user);
				}
			}
			SystemCsrCode systemCsrCode = (SystemCsrCode) session.get(SystemCsrCode.class, Long.parseLong(entityId));
			if(systemCsrCode == null)
				throw new CsrCodeNotFoundException("No CSR code found for id -> "+entityId);
			session.delete(systemCsrCode);
			flag = true;
		}
		catch(CsrCodeNotFoundException e){
			throw e;
		}
		catch(Exception e){
			e.printStackTrace();
			AppLogger.getSystemLogger().error(MessageUtils.CSRCODE_REMOVE_FAILURE+" -> "+e);
		}
		return flag;
	}
	
	@Override
	public SystemCsrCode getEntitiesWithCsrCode(String csrCode) throws Exception {
		Session session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(SystemCsrCode.class).createAlias("varUser", "varUser")
		.add(Restrictions.eq("isActive", "true")).add(Restrictions.eq("csrCode", csrCode));
		List systemCsrCodeList=criteria.list();
		SystemCsrCode systemCsrCode=null;
		if(systemCsrCodeList != null && systemCsrCodeList.size() > 0)
		systemCsrCode=(SystemCsrCode) systemCsrCodeList.get(0);
		return systemCsrCode;
	}
}
