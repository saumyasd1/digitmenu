package com.avery.storage.dao.impl;

import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.WiUser;

/**
 * @author Vishal
 *
 */
public interface WiUserDao extends GenericDao<WiUser, Long> {

	public Map getAssigneeList(String roleId);
}
