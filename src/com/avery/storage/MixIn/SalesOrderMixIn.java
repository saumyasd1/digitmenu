package com.avery.storage.MixIn;


import java.util.Date;

import com.avery.storage.entities.SalesOrder;
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
	
		
}
