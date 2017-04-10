package com.avery.storage.MixIn;

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

}
