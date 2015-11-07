package com.avery.db.embedded;

import static com.avery.utils.PropertiesConstants.EMBEDDED_HSQL_DB;
import static com.avery.utils.PropertiesConstants.PROPERTY_EMBEDDED_DB_TYPE;

import com.avery.app.config.PropertiesConfig;
import com.avery.db.embedded.impl.HSQLDatabase;

/**
 * June 29, 2015
 * 
 * @author aman
 */

public class EmbeddedDatabaseFactory {

	public static EmbeddedDatabase getEmbeddedDatabase() throws Exception {
		EmbeddedDatabase db = null;
		String embeddedDbType = PropertiesConfig
				.getString(PROPERTY_EMBEDDED_DB_TYPE);
		if (EMBEDDED_HSQL_DB.equalsIgnoreCase(embeddedDbType)) {
			db = new HSQLDatabase();
		} else {
			throw new Exception("Not a valid embedded database type : \""
					+ embeddedDbType + "\"");
		}
		return db;
	}

}
