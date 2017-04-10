package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.WiAocField;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiAocFieldNameInfoMixIn {

	@JsonIgnore
	public abstract List<WiAocField> getListWiAocField();
}
