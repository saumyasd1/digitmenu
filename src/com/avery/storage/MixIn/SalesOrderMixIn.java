package com.avery.storage.MixIn;


import com.avery.storage.entities.SalesOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;


public abstract class SalesOrderMixIn {
	
		@JsonIgnore
		public abstract SalesOrder getSalesOrderForVariableData();
		
}
