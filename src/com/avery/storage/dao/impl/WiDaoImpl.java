package com.avery.storage.dao.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MixIn.WiMixIn;
import com.avery.storage.MixIn.WiSchemaIdentificationMixIn;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Wi;
import com.avery.storage.entities.WiAocField;
import com.avery.storage.entities.WiAocFieldNameInfo;
import com.avery.storage.entities.WiBillShipMapping;
import com.avery.storage.entities.WiFiles;
import com.avery.storage.entities.WiOrg;
import com.avery.storage.entities.WiOrgInfo;
import com.avery.storage.entities.WiSchemaIdentification;
import com.avery.storage.entities.WiSystem;
import com.avery.storage.entities.WiSystemInfo;
import com.avery.storage.entities.WiSystemLevel;
import com.avery.storage.entities.WiUser;
import com.avery.storage.service.SendNotification;
import com.avery.storage.service.WiService;
import com.avery.utils.ApplicationConstants;
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
		ProjectionList proj = Projections.projectionList().add(Projections.property("id"), "id")
				.add(Projections.property("structureName"), "structureName").add(Projections.property("status"), "status")
				.add(Projections.property("varWiUser.firstName"), "assigneeFirstName")
				.add(Projections.property("varWiUser.lastName"), "assigneeLastName")
				.add(Projections.property("lastModifiedBy"), "lastModifiedBy")
				.add(Projections.property("lastModifiedDate"), "lastModifiedDate");
		criteria = session.createCriteria(Wi.class).createAlias("varWiUser", "varWiUser");
		criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(Wi.class));
		List<Wi> list = criteria.list();
		HashMap<String, Map> wiStatusList = ApplicationUtils.wiStatusCode;
		if (wiStatusList == null)
			throw new Exception("Unable to fetch Status List.");
		for (Wi wi : list) {
			String status = wi.getStatus();
			// if (status == null | status.equals(""))
			// throw new Exception("Unidentified value found for the status.");
			Map<String, String> statusCodes = wiStatusList.get(status);
			// if (statusCodes == null)
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

		entitiesMap.put("wi", new LinkedHashSet(list));
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
			// wi.setStatus("1");
			WiUser wiUserObj = new WiUser();
			wiUserObj.setId(Long.parseLong((String) entitiesMap.get("assignee")));
			wi.setVarWiUser(wiUserObj);
			Date now = new Date();
			wi.setLastModifiedDate(now);
			wiId = wiService.create(wi);
			Wi wiObj = new Wi();
			wiObj.setId(wiId);
			List listWiOrg = (ArrayList) entitiesMap.get("listWiOrg");
			List listWiSystemLevel = (ArrayList) entitiesMap.get("listWiSystemLevel");
			List listWiAocField = (ArrayList) entitiesMap.get("listWiAocField");
			List listWiSystem = (ArrayList) entitiesMap.get("listWiSystem");
			List listWiBillShipMapping = (ArrayList) entitiesMap.get("listWiBillShipMapping");
			saveWiOrgList(listWiOrg, wiId);
			saveWiAocFieldList(listWiAocField, wiId);
			saveWiSystemList(listWiSystem, wiId);
			saveWiSystemLevelList(listWiSystemLevel, wiId);
			saveWiBillShipMapping(listWiBillShipMapping, wiId);
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
		Long entityId = 0L;
		try {
			session = getSessionFactory().getCurrentSession();
			for (Object obj : listWiOrg) {
				WiOrgInfo wiOrgInfoObj = new WiOrgInfo();
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
		Long entityId = 0L;
		try {
			session = getSessionFactory().getCurrentSession();
			for (Object obj : listWiAocField) {
				WiAocFieldNameInfo aocFieldInfoObj = new WiAocFieldNameInfo();
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
		Long entityId = 0L;
		try {
			session = getSessionFactory().getCurrentSession();
			for (Object obj : listWiSystem) {
				WiSystemInfo systemInfoObj = new WiSystemInfo();
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

	/**
	 * Method for saving and updating the WiBillShipMapping table data
	 * 
	 * @param listWiBillShipMapping
	 * @param wiId
	 * @throws Exception
	 */
	public void saveWiBillShipMapping(List listWiBillShipMapping, Long wiId) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Wi wiObj = new Wi();
		wiObj.setId(wiId);
		Session session = null;
		try {
			session = getSessionFactory().getCurrentSession();
			for (Object obj : listWiBillShipMapping) {
				LinkedHashMap entityMap = (LinkedHashMap) obj;
				WiBillShipMapping wiBillShipMappingObj = mapper.readValue(mapper.writeValueAsString(entityMap),
						WiBillShipMapping.class);
				wiBillShipMappingObj.setVarWi(wiObj);
				session.saveOrUpdate(wiBillShipMappingObj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public Map getDataForViewForm(Long entityId) throws Exception {
		Map entitiesMap = new HashMap();
		List list = new ArrayList();
		Session session = null;
		ObjectMapper mapper = new ObjectMapper();
		mapper.addMixIn(Wi.class, WiMixIn.class);
		mapper.addMixIn(WiSchemaIdentification.class, WiSchemaIdentificationMixIn.class);
		session = getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(Wi.class).add(Restrictions.eq("id", entityId));
		list = criteria.list();
		Object obj = criteria.list().get(0);
		Map<String, Object> map = mapper.convertValue(obj, Map.class);
		Criteria schemaIdentCriteria = session.createCriteria(WiSchemaIdentification.class)
				.createAlias("varWi", "varWi").add(Restrictions.eq("varWi.id", entityId));
		if (schemaIdentCriteria.list().size() == 0)
			throw new ArrayIndexOutOfBoundsException();
		map.put("listWiSchemaIdentification", schemaIdentCriteria.list().get(0));
		entitiesMap.put("formdata", map);
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
			WiUser wiUserObj = new WiUser();
			wiUserObj.setId(Long.parseLong((String) entitiesMap.get("assignee")));
			wi.setVarWiUser(wiUserObj);
			Date now = new Date();
			wi.setLastModifiedDate(now);
			session.update(wi);
			wiId = Long.parseLong((String) entitiesMap.get("id"));
			Wi wiObj = new Wi();
			wiObj.setId(wiId);
			List listWiOrg = (ArrayList) entitiesMap.get("listWiOrg");
			List listWiSystemLevel = (ArrayList) entitiesMap.get("listWiSystemLevel");
			List listWiAocField = (ArrayList) entitiesMap.get("listWiAocField");
			List listWiSystem = (ArrayList) entitiesMap.get("listWiSystem");
			List listWiBillShipMapping = (ArrayList) entitiesMap.get("listWiBillShipMapping");
			saveWiOrgList(listWiOrg, wiId);
			saveWiAocFieldList(listWiAocField, wiId);
			saveWiSystemList(listWiSystem, wiId);
			saveWiSystemLevelList(listWiSystemLevel, wiId);
			saveWiBillShipMapping(listWiBillShipMapping, wiId);
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
	public boolean saveFileData(String wiId, String directoryPath, String fileName, String fileType, String fileContentType) {
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
			wiFilesObj.setFileContentType(fileContentType);
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

	@Override
	public boolean submitWi(String data) {
		Session session = null;
		long wiId = 0;
		try {
			session = getSessionFactory().getCurrentSession();
			Map<String, String> inputDataMap = ApplicationUtils.convertJSONtoMaps(data);
			Date now = new Date();
			wiId = Long.parseLong(inputDataMap.get("id"));
			String status = inputDataMap.get("status");
			long assignee = Long.parseLong(inputDataMap.get("assignee"));
			String lastModifiedBy = inputDataMap.get("lastModifiedBy");
			Wi wiObj = (Wi) session.get(Wi.class, wiId);
			WiUser wiUserObj = new WiUser();
			wiUserObj.setId(assignee);
			wiObj.setVarWiUser(wiUserObj);
			wiObj.setStatus(status);
			wiObj.setLastModifiedBy(lastModifiedBy);
			wiObj.setLastModifiedDate(now);
			session.update(wiObj);
			sendNotificationToAssignee(wiId, assignee, status);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * Method for sending notification to the assignee user
	 * 
	 * @param wiId
	 * @param assignee
	 * @param status
	 */
	private void sendNotificationToAssignee(long wiId, long assignee, String status) {
		final String fromUserName = ApplicationConstants.TEST_NOTIFICATION_EMAILID;
		final String fromUserPass = ApplicationConstants.TEST_NOTIFICATION_PASSWORD;
		Session session = null;
		session = getSessionFactory().getCurrentSession();
		WiUser wiUserObj = (WiUser) session.get(WiUser.class, assignee);
		String firstName = wiUserObj.getFirstName();
		String lastName = wiUserObj.getLastName() != null ? wiUserObj.getLastName() : "";
		String toUserName = wiUserObj.getEmail();
		String subject = "New WI Assigned";
		String mailBody = "This is a system generated Email, please do not reply.\n\n" + "Dear " + firstName + " "
				+ lastName + ",\n\n" + "A new WI has been assigned to you with following details"
				+ "\nPlease take necessary actions.\n\n" + "Your WI Id is : " + wiId + "\n\nBest Regards\n\n"
				+ "---------------------------------------------------------------------\n"
				+ "The information transmitted is intended only for the person or entity to which it is addressed and may contain confidential "
				+ "and/or privileged material. Any review, retransmission, dissemination or other use of, or taking of any action in reliance "
				+ "upon, this information by persons or entities other than the intended recipient is prohibited. If you received this in error,"
				+ " please contact the sender and delete the material from any computer."
				+ "\n---------------------------------------------------------------------";
		SendNotification sendNotification = new SendNotification();
		sendNotification.send(fromUserName, fromUserPass, toUserName, subject, mailBody);
	}
}
