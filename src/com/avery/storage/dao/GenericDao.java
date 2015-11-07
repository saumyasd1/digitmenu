package com.avery.storage.dao;

import java.io.Serializable;
import java.util.List;

import com.avery.storage.Entity;

public interface GenericDao<T extends Entity, PK extends Serializable> {

	/** Persist the newInstance object into database */
	PK create(T newInstance);

	/**
	 * Retrieve an object that was previously persisted to the database using
	 * the indicated id as primary key
	 */
	T read(PK id);
	
	List<T> readAll();

	/** Save changes made to a persistent object. */
	void update(T transientObject);

	/** Remove an object from persistent storage in the database */
	void delete(T persistentObject);
}
