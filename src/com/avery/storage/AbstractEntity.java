
package com.avery.storage;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * 29-June-2015
 * 
 * @author aman
 */

@MappedSuperclass
public abstract class AbstractEntity extends MainAbstractEntity {


	@Column(name = "NAME", length = 48, nullable = false)
	@NotNull
	@Size(min = 1, max = 48, message = "Entity Name not valid, min:1 and max:48")
	private String entityName;

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}
	
	@Column(name = "DESCRIPTION", length = 256)
	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
