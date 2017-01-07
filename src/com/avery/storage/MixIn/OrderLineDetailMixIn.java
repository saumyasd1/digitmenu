package com.avery.storage.MixIn;


import java.util.List;
import java.util.Set;

import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderLineDetail;
import com.avery.storage.entities.OrderQueue;
import com.fasterxml.jackson.annotation.JsonIgnore;


public abstract class OrderLineDetailMixIn {
	
		/*@JsonIgnore
		public abstract OrderQueue getOrderQueueForOrderLine();
		*/
		/*@JsonIgnore
		public abstract Set<OrderLineDetail> getOrderLineDetail(); 
		*/
		/*@JsonIgnore
		public abstract OrderLine getVarOrderLine();
		*/
		@JsonIgnore
		public abstract OrderQueue getVarOrderFileQueue();

		@JsonIgnore
		public abstract List<OrderLineDetail> getListOrderlineDetails();
		
}
