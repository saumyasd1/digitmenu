package com.avery.db.embedded;


/**
 * 
 * @author <a href="mailto:aman.jain@adeptia.com">Aman Jain</a>
 * 
 */
public interface EmbeddedDatabase {

	/**
	 * Fire up the embedded database server
	 */
	void start() throws Exception;

	/**
	 * Shutdown the embedded database server
	 */
	void shutdown();

}
