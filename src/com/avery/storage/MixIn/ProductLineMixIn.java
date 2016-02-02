package com.avery.storage.MixIn;

import java.util.Set;

import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class ProductLineMixIn {

	@JsonIgnore
	public abstract Partner getPartner();
}
