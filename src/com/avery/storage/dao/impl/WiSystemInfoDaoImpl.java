package com.avery.storage.dao.impl;

import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.WiSystemInfo;

/**
 * @author Vishal
 *
 */
@Repository
public class WiSystemInfoDaoImpl extends GenericDaoImpl<WiSystemInfo, Long> implements WiSystemInfoDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
