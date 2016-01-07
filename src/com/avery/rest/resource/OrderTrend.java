package com.avery.rest.resource;

import java.io.IOException;
import java.io.StringWriter;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.service.OrderQueueService;
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

	private static Map<String, String> statusMap = new HashMap<String, String>();
	static {
		statusMap.put("1", "received");
		statusMap.put("4", "waitingCR");
		statusMap.put("7", "waitingSR");
		statusMap.put("99", "success");
		statusMap.put("98", "failed");
		statusMap.put("2", "failed");
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
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.writeValue(writer, buildGridData());
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

	public static List<Map<String, Object>> buildChartData(int day)
			throws Exception {
		OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
				.getInstance().getBean("orderQueueService");
		Set<OrderQueue> set = orderQueueService
				.getList(day, statusMap.keySet());
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

	private static List<Map<String, Object>> buildDataList(Set<OrderQueue> set,
			int day, int part) {
		List<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
		if (day <= 0 || set.size() == 0)
			return list;
		Map<String, Object> datamap = null;
		Format formatter = (part == 24) ? new SimpleDateFormat("dd::HH")
				: new SimpleDateFormat("dd MMM");
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
				recieveDate = orderQueue.getReceivedDate();
				if (recieveDate.before(endDate) && recieveDate.after(startDate)) {
					for (String status : statusMap.keySet()) {
						if (orderQueue.getStatus().equals(status)) {
							if (datamap.containsKey(statusMap.get(status))) {
								datamap.put(
										statusMap.get(status),
										(int) datamap.get(statusMap.get(status)) + 1);
							} else {
								datamap.put(statusMap.get(status), 1);
							}
						}
					}

				}
			}
			((LinkedList)list).addFirst(datamap);
			endDate = startDate;
			startDate = (part == 24) ? DateUtils.getPreviousHours(endDate, 1)
					: DateUtils.getPreviousDate(endDate, day / part);
		}
		return list;
	}

	public static List<Map<String, Object>> buildGridData() throws Exception {
		OrderQueueService orderQueueService = (OrderQueueService) SpringConfig
				.getInstance().getBean("orderQueueService");
		Set<OrderQueue> set = orderQueueService.getList(30, statusMap.keySet());
		List<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
		Map<String, Object> recievedMap = buildMap("Received");
		list.add(recievedMap);
		Map<String, Object> waitinCRMap = buildMap("Waiting CS Review");
		list.add(waitinCRMap);
		Map<String, Object> waitinSRMap = buildMap("Waiting System Response");
		list.add(waitinSRMap);
		Map<String, Object> successMap = buildMap("Successful");
		list.add(successMap);
		Map<String, Object> failedMap = buildMap("Failed");
		list.add(failedMap);
		Map<String, Object> toatalCount = buildMap("Total Count");
		list.add(toatalCount);
		Map<String, Map<String, Object>> myMap = new HashMap<String, Map<String, Object>>();
		myMap.put("1", recievedMap);
		myMap.put("4", waitinCRMap);
		myMap.put("7", waitinSRMap);
		myMap.put("99", successMap);
		myMap.put("98", failedMap);
		buildMapData(set, 1, myMap);
		buildMapData(set, 7, myMap);
		buildMapData(set, 14, myMap);
		buildMapData(set, 30, myMap);
		Map<String, Object> m = null;
		for(String key:myMap.keySet()){
			m=myMap.get(key);
		  for(String type:m.keySet()){
			  if(!type.equals("orderType")){
				  toatalCount.put(type, (int) toatalCount.get(type) + (int) m.get(type));  
			  }
		  }
		}
		return list;
	}

	static void buildMapData(Set<OrderQueue> set, int days,
			Map<String, Map<String, Object>> myMap) {
		Date endDate = new Date();
		Date startDate = DateUtils.getPreviousDate(endDate, days);
		Date recieveDate = null;
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
			recieveDate = orderQueue.getReceivedDate();
			if (recieveDate.before(endDate) && recieveDate.after(startDate)) {
				status = orderQueue.getStatus();
				switch (status) {
				case "1": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "4": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "7": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "98": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "99": {
					m = myMap.get(status);
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				case "2": {
					m = myMap.get("98");
					m.put(key, (int) m.get(key) + 1);
					break;
				}
				}
			}
		}
	}

	static Map<String, Object> buildMap(String type) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orderType", type);
		map.put("lastOneDay", 0);
		map.put("lastWeek", 0);
		map.put("lastTwoWeek", 0);
		map.put("lastMonth", 0);
		return map;
	}
}
