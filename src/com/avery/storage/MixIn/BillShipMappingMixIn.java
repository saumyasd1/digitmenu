package com.avery.storage.MixIn;

import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class BillShipMappingMixIn {

	@JsonIgnore
	public abstract ProductLine getVarProductLine();

}
