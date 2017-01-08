package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Code;

public interface CodeDao extends GenericDao<Code, Long> {
	
	public List<Code> readByType(String type) throws Exception;
	
	public HashMap<String, Map> getStatusCode();

}