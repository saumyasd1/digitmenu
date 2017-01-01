package com.avery.storage.MixIn;

import java.sql.Date;

import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.SystemInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class OrderSystemInfoMixIn {
	
	@JsonIgnore
	public abstract  ProductLine getVarProductLine();

	@JsonIgnore
	public abstract String getCreatedBy();
	
	@JsonIgnore
	public abstract Date getCreatedDate();
	
	@JsonIgnore
	public abstract String getLastModifiedBy();
	
	@JsonIgnore
	public abstract Date getLastModifiedDate();

}
