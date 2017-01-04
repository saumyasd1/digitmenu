package com.avery.storage.MixIn;


import java.util.Date;
import java.util.List;

import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.RBO;
import com.avery.storage.entities.SalesOrder;
import com.avery.storage.entities.SalesOrderDetail;
import com.fasterxml.jackson.annotation.JsonIgnore;


public abstract class SalesOrderMixIn {
	
		@JsonIgnore
		public abstract SalesOrder getSalesOrderForVariableData();
		
		@JsonIgnore
		public abstract String getCreatedBy(); //ignore CreatedBy belongs to main abstract entity class
		
		@JsonIgnore
		public abstract Date getCreatedDate(); //ignore CreatedDate belongs to main abstract entity class
		
		@JsonIgnore
		public abstract Date getLastModifiedDate(); //ignore LastModified Date belongs to main abstract entity class
		
		@JsonIgnore
		public abstract String getLastModifiedBy(); //ignore LastModifiedBy belongs to main abstract entity class
	
		@JsonIgnore
		public abstract OrderLine getVarOrderLine();
		
		@JsonIgnore
		public abstract OrderQueue getVarOrderFileQueue();
		
		@JsonIgnore
		public abstract Partner getVarPartner();
		
		@JsonIgnore
		public abstract RBO getVarRbo();
		
		
}
