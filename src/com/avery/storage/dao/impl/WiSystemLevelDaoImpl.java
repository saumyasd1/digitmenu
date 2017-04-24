package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.WiSystemLevel;
import com.avery.storage.entities.WiSystemLevel;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Repository
public class WiSystemLevelDaoImpl extends GenericDaoImpl<WiSystemLevel, Long> implements WiSystemLevelDao {

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
			Criteria criteria = session.createCriteria(WiSystemLevel.class).createAlias("varWi", "varWi")
					.add(Restrictions.eq("varWi.id", entityId));
			entitiesMap.put("systemlevel", new LinkedHashSet(criteria.list()));
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return entitiesMap;
	}

	@Override
	public boolean saveFileData(String entityId, String wiId, String filePath, String fileName) {
		Session session = null;
		Criteria criteria = null;
		try {
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(WiSystemLevel.class).createAlias("varWi", "varWi")
					.add(Restrictions.eq("varWi.id", Long.parseLong(wiId)))
					.add(Restrictions.eq("defaultId", Long.parseLong(entityId)));
			WiSystemLevel wiSystemLevelObj = (WiSystemLevel) criteria.list().get(0);
			wiSystemLevelObj.setFilePath(filePath);
			wiSystemLevelObj.setFileName(fileName);
			session.update(wiSystemLevelObj);
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
