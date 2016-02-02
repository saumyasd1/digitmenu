package com.avery.storage.MixIn;


import java.sql.Blob;
import java.util.Date;
import java.util.Set;

import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;


public abstract class OrderQueueMixIn {
		
		@JsonIgnore
		public abstract Partner getPartnerObj(); 
		
		@JsonIgnore
		public abstract String getRboID();
		
		@JsonIgnore
		public abstract String getAddress(); //ignore address from partner
		
		@JsonIgnore
		public abstract String getContactPerson(); //ignore contact person from partner
		
		@JsonIgnore
		public abstract String getPhone(); //ignore phone from partner
		
		@JsonIgnore
		public abstract Boolean isActive(); //ignore active from partner
		
		@JsonIgnore
		public abstract String getCreatedBy(); //ignore CreatedBy from partner belongs to main abstract entity class
		
		@JsonIgnore
		public abstract Date getCreatedDate(); //ignore CreatedDate from partner belongs to main abstract entity class
		
		@JsonIgnore
		public abstract Date getLastModifiedDate(); //ignore LastModified Date from partner belongs to main abstract entity class
		
		@JsonIgnore
		public abstract String getLastModifiedBy(); //ignore LastModifiedBy from partner belongs to main abstract entity class
		
		@JsonIgnore
		public abstract Blob getFileData();
		
		@JsonIgnore
		public abstract String getStyleNo();
		

		
		@JsonIgnore
		public abstract OrderQueue getOrderQueue();
		
		@JsonIgnore
		public abstract Set<OrderLine> getOrderLine();
		
		
}
