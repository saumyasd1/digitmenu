package com.avery.rest.resource;

import java.io.IOException;
import java.io.StringWriter;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.service.OrderEmailQueueService;
import com.avery.storage.service.OrderQueueService;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.DateUtils;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * 
 * @author Amit Trivedi
 */
@Path("ordertrend")
public class OrderTrend {
	
	static HashMap<String, Map> statusList = ApplicationUtils.statusCode;

	private static Map<String, String> statusMap = new HashMap<String, String>();
	static {
		statusMap.put("11", "received");
		statusMap.put("12", "parsingOrderFile");
		statusMap.put("13", "readyForItemSpec");
		statusMap.put("15", "processingItemSpec");
		statusMap.put("16", "readyForValidation");
		statusMap.put("18", "validating");
		statusMap.put("19", "waitingCR");
		statusMap.put("21", "soGenerated");
		statusMap.put("23", "soSubmitted");
		statusMap.put("41", "booked");
		statusMap.put("42", "error");
		statusMap.put("50", "cancel");
		statusMap.put("56", "oracleError");
	}
	
	private static Map<String, String> emailQueueStatusMap = new HashMap<String, String>();
	static {
		emailQueueStatusMap.put("3", "unidentified");
		emailQueueStatusMap.put("4", "unrecognized");
	}

	@GET
	@Path("/chart/{day: [0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchChartData(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("day") int days)
			throws JsonParseException, JsonMappingException, IOException {
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.writeValue(writer, buildChartData(days));
			return Response.ok(writer.toString()).build();
		} catch (WebApplicationException aep) {
			throw aep;
		} catch (Exception e) {
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	@GET
	@Path("/homelist")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchHomeList(@Context UriInfo ui, @Context HttpHeaders hh)
			throws JsonParseException, JsonMappingException, IOException {
		MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.writeValue(writer, buildGridData(queryParamMap));
			return Response.ok(writer.toString()).build();
		} catch (WebApplicationException aep) {
			throw aep;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	public static List<Map<String, Object>> buildChartData(int day) throws Exception {
		OrderQueueService orderQueueService = (OrderQueueService) SpringConfig.getInstance()
				.getBean("orderQueueService");
		MultivaluedMap queryParamMap=(MultivaluedMap) new HashMap();
		Set<OrderQueue> set = orderQueueService.getList(day, statusMap.keySet(),queryParamMap);
		switch (day) {
		case 1: {
			return buildDataList(set, day, 24);
		}
		case 7: {
			return buildDataList(set, day, day);
		}
		case 14: {
			return buildDataList(set, day, day);
		}
		case 30: {
			return buildDataList(set, day, 4);
		}
		default: {
			int part = (day > 14) ? day / 7 : day;
			return buildDataList(set, day, part);
		}
		}
	}

	private static List<Map<String, Object>> buildDataList(Set<OrderQueue> set, int day, int part) {
		List<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
		if (day <= 0 || set.size() == 0)
			return list;
		Map<String, Object> datamap = null;
		Format formatter = (part == 24) ? new SimpleDateFormat("dd::HH") : new SimpleDateFormat("dd MMM");
		Date endDate = new Date();
		Date startDate = (part == 24) ? DateUtils.getPreviousHours(endDate, 1)
				: DateUtils.getPreviousDate(endDate, day / part);
		Date recieveDate = null;
		for (int i = 0; i <= part; i++) {
			datamap = new HashMap<String, Object>();
			for (String status : statusMap.keySet()) {
				datamap.put(statusMap.get(status), 0);
			}
			for (OrderQueue orderQueue : set) {
				datamap.put("day", formatter.format(endDate));
				// recieveDate = orderQueue.getReceivedDate();
				if (recieveDate.before(endDate) && recieveDate.after(startDate)) {
					for (String status : statusMap.keySet()) {
						if (orderQueue.getStatus().equals(status)) {
							if (datamap.containsKey(statusMap.get(status))) {
								datamap.put(statusMap.get(status), (int) datamap.get(statusMap.get(status)) + 1);
							} else {
								datamap.put(statusMap.get(status), 1);
							}
						}
					}

				}
			}
			((LinkedList) list).addFirst(datamap);
			endDate = startDate;
			startDate = (part == 24) ? DateUtils.getPreviousHours(endDate, 1)
					: DateUtils.getPreviousDate(endDate, day / part);
		}
		return list;
	}

	public static List<Map<String, Object>> buildGridData(MultivaluedMap<String, String> queryParamMap) throws Exception {
		OrderQueueService orderQueueService = (OrderQueueService) SpringConfig.getInstance()
				.getBean("orderQueueService");
		Set<OrderQueue> set = orderQueueService.getList(30, statusMap.keySet(),queryParamMap);
		OrderEmailQueueService orderEmailQueueService = (OrderEmailQueueService) SpringConfig.getInstance()
				.getBean("orderEmailQueueService");
		Set<OrderEmailQueue> emailQueueSet = orderEmailQueueService.getList(30, emailQueueStatusMap.keySet(),queryParamMap);
		List<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
		Map<String, Object> recievedMap = buildMap("Order Received", "11");
		list.add(recievedMap);
		Map<String, Object> parsingOrderFileMap = buildMap("Parsing Order File", "12");
		list.add(parsingOrderFileMap);
		Map<String, Object> readyForItemSpecMap = buildMap("Ready For Item Spec", "13");
		list.add(readyForItemSpecMap);
		Map<String, Object> processingItemSpecMap = buildMap("Processing Item Spec", "15");
		list.add(processingItemSpecMap);
		Map<String, Object> readyForValidationMap = buildMap("Ready For Validation", "16");
		list.add(readyForValidationMap);
		Map<String, Object> validatingMap = buildMap("Validating", "18");
		list.add(validatingMap);
		Map<String, Object> waitingCRMap = buildMap("Waiting For CS Verification", "19");
		list.add(waitingCRMap);
		Map<String, Object> soGeneratedMap = buildMap("SO Generated", "21");
		list.add(soGeneratedMap);
		Map<String, Object> soSubmittedMap = buildMap("SO Submitted", "23");
		list.add(soSubmittedMap);
		Map<String, Object> bookedMap = buildMap("Booked", "41");
		list.add(bookedMap);
		Map<String, Object> errorMap = buildMap("Error", "42");
		list.add(errorMap);
		Map<String, Object> cancelMap = buildMap("Cancel", "50");
		list.add(cancelMap);
		Map<String, Object> unidentifiedMap = buildMapForEmailQueue("Unidentified", "3");
		list.add(unidentifiedMap);
		Map<String, Object> unrecognizedMap = buildMapForTaskManager("Unrecognized", "4");
		list.add(unrecognizedMap);
		Map<String, Object> oracleErrorMap = buildMap("ERP Error", "56");
		list.add(oracleErrorMap);
		Map<String, Object> toatalCount = buildMapForTotalCount("Total Count");
		list.add(toatalCount);
		Map<String, Map<String, Object>> myMap = new HashMap<String, Map<String, Object>>();
		myMap.put("11", recievedMap);
		myMap.put("12", parsingOrderFileMap);
		myMap.put("13", readyForItemSpecMap);
		myMap.put("15", processingItemSpecMap);
		myMap.put("16", readyForValidationMap);
		myMap.put("18", validatingMap);
		myMap.put("19", waitingCRMap);
		myMap.put("21", soGeneratedMap);
		myMap.put("23", soSubmittedMap);
		myMap.put("41", bookedMap);
		myMap.put("42", errorMap);
		myMap.put("50", cancelMap);
		myMap.put("56", oracleErrorMap);
		// myMap.put("3", unidentifiedMap);
		// myMap.put("4", unrecognizedMap);
		buildMapData(set, 1, myMap);
		buildMapData(set, 7, myMap);
		buildMapData(set, 14, myMap);
		buildMapData(set, 30, myMap);
		Map<String, Map<String, Object>> emailQueueMap = new HashMap<String, Map<String, Object>>();
		emailQueueMap.put("3", unidentifiedMap);
		emailQueueMap.put("4", unrecognizedMap);
		buildMapDataForEmailQueue(emailQueueSet, 1, emailQueueMap);
		buildMapDataForEmailQueue(emailQueueSet, 7, emailQueueMap);
		buildMapDataForEmailQueue(emailQueueSet, 14, emailQueueMap);
		buildMapDataForEmailQueue(emailQueueSet, 30, emailQueueMap);
		Map<String, Object> m = null;
		for (String key : myMap.keySet()) {
			m = myMap.get(key);
			for (String type : m.keySet()) {
				if (!(type.equals("orderType") || type.equals("colorCode") || type.equals("statusCode")
						|| type.equals("type"))) {
					toatalCount.put(type, (int) toatalCount.get(type) + (int) m.get(type));
				}
			}
		}
		return list;
	}

	static void buildMapData(Set<OrderQueue> set, int days, Map<String, Map<String, Object>> myMap) {
		Date endDate = new Date();
		endDate.setHours(0);
		endDate.setMinutes(0);
		endDate.setSeconds(0);
		Date startDate = DateUtils.getPreviousDate(endDate, days);
		Calendar c = Calendar.getInstance();
		c.setTime(endDate);
		c.add(Calendar.DATE, 1);
		endDate = c.getTime();
		Date createdDate = null;
		String status;
		String key = "";
		switch (days) {
		case 1: {
			key = "lastOneDay";
			break;
		}
		case 7: {
			key = "lastWeek";
			break;
		}
		case 14: {
			key = "lastTwoWeek";
			break;
		}
		case 30: {
			key = "lastMonth";
			break;
		}
		}
		Map<String, Object> m = null;
		for (OrderQueue orderQueue : set) {
			createdDate = orderQueue.getCreatedDate();
			Calendar cal = new GregorianCalendar();
			cal.setTime(createdDate);
			Date ddd = cal.getTime();

			if (ddd.before(endDate) && ddd.after(startDate)) {
				status = orderQueue.getStatus();
				switch (status) {
				case "11": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "12": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "13": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "15": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "16": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "18": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "19": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "21": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "23": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "41": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "42": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "50": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "56": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				}
			}
		}
	}
	
	static void buildMapDataForEmailQueue(Set<OrderEmailQueue> set, int days, Map<String, Map<String, Object>> myMap) {
		Date endDate = new Date();
		endDate.setHours(0);
		endDate.setMinutes(0);
		endDate.setSeconds(0);
		Date startDate = DateUtils.getPreviousDate(endDate, days);
		Calendar c = Calendar.getInstance();
		c.setTime(endDate);
		c.add(Calendar.DATE, 1);
		endDate = c.getTime();
		Date createdDate = null;
		String status;
		String key = "";
		switch (days) {
		case 1: {
			key = "lastOneDay";
			break;
		}
		case 7: {
			key = "lastWeek";
			break;
		}
		case 14: {
			key = "lastTwoWeek";
			break;
		}
		case 30: {
			key = "lastMonth";
			break;
		}
		}
		Map<String, Object> m = null;
		for (OrderEmailQueue orderEmailQueue : set) {
			createdDate = orderEmailQueue.getCreatedDate();
			Calendar cal = new GregorianCalendar();
			cal.setTime(createdDate);
			Date ddd = cal.getTime();

			if (ddd.before(endDate) && ddd.after(startDate)) {
				status = orderEmailQueue.getStatus();
				switch (status) {
				case "3": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "4": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				}
			}
		}
	}

	static Map<String, Object> buildMap(String type, String status) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, String> statusCodes = statusList.get(status);
		map.put("orderType", type);
		map.put("lastOneDay", 0);
		map.put("lastWeek", 0);
		map.put("lastTwoWeek", 0);
		map.put("lastMonth", 0);
		map.put("colorCode", statusCodes.get("colorCode"));
		map.put("statusCode", status);
		map.put("type", "orderqueue");
		return map;
	}
	
	static Map<String, Object> buildMapForEmailQueue(String type, String status) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, String> statusCodes = statusList.get(status);
		map.put("orderType", type);
		map.put("lastOneDay", 0);
		map.put("lastWeek", 0);
		map.put("lastTwoWeek", 0);
		map.put("lastMonth", 0);
		map.put("colorCode", statusCodes.get("colorCode"));
		map.put("statusCode", status);
		map.put("type", "emailqueue");
		return map;
	}
	
	static Map<String, Object> buildMapForTaskManager(String type, String status) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, String> statusCodes = statusList.get(status);
		map.put("orderType", type);
		map.put("lastOneDay", 0);
		map.put("lastWeek", 0);
		map.put("lastTwoWeek", 0);
		map.put("lastMonth", 0);
		map.put("colorCode", statusCodes.get("colorCode"));
		map.put("statusCode", status);
		map.put("type", "taskmanager");
		return map;
	}
	
	static Map<String, Object> buildMapForTotalCount(String type) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orderType", type);
		map.put("lastOneDay", 0);
		map.put("lastWeek", 0);
		map.put("lastTwoWeek", 0);
		map.put("lastMonth", 0);
		return map;
	}
}
