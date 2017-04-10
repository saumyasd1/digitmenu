package com.avery.storage.dao.impl;

import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.WiOrgInfo;

/**
 * @author Vishal
 *
 */
@Repository
public class WiOrgInfoDaoImpl extends GenericDaoImpl<WiOrgInfo, Long> implements WiOrgInfoDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
