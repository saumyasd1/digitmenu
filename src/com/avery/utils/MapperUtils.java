package com.avery.utils;

import java.util.TimeZone;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
public class MapperUtils {

	public static ObjectMapper getObjectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		mapper.setTimeZone(TimeZone.getDefault());
		return mapper;
	}
}
