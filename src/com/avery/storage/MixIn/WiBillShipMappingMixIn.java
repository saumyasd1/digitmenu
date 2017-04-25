package com.avery.storage.MixIn;

import com.avery.storage.entities.Wi;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiBillShipMappingMixIn {

	@JsonIgnore
	public abstract Wi getVarWi();

}
