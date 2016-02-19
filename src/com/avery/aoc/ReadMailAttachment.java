package com.avery.aoc;

import com.adeptia.indigo.system.Context;
import java.io.File;
import java.io.FileInputStream;
import java.io.FilenameFilter;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.activation.MimetypesFileTypeMap;
import org.apache.commons.io.FilenameUtils;

public class ReadMailAttachment
{
  ReceiveMail receiveMail = new ReceiveMail();

  public List<Object> downloadEmailAttachments(String host, int port, String userName, String password, String directoryPath, String senderEmailAddress, String subject, String msgPart, String sourceFileName, String protocol, String domain, String cdoMachine, boolean secure, int[] messageNumber, boolean newMessage, boolean leaveCopyOnServer, String uniqueId, String mailContent, String bodyContentType, boolean ignoreCase, String RBOName, Context context)
    throws Exception
  {
    List partnerConfiguration = new ArrayList();
    try {
      System.out.println("Starting..........");
      String productLineType = subject.substring(subject.length() - 3, 
        subject.length());
      String orderEmailDomain = senderEmailAddress.substring(
        senderEmailAddress.lastIndexOf("@") + 1, 
        senderEmailAddress.length());
      System.out.println("Search Partner Configuration started..........");
      partnerConfiguration = getPartnerConifuration(RBOName, 
        productLineType, orderEmailDomain, context);

      if (partnerConfiguration.size() == 0) {
        context.put("isError", "true");
        context.put("ErrorCode", "5");
        String errorMessage = ((String)context.get("ErrorMessage") == null) || ((String)context.get("ErrorMessage") == "") ? "" : 
          (String)context.get("ErrorMessage");
        if (!"".equalsIgnoreCase(errorMessage))
          errorMessage = errorMessage + "\n" + "No matching partner RBO entry found for Product Line type:" + productLineType;
        else
          errorMessage = "No matching partner RBO entry found for Product Line type:" + 
            productLineType;
        context.put("ErrorMessage", errorMessage);
      }

      System.out.println("Search Partner Configuration completed..........");
      try
      {
        System.out.println("Download mail started..........");
        this.receiveMail.getFiles(protocol, host, domain, cdoMachine, 
          secure, userName, password, port, messageNumber, 
          newMessage, senderEmailAddress, subject, msgPart, 
          sourceFileName, leaveCopyOnServer, uniqueId, 
          mailContent, bodyContentType, ignoreCase, 
          directoryPath, context);
        System.out.println("Download mail completed..........");
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
      if (partnerConfiguration.size() > 0) {
        System.out.println("Search order file started..........");
        String OrderSchemaType = (String)partnerConfiguration.get(2);
        String[] orderFileType = null;
        if (OrderSchemaType.equalsIgnoreCase("Excel")) {
          orderFileType = new String[] { "xls", "xlsx" };
        }
        boolean ifOrderFileExist = checkOrderFilePresent(directoryPath, 
          orderFileType);

        if (!ifOrderFileExist) {
          context.put("isError", "true");
          context.put("ErrorCode", "6");
          String errorMessage = ((String)context.get("ErrorMessage") == null) || ((String)context.get("ErrorMessage") == "") ? "" : 
            (String)context.get("ErrorMessage");
          if (!"".equalsIgnoreCase(errorMessage))
            errorMessage = errorMessage + "\n" + "Order file missing with extension xls or More than One Order file in the Mail. ";
          else
            errorMessage = "Order file missing with extension xls or More than One Order file in the Mail.";
          context.put("ErrorMessage", errorMessage);
        }

        System.out.println("Search order file completed..........");
      }
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
    finally {
      System.out.println("Connection Closing..........");
    }try {
      this.receiveMail.close();
      System.out.println("Connection Closed..........");
    } catch (Exception ex) {
      ex.printStackTrace();
      throw ex;
    }
    return partnerConfiguration;
  }

  public List<Object> getPartnerConifuration(String RBOName, String ProductLineType, String orderEmailDomain, Context context)
    throws Exception
  {
    List list = new ArrayList();
    Connection conn = null;
    ResultSet rs = null;
    PreparedStatement stmt = null;
    Integer productLineID = null;
    Integer partnerID = null;
    String OrderSchemaType = "";
    String CSRName = "";
    String CSREmail = "";

    String Tpid = (String)context.get("TransactionPID");
    String getPartnerConfigurationQuery = "select ID,PartnerID,OrderSchemaType,CSRName,CSREmail from Partner_RBOProductLine where RBOName = ? and ProductLineType = ? and OrderEmailDomain =?";
    try
    {
      conn = DatabaseUtils.getSolutionDBConnection();
      stmt = conn.prepareStatement(getPartnerConfigurationQuery);
      stmt.setString(1, RBOName);
      stmt.setString(2, ProductLineType);
      stmt.setString(3, orderEmailDomain);
      rs = stmt.executeQuery();
      while (rs.next()) {
        productLineID = Integer.valueOf(rs.getInt("ID"));
        partnerID = Integer.valueOf(rs.getInt("PartnerID"));
        OrderSchemaType = rs.getString("OrderSchemaType");
        CSRName = rs.getString("CSRName");
        CSREmail = rs.getString("CSREmail");
        list.add(productLineID);
        list.add(partnerID);
        list.add(OrderSchemaType);
        list.add(CSRName);
        list.add(CSREmail);
      }

      context.put("CSRName", CSRName);
      context.put("CSREmail", CSREmail);
    }
    catch (Exception e) {
      e.printStackTrace();
      throw e;
    } finally {
      try {
        if (conn != null) {
          conn.close();
        }
        if (stmt != null) {
          stmt.close();
        }
        if (rs != null)
          rs.close();
      }
      catch (SQLException e) {
        e.printStackTrace();
      }
    }
    return list;
  }

  public void orderEntry(List list, String senderEmailID, String mailSubject, Context context, String RBOName, String OrderSource, String directoryPath)
    throws Exception
  {
    String Emailbody = (String)context.get("emailBody");
    String receivedDateString = "";
    Timestamp timestamp = null;
    Date receivedDate = (Date)context.get("receivedDate") == null ? null : (Date)context.get("receivedDate");
    if (receivedDate != null) {
      timestamp = new Timestamp(receivedDate.getTime());
      DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");
      receivedDateString = dateFormat.format(receivedDate);
    }

    context.put("receivedDateString", receivedDateString);

    Connection conn = null;
    ResultSet rs = null;
    PreparedStatement stmt = null;
    String productLineID = null;
    String partnerID = null;
    Integer last_inserted_id = null;
    String isError = (String)context.get("isError") == null ? "" : 
      (String)context.get("isError");
    String errorcode = (String)context.get("ErrorCode") == null ? "" : 
      (String)context.get("ErrorCode");
    String errormessage = (String)context.get("ErrorMessage") == null ? "" : 
      (String)context.get("ErrorMessage");
    String Status = "";

    if (list.size() == 0) {
      partnerID = "";
      productLineID = "";
    } else {
      partnerID = String.valueOf(list.get(1));
      productLineID = String.valueOf(list.get(0));
    }

    if (isError.equalsIgnoreCase("false"))
      Status = "16";
    else {
      Status = "2";
    }
    System.out.println("Insert order entry started..........");
    String insertOrder = "INSERT INTO OrderFileQueue(PID,PartnerID,RBOName,ProductLineID,SenderEmailID,Subject,EmailBody,OrderSource,Status,Error,CreatedDate,ReceivedDate) VALUES(?,?,?,?,?,?,?,?,?,?,now(),now())";
    try
    {
      conn = DatabaseUtils.getSolutionDBConnection();

      if (conn == null) {
        context.put("isError", "true");
        context.put("ErrorCode", "7");
        context.put("ErrorMessage", 
          "Solution Database connection Error");
        throw new Exception("Error in connecting Solution Database");
      }

      stmt = conn.prepareStatement(insertOrder, 
        1);
      stmt.setString(1, (String)context.get("TransactionPID"));
      stmt.setString(2, partnerID);
      stmt.setString(3, RBOName);
      stmt.setString(4, productLineID);
      stmt.setString(5, senderEmailID);
      stmt.setString(6, mailSubject);
      stmt.setString(7, (String)context.get("emailBody"));
      stmt.setString(8, OrderSource);
      stmt.setString(9, Status);
      stmt.setString(10, errormessage);

      stmt.executeUpdate();

      rs = stmt.getGeneratedKeys();
      if (rs.next()) {
        last_inserted_id = Integer.valueOf(rs.getInt(1));
      }
      context.put("OrderQueueID", last_inserted_id);
      System.out.println("Insert order entry completed..........");
    }
    catch (Exception e) {
      context.put("isError", "true");
      context.put("ErrorCode", "8");
      context.put("ErrorMessage", "Solution Database Insertion Error");
      e.printStackTrace();
      throw e;
    } finally {
      try {
        if (conn != null) {
          conn.close();
        }
        if (stmt != null) {
          stmt.close();
        }
        if (rs != null)
          rs.close();
      }
      catch (SQLException e) {
        e.printStackTrace();
      }
    }
    try
    {
      System.out.println("Insert order attachment started..........");
      getFileStream(directoryPath, context, partnerID, productLineID, 
        last_inserted_id.intValue());
      System.out.println("Insert order attachment completed..........");
    } catch (Exception e) {
      e.printStackTrace();
    }

    if (last_inserted_id != null) {
      isError = (String)context.get("isError") == null ? "" : 
        (String)context.get("isError");
      errormessage = (String)context.get("ErrorMessage") == null ? "" : 
        (String)context.get("ErrorMessage");
      if (isError.equalsIgnoreCase("false"))
        Status = "1";
      else
        Status = "2";
      try
      {
        String updateOrderQueue = "update OrderFileQueue set Error = ?,Status = ?  where ID = ?";
        conn = DatabaseUtils.getSolutionDBConnection();
        stmt = conn.prepareStatement(updateOrderQueue);
        stmt.setString(1, errormessage);
        stmt.setString(2, Status);
        stmt.setInt(3, last_inserted_id.intValue());
        stmt.executeUpdate();
      } catch (Exception e) {
        context.put("isError", "true");
        context.put("ErrorCode", "10");
        context.put("ErrorMessage", "Solution Database Updation Error");
        e.printStackTrace();
        throw e;
      } finally {
        try {
          if (conn != null) {
            conn.close();
          }
          if (stmt != null)
            stmt.close();
        }
        catch (SQLException e) {
          e.printStackTrace();
        }
      }
    }
  }

  public boolean checkOrderFilePresent(String path, final String[] orderFileExtension)
  {
    boolean ifExist = false;
    String filename = "";
    File folder = new File(path);
    FilenameFilter filter = new FilenameFilter()
    {
      public boolean accept(File directory, String filename)
      {
        for (String ext : orderFileExtension) {
          if (filename.toLowerCase().endsWith(ext))
            return true;
        }
        return false;
      }
    };
    File[] listOfFiles = folder.listFiles(filter);
    for (File fileName : listOfFiles) {
      if ((listOfFiles != null) && (listOfFiles.length == 1)) {
        ifExist = true;
      }
    }

    return ifExist;
  }

  public void getFileStream(String path, Context context, String partnerID, String productLineID, int OrderQueueID)
    throws Exception
  {
    PreparedStatement pstmt = null;

    Connection connection = DatabaseUtils.getSolutionDBConnection();
    FileInputStream fileStream = null;
    String filename = null;
    try
    {
      File folder = new File(path);
      File[] listOfFiles = folder.listFiles();

      StringBuffer stringBuffer = new StringBuffer();
      MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();

      for (File file : listOfFiles) {
        if (file.isFile()) {
          filename = file.getName();
          String basename = FilenameUtils.getBaseName(filename);
          String fileExtension = FilenameUtils.getExtension(filename);
          String contentType = fileTypeMap.getContentType(filename);
          String FileContentType = "";

          if ((!filename.toLowerCase().endsWith(".xls")) && 
            (!filename.toLowerCase().endsWith(".xlsx")) && 
            (!filename.toLowerCase().endsWith(".pdf"))) continue;
          fileStream = new FileInputStream(path + File.separator + 
            filename);
          if ((filename.toLowerCase().endsWith(".xls")) || 
            (filename.toLowerCase().endsWith(".xlsx")))
            FileContentType = "Order";
          else {
            FileContentType = "AdditionalData";
          }
          int len = (int)file.length();
          System.out.println("Inserting attachment started for::" + 
            filename);

          String sql = "Insert into OrderFileAttachment(OrderQueueID,OrderQueuePID,PartnerID,RBOID,ReceivedDate,FileName,FileExtension,FileData,FileContentType,CreatedDate)  values(?,?,?,?,?,?,?,?,?,now())";

          pstmt = connection.prepareStatement(sql);
          pstmt.setInt(1, OrderQueueID);
          pstmt.setString(2, (String)
            context.get("TransactionPID"));
          pstmt.setString(3, partnerID);
          pstmt.setString(4, "");
          pstmt.setString(5, (String)
            context.get("receivedDateString"));
          pstmt.setString(6, filename);

          pstmt.setString(7, fileExtension);

          pstmt.setBinaryStream(8, fileStream, len);
          pstmt.setString(9, FileContentType);
          pstmt.executeUpdate();

          System.out
            .println("Inserting attachment completed for::" + 
            filename);
        }
      }
    }
    catch (Exception e)
    {
      context.put("isError", "true");
      context.put("ErrorCode", "9");
      String errorMessage = ((String)context.get("ErrorMessage") == null) || ((String)context.get("ErrorMessage") == "") ? "" : 
        (String)context.get("ErrorMessage");
      if (!"".equalsIgnoreCase(errorMessage))
        errorMessage = errorMessage + "\n" + "Error in inserting attachment for file: " + filename;
      else
        errorMessage = "Error in inserting attachment for file: " + filename;
      context.put("ErrorMessage", errorMessage);
      throw e;
    }
    finally {
      try {
        if (fileStream != null) {
          fileStream.close();
        }
        if (connection != null) {
          connection.close();
        }
        if (pstmt != null)
          pstmt.close();
      }
      catch (SQLException e) {
        e.printStackTrace();
      }
    }
  }
}