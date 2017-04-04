package com.avery.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.TimeZone;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.avery.storage.entities.OrderQueue;

public class ExcelUtils {
			
	public static ByteArrayOutputStream createOrderQueueExcelFile(List<OrderQueue> OrderQueueList, String timeZone) throws IOException{
		XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Sheet 1");
        String[] headerNames = { "Order track #","Prv Order track#","Order Source", "PO #", "Order File",
				 "Partner Name", "RBO", "Product Line",
				"Order Status", "Processed Date", "Sender Email ID", "Subject","Submitted By","Submitted Date","Acknowledgement Date","Comment","Error" };
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
		int rowIndex=1,columncellCount=0;
		Iterator<OrderQueue> CrunchifyIterator = OrderQueueList.iterator();
		Date date = null;
		while (CrunchifyIterator.hasNext()) {
			OrderQueue obj=CrunchifyIterator.next();
			Row row = sheet.createRow(rowIndex);
			Cell cell1 = row.createCell(columncellCount);
			cell1.setCellValue(obj.getId());
			Cell cell2 = row.createCell(++columncellCount);
			cell2.setCellValue(obj.getPrevOrderQueueId());
			Cell cell3 = row.createCell(++columncellCount);
			cell3.setCellValue(obj.getOrderSource());
			Cell cell4 = row.createCell(++columncellCount);
			cell4.setCellValue(obj.getPoNumber());
			Cell cell5 = row.createCell(++columncellCount);
			cell5.setCellValue(obj.getOrderFileName());
			Cell cell6 = row.createCell(++columncellCount);
			if(obj.getPartnerName()!=null && !obj.getPartnerName().equals(""))
				cell6.setCellValue(obj.getPartnerName());
			Cell cell7 = row.createCell(++columncellCount);
			cell7.setCellValue(obj.getRboName());
			Cell cell8 = row.createCell(++columncellCount);
			if(obj.getProductLineType()!=null && !obj.getProductLineType().equals(""))
				cell8.setCellValue(obj.getProductLineType());
			Cell cell9 = row.createCell(++columncellCount);
			cell9.setCellValue(OrderQueue.getCodeMap().get(obj.getStatus()));
			Cell cell10 = row.createCell(++columncellCount);
			if(obj.getReceivedDate()!=null)
				date = obj.getCreatedDate();
				cell10.setCellValue(convertDateUsingTimezone(date, timeZone));
			Cell cell11 = row.createCell(++columncellCount);
			cell11.setCellValue(obj.getSenderEmailId());
			Cell cell12 = row.createCell(++columncellCount);
			cell12.setCellValue(obj.getSubject());
			Cell cell13 = row.createCell(++columncellCount);
			cell13.setCellValue(obj.getSubmittedBy());
			Cell cell14 = row.createCell(++columncellCount);
			if(obj.getSubmittedDate()!=null)
				cell14.setCellValue(obj.getSubmittedDate().toString());
			Cell cell15 = row.createCell(++columncellCount);
			if(obj.getFeedbackAcknowledgementDate()!=null)
			cell15.setCellValue(obj.getFeedbackAcknowledgementDate().toString());                                               
			Cell cell16 = row.createCell(++columncellCount);
			cell16.setCellValue(obj.getComment());
			Cell cell17 = row.createCell(++columncellCount);
			cell17.setCellValue(obj.getError());
			columncellCount=0;
			rowIndex++;
		}
		for(int i=0;i<=headerLength;i++){
			sheet.autoSizeColumn(i);
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
		DateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		formatter1.setTimeZone(TimeZone.getTimeZone(timeZone));
		return formatter1.format(date);
	}
}