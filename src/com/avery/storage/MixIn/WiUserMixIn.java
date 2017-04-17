package com.avery.storage.MixIn;

import java.util.Date;
import java.util.List;

import com.avery.storage.entities.Wi;
import com.avery.storage.entities.WiPermissions;
import com.avery.storage.entities.WiRoles;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiUserMixIn {

	@JsonIgnore
	public abstract WiRoles getVarWiRoles();

	@JsonIgnore
	public abstract List<WiPermissions> getListWiPermissions();

	@JsonIgnore
	public abstract String getPassword();

	@JsonIgnore
	public abstract String getComment();
	
	@JsonIgnore
	public abstract List<Wi> getListWi();	
	
	

	@JsonIgnore
	public abstract Date getCreatedDate();

	@JsonIgnore
	public abstract String getCreatedBy();

	@JsonIgnore
	public abstract Date getLastModifiedDate();

	@JsonIgnore
	public abstract String getLastModifiedBy();

}
