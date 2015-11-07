package com.avery.logging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Level;

/**
 * 29-June-2015
 * 
 * @author aman
 */

public class AppLogger {

	private static final Logger rootLogger = LoggerFactory
			.getLogger(LoggerConstants.ROOT);

	private static final Logger systemLogger = LoggerFactory
			.getLogger(LoggerConstants.SYSTEM);

	private static final Logger auditLogger = LoggerFactory
			.getLogger(LoggerConstants.AUDIT);

	private static final Logger dbLogger = LoggerFactory
			.getLogger(LoggerConstants.DB);

	public static Logger getRootLogger() {
		return rootLogger;
	}

	public static Logger getSystemLogger() {
		return systemLogger;
	}

	public static Logger getAuditLogger() {
		return auditLogger;
	}

	public static Logger getDBLogger() {
		return dbLogger;
	}

	public static Logger getLogger(String name, String loggingLevel)
			throws Exception {
		Logger logger = LoggerFactory.getLogger(name);
		setLevel(logger, loggingLevel);
		return logger;
	}

	public static void setLevel(Logger logger, String loggingLevel)
			throws Exception {
		if (logger instanceof ch.qos.logback.classic.Logger) {
			ch.qos.logback.classic.Logger logbackLogger = (ch.qos.logback.classic.Logger) logger;
			if (LoggerConstants.TRACE.equalsIgnoreCase(loggingLevel)) {
				logbackLogger.setLevel(Level.TRACE);
			} else if (LoggerConstants.DEBUG.equalsIgnoreCase(loggingLevel)) {
				logbackLogger.setLevel(Level.DEBUG);
			} else if (LoggerConstants.INFO.equalsIgnoreCase(loggingLevel)) {
				logbackLogger.setLevel(Level.INFO);
			} else if (LoggerConstants.WARN.equalsIgnoreCase(loggingLevel)) {
				logbackLogger.setLevel(Level.WARN);
			} else if (LoggerConstants.ERROR.equalsIgnoreCase(loggingLevel)) {
				logbackLogger.setLevel(Level.ERROR);
			} else {
				getRootLogger().error(
						"Error while configuring logging level \""
								+ loggingLevel + "\" for logger \""
								+ logger.getName() + "\"");
			}
		}
	}
}
