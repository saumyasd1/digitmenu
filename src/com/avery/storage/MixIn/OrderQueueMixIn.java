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
		
		@JsonIgnore
		public abstract int getAddressCount();
		
		@JsonIgnore
		public abstract int getProductLineCount();
		
		@JsonIgnore
		public abstract int getOrderQueueCount();
		
		@JsonIgnore
		public abstract String getRboName();
		
		@JsonIgnore
		public abstract String getRboId();
		
		@JsonIgnore
		public abstract String getCsrName();
		
		@JsonIgnore
		public abstract String getCsrEmail();
		
		@JsonIgnore
		public abstract String getOrderEmailDomain();
		
		@JsonIgnore
		public abstract String getPackingInstruction();
		
		@JsonIgnore
		public abstract String getInvoiceLineInstruction();
		
		@JsonIgnore
		public abstract String getVariableDataBreakdown();
		
		@JsonIgnore
		public abstract String getManufacturingNotes();
		
		@JsonIgnore
		public abstract String getShippingOnlyNotes();
		
		@JsonIgnore
		public abstract String getSplitShipSetBy();
		
		@JsonIgnore
		public abstract String getOrderSchemaID();
		
		@JsonIgnore
		public abstract String getOrderSchemaType();
		
		@JsonIgnore
		public abstract String getOrderMappingID();

		@JsonIgnore
		public abstract Boolean isAttachmentRequired();
		
		@JsonIgnore
		public abstract String getAttachmentIdentifier_1();
		
		@JsonIgnore
		public abstract String getAttachmentSchemaType_1();
		
		@JsonIgnore
		public abstract String getAttachmentMappingID_1();
		
		@JsonIgnore
		public abstract String getAttachmentIdentifier_2();
		
		@JsonIgnore
		public abstract String getAttachmentSchemaID_2();
		
		@JsonIgnore
		public abstract String getAttachmentSchemaType_2() ;
		
		@JsonIgnore
		public abstract String getAttachmentMappingID_2();
		
		@JsonIgnore
		public abstract String getAttachmentIdentifier_3();
		
		@JsonIgnore
		public abstract String getAttachmentSchemaID_3();
		
		@JsonIgnore
		public abstract String getAttachmentSchemaType_3();
		
		@JsonIgnore
		public abstract String getAttachmentMappingID_3();
		
		@JsonIgnore
		public abstract String getPreProcessPID();
		
		@JsonIgnore
		public abstract Date getReceivedDate();
		
		@JsonIgnore
		public abstract String getFileExtension();
		
		
		
}
