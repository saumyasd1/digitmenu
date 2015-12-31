package com.avery.rest.filter;

import io.jsonwebtoken.Claims;

import java.io.IOException;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;

import com.avery.exception.SystemException;
import com.avery.exception.code.RestErrorCode;
import com.avery.logging.AppLogger;
import com.avery.web.jwt.JWTUtils;

@Provider
@PreMatching
public class AuthFilter implements ContainerRequestFilter {

	private static final String AUTH_HEADER = "Authorization";

	@Override
	public void filter(ContainerRequestContext requestContext)
			throws IOException {
		boolean authenticated = false;
		try {
			// by-pass login user request
			String method = requestContext.getMethod();
			method = (method == null) ? "" : method;
			String requestURI = requestContext.getUriInfo().getAbsolutePath()
					.toString();
			if (requestContext.getMediaType().toString()
					.indexOf("multipart/form-data") != -1) {
				return;
			}
			if (method.equals("POST")
					&& (requestURI.indexOf("login/user") != -1)) {
				return;
			}
			// Get request headers
			final MultivaluedMap<String, String> headers = requestContext
					.getHeaders();
			String authToken = headers.getFirst(AUTH_HEADER);
			if (authToken != null) {
				try {
					Claims claims = JWTUtils.parseJWT(authToken);
					authenticated = true;
				} catch (Exception e) {
					throw SystemException
							.wrap(e, RestErrorCode.AUTH_FAILED_INVALID_TOKEN)
							.set("Request URI", requestURI)
							.set("Operation", method).set("Headers", headers);
				}
			}else{
//				throw SystemException
//				.wrap(null, RestErrorCode.AUTH_FAILED_INVALID_TOKEN)
//				.set("Request URI", requestURI)
//				.set("Operation", method).set("Headers", headers);
				AppLogger.getSystemLogger().error(
						"Token is not found request.");
			}
		} catch (SystemException se) {
			authenticated = false;
			se.printStackTrace();
			AppLogger.getSystemLogger().error(
					"Error in authenticating request", se);
		}
		 if (!authenticated) {
		 throw new WebApplicationException(Status.UNAUTHORIZED);
		 }
	}
}
