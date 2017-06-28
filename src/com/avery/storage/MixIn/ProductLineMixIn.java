package com.avery.storage.MixIn;

import java.sql.Date;
import java.util.List;
import java.util.Set;

import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.OrgInfo;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.RBO;
import com.avery.storage.entities.SystemInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class ProductLineMixIn {

//	@JsonIgnore
//	public abstract Partner getVarPartner();
	
	@JsonIgnore
	public abstract  List<OrderQueue> getListOrderFileQueue();
	
	@JsonIgnore
	public abstract  List<OrderFileAttachment> getListOrderFileAttachments();
	
	@JsonIgnore
	public abstract String getCreatedBy();
	
	@JsonIgnore
	public abstract Date getCreatedDate();
	
//	@JsonIgnore
//	public abstract List<OrderSystemInfo> getListOrderSystemInfo();

	@JsonIgnore
	public abstract ProductLine getVarProductLine();

	@JsonIgnore
	public abstract SystemInfo getVarSystem();
	
	@JsonIgnore
	public abstract List<OrgInfo> getListOrgInfo();
	
//	@JsonIgnore
//	public abstract RBO getRbo();
	
	@JsonIgnore
	public abstract Set<OrderSystemInfo> getListOrderSystemInfo();
//
//	public abstract List<OrderSystemInfo> getListOrderSystemInfo();
}
