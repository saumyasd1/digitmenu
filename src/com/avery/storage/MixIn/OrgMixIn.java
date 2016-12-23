package com.avery.storage.MixIn;

import java.sql.Date;

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
}
