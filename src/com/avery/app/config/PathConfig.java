package com.avery.app.config;

import static com.avery.utils.PropertiesConstants.PROPERTIES_CONFIG_FILE;
import static com.avery.utils.PropertiesConstants.PROPERTY_APP_LOG_FILE;
import static com.avery.utils.PropertiesConstants.PROPERTY_EMBEDDED_DB_HSQL_NAME;
import static com.avery.utils.PropertiesConstants.PROPERTY_LOGBACK_CONFIG_FILE;

import java.io.File;

import com.avery.db.embedded.impl.HSQLDatabase;
//import com.avery.db.embedded.impl.HSQLDatabase;
import com.avery.utils.PropertiesConstants;

/**
 * 29 June 2015
 * 
 * @author aman
 */

public class PathConfig {

	private static String workingDirectory = null;

	private static final String RESOURCES_FOLDER = "resources";

	public static String getWorkingDirectory() {
		return workingDirectory;
	}

	public static String getSystemApplicationPropertiesFilePath() {
		return "file:" + getResourcesPath() + File.separatorChar
				+ "application.properties";
	}
	
	public static void setWorkingDirectory(String workingDirectory) {
		PathConfig.workingDirectory = workingDirectory;
	}

	public static String getResourcesPath() {
		return getWorkingDirectory() + File.separatorChar + RESOURCES_FOLDER;
	}

	public static String getPropertiesConfigPath() {
		return getResourcesPath() + File.separatorChar + PROPERTIES_CONFIG_FILE;
	}

	public static String getLogbackConfigPath() {
		return getResourcesPath() + File.separatorChar
				+ PropertiesConfig.getString(PROPERTY_LOGBACK_CONFIG_FILE);
	}

	public static String getEmbeddedDbFilePath(String databaseName) {
		return getWorkingDirectory()
				+ File.separatorChar
				+ PropertiesConfig.getString(PROPERTY_EMBEDDED_DB_HSQL_NAME
						+ "." + databaseName + "." + HSQLDatabase.DB_FILE_PATH);
	}

	public static String getApplicationLogFilePath() {
		return getWorkingDirectory() + File.separatorChar
				+ PropertiesConfig.getString(PROPERTY_APP_LOG_FILE);
	}

	public static String getSpringConfigFilePath() {
		return "file:" + getResourcesPath() + File.separatorChar
				+ PropertiesConstants.SPRING_CONFIG_FILE;
	}

}
