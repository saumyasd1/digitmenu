package com.avery.storage.MixIn;

import com.avery.storage.entities.Partner;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class ProductLineMixIn {

	@JsonIgnore
	public abstract Partner getPartner();
}
