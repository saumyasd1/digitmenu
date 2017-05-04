package com.avery.app.config;

import java.util.List;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.DefaultConfigurationBuilder;

/**
 * 29-June-2015
 * 
 * @author aman
 */

public class PropertiesConfig {

	private static Configuration config = null;

	static {
		try {
			DefaultConfigurationBuilder configBuilder = new DefaultConfigurationBuilder(
					PathConfig.getPropertiesConfigPath());
			
			
			
			config = configBuilder.getConfiguration();
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new ExceptionInInitializerError(
					"Error while initializing properties configuration. Reason:: "
							+ e.getMessage());
		}
	}

	public static String getString(String propertyName) {
		return config.getString(propertyName);
	}

	public static List getList(String propertyName) {
		return config.getList(propertyName);
	}

	public static Integer getInteger(String propertyName) {
		return config.getInteger(propertyName, null);
	}

	public static boolean getBoolean(String propertyName) {
		return config.getBoolean(propertyName);
	}

	/**
	 * This will throw a NoSuchElementException exception if no property with
	 * "propertyName" exists
	 * 
	 * @param propertyName
	 * @return
	 */
	public static int getInt(String propertyName) {
		return config.getInt(propertyName);
	}

	public static int getInt(String propertyName, int defaultValue) {
		return config.getInt(propertyName, defaultValue);
	}

	public static void main(String[] args) throws Exception {

		System.out.println(PropertiesConfig.getString("sysPropName"));
		System.out.println(PropertiesConfig.getString("propName"));
		System.out.println(PropertiesConfig.getList("propName").size());
		System.out.println(PropertiesConfig.getInteger("propName123"));
		// System.out.println(PropertiesConfigurator.getInstance().getInt(
		// "propName123"));
		System.out.println(System.getProperty("sysPropName"));
		System.out.println(System.getProperty("propName"));
	}

}
