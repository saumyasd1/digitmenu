package com.avery.exception.code;

import com.avery.exception.ErrorCode;

public enum RestErrorCode implements ErrorCode {
	AUTH_FAILED_NO_TOKEN("AUTH_FAILED_NO_TOKEN",
			"No token present in request header; authentication failed"), AUTH_FAILED_INVALID_TOKEN(
			"AUTH_FAILED_INVALID_TOKEN",
			"Invalid token present in request header; authentication failed");

	private final String code;

	private final String userMessage;

	private RestErrorCode(String code, String userMessage) {
		this.code = code;
		this.userMessage = userMessage;
	}

	@Override
	public String getCode() {
		return code;
	}

	@Override
	public String getUserMessage() {
		return userMessage;
	}

}
