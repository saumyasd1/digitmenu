package com.avery.storage.MixIn;

import java.sql.Date;
import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class ProductLineEditMixIn {

	@JsonIgnore
	public abstract Partner getVarPartner();
	
	@JsonIgnore
	public abstract  List<OrderQueue> getListOrderFileQueue();
	
	@JsonIgnore
	public abstract  List<OrderFileAttachment> getListOrderFileAttachments();
	
	@JsonIgnore
	public abstract String getCreatedBy();
	
	@JsonIgnore
	public abstract Date getCreatedDate();
	
	@JsonIgnore
	public abstract String getLastModifiedBy();
	
	@JsonIgnore
	public abstract Date getLastModifiedDate();
	
	@OneToMany(mappedBy="varProductLine",fetch=FetchType.EAGER)
	private List<OrderSystemInfo> listOrderSystemInfo;
}
