package com.avery.storage.MixIn;

import com.avery.storage.entities.Org;
import com.avery.storage.entities.SystemInfo;
import com.avery.storage.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class SystemCsrCodeMixIn {
	
	@JsonIgnore
	public abstract SystemInfo getVarSystemInfo();
	
	@JsonIgnore
	public abstract Org getVarOrg();
	
	@JsonIgnore
	public abstract User getOwnerId();
}
