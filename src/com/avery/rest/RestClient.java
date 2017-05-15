package com.avery.rest;

import java.util.Iterator;
import java.util.LinkedList;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.http.HttpStatus;
import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;
import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.slf4j.Logger;

/**
 * 4-July-2015
 * 
 * @author aman
 */
public class RestClient {

	public static final String POST_OPERATION = "post";

	public static final String PUT_OPERATION = "put";

	public static final String GET_OPERATION = "get";

	public static final String DELETE_OPERATION = "delete";

	/**
	 * Calls the REST service by setting the request parameters and returns the
	 * Response
	 * 
	 * @param URL
	 * @param requestMediaType
	 * @param responseMediaType
	 * @param operation
	 * @param data
	 * @param queryParamMap
	 * @param headerParamMap
	 * @param userName
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static Response invoke(String URL, String requestMediaType,
			String responseMediaType, String operation, Object data,
			MultivaluedMap<String, String> queryParamMap,
			MultivaluedMap<String, String> pathParamMap,
			MultivaluedMap<String, String> headerParamMap, String userName,
			String password) throws Exception {
		Response response = null;

		// create client configuration
		Client client = ClientBuilder.newBuilder()
				// .register(JacksonFeature.class)
				.register(new LoggingFilter()).register(MultiPartFeature.class)
				.build();

		// setup basic authentication with the supplied username and password
		if (userName != null && password != null)
			client.register(HttpAuthenticationFeature.basicBuilder()
					.credentials(userName, password).build());

		// define connection to the resource URL
		WebTarget webTarget = client.target(URL);

		// define query parameters
		if (queryParamMap != null) {
			Iterator<String> keys = queryParamMap.keySet().iterator();
			while (keys.hasNext()) {
				String key = keys.next();
				Object value = queryParamMap.get(key);
				if (value instanceof LinkedList
						&& ((LinkedList) value).size() == 1)
					value = ((LinkedList) value).getFirst();
				webTarget = webTarget.queryParam(key, value);
			}
		}

		// define header parameters
		Invocation.Builder builder = null;
		if (responseMediaType != null)
			builder = webTarget.request(responseMediaType);
		else
			builder = webTarget.request();
		if (headerParamMap != null) {
			Iterator<String> keys = headerParamMap.keySet().iterator();
			while (keys.hasNext()) {
				String key = keys.next();
				Object value = headerParamMap.getFirst(key);
				builder = builder.header(key, value);
			}
		}
		// invoke specific HTTP operation
		if (operation.equalsIgnoreCase(POST_OPERATION))
			response = builder.post(Entity.entity(data, requestMediaType));
		else if (operation.equalsIgnoreCase(GET_OPERATION))
			response = builder.get();
		else if (operation.equalsIgnoreCase(PUT_OPERATION))
			response = builder.put(Entity.entity(data, requestMediaType));
		else if (operation.equalsIgnoreCase(DELETE_OPERATION))
			response = builder.delete();

		return response;
	}

	public static Response invoke(String URL, String requestMediaType,
			String responseMediaType, String operation, Object data,
			MultivaluedMap<String, String> queryParamMap,
			MultivaluedMap<String, String> pathParamMap,
			MultivaluedMap<String, String> headerParamMap, String userName,
			String password, int retryCount, int retryInterval, Logger log)
			throws Exception {
		Response response = null;
		int count = 0;
		boolean retry = false;
		int responseCode = -1;
		while (true) {
			try {
				response = invoke(URL, requestMediaType, responseMediaType,
						operation, data, queryParamMap, pathParamMap,
						headerParamMap, userName, password);
				if (response == null) {
					retry = true;
					throw new Exception(
							"No response received from REST call to URL \""
									+ URL + "\"");
				} else if (!isValidStatusCode(responseCode = response
						.getStatus())) {
					retry = isStatusCodeRetryViable(responseCode);
					String exceptionMessage = "Response received from REST call to URL \""
							+ URL
							+ "\" with invalid status code \""
							+ responseCode + "\"";
					try {
						String message = response.readEntity(String.class);
						exceptionMessage += " and message : " + message;
					} catch (Exception e) {
						// ignore the exception which may come while reading
						// response as String
					}
					throw new Exception(exceptionMessage);
				}
				break;
			} catch (Exception e) {
				if (retry) {
					count++;
					if (count >= retryCount) {
						throw e;
					} else {
						if (log != null) {
							log.error("REST call to URL \"" + URL
									+ "\" failed with message : "
									+ e.getMessage() + ", RETRYING...");
						}
						try {
							Thread.sleep(retryInterval);
						} catch (Exception e1) {
							// ignore
						}
					}
				} else {
					throw e;
				}
			}
		}
		return response;
	}

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

	public static void main(String[] args) throws Exception {
		Response response = invoke(
				"http://www.espncricinfo.com",
				MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON,
				GET_OPERATION, null, null, null, null, null, null);
		//System.out.println(response.readEntity(String.class));
	}

}
