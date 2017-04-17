package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.WiPermissions;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiStatusMixIn {

	@JsonIgnore
	public abstract List<WiPermissions> getListWiPermissions();
}
