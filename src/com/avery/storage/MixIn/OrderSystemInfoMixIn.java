package com.avery.storage.MixIn;

import java.sql.Date;

import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class OrderSystemInfoMixIn {

	@JsonIgnore
	public abstract String getCreatedBy();

	@JsonIgnore
	public abstract Date getCreatedDate();

	@JsonIgnore
	public abstract String getLastModifiedBy();

	@JsonIgnore
	public abstract Date getLastModifiedDate();
	
	@JsonIgnore
	public abstract ProductLine getVarProductLine();
	
//	@JsonIgnore
//	public abstract SystemInfo getVarSystem();
	
//	@JsonIgnore
//	public abstract List<OrgInfo> getListOrgInfo();
}
