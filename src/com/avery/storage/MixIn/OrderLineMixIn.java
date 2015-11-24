package com.avery.storage.MixIn;


import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.fasterxml.jackson.annotation.JsonIgnore;


public abstract class OrderLineMixIn {
	
		@JsonIgnore
		public abstract OrderQueue getOrderQueueForOrderLine();
		
		@JsonIgnore
		public abstract OrderLine getOrderLineForVariableData();
		
}
