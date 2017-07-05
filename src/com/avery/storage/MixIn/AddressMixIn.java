package com.avery.storage.MixIn;

import com.avery.storage.entities.Org;
import com.avery.storage.entities.Partner;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class AddressMixIn {

	@JsonIgnore
	public abstract Org getVarOrgCode();

	@JsonIgnore
	public abstract Partner getVarPartner();
}
