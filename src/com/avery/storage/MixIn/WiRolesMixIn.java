package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.WiUser;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiRolesMixIn {

	@JsonIgnore
	public abstract List<WiUser> getListWiUsers();

}
