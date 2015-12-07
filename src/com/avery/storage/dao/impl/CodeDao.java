package com.avery.storage.dao.impl;

import java.util.List;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Code;

public interface CodeDao extends GenericDao<Code, Long> {
	
	public List<Code> readByType(String type) throws Exception;

}