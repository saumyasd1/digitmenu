package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class OrderFileAttachmentMixIn {
	
	
	public abstract String getFileName();
	
	public abstract String getFileExtension();
	
	public abstract String getFileContentType();
	
	public abstract String getFileData();

	public abstract String getAdditionalDataFileKey();

	public abstract String getFilePath();

	public abstract String getStatus();

	public abstract String getComment();

	public abstract String getError();

	public abstract int getOrderFileId();

	public abstract String getProductLineMatch();

	public abstract String getRboMatch();

	public abstract String getFileContentMatch();

//	@JsonIgnore
//	public abstract ProductLine getVarProductLine();

	@JsonIgnore
	public abstract List<OrderQueue> getListOrderFileQueue();

	
	@JsonIgnore
	public abstract OrderEmailQueue getVarOrderEmailQueue();

}
