package com.avery.logging;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.slf4j.Logger;

/**
 * Class to redirect contents of output stream to centralized logger
 * 
 * 29-June-2015
 * 
 * @author Aman Jain
 * 
 */
public class LoggingOutputStream extends ByteArrayOutputStream {

	private String lineSeparator;

	private Logger logger;

	private String mode;

	public LoggingOutputStream(Logger logger, String mode) {
		super();
		this.logger = logger;
		this.mode = mode;
		lineSeparator = System.getProperty("line.separator");
	}

	/* (non-Javadoc)
	 * @see java.io.OutputStream#flush()
	 */
	public void flush() throws IOException {
		synchronized (this) {
			super.flush();
			String record = this.toString();
			super.reset();
			if (record.length() == 0 || record.equals(lineSeparator)) {
				// avoid empty records
				return;
			}
			if ("error".equalsIgnoreCase(mode)) {
				logger.error(record);
			} else {
				logger.info(record);
			}
		}
	}
}