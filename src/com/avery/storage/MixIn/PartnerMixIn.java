package com.avery.storage.MixIn;


import java.util.Set;




import com.avery.storage.entities.Address;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class PartnerMixIn {
	
	@JsonIgnore
	public abstract Set<ProductLine> getProductLine();
	
	@JsonIgnore
	public abstract Set<Address> getAdressObj();
	
	@JsonIgnore
	public abstract Set<OrderQueue> getOrderQueue();
	
	
	
}
