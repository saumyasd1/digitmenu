package com.avery.storage.MixIn;

import java.util.List;

import com.avery.storage.entities.WiAocField;
import com.avery.storage.entities.WiFiles;
import com.avery.storage.entities.WiOrg;
import com.avery.storage.entities.WiSchemaIdentification;
import com.avery.storage.entities.WiSystem;
import com.avery.storage.entities.WiSystemLevel;
import com.avery.storage.entities.WiUser;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class WiMixIn {

	@JsonIgnore
	public abstract List<WiSystem> getListWiSystem();
	
	@JsonIgnore
	public abstract List<WiOrg> getListWiOrg();
	
	@JsonIgnore
	public abstract List<WiSchemaIdentification> getListWiSchemaIdentification();
	
	@JsonIgnore
	public abstract List<WiAocField> getListWiAocField();
	
	@JsonIgnore
	public abstract List<WiSystemLevel> getListWiSystemLevel();
	
	@JsonIgnore
	public abstract List<WiFiles> getListWiFiles();
	
	@JsonIgnore
	public abstract WiUser getVarWiUser();
}
