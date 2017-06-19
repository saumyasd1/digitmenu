package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.Site;
import com.avery.storage.entities.SystemCsrCode;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class UserMixIn {
	
	@JsonIgnore
	public abstract Site getVarSite();
	
	@JsonIgnore
	public abstract List<SystemCsrCode> getVarSystemCsrCode();

}
