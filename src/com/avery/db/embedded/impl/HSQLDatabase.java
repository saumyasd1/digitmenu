package com.avery.db.embedded.impl;

import java.util.List;

import org.hsqldb.Server;

import com.avery.app.config.PathConfig;
import com.avery.app.config.PropertiesConfig;
import com.avery.db.embedded.EmbeddedDatabase;
import com.avery.logging.AppLogger;
import com.avery.utils.PropertiesConstants;

/**
 * 29-June-2015
 * 
 * @author aman
 */

public class HSQLDatabase implements EmbeddedDatabase {

	public static final String DB_FILE_PATH = "filePath";

	private static final String DB_PORT = "port";

	@Override
	public void start() throws Exception {
		// TODO Auto-generated method stub
		AppLogger.getSystemLogger().info("Starting embedded database...");
		List<String> database = PropertiesConfig
				.getList(PropertiesConstants.PROPERTY_EMBEDDED_DB_HSQL_NAME);
		AppLogger.getSystemLogger().debug(
				"Starting embedded database on same JVM...");
		for (final String databaseName : database) {
			final String dbFilePath = PathConfig
					.getEmbeddedDbFilePath(databaseName);
			final int dbPort = PropertiesConfig
					.getInt(PropertiesConstants.PROPERTY_EMBEDDED_DB_HSQL_NAME
							+ "." + databaseName + "." + DB_PORT);
			new Thread(new Runnable() {
				@Override
				public void run() {
					try {
						AppLogger.getSystemLogger().debug(
								"Launching embedded database server on port : "
										+ dbPort);
						launch(dbFilePath, dbPort);
						AppLogger
								.getSystemLogger()
								.debug("Embedded database server launched successfully!");
					} catch (Exception e) {
						AppLogger.getSystemLogger().error(
								"Error while starting embedded database \""
										+ databaseName + "\" :: "
										+ e.getMessage(), e);
					}
				}

			}).start();
		}

		AppLogger.getSystemLogger().info(
				"Embedded database started successfully.");
	}

	private void launch(String dbFilePath, int port) throws Exception {
		Server server = new Server();
		server.setDatabaseName(0, "");
		server.setDatabasePath(0, dbFilePath);
		server.setPort(port);
		server.setLogWriter(null);
		server.setSilent(true);
		server.setTrace(false);
		// start the HSQLDB in server mode
		server.start();
	}

	@Override
	public void shutdown() {
		// TODO Auto-generated method stub
		System.out.println("*** Shutdown DB ***");
	}

}
