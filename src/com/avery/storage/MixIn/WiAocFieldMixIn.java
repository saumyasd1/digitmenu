package com.avery.storage.MixIn;

import java.util.Date;

import com.avery.storage.entities.Wi;
import com.avery.storage.entities.WiAocFieldNameInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiAocFieldMixIn {

	@JsonIgnore
	public abstract Wi getVarWi();
	
	@JsonIgnore
	public abstract WiAocFieldNameInfo getVarWiAocFieldNameInfo();
	
	@JsonIgnore
	public abstract Date getCreatedDate();

	@JsonIgnore
	public abstract String getCreatedBy();

	@JsonIgnore
	public abstract Date getLastModifiedDate();

	@JsonIgnore
	public abstract String getLastModifiedBy();

}
