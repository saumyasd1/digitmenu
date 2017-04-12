package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
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

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.WiAocField;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Repository
public class WiAocFieldDaoImpl extends GenericDaoImpl<WiAocField, Long> implements WiAocFieldDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map getEntitiesByWiId(Long entityId) {
		Map entitiesMap = new HashMap();
		Session session = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			session = getSessionFactory().getCurrentSession();
			ProjectionList proj = Projections.projectionList()
					.add(Projections.property("varWiAocFieldNameInfo.id"), "parentId")
					.add(Projections.property("varWiAocFieldNameInfo.aocFieldName"), "aocFieldName")
					.add(Projections.property("id"), "id").add(Projections.property("validation"), "validation")
					.add(Projections.property("fieldValueExample"), "fieldValueExample")
					.add(Projections.property("logic"), "logic")
					.add(Projections.property("fileName"), "fileName")
					.add(Projections.property("filePath"), "filePath");			
			Criteria criteria = session.createCriteria(WiAocField.class)
					.createAlias("varWiAocFieldNameInfo", "varWiAocFieldNameInfo").createAlias("varWi", "varWi")
					.add(Restrictions.eq("varWi.id", entityId));
			criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(WiAocField.class));
			entitiesMap.put("aocfields", new LinkedHashSet(criteria.list()));
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return entitiesMap;
	}
	
	@Override
	public Boolean saveFileData(String entityId, String directoryPath, String fileName){
		Session session = null;
		Criteria criteria = null;
//		WiAocFieldNameInfo wiAocFieldNameInfoObj = new WiAocFieldNameInfo();
//		wiAocFieldNameInfoObj.setId(Long.parseLong(entityId));
		try {
			session = getSessionFactory().getCurrentSession();
			WiAocField wiAocFieldObj = (WiAocField) session.get(WiAocField.class, Long.parseLong(entityId));
			wiAocFieldObj.setFilePath(directoryPath);
			wiAocFieldObj.setFileName(fileName);
			session.update(wiAocFieldObj);
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
