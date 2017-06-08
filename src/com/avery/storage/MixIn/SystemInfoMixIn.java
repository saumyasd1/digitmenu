package com.avery.storage.MixIn;

import java.sql.Date;
import java.util.List;

import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.Org;
import com.avery.storage.entities.Site;
import com.avery.storage.entities.SystemCsrCode;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class SystemInfoMixIn {
	
	@JsonIgnore
	public abstract String getComment();
	
	@JsonIgnore
	public abstract String getCreatedBy();
	
	@JsonIgnore
	public abstract Date getCreatedDate();
	
	@JsonIgnore
	public abstract String getLastModifiedBy();
	
	@JsonIgnore
	public abstract Date getLastModifiedDate();
	
	@JsonIgnore
	public abstract OrderSystemInfo getVarOrderSystemInfo();
	
	@JsonIgnore
	public abstract Site getSite();
	
	@JsonIgnore
	public abstract List<Org> getOrgList();
	
	@JsonIgnore
	public abstract List<SystemCsrCode> getVarSystemCsrCode();

}
