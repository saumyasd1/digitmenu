package com.avery.storage.MixIn;

import java.util.Date;
import java.util.List;

import com.avery.storage.entities.WiOrg;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiOrgInfoMixIn {

	@JsonIgnore
	public abstract List<WiOrg> getListWiOrg();
	
	@JsonIgnore
	public abstract Date getCreatedDate();

	@JsonIgnore
	public abstract String getCreatedBy();

	@JsonIgnore
	public abstract Date getLastModifiedDate();

	@JsonIgnore
	public abstract String getLastModifiedBy();

}
