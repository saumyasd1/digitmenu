package com.avery.storage;

/**
 * 29-June-2015
 * 
 * @author aman
 */
public interface PostPersistenceProcessor {

	public void postCreateOp();

	public void postUpdateOp();

	public void postDeleteOp();

}
