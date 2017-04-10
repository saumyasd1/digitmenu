package com.avery.storage.MixIn;

import com.avery.storage.entities.Wi;
import com.avery.storage.entities.WiSystemInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiSystemMixIn {

	@JsonIgnore
	public abstract Wi getVarWi();

	@JsonIgnore
	public abstract WiSystemInfo getVarWiSystemInfo();
}
