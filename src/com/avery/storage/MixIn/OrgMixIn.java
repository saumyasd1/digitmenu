package com.avery.storage.MixIn;

import java.sql.Date;
import java.util.List;

import com.avery.storage.entities.Site;
import com.avery.storage.entities.SystemInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class OrgMixIn {
	
	@JsonIgnore
	public abstract String getComment();
	
	@JsonIgnore
	public abstract String getCreatedBy();
	
	@JsonIgnore
	public abstract Date getCreatedDate();
	
	@JsonIgnore
	public abstract String getLastModifiedBy();
	
	@JsonIgnore
	public abstract Date getLastModifiedDate();
	
	@JsonIgnore
	public abstract SystemInfo getSystem();
}
