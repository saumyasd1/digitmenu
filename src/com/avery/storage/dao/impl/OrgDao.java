package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.Org;

public interface OrgDao extends GenericDao<Org, Long>{
	
	public List<Org> readAllBySystemId(Long systemId);
	public Map getAllEntitiesList();
}
