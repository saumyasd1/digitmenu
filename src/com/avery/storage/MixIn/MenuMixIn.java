package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.MenuRole;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class MenuMixIn {

	@JsonIgnore
	public abstract List<MenuRole> getListMenuRoles();

}
