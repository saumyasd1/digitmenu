package com.avery.exception;

/**
 * System Exception that makes use of error codes
 * 
 * @author aman
 */
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

public class SystemException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private ErrorCode errorCode;
	private final Map<String, Object> properties = new TreeMap<String, Object>();
	private UUID instanceId;

	{
		// Generate random number at creation of object.
		instanceId = UUID.randomUUID();
	}

	public static SystemException wrap(Throwable exception, ErrorCode errorCode) {
		if (exception instanceof SystemException) {
			SystemException se = (SystemException) exception;
			if (errorCode != null && errorCode != se.getErrorCode()) {
				return new SystemException(exception.getMessage(), exception,
						errorCode);
			}
			return se;
		} else {
			if (exception == null) {
				return new SystemException(errorCode);
			} else {
				return new SystemException(exception.getMessage(), exception,
						errorCode);
			}
		}
	}

	public static SystemException wrap(Throwable exception) {
		return wrap(exception, null);
	}

	public SystemException(ErrorCode errorCode) {
		this.errorCode = errorCode;
	}

	public SystemException(String message, ErrorCode errorCode) {
		super(message);
		this.errorCode = errorCode;
	}

	public SystemException(Throwable cause, ErrorCode errorCode) {
		super(cause);
		this.errorCode = errorCode;
	}

	public SystemException(String message, Throwable cause, ErrorCode errorCode) {
		super(message, cause);
		this.errorCode = errorCode;
	}

	public ErrorCode getErrorCode() {
		return errorCode;
	}

	public SystemException setErrorCode(ErrorCode errorCode) {
		this.errorCode = errorCode;
		return this;
	}

	public Map<String, Object> getProperties() {
		return properties;
	}

	@SuppressWarnings("unchecked")
	public <T> T get(String name) {
		return (T) properties.get(name);
	}

	public SystemException set(String name, Object value) {
		properties.put(name, value);
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Throwable#printStackTrace(java.io.PrintStream)
	 */
	public void printStackTrace(PrintStream s) {
		synchronized (s) {
			printStackTrace(new PrintWriter(s));
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Throwable#printStackTrace(java.io.PrintWriter)
	 */
	public void printStackTrace(PrintWriter s) {
		synchronized (s) {
			String className = getClass().getName();
			String superMessage = super.getMessage();
			s.println((superMessage != null) ? (className + ": " + superMessage)
					: className);
			s.println("\t-------------------------------");
			if (errorCode != null) {
				s.println("\t" + errorCode + ":"
						+ errorCode.getClass().getName() + " : "
						+ getUserMessage());
			}
			for (String key : properties.keySet()) {
				s.println("\t" + key + "=[" + properties.get(key) + "]");
			}
			s.println("\t-------------------------------");
			StackTraceElement[] trace = getStackTrace();
			for (int i = 0; i < trace.length; i++)
				s.println("\tat " + trace[i]);

			Throwable ourCause = getCause();
			if (ourCause != null) {
				ourCause.printStackTrace(s);
			}
			s.flush();
		}
	}

	public String getMessage() {
		String message = super.getMessage();
		message += "\n" + errorCode + ":" + errorCode.getClass().getName()
				+ " : " + getUserMessage();
		for (String key : getProperties().keySet()) {
			message += "\n[" + key + "=" + properties.get(key) + "]";
		}
		return message;
	}

	/**
	 * Returns the user message provided in the error code instance.
	 * 
	 * @return
	 */
	private String getErrorCodeMessage() {
		String message = getErrorCode().getUserMessage();
		return ((message == null) ? "" : message);
	}

	public String getUserMessage() {
		return "Exception Id \"" + getInstanceId() + "\" Message :"
				+ getErrorCodeMessage();
	}

	/**
	 * returns the instance id for SystemException instance.
	 * 
	 * @return
	 */
	public UUID getInstanceId() {
		return instanceId;
	}

}
