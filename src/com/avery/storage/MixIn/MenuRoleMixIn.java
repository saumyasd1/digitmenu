package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.Menu;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class MenuRoleMixIn {
	@JsonIgnore
	public abstract List<Menu> getMenu();
}
