package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class ProductLineMixIn {

	@JsonIgnore
	public abstract Partner getPartner();
	
	@JsonIgnore
	public abstract List<ProductLine> getVarProductLine();
	
	@JsonIgnore
	public abstract  List<OrderQueue> getListOrderFileQueue();
	
	@JsonIgnore
	public abstract  List<OrderFileAttachment> getListOrderFileAttachments();
	
	@JsonIgnore
	public abstract  List<OrderSystemInfo> getListOrderSystemInfo();
}
