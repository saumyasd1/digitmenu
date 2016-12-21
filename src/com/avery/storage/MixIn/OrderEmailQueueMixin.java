package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.OrderFileAttachment;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class OrderEmailQueueMixin {
	
	@JsonIgnore
	public abstract List<OrderFileAttachment> getListOrderFileAttachment();

}
