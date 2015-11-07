package com.avery.storage;

import java.io.Serializable;

/**
 * 25-Jul-2013
 * 
 * @author aman
 */

public interface Entity extends RESTResourceProcessor, PrePersistenceProcessor,
		PostPersistenceProcessor, Serializable {

	/**
	 * Get id of this entity
	 * 
	 * @return id
	 */
	long getId();

	/**
	 * Set id of this entity
	 * 
	 * @param id
	 */
	void setId(long id);
}
