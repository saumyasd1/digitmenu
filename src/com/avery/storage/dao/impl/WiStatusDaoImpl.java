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
import org.springframework.stereotype.Repository;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.WiStatus;
import com.avery.storage.service.WiStatusService;

/**
 * @author Vishal
 *
 */
@Repository
public class WiStatusDaoImpl extends GenericDaoImpl<WiStatus, Long> implements WiStatusDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashMap<String, Map> getStatusCode() {
		HashMap<String, Map> statusCode = new HashMap<>();
		List<WiStatus> statusList = null;
		WiStatusService wiStatusService;
		try {
			wiStatusService = (WiStatusService) SpringConfig.getInstance().getBean("wiStatusService");
			statusList = wiStatusService.readAll();
			if (statusList == null)
				throw new NullPointerException("No status codes found");
			for (WiStatus wiStatus : statusList) {
				String iconName = wiStatus.getIconName();
				String colorCode = wiStatus.getColorCode();
				String codeValue = wiStatus.getValue();
				Map<String, String> statusValues = new HashMap<>();

				statusValues.put("iconName", iconName);
				statusValues.put("colorCode", colorCode);
				statusValues.put("codeValue", codeValue);
				String codeIntegerValue = wiStatus.getCode();
				statusCode.put(codeIntegerValue, statusValues);
			}
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching values for status codes", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

		return statusCode;
	}

}
