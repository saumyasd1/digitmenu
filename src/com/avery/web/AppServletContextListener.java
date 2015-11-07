package com.avery.web;

import java.util.TimeZone;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.avery.app.Main;
import com.avery.utils.PropertiesConstants;

/**
 * June 29, 2015
 * 
 * @author aman
 */

public class AppServletContextListener implements ServletContextListener {

	Main mainApp = null;

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		if (mainApp != null)
			try {
				mainApp.shutdown();
			} catch (Exception e) {
				e.printStackTrace();
			}
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		try {
			String appWorkingDirPath = null;
			TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
			// fetch via system environment variable
			appWorkingDirPath = System
					.getenv(PropertiesConstants.PROPERTIES_APP_WORKING_DIR_PATH);
			if (appWorkingDirPath == null) {
				// fetch via system property
				appWorkingDirPath = System
						.getProperty(PropertiesConstants.PROPERTIES_APP_WORKING_DIR_PATH);
				if (appWorkingDirPath == null) {
					appWorkingDirPath = sce
							.getServletContext()
							.getInitParameter(
									PropertiesConstants.PROPERTIES_APP_WORKING_DIR_PATH);
				}
			}
			if (appWorkingDirPath == null) {
				throw new ExceptionInInitializerError(
						"Can't locate application working directory, please set variable \"app.working.dir.path\" either as system environment variable or as a application system property");
			}
			mainApp = new Main(appWorkingDirPath);
			mainApp.boot();
		} catch (Exception e) {
			throw new ExceptionInInitializerError(e);
		}
	}

}
