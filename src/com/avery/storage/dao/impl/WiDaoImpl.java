package com.avery.storage.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MixIn.WiMixIn;
import com.avery.storage.MixIn.WiSchemaIdentificationMixIn;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Wi;
import com.avery.storage.entities.WiAocField;
import com.avery.storage.entities.WiAocFieldNameInfo;
import com.avery.storage.entities.WiFiles;
import com.avery.storage.entities.WiOrg;
import com.avery.storage.entities.WiOrgInfo;
import com.avery.storage.entities.WiSchemaIdentification;
import com.avery.storage.entities.WiSystem;
import com.avery.storage.entities.WiSystemInfo;
import com.avery.storage.entities.WiSystemLevel;
import com.avery.storage.service.WiService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

/**
 * @author Vishal
 *
 */
@Repository
public class WiDaoImpl extends GenericDaoImpl<Wi, Long> implements WiDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map entitiesMap = new HashMap();
		Session session = null;
		Criteria criteria = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(Wi.class);

		List<Wi> list = criteria.list();
		HashMap<String, Map> wiStatusList = ApplicationUtils.wiStatusCode;
		if (wiStatusList == null)
			throw new Exception("Unable to fetch Status List.");
		for (Wi wi : list) {
			String status = wi.getStatus();
//			if (status == null | status.equals(""))
//				throw new Exception("Unidentified value found for the status.");
			Map<String, String> statusCodes = wiStatusList.get(status);
//			if (statusCodes == null)
			// throw new Exception("No data found in the status table for
			// status:: \"" + status + "\".");
			if (status != null && !"".equals(status)) {
				String iconName = statusCodes.get("iconName");
				String colorCode = statusCodes.get("colorCode");
				String codeValue = statusCodes.get("codeValue");
				wi.setIconName(iconName);
				wi.setColorCode(colorCode);
				wi.setCodeValue(codeValue);
			} else {
				wi.setCodeValue("");

			}
		}

		entitiesMap.put("wi", criteria.list());
		return entitiesMap;
	}

	@Override
	public long create(String wiData) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader reader = null;
		Session session = null;
		Wi wi = null;
		Long wiId = null;
		try {
			session = getSessionFactory().getCurrentSession();
			mapper.addMixIn(Wi.class, WiMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);
			HashMap<String, Object> entitiesMap = ApplicationUtils.convertJSONtoObjectMaps(wiData);
			// Map<String, String> map = (Map<String, String>)
			// entitiesMap.get("");
			wi = mapper.readValue(mapper.writeValueAsString(entitiesMap), Wi.class);
			WiService wiService = (WiService) SpringConfig.getInstance().getBean("wiService");
			wi.setStatus("1");
			wiId = wiService.create(wi);
			Wi wiObj = new Wi();
			wiObj.setId(wiId);
			List listWiOrg = (ArrayList) entitiesMap.get("listWiOrg");
			List listWiSystemLevel = (ArrayList) entitiesMap.get("listWiSystemLevel");
			List listWiAocField = (ArrayList) entitiesMap.get("listWiAocField");
			List listWiSystem = (ArrayList) entitiesMap.get("listWiSystem");
			saveWiOrgList(listWiOrg, wiId);
			saveWiAocFieldList(listWiAocField, wiId);
			saveWiSystemList(listWiSystem, wiId);
			saveWiSystemLevelList(listWiSystemLevel, wiId);
			LinkedHashMap listWiSchemaIdentification = (LinkedHashMap) entitiesMap.get("listWiSchemaIdentification");
			WiSchemaIdentification wiSchemaIdentification = mapper
					.readValue(mapper.writeValueAsString(listWiSchemaIdentification), WiSchemaIdentification.class);
			wiSchemaIdentification.setVarWi(wiObj);
			session.save(wiSchemaIdentification);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return wiId;
	}

	/**
	 * Method for saving and updating the WiOrg table data
	 * 
	 * @param listWiOrg
	 * @param wiId
	 * @throws Exception
	 */
	public void saveWiOrgList(List listWiOrg, Long wiId) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Wi wiObj = new Wi();
		wiObj.setId(wiId);
		Session session = null;
		WiOrgInfo wiOrgInfoObj = new WiOrgInfo();
		Long entityId = 0L;
		try {
			session = getSessionFactory().getCurrentSession();
			for (Object obj : listWiOrg) {
				LinkedHashMap entityMap = (LinkedHashMap) obj;
				// entityId = Long.parseLong((String)
				// entityMap.get("parentId"));
				entityId = Long.parseLong(String.valueOf(entityMap.get("parentId")));
				wiOrgInfoObj.setId(entityId);
				WiOrg wiOrg = mapper.readValue(mapper.writeValueAsString(entityMap), WiOrg.class);
				wiOrg.setVarWi(wiObj);
				wiOrg.setVarWiOrgInfo(wiOrgInfoObj);
				session.saveOrUpdate(wiOrg);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	/**
	 * Method for saving and updating the WiSystemLevel table data
	 * 
	 * @param listWiSystemLevel
	 * @param wiId
	 * @throws Exception
	 */
	public void saveWiSystemLevelList(List listWiSystemLevel, Long wiId) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Wi wiObj = new Wi();
		wiObj.setId(wiId);
		Session session = null;
		try {
			session = getSessionFactory().getCurrentSession();
			for (Object obj : listWiSystemLevel) {
				LinkedHashMap entityMap = (LinkedHashMap) obj;
				WiSystemLevel wiSystemLevel = mapper.readValue(mapper.writeValueAsString(entityMap),
						WiSystemLevel.class);
				wiSystemLevel.setVarWi(wiObj);
				session.saveOrUpdate(wiSystemLevel);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	/**
	 * Method for saving and updating the WiAocField table data
	 * 
	 * @param listWiAocField
	 * @param wiId
	 * @throws Exception
	 */
	public void saveWiAocFieldList(List listWiAocField, Long wiId) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Wi wiObj = new Wi();
		wiObj.setId(wiId);
		Session session = null;
		WiAocFieldNameInfo aocFieldInfoObj = new WiAocFieldNameInfo();
		Long entityId = 0L;
		try {
			session = getSessionFactory().getCurrentSession();
			for (Object obj : listWiAocField) {
				LinkedHashMap entityMap = (LinkedHashMap) obj;
				entityId = Long.parseLong(String.valueOf(entityMap.get("parentId")));
				aocFieldInfoObj.setId(entityId);
				WiAocField wiAocField = mapper.readValue(mapper.writeValueAsString(entityMap), WiAocField.class);
				wiAocField.setVarWi(wiObj);
				wiAocField.setVarWiAocFieldNameInfo(aocFieldInfoObj);
				session.saveOrUpdate(wiAocField);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	/**
	 * Method for saving and updating the WiSystem table data
	 * 
	 * @param listWiSystem
	 * @param wiId
	 * @throws Exception
	 */
	public void saveWiSystemList(List listWiSystem, Long wiId) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Wi wiObj = new Wi();
		wiObj.setId(wiId);
		Session session = null;
		WiSystemInfo systemInfoObj = new WiSystemInfo();
		Long entityId = 0L;
		try {
			session = getSessionFactory().getCurrentSession();
			for (Object obj : listWiSystem) {
				LinkedHashMap entityMap = (LinkedHashMap) obj;
				entityId = Long.parseLong(String.valueOf(entityMap.get("parentId")));
				systemInfoObj.setId(entityId);
				WiSystem wiSystem = mapper.readValue(mapper.writeValueAsString(entityMap), WiSystem.class);
				wiSystem.setVarWi(wiObj);
				wiSystem.setVarWiSystemInfo(systemInfoObj);
				session.saveOrUpdate(wiSystem);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public Map getDataForViewForm(Long entityId) {
		Map entitiesMap = new HashMap();
		List list = new ArrayList();
		Session session = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.addMixIn(Wi.class, WiMixIn.class);
			mapper.addMixIn(WiSchemaIdentification.class, WiSchemaIdentificationMixIn.class);
			session = getSessionFactory().getCurrentSession();
			Criteria criteria = session.createCriteria(Wi.class).add(Restrictions.eq("id", entityId));
			list = criteria.list();
			Object obj = criteria.list().get(0);
			Map<String, Object> map = mapper.convertValue(obj, Map.class);
			Criteria schemIdentCriteria = session.createCriteria(WiSchemaIdentification.class)
					.createAlias("varWi", "varWi").add(Restrictions.eq("varWi.id", entityId));
			map.put("listWiSchemaIdentification", schemIdentCriteria.list().get(0));
			entitiesMap.put("formdata", map);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return entitiesMap;
	}

	@Override
	public Long update(String data) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		ObjectReader reader = null;
		Session session = null;
		Long wiId = null;
		try {
			session = getSessionFactory().getCurrentSession();
			mapper.addMixIn(Wi.class, WiMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);
			HashMap<String, Object> entitiesMap = ApplicationUtils.convertJSONtoObjectMaps(data);
			Wi wi = mapper.readValue(mapper.writeValueAsString(entitiesMap), Wi.class);
			session.update(wi);
			wiId = Long.parseLong((String) entitiesMap.get("id"));
			Wi wiObj = new Wi();
			wiObj.setId(wiId);
			List listWiOrg = (ArrayList) entitiesMap.get("listWiOrg");
			List listWiSystemLevel = (ArrayList) entitiesMap.get("listWiSystemLevel");
			List listWiAocField = (ArrayList) entitiesMap.get("listWiAocField");
			List listWiSystem = (ArrayList) entitiesMap.get("listWiSystem");
			saveWiOrgList(listWiOrg, wiId);
			saveWiAocFieldList(listWiAocField, wiId);
			saveWiSystemList(listWiSystem, wiId);
			saveWiSystemLevelList(listWiSystemLevel, wiId);
			LinkedHashMap listWiSchemaIdentification = (LinkedHashMap) entitiesMap.get("listWiSchemaIdentification");
			WiSchemaIdentification wiSchemaIdentification = mapper
					.readValue(mapper.writeValueAsString(listWiSchemaIdentification), WiSchemaIdentification.class);
			wiSchemaIdentification.setVarWi(wiObj);
			session.saveOrUpdate(wiSchemaIdentification);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return wiId;
	}

	@Override
	public boolean saveFileData(String wiId, String directoryPath, String fileName, String fileType) {
		Session session = null;
		Criteria criteria = null;
		Wi wiObj = new Wi();
		wiObj.setId(Long.parseLong(wiId));
		try {
			session = getSessionFactory().getCurrentSession();
			WiFiles wiFilesObj = new WiFiles();
			wiFilesObj.setVarWi(wiObj);
			wiFilesObj.setFilePath(directoryPath);
			wiFilesObj.setFileName(fileName);
			wiFilesObj.setFileType(fileType);
			session.save(wiFilesObj);
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error while uploading the file ", ex);
			ex.printStackTrace();
			return false;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error while uploading the file ", e);
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
