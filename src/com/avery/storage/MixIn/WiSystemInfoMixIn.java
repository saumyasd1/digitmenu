package com.avery.storage.MixIn;

import java.util.Date;
import java.util.List;

import com.avery.storage.entities.WiSystem;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiSystemInfoMixIn {

	@JsonIgnore
	public abstract List<WiSystem> getListWiSystem();
	
	@JsonIgnore
	public abstract Date getCreatedDate();

	@JsonIgnore
	public abstract String getCreatedBy();

	@JsonIgnore
	public abstract Date getLastModifiedDate();

	@JsonIgnore
	public abstract String getLastModifiedBy();

}
