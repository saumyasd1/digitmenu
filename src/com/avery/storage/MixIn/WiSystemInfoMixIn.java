package com.avery.storage.MixIn;

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

}
