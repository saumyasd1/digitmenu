package com.avery.aoc;

import com.adeptia.indigo.system.Context;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.activation.MimetypesFileTypeMap;
import org.apache.commons.io.FilenameUtils;

public class ReadMail
{
  public static void main(String[] args)
    throws Exception
  {
    String protocol = "imap";

    String host = "imap.mail.yahoo.com";
    String domain = null;
    String cdoMachine = null;
    boolean secure = true;
    String userName = "shaifali.sharma36@yahoo.com";
    String password = "$haifali1";

    int port = 993;
    int[] messageNumber = (int[])null;
    boolean newMessage = true;
    String senderEmailAddress = "coolprashantgupta@gmail.com";
    String subject = "Avery Dennison";
    String msgPart = "Multipart";
    String sourceFileName = "*";
    boolean leaveCopyOnServer = true;
    String uniqueId = "384";
    String mailContent = "";
    String bodyContentType = "text/plain";
    boolean ignoreCase = false;
    Context context = null;
    String directoryPath = "D:\\Office Stuff\\Avery Dennison\\Mail\\Attachment";

    ReceiveMail receiveMail = new ReceiveMail();
    try {
      System.out.println("Running..........");
      receiveMail.getFiles(protocol, host, domain, cdoMachine, secure, 
        userName, password, port, messageNumber, newMessage, 
        senderEmailAddress, subject, msgPart, sourceFileName, 
        leaveCopyOnServer, uniqueId, mailContent, bodyContentType, 
        ignoreCase, directoryPath, context);
      System.out.println(context.get("emailBody"));
      System.out.println("Download completed..........");
    }
    catch (Exception e) {
      e.printStackTrace();
      throw e;
    } finally {
      System.out.println("Connection Closing..........");
      try {
        receiveMail.close();
        System.out.println("Connection Closed..........");
      } catch (Exception ex) {
        ex.printStackTrace();
        throw ex;
      }
    }
  }

  public void getFileStream(String path)
    throws IOException, SQLException
  {
    PreparedStatement pstmt = null;
    Connection connection = null;
    ResultSet resultset = null;
    try
    {
      File folder = new File(path);
      File[] listOfFiles = folder.listFiles();

      StringBuffer stringBuffer = new StringBuffer();
      MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();

      for (File file : listOfFiles) {
        if (file.isFile()) {
          String filename = file.getName();
          String basename = FilenameUtils.getBaseName(filename);
          String fileExtension = FilenameUtils.getExtension(filename);
          String contentType = fileTypeMap.getContentType(filename);

          if ((!filename.endsWith(".xls")) && (!filename.endsWith(".xlsx")) && (!filename.endsWith(".pdf")))
            continue;
          FileInputStream fileStream = new FileInputStream(path + File.separator + filename);

          BufferedReader br = new BufferedReader(
            new InputStreamReader(fileStream));
          String AttachedStream;
          while ((AttachedStream = br.readLine()) != null)
          {
           
            stringBuffer.append(AttachedStream).append("\n");
          }
          byte[] byteArray = String.valueOf(stringBuffer).getBytes();
          String sql = "Insert into tempTable(FileName,FileExtension,FileData,FileContentType)  values(?,?,?,?)";
          try {
            pstmt = connection.prepareStatement(sql);
            pstmt.setString(1, basename);
            pstmt.setString(2, fileExtension);
            pstmt.setBinaryStream(3, 
              new ByteArrayInputStream(byteArray), byteArray.length);
            pstmt.setString(4, contentType);
            pstmt.executeUpdate();
          } catch (Exception e) {
            e.printStackTrace();
          }
        }
      }

    }
    finally
    {
      try
      {
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