package com.avery.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.OrderQueue;

public class ExcelUtils {
			
	public static ByteArrayOutputStream createOrderQueueExcelFile(List<OrderQueue> OrderQueueList) throws IOException{
		XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Sheet 1");
        String[] headerNames = { "Order track #","Prv Order track#","Order Source", "PO #", "Order File",
				"Additional data", "Partner Name", "RBO", "Product Line",
				"Order Status", "Processed Date", "Sender Email ID", "Subject","Submitted By","Submitted Date","Acknowledgement Date","Comment","Error" };
        addHeader(sheet, headerNames);
        getReportData(sheet,OrderQueueList,headerNames.length);
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
	private static void getReportData(XSSFSheet sheet,List<OrderQueue> OrderQueueList,int headerLength){
		int rowIndex=1,columncellCount=0;
		String orderFile="",additionalData="";
		Set<OrderFileAttachment> fileList=null;
		Iterator<OrderQueue> CrunchifyIterator = OrderQueueList.iterator();
		while (CrunchifyIterator.hasNext()) {
			OrderQueue obj=CrunchifyIterator.next();
			fileList=obj.getOrderFileAttachment();
			orderFile="";
			additionalData="";
			for(OrderFileAttachment fileObj:fileList){
				if(fileObj.getFileContentType().equals("AdditionalData")){
					additionalData=additionalData+","+fileObj.getFileName();
				}else{
					orderFile=orderFile+","+fileObj.getFileName();
				}
			}
			if(!orderFile.equals("") && orderFile.length()>1){
				orderFile=orderFile.substring(1, orderFile.length()-1);
			}
			if(!additionalData.equals("") && additionalData.length()>1){
				additionalData=additionalData.substring(1, additionalData.length()-1);
			}
			Row row = sheet.createRow(rowIndex);
			Cell cell1 = row.createCell(columncellCount);
			cell1.setCellValue(obj.getId());
			Cell cell2 = row.createCell(++columncellCount);
			if(obj.getPrvOrderQueueID()!= null)
			cell2.setCellValue(obj.getPrvOrderQueueID());
			Cell cell3 = row.createCell(++columncellCount);
			cell3.setCellValue(obj.getOrderSource());
			Cell cell4 = row.createCell(++columncellCount);
			cell4.setCellValue(obj.getPONumber());
			Cell cell5 = row.createCell(++columncellCount);
			cell5.setCellValue(orderFile);
			Cell cell6 = row.createCell(++columncellCount);
			cell6.setCellValue(additionalData);
			Cell cell7 = row.createCell(++columncellCount);
			if(obj.getPartner()!=null && !obj.getPartner().equals(""))
				cell7.setCellValue(obj.getPartner().getPartnerName());
			Cell cell8 = row.createCell(++columncellCount);
			cell8.setCellValue(obj.getRboName());
			Cell cell9 = row.createCell(++columncellCount);
			if(obj.getProductLine()!=null && !obj.getProductLine().equals(""))
				cell9.setCellValue(obj.getProductLine().getProductLineType());
			Cell cell10 = row.createCell(++columncellCount);
			cell10.setCellValue(OrderQueue.getCodeMap().get(obj.getStatus()));
			Cell cell11 = row.createCell(++columncellCount);
			if(obj.getReceivedDate()!=null)
				cell11.setCellValue(obj.getReceivedDate().toString());
			Cell cell12 = row.createCell(++columncellCount);
			cell12.setCellValue(obj.getSenderEmailID());
			Cell cell13 = row.createCell(++columncellCount);
			cell13.setCellValue(obj.getSubject());
//			Cell cell13 = row.createCell(++columncellCount);
//			cell13.setCellValue(obj.getEmailBody());
			Cell cell14 = row.createCell(++columncellCount);
			cell14.setCellValue(obj.getSubmittedBy());
			Cell cell15 = row.createCell(++columncellCount);
			if(obj.getSubmittedDate()!=null)
				cell15.setCellValue(obj.getSubmittedDate().toString());
			Cell cell16 = row.createCell(++columncellCount);
			if(obj.getAcknowledgementDate()!=null)
			cell16.setCellValue(obj.getAcknowledgementDate().toString());
			Cell cell17 = row.createCell(++columncellCount);
			cell17.setCellValue(obj.getComment());
			Cell cell18 = row.createCell(++columncellCount);
			cell18.setCellValue(obj.getError());
			columncellCount=0;
			rowIndex++;
		}
		for(int i=0;i<=headerLength;i++){
			sheet.autoSizeColumn(i);
		}
	}
}