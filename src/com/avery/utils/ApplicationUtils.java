package com.avery.utils;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
public class ApplicationUtils {

	public static DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    
	public static HashMap<String,String> convertJSONtoMaps(String jsonStr) throws  IOException,Exception {
		HashMap<String,String> map = new HashMap<String,String>();
		try {
			if(jsonStr != null)
			{
				ObjectMapper mapper = new ObjectMapper();
				map = mapper.readValue(jsonStr, 
					    new TypeReference<HashMap<String,String>>(){});
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	public static HashMap<String,Object> convertJSONtoObjectMaps(String jsonStr) throws  IOException,Exception {
		HashMap<String,Object> map = new HashMap<String,Object>();
		try {
			if(jsonStr != null)
			{
				ObjectMapper mapper = new ObjectMapper();
				map = mapper.readValue(jsonStr, 
					    new TypeReference<HashMap<String,Object>>(){});
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	
	public static String convertObjectMapstoJSON(Map map) throws  IOException,Exception {
		String jsonStr="";
		try {
				ObjectMapper mapper = new ObjectMapper();
				jsonStr = mapper.writeValueAsString(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonStr;
	}
	
}
