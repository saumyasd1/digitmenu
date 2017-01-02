package com.avery.storage.MixIn;


import java.util.Date;
import java.util.List;

import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderLineDetail;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.SalesOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;


public abstract class OrderLineMixIn {
	
		@JsonIgnore
		public abstract OrderQueue getOrderQueueForOrderLine();
		
		@JsonIgnore
		public abstract OrderLine getOrderLineForVariableData();
		
		@JsonIgnore
		public abstract String getCreatedBy(); //ignore CreatedBy belongs to main abstract entity class
		
		@JsonIgnore
		public abstract Date getCreatedDate(); //ignore CreatedDate belongs to main abstract entity class
		
		@JsonIgnore
		public abstract Date getLastModifiedDate(); //ignore LastModified Date belongs to main abstract entity class
		
		@JsonIgnore
		public abstract String getLastModifiedBy(); //ignore LastModifiedBy belongs to main abstract entity class
	
		
		@JsonIgnore
		public abstract OrderQueue getVarOrderFileQueue();
		
		/*@JsonIgnore
		public abstract List<OrderLineDetail> getListOrderlineDetails();
		*/
		@JsonIgnore
		public abstract List<SalesOrder> getListSalesOrderLine();
		
		@JsonIgnore
		public abstract OrderLine getVarOrderLine();

}
