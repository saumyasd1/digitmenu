package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.SalesOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class RboMixIn {
	
	@JsonIgnore
	public abstract List<ProductLine> getListProductLine();
	
	@JsonIgnore
	public abstract List<SalesOrder> getListSalesOrderLine();

}
