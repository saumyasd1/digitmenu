package com.avery.rest;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

import org.apache.http.HttpStatus;
import org.codehaus.jackson.map.ObjectMapper;

/**
 * 4-July-2015
 * 
 * @author aman
 */
public class RestUtils {

	public static boolean isValidStatusCode(int statusCode) {
		switch (statusCode) {
		case HttpStatus.SC_OK:
		case HttpStatus.SC_CREATED:
		case HttpStatus.SC_ACCEPTED:
		case HttpStatus.SC_NON_AUTHORITATIVE_INFORMATION:
		case HttpStatus.SC_NO_CONTENT:
		case HttpStatus.SC_RESET_CONTENT:
		case HttpStatus.SC_PARTIAL_CONTENT:
		case HttpStatus.SC_MULTI_STATUS:
			return true;
		default:
			return false;
		}
	}

	public static boolean isStatusCodeRetryViable(int statusCode) {
		switch (statusCode) {
		case HttpStatus.SC_NOT_FOUND:
		case HttpStatus.SC_REQUEST_TIMEOUT:
		case HttpStatus.SC_GONE:
		case HttpStatus.SC_BAD_GATEWAY:
		case HttpStatus.SC_SERVICE_UNAVAILABLE:
		case HttpStatus.SC_GATEWAY_TIMEOUT:
			return true;
		default:
			return false;
		}
	}

	/**
	 * Method to get the Response media type from header.
	 * 
	 * @param hh
	 * @return
	 */
	public static String getResponseMediaType(HttpHeaders hh) {
		return (hh == null || hh.getAcceptableMediaTypes() == null) ? MediaType.WILDCARD
				: hh.getAcceptableMediaTypes().get(0).toString();
	}

	public static String mapToJSON(Map map) throws Exception {
		return new ObjectMapper().writeValueAsString(map);
	}

	public static Map jsonToMap(String json) throws IOException {
		return new ObjectMapper().readValue(json, Map.class);
	}

	public static List jsonToList(String json) throws IOException {
		return new ObjectMapper().readValue(json, List.class);
	}

}
