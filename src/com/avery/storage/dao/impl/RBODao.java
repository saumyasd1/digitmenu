package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.RBO;

/**
 * @author Vishal
 *
 */
public interface RBODao extends GenericDao<RBO, Long> {

	public Map getRboByPartnerId(Long partnerId);

}
