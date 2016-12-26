package com.avery.storage.dao.impl;

import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.RBO;

@Repository
public class RBODaoImpl extends GenericDaoImpl<RBO, Long> implements
		RBODao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		return null;
	}

	
}
