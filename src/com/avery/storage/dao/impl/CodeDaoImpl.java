package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Code;
import com.avery.storage.entities.OrderConfiguration;
import com.avery.storage.service.CodeService;

@Repository
public class CodeDaoImpl extends GenericDaoImpl<Code, Long> implements
	CodeDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<Code> readByType(String type) throws Exception {
		
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().openSession();
			criteria = session.createCriteria(Code.class);
			criteria.add(Restrictions.eq("type", type));
			return criteria.list();
		}catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching values for propert name::"+type, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching values for propert name::"+type, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	
	//Method for getting colorCode and iconName
	public HashMap<String, Map> getStatusCode(){
		HashMap<String, Map> statusCode = new HashMap<>();
		List<Code> codeList = null;
		CodeService codeService;
		try {
			codeService = (CodeService) SpringConfig
					.getInstance().getBean("codeService");
			codeList = codeService.readAll();
			if(codeList==null)
				throw new NullPointerException("No status codes found");
			for(Code code : codeList){
				String iconName = code.getIconName();
				String colorCode = code.getColorCode();
				String codeValue = code.getValue();
				Map<String, String> statusValues = new HashMap<>();
				
				statusValues.put("iconName", iconName);
				statusValues.put("colorCode", colorCode);
				statusValues.put("codeValue", codeValue);
				String codeIntegerValue = code.getCode();
				statusCode.put(codeIntegerValue, statusValues);
			}
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching values for status codes", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		
		
		
		return statusCode;
	}

}
