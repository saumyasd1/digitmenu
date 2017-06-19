package com.avery.utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import com.avery.logging.AppLogger;
public class ApplicationUtils {

	public static DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    
	public static HashMap<String, Map> statusCode;
	public static HashMap<String, Map> wiStatusCode;
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
	
	/**
	 * Method for uploading file to the specified directory and given filename
	 * 
	 * @param is
	 * @param directoryPath
	 * @param fileName
	 */
	public static void fileUpload(InputStream is, String directoryPath, String fileName) {
		File targetFile = new File(directoryPath + File.separatorChar + fileName);
		try {
			FileUtils.copyInputStreamToFile(is, targetFile);
		} catch (IOException e) {
			AppLogger.getSystemLogger().error("Error while uploading the file", e);
			e.printStackTrace();
		}
	}
	
	/**
	 * Method to return comma separated elements of a string as list
	 * 
	 * @param str
	 * @return list of elements after removing null and blanks
	 */
	public static List<String> convertStringToList(String str) {
		List<String> list = Arrays.asList(str.split(","));
		List<String> removeList = new ArrayList<String>();
		removeList.add(null);
		removeList.add("");
		list.removeAll(removeList);
		return list;
	}
	
}
