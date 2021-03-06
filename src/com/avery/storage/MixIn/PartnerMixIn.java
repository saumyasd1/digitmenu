package com.avery.storage.MixIn;


import java.util.Date;
import java.util.List;
import java.util.Set;

import com.avery.storage.entities.Address;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.SalesOrder;
import com.avery.storage.entities.Site;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class PartnerMixIn {
	
	@JsonIgnore
	public abstract List<ProductLine> getVarProductLine();
	
	@JsonIgnore
	public abstract Set<Address> getAdressObj();
	
	@JsonIgnore
	public abstract Set<OrderQueue> getOrderQueue();
	
	@JsonIgnore
	public abstract String getCreatedBy(); //ignore CreatedBy from partner belongs to main abstract entity class
	
	@JsonIgnore
	public abstract Date getCreatedDate(); //ignore CreatedDate from partner belongs to main abstract entity class
	
	@JsonIgnore
	public abstract Boolean isActive() ;
	
	@JsonIgnore
	public abstract List<SalesOrder> getListSalesOrderLine();	
	
	@JsonIgnore
	public abstract List<Address> getAddressList();
	
	@JsonIgnore
	public abstract Integer getSiteId();
	

}
