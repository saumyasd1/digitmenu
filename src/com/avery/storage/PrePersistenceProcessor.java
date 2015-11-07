package com.avery.storage;

/**
 * 29-June-2015
 * 
 * @author aman
 */

public interface PrePersistenceProcessor {

	public void preCreateOp();

	public void preUpdateOp();

	public void preDeleteOp();

}
