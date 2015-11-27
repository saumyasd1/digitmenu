package com.avery.storage.MixIn;


import java.util.Set;

import com.avery.storage.entities.OrderLineDetail;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.SalesOrderDetail;
import com.fasterxml.jackson.annotation.JsonIgnore;


public abstract class SalesOrderDetailMixIn {
	
		@JsonIgnore
		public abstract Set<SalesOrderDetail> getSalesOrderDetail(); 
		
}
