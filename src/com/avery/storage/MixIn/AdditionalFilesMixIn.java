package com.avery.storage.MixIn;

import java.util.Date;
import java.util.List;

import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class AdditionalFilesMixIn {
	
	@JsonIgnore
	public abstract String getCreatedBy(); //ignore CreatedBy belongs to main abstract entity class
	
	@JsonIgnore
	public abstract Date getCreatedDate(); //ignore CreatedDate belongs to main abstract entity class
	
	@JsonIgnore
	public abstract Date getLastModifiedDate(); //ignore LastModified Date belongs to main abstract entity class
	
	@JsonIgnore
	public abstract String getLastModifiedBy(); //ignore LastModifiedBy belongs to main abstract entity class
	
	/*@JsonIgnore
	public abstract String getFileName();*/
	
	@JsonIgnore
	public abstract String getFileExtension();
	
	@JsonIgnore
	public abstract String getFileContentType();
	
	@JsonIgnore
	public abstract String getFileData();
	
	@JsonIgnore
	public abstract String getAdditionalDataFileKey();
	
	/*@JsonIgnore
	public abstract String getFilePath();*/
	
	@JsonIgnore
	public abstract String getStatus();
	
	@JsonIgnore
	public abstract String getComment();
	
	@JsonIgnore
	public abstract String getError();
	
	@JsonIgnore
	public abstract int getOrderFileId();
	
	@JsonIgnore
	public abstract String getProductLineMatch();
	
	@JsonIgnore
	public abstract String getRboMatch();
	
	@JsonIgnore
	public abstract String getFileContentMatch();
	
	@JsonIgnore
	public abstract OrderEmailQueue getVarOrderEmailQueue();
	
	@JsonIgnore
	public abstract ProductLine getVarProductLine();
	
	@JsonIgnore
	public abstract List<OrderQueue> getListOrderFileQueue();

}
