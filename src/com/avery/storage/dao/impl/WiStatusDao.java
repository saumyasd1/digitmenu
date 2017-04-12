package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.WiStatus;

/**
 * @author Vishal
 *
 */
public interface WiStatusDao extends GenericDao<WiStatus, Long> {

	public HashMap<String, Map> getStatusCode();

}
