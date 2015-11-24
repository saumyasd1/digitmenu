package com.avery.storage.MixIn;


import java.sql.Blob;
import java.util.Set;

import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;


public abstract class OrderQueueMixIn {
	
		@JsonIgnore
		public abstract Set<ProductLine> getProductLine();
		
		
	/*	@JsonIgnore
		public abstract Set<OrderFileAttachment> getOrderFileAttachment() ;*/
		
		@JsonIgnore
		public abstract Partner getPartnerObj(); 
		
		@JsonIgnore
		public abstract String getRboID();
		
		@JsonIgnore
		public abstract String getReceivedDate();
		
		@JsonIgnore
		public abstract Blob getFileData();
		
		@JsonIgnore
		public abstract String getStyleNo();
		

		
		@JsonIgnore
		public abstract OrderQueue getOrderQueue();
		
		@JsonIgnore
		public abstract Set<OrderLine> getOrderLine();
		
		
}
