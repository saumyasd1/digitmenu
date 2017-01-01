package com.avery.storage.MixIn;

import com.avery.storage.entities.OrderSystemInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class OrgInfoMixin {
	
	@JsonIgnore
	public abstract OrderSystemInfo getVarOrderSystemInfo() ;

}
