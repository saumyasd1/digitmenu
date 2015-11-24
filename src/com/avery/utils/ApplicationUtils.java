package com.avery.utils;

import java.io.IOException;
import java.util.HashMap;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.json.JSONException;
import org.json.JSONObject;
public class ApplicationUtils {

	public static HashMap<String,String> convertJSONtoMaps(String jsonStr) throws JsonParseException, JsonMappingException, IOException {
		HashMap<String,String> map = new HashMap<String,String>();
		JSONObject jsonObj = null;
		try {
			if(jsonStr != null)
			{
				jsonObj= new JSONObject(jsonStr);
				ObjectMapper mapper = new ObjectMapper();
				map = mapper.readValue(jsonObj.toString(), 
					    new TypeReference<HashMap<String,String>>(){});
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return map;
	}
}
