package com.avery.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.TimeZone;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.avery.app.config.SpringConfig;
import com.avery.storage.entities.OrderLine;
import com.avery.storage.entities.OrderQueue;
import com.avery.storage.entities.RBO;
import com.avery.storage.entities.SalesOrder;
import com.avery.storage.entities.Site;
import com.avery.storage.service.SiteService;
import com.avery.storage.service.UserService;

public class ExcelUtils {
			
	public static ByteArrayOutputStream createOrderQueueExcelFile(List<OrderQueue> OrderQueueList, String timeZone) throws IOException{
		XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Sheet 1");
        String[] headerNames = {"Site ","Order track #","Prv Order track#","Order Source", "PO #", "Order File",
				 "Partner Name", "RBO", "Product Line",
				"Order Status","Order Received Date", "Processed Date", "Sender Email ID", "Subject","Submitted By","Submitted Date","Acknowledgement Date","CSR Name ","Comment","Error" };
        addHeader(sheet, headerNames);
        getReportData(sheet,OrderQueueList,headerNames.length, timeZone);
        try(ByteArrayOutputStream  outputStream = new ByteArrayOutputStream ()) {
            workbook.write(outputStream);
		return outputStream;
        }
	}
	
	private static void addHeader(XSSFSheet sheet,String [] headerNames){
		Row row = sheet.createRow(0);
		Cell header =null;
		int columnHeaderCount=0;
		for(String headerName:headerNames){
			header=row.createCell(columnHeaderCount);
			header.setCellValue(headerName);
			columnHeaderCount++;
		}
	}
	private static void getReportData(XSSFSheet sheet,List<OrderQueue> OrderQueueList,int headerLength, String timeZone){
		try {
			int rowIndex=1,columncellCount=0;
			Iterator<OrderQueue> CrunchifyIterator = OrderQueueList.iterator();
			Date date = null;
			SiteService siteService = (SiteService) SpringConfig.getInstance().getBean("siteService");
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			while (CrunchifyIterator.hasNext()) {
				OrderQueue obj=CrunchifyIterator.next();
				String csrName="";
				csrName=userService.getUsernameById(obj.getCsrName());
				String siteName="";
				Site site = siteService.read((long)obj.getSiteId());
				if(site != null)
					siteName = site.getName();
				Row row = sheet.createRow(rowIndex);
				Cell cell1 = row.createCell(columncellCount);
				cell1.setCellValue(siteName);
				Cell cell2 = row.createCell(++columncellCount);
				cell2.setCellValue(obj.getId());
				Cell cell3 = row.createCell(++columncellCount);
				cell3.setCellValue(obj.getPrevOrderQueueId());
				Cell cell4 = row.createCell(++columncellCount);
				cell4.setCellValue(obj.getOrderSource());
				Cell cell5 = row.createCell(++columncellCount);
				cell5.setCellValue(obj.getPoNumber());
				Cell cell6 = row.createCell(++columncellCount);
				cell6.setCellValue(obj.getOrderFileName());
				Cell cell7 = row.createCell(++columncellCount);
				if(obj.getPartnerName()!=null && !obj.getPartnerName().equals(""))
					cell7.setCellValue(obj.getPartnerName());
				Cell cell8 = row.createCell(++columncellCount);
				cell8.setCellValue(obj.getRboName());
				Cell cell9 = row.createCell(++columncellCount);
				if(obj.getProductLineType()!=null && !obj.getProductLineType().equals(""))
					cell9.setCellValue(obj.getProductLineType());
				Cell cell10 = row.createCell(++columncellCount);
				cell10.setCellValue(OrderQueue.getCodeMap().get(obj.getStatus()));
				Cell cell11 = row.createCell(++columncellCount);
				if(obj.getReceivedDate()!=null)
					date = obj.getReceivedDate();
				cell11.setCellValue(convertDateUsingTimezone(date, timeZone));
				Cell cell12 = row.createCell(++columncellCount);
				if(obj.getCreatedDate()!=null)
					date = obj.getCreatedDate();
					cell12.setCellValue(convertDateUsingTimezone(date, timeZone));
				Cell cell13 = row.createCell(++columncellCount);
				cell13.setCellValue(obj.getSenderEmailId());
				Cell cell14 = row.createCell(++columncellCount);
				cell14.setCellValue(obj.getSubject());
				Cell cell15 = row.createCell(++columncellCount);
				cell15.setCellValue(obj.getSubmittedBy());
				Cell cell16 = row.createCell(++columncellCount);
				if(obj.getSubmittedDate()!=null)
						date = obj.getSubmittedDate();
						cell16.setCellValue(convertDateUsingTimezone(date, timeZone));
				Cell cell17 = row.createCell(++columncellCount);
				if(obj.getFeedbackAcknowledgementDate()!=null)
					date = obj.getFeedbackAcknowledgementDate();
				cell17.setCellValue(convertDateUsingTimezone(date, timeZone));
				Cell cell18 = row.createCell(++columncellCount);
				cell18.setCellValue(csrName);
				Cell cell19 = row.createCell(++columncellCount);
				cell19.setCellValue(obj.getComment());
				Cell cell20 = row.createCell(++columncellCount);
				cell20.setCellValue(obj.getError());
				columncellCount=0;
				rowIndex++;
			}
			for(int i=0;i<=headerLength;i++){
				sheet.autoSizeColumn(i);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	public static ByteArrayOutputStream createOrderQueueMaterialReportExcelFile(List<SalesOrder> salesOrder, String timeZone, String time, String date, String rboName) throws IOException{
		XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Sheet 1");
        String[] headerNames = {"Local Report Export Time","Local Report Export Date","RBO name","Customer PO#","Customer item #", "Avery Internal item #", "Qty",
				 "CSR name", "Customer request date", "AOC Order Track #"};
        addHeader(sheet, headerNames);
        getMaterialReportData(sheet, salesOrder, headerNames.length, timeZone, time, date, rboName);
        try(ByteArrayOutputStream  outputStream = new ByteArrayOutputStream ()) {
            workbook.write(outputStream);
		return outputStream;
        }
	}
	
	public static ByteArrayOutputStream createOrderLineMaterialReportExcelFile(List<OrderLine> orderLine, String timeZone, String time, String date, String rboName, String orderTrack) throws IOException{
		XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Sheet 1");
        String[] headerNames = {"Local Report Export Time","Local Report Export Date","RBO name","Customer PO#","Customer item #", "Avery Internal item #", "Qty",
				 "CSR name", "Customer request date", "AOC Order Track #"};
        addHeader(sheet, headerNames);
        getMaterialReportDataOrderline(sheet, orderLine, headerNames.length, timeZone, time, date, rboName, orderTrack);
        try(ByteArrayOutputStream  outputStream = new ByteArrayOutputStream ()) {
            workbook.write(outputStream);
		return outputStream;
        }
	}
	
	private static void getMaterialReportData(XSSFSheet sheet,List<SalesOrder> salesOrder,int headerLength, String timeZone, String time, String date1, String rboName){
		try {
			int rowIndex=1,columncellCount=0;
			Iterator<SalesOrder> CrunchifyIterator = salesOrder.iterator();
			Date date = null;
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			while (CrunchifyIterator.hasNext()) {
				SalesOrder obj=CrunchifyIterator.next();
				String csrName="";
				csrName=userService.getUsernameById(obj.getCsr());
				Row row = sheet.createRow(rowIndex);
				Cell cell1 = row.createCell(columncellCount);
				cell1.setCellValue(time);
				Cell cell2 = row.createCell(++columncellCount);
				cell2.setCellValue(date1);
				Cell cell3 = row.createCell(++columncellCount);
				cell3.setCellValue(rboName);
				Cell cell4 = row.createCell(++columncellCount);
				cell4.setCellValue(obj.getCustomerPoNumber());
				Cell cell5 = row.createCell(++columncellCount);
				cell5.setCellValue(obj.getCustomerItemNumber());
				Cell cell6 = row.createCell(++columncellCount);
				cell6.setCellValue(obj.getOracleItemNumber());
				Cell cell7 = row.createCell(++columncellCount);
				cell7.setCellValue(obj.getCustomerOrderedQty());
				Cell cell8 = row.createCell(++columncellCount);
				cell8.setCellValue(csrName);
				Cell cell19 = row.createCell(++columncellCount);
				if(obj.getCustomerRequestDate()!=null)
					date = obj.getCustomerRequestDate();
					cell19.setCellValue(convertDateUsingTimezone(date, timeZone));
				Cell cell10 = row.createCell(++columncellCount);
				cell10.setCellValue(obj.getVarOrderFileQueue().getId());
				columncellCount=0;
				rowIndex++;
			}
			for(int i=0;i<=headerLength;i++){
				sheet.autoSizeColumn(i);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	private static void getMaterialReportDataOrderline(XSSFSheet sheet,List<OrderLine> orderLine,int headerLength, String timeZone, String time, String date1, String rboName,String orderTrack){
		try {
			int rowIndex=1,columncellCount=0;
			Iterator<OrderLine> CrunchifyIterator = orderLine.iterator();
			Date date = null;
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			while (CrunchifyIterator.hasNext()) {
				OrderLine obj=CrunchifyIterator.next();
				String csrName="";
				csrName=userService.getUsernameById(obj.getCsr());
				Row row = sheet.createRow(rowIndex);
				Cell cell1 = row.createCell(columncellCount);
				cell1.setCellValue(time);
				Cell cell2 = row.createCell(++columncellCount);
				cell2.setCellValue(date1);
				Cell cell3 = row.createCell(++columncellCount);
				cell3.setCellValue(rboName);
				Cell cell4 = row.createCell(++columncellCount);
				cell4.setCellValue(obj.getPoNumber());
				Cell cell5 = row.createCell(++columncellCount);
				cell5.setCellValue(obj.getCustomerItemNumber());
				Cell cell6 = row.createCell(++columncellCount);
				cell6.setCellValue(obj.getAveryItemNumber());
				Cell cell7 = row.createCell(++columncellCount);
				cell7.setCellValue(obj.getCustomerOrderedQty());
				Cell cell8 = row.createCell(++columncellCount);
				cell8.setCellValue(csrName);
				Cell cell19 = row.createCell(++columncellCount);
				if(obj.getRequestedDeliveryDate() != null)
					date = obj.getRequestedDeliveryDate();
					cell19.setCellValue(convertDateUsingTimezone(date, timeZone));
				Cell cell10 = row.createCell(++columncellCount);
				cell10.setCellValue(orderTrack);
				columncellCount=0;
				rowIndex++;
			}
			for(int i=0;i<=headerLength;i++){
				sheet.autoSizeColumn(i);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	/**
	 * Method to convert date using given timezone
	 * 
	 * @param date
	 * @param timeZone
	 * @return changes the date according to specified timezone and returns
	 *         changed date
	 */
	private static String convertDateUsingTimezone(Date date, String timeZone) {
		if(date==null)
		{
			return "";
		}
		DateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
 		formatter1.setTimeZone(TimeZone.getTimeZone(timeZone));
		return formatter1.format(date);
	}
}