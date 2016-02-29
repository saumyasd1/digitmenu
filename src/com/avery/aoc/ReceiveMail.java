package com.avery.aoc;

import com.adeptia.indigo.system.Context;
import com.adeptia.indigo.system.IndigoConfig;
import com.sun.mail.imap.IMAPFolder;
import com.sun.mail.pop3.POP3Folder;
import com.sun.mail.util.BASE64DecoderStream;


import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import javax.mail.Address;
import javax.mail.Flags;
import javax.mail.Flags.Flag;
import javax.mail.Folder;
import javax.mail.Header;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Part;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;
import javax.mail.search.FlagTerm;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

public class ReceiveMail
{
  private Store store = null;
  private Folder folder = null;
  private String mailProtocol;
  private int retry = 0;
  private int sleepTime;
  private String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
  private static String MAILBOX = "INBOX";
  private boolean debug;
  private transient Logger log = Logger.getLogger(ReceiveMail.class);

  PatternMatcher pm = new PatternMatcher();

  public List<Message> receiveEmail(String protocol, String host, String domain, String cdoMachine, boolean secure, String userName, String password, int port, int[] messageNumber, boolean newMessage, Context context)
    throws Exception
  {
    Message[] msgs = (Message[])null;
    try
    {
      connect(protocol, host, secure, userName, password, port);

      this.folder = this.store.getDefaultFolder();
      if (this.folder == null) {
        return null;
      }

      this.folder = this.folder.getFolder(MAILBOX);

      if (this.folder == null)
        return null;
      try
      {
        this.folder.open(2);
      } catch (MessagingException e) {
        this.folder.open(1);
        this.log.debug("Inside message exception " + e);
      }

      int totalMessages = this.folder.getMessageCount();

      if (totalMessages == 0) {
        return null;
      }
      if (messageNumber != null) {
        msgs = this.folder.getMessages(messageNumber);
      }
      else if (newMessage) {
        Flags flags = new Flags(Flags.Flag.SEEN);

        FlagTerm term = new FlagTerm(flags, false);
        msgs = this.folder.search(term);
      } else {
        msgs = this.folder.getMessages();
      }
    } catch (Exception e) {
      context.put("isError", "true");
      context.put("ErrorCode", "1");
      String errorMessage = ((String)context.get("ErrorMessage") == null) || ((String)context.get("ErrorMessage") == "") ? "" : 
        (String)context.get("ErrorMessage");
      if (!"".equalsIgnoreCase(errorMessage))
        errorMessage = errorMessage + "\n" + "Error in connecting mail server";
      else
        errorMessage = "Error in connecting mail server";
      context.put("ErrorMessage", errorMessage);
      throw e;
    }
    return new ArrayList((Collection)Arrays.asList(msgs));
  }

  public void connect(String protocol, String host, boolean secure, String userName, String password, int port)
    throws MessagingException, Exception
  {
    Properties prop = new Properties();
    if (protocol.equalsIgnoreCase("pop3"))
      protocol = "pop3";
    else
      protocol = "imap";
    this.mailProtocol = protocol;
    prop.put("mail.host", host);
    prop.put("mail.smtp.host", "mail");
    if ((protocol.equalsIgnoreCase("IMAP")) && (secure)) {
      prop.put("mail.imap.socketFactory.class", this.SSL_FACTORY);
      prop.put("mail.imap.socketFactory.fallback", "false");
    }
    else if ((protocol.equalsIgnoreCase("POP3")) && (secure)) {
      prop.put("mail.pop3.socketFactory.class", this.SSL_FACTORY);
      prop.put("mail.pop3.socketFactory.fallback", "false");
    }
    if (protocol.equalsIgnoreCase("IMAP")) {
      prop.put("mail.imap.sasl.enable", "true");
      prop.put("mail.imap.auth.login.disable", "true");
      prop.put("mail.imap.timeout", "10000");
    }
    Session session = Session.getInstance(prop);

    if (this.sleepTime <= 0) {
      this.sleepTime = 2000;
    }
    session.setDebug(this.debug);
    this.store = session.getStore(protocol);
    boolean connected = false;
    int count = 0;
    while (!connected)
      try {
        if (password == null) {
          password = "";
        }
        if ((host != null) || (userName != null))
        {
          if (protocol.equalsIgnoreCase("imap"))
            this.store.connect(host, port, userName, password);
          else
            this.store.connect(host, port, userName, password);
        }
        else {
          this.store.connect();
        }
        connected = true;
      } catch (MessagingException e) {
        count++; if ((count <= this.retry) && (
          (e.getMessage().equalsIgnoreCase("mailbox in use")) || 
          (e.getMessage().equalsIgnoreCase(
          "connection time out"))))
          try {
            Thread.sleep(this.sleepTime);
          }
          catch (InterruptedException localInterruptedException) {
          }
        else
          throw new Exception(
            "Failed to connect to the mail server. Either mail server is not available or host/port/username/password parameters are invalid. " + 
            e.getMessage());
      }
  }

  public List<Message> filterMessageOnSubject(List<Message> msgs, String subject, boolean caseSensitive)
    throws Exception
  {
    String UniqueID = null;

    if (subject != null) {
      subject = subject.replace(' ', ' ');
    }

    if ((subject == null) || (subject.trim().equals(""))) {
      return new ArrayList(msgs);
    }

    List filterMessage = new ArrayList();
    for (int i = 0; i < msgs.size(); i++) {
      int count = 0;
      try {
        String subject1 = ((Message)msgs.get(i)).getSubject();
        if (subject1 == null)
          subject1 = "";
        else {
          subject1 = subject1.replace(' ', ' ');
        }
        if (!caseSensitive) {
          if (!this.pm.isMatch(subject1.toLowerCase().trim(), 
            subject.toLowerCase().trim()))
            continue;
          if (count == 0)
            filterMessage.add((Message)msgs.get(i));
        }
        else
        {
          if (!this.pm.isMatch(subject1, subject))
            continue;
          if (count == 0) {
            filterMessage.add((Message)msgs.get(i));
          }
        }
      }
      catch (Exception e)
      {
        this.log.error("Error in filtering message", e);
      }
    }
    return filterMessage;
  }

  public List<Message> filterMessageOnSender(List<Message> msgs, String sender, boolean caseSensitive) throws Exception
  {
    if ((sender == null) || (sender.trim().equals(""))) {
      return new ArrayList(msgs);
    }
    String[] senderArr = sender.split(",");
    List filterList = new ArrayList();
    for (int k = 0; k < senderArr.length; k++) {
      for (int i = 0; i < msgs.size(); i++) {
        try {
          Address[] sender1 = ((Message)msgs.get(i)).getFrom();
          for (int j = 0; j < sender1.length; j++) {
            String senderAddress = sender1[j].toString();
            if (senderAddress == null) {
              senderAddress = "";
            }
            if (senderAddress.indexOf("<") != -1) {
              int indexStart = senderAddress.indexOf("<");
              int indexEnd = senderAddress.indexOf(">", 
                indexStart + 1);
              if (indexEnd != -1) {
                senderAddress = senderAddress.substring(
                  indexStart + 1, indexEnd);
              }
            }
            if (caseSensitive) {
              if (!this.pm.isMatch(senderAddress.toLowerCase(), 
                senderArr[k].toLowerCase())) continue;
              filterList.add((Message)msgs.get(i));
              break;
            }

            if (this.pm.isMatch(senderAddress, senderArr[k])) {
              filterList.add((Message)msgs.get(i));
              break;
            }
          }
        }
        catch (Exception e) {
          this.log.error("Error in filtering message", e);
        }
      }
    }
    return filterList;
  }

  public List < Message > filteredMessagesOnUniqueID(List < Message > msgs, String recievedUniqqueID, boolean caseSensitive, String bodyContentType, Context context)throws Exception {
		String UniqueID = null;
		int count = 0;
		List filterMessage = new ArrayList();
		String systemEncoding = System.getProperty("abpm.characterSetEncoding");
		String mailProtocol = System.getProperty("MailProtocol");
		String mailServer = System.getProperty("mailServer");
		String emailID = System.getProperty("mailServerUserId");
		String password = System.getProperty("mailServerPassword");
		String sslEnable = System.getProperty("abpm.notification.mailNotification.sslEnabled");
		String port  = System.getProperty("abpm.notification.mailNotification.port");
		String env = System.getProperty("Home.Environment.DisplayName");
		String defaultEmailID = (String)DatabaseUtils.getPropertiesMap().get("aoc.environment.emailid");
		Properties properties = new Properties();
		properties.put("mail.smtps.auth", "true");
		properties.put("mail.smtps.host", mailServer);
		properties.put("mail.smtps.port", port);
		properties.put("mail.smtps.starttls.enable", "true");
		Session session = Session.getDefaultInstance(properties);
		Message message = null;
		String csrEmail = context.get("CSREmail") == null || "".equals(context.get("CSREmail")) ? defaultEmailID : (String)context.get("CSREmail");
		context.put("defaultEmailID",csrEmail);
		for (int i = 0; i < msgs.size(); i++) {
			UniqueID = getUniqueId(msgs.get(i));
			System.out.println("loop::" + count++);
			System.out.println("Subject::" + ((Message)msgs.get(i)).getSubject());

			try {
				if (!caseSensitive) {
					if (UniqueID.equalsIgnoreCase(recievedUniqqueID)) {
						message = (Message)msgs.get(i);
						String emailBody = IOUtils.toString(getBodyMessage(message, bodyContentType), systemEncoding);
						Date receivedDate = ((Message)msgs.get(i)).getReceivedDate();

						Message forward = new MimeMessage(session);
						// Fill in header
						// To Address
						forward.setRecipients(Message.RecipientType.TO, InternetAddress.parse(csrEmail));

						// Subject Line
						forward.setSubject(env + " (AOC) Fwd: " + message.getSubject());

						// From Address
						forward.setFrom(new InternetAddress(InternetAddress.toString(message.getRecipients(Message.RecipientType.TO))));

						// Create the message part
						MimeBodyPart messageBodyPart = new MimeBodyPart();
						MimeBodyPart messageBodyPart2 = new MimeBodyPart();
						// Create a multipart message
						Multipart multipart = new MimeMultipart();

						// set custom message
						messageBodyPart2.setText("============================================================================================\n\n"
							 + "***  Below email message is being forwarded from AOC. Please do not reply to this email. ***\n\n"
							 + "============================================================================================");
						messageBodyPart.setContent(message, "message/rfc822");
						// Add part to multi part
						multipart.addBodyPart(messageBodyPart2);
						multipart.addBodyPart(messageBodyPart);
						// Associate multi-part with message
						forward.setContent(multipart);
						forward.saveChanges();

						// Send the message by authenticating the SMTP server
						// Create a Transport instance and call the sendMessage
						Transport t = session.getTransport("smtps");
						try {
							// connect to the smpt server using transport
							// instance
							// change the user and password accordingly
							t.connect(mailServer, emailID, password);
							t.sendMessage(forward, forward.getAllRecipients());
						}
						finally {
							t.close();
						}
						context.put("emailBody", emailBody);
						context.put("receivedDate", receivedDate);
						filterMessage.add((Message)msgs.get(i));
						break;
					}

				} else if (UniqueID.equalsIgnoreCase(recievedUniqqueID)) {
					filterMessage.add((Message)msgs.get(i));
				}

			} catch (Exception e) {
				this.log.error("Error in filtering message", e);
				i++;
			}

		}

		return filterMessage;
	}

  public List<Message> filterOnAttachment(String msgPart, List<Message> messages, String sourceFileName, String contentType, boolean ignoreCase)
    throws Exception
  {
    List filteredMessages = new ArrayList();
    for (int i = 0; i < messages.size(); i++) {
      Message msg = (Message)messages.get(i);
      System.out.println("**Mail subject =" + msg.getSubject());
      if ((msgPart.equalsIgnoreCase("ATTACHMENT")) || 
        (msgPart.equalsIgnoreCase("MULTIPART"))) {
        List partList = getAttachment(msg, sourceFileName, 
          ignoreCase);
        if ((partList != null) && (partList.size() != 0)) {
          filteredMessages.add(msg); } else {
          if ((!msgPart.equalsIgnoreCase("MULTIPART")) || 
            (partList != null)) continue;
          filteredMessages.add(msg);
        }

      }
      else if ((msgPart.equalsIgnoreCase("BODY")) || 
        (msgPart.equalsIgnoreCase("MULTIPART"))) {
        getBodyMessage(msg, contentType);
        filteredMessages.add(msg);
      }
      else {
        throw new Exception("Unknown message part:" + msgPart);
      }
    }
    return filteredMessages;
  }

  public List<Part> getAttachment(Object message, String fileName, boolean ignoreCase) throws Exception
  {
    Message msg = (Message)message;
    Object object = msg.getContent();
    Multipart mp = null;
    List list = null;
    msg.getAllHeaders();
    if ((object instanceof Multipart)) {
      mp = (Multipart)object;
      if (mp.getCount() < 1) {
        return null;
      }
      list = new ArrayList();
      list = handleMultipart(mp, fileName, ignoreCase);
    }
    return list;
  }

  public List<Part> handleMultipart(Multipart multipart, String fileName, boolean ignoreCase) throws MessagingException, IOException
  {
    List list = new ArrayList();
    int i = 0; for (int n = multipart.getCount(); i < n; i++) {
      Part part = handlePart(multipart.getBodyPart(i), fileName, 
        ignoreCase);
      if (part != null)
        list.add(part);
    }
    return list;
  }

  public Part handlePart(Part part, String fileName, boolean ignoreCase) throws MessagingException, IOException
  {
    String disposition = part.getDisposition();
    if ((disposition != null) && (
      ("attachment".equalsIgnoreCase(disposition)) || 
      ("inline".equalsIgnoreCase(disposition)))) {
      String fName = part.getFileName();
      if (fName != null) {
        fName = MimeUtility.decodeText(fName);
      }
      if (this.pm.isMatch(fName, fileName)) {
        return part;
      }
    }
    return null;
  }

  private InputStream getBodyMessage(Message msg, String bodyContentType) throws Exception
  {
    Multipart mp = null;
    Object content = msg.getContent();
    if ((content instanceof Multipart)) {
      mp = (Multipart)msg.getContent(); } else {
      if ((content instanceof BASE64DecoderStream)) {
        BASE64DecoderStream base64DecoderStream = (BASE64DecoderStream)msg
          .getContent();
        StringWriter writer = new StringWriter();
        IOUtils.copy(base64DecoderStream, writer);
        String base64decodedString = writer.toString();
        return new ByteArrayInputStream(base64decodedString.getBytes());
      }
      return new ByteArrayInputStream(((String)content).getBytes());
    }

    String contentType = mp.getContentType();
    Part part = null;

    part = mp.getBodyPart(0);
    Enumeration e = part.getAllHeaders();
    while ((e != null) && (e.hasMoreElements())) {
      Header header = (Header)e.nextElement();
      if ((header.getName() == null) || 
        (header.getValue() == null))
        continue;
      if ((!header.getName().toLowerCase()
        .startsWith("content-type")) || 
        (!header.getValue().toLowerCase().startsWith(
        "multipart/alternative")))
        continue;
      Multipart mpp = (Multipart)part.getContent();
      Part part0 = null;
      if ((bodyContentType == null) || 
        (bodyContentType.equalsIgnoreCase("")))
        bodyContentType = "text/plain";
      if (bodyContentType.equalsIgnoreCase("text/plain"))
        part0 = mpp.getBodyPart(0);
      else if (bodyContentType.equalsIgnoreCase("text/html"))
        part0 = mpp.getBodyPart(1);
      else
        part0 = mpp.getBodyPart(0);
      String type = part0.getContentType();
      if ((type != null) && (
        (type.trim().toLowerCase().startsWith("text/html")) || 
        (type.trim().toLowerCase().startsWith("text/plain")))) {
        return part0.getInputStream();
      }

    }

    part = mp.getBodyPart(0);
    if (contentType == null) {
      throw new Exception("Content Type : Invalid Content Type\n");
    }

    return part.getInputStream();
  }

  private static String getStringFromInputStream(InputStream is)
  {
    BufferedReader br = null;
    StringBuilder sb = new StringBuilder();
    try
    {
      br = new BufferedReader(new InputStreamReader(is));
      String line;
      while ((line = br.readLine()) != null)
      {
//        String line;
        sb.append(line);
        sb.append("\n");
      }
    }
    catch (IOException e) {
      e.printStackTrace();

      if (br != null)
        try {
          br.close();
        } catch (IOException ex) {
          ex.printStackTrace();
        }
    }
    finally
    {
      if (br != null) {
        try {
          br.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }

    return sb.toString();
  }

  public Map<String, InputStream> receiveMail(List<Message> msgs, String senderEmailAddress, String subject, String msgPart, String sourceFileName, boolean leaveCopyOnServer, String uniqueId, String mailContent, String bodyContentType, boolean ignoreCase, Context context)
    throws Exception
  {
    List filteredMessagesOnSubject = null;
    List filteredMessages = null;
    List attachmentMessages = new ArrayList();
    List filteredMessagesOnUniqueID = null;
    Map fileList = null;
    Address[] senderAddress = (Address[])null;
    String senderId = "";
    try {
      if (msgs == null) {
        context.put("isError", "true");
        context.put("ErrorCode", "3");
        String errorMessage = ((String)context.get("ErrorMessage") == null) || ((String)context.get("ErrorMessage") == "") ? "" : 
          (String)context.get("ErrorMessage");
        if (!"".equalsIgnoreCase(errorMessage))
          errorMessage = errorMessage + "\n" + "No Mail found on Server";
        else
          errorMessage = "No Mail found on Server";
        context.put("ErrorMessage", errorMessage);
        throw new Exception("No Mail found on Server");
      }

      filteredMessagesOnUniqueID = filteredMessagesOnUniqueID(new ArrayList(msgs), uniqueId, 
        ignoreCase, bodyContentType, context);
      if (filteredMessagesOnUniqueID.size() == 0) {
        context.put("isError", "true");
        context.put("ErrorCode", "4");
        String errorMessage = ((String)context.get("ErrorMessage") == null) || ((String)context.get("ErrorMessage") == "") ? "" : 
          (String)context.get("ErrorMessage");
        if (!"".equalsIgnoreCase(errorMessage))
          errorMessage = errorMessage + "\n" + "Mail not found with Unique ID : " + uniqueId;
        else
          errorMessage = "Mail not found with Unique ID : " + uniqueId;
        context.put("ErrorMessage", errorMessage);
        throw new Exception("Mail not found with Unique ID : " + 
          uniqueId);
      }

      attachmentMessages = filterOnAttachment(msgPart, 
        filteredMessagesOnUniqueID, sourceFileName, 
        bodyContentType, ignoreCase);
      if (attachmentMessages.size() == 0) {
        context.put("isError", "true");
        context.put("ErrorCode", "2");
        String errorMessage = ((String)context.get("ErrorMessage") == null) || ((String)context.get("ErrorMessage") == "") ? "" : 
          (String)context.get("ErrorMessage");
        if (!"".equalsIgnoreCase(errorMessage))
          errorMessage = errorMessage + "\n" + "No attachment found";
        else
          errorMessage = "No attachment found";
        context.put("ErrorMessage", errorMessage);
        throw new Exception("Mail not found with DataLocation : " + 
          msgPart + " and file name :" + sourceFileName);
      }

      if ((senderEmailAddress == null) || (senderEmailAddress.equals(""))) {
        senderAddress = ((Message)attachmentMessages.get(0)).getFrom();
        senderId = senderAddress[0].toString();
        if ((senderId.indexOf("<") != -1) && (senderId.indexOf(">") != -1)) {
          senderId = senderId.substring(
            senderId.lastIndexOf("<") + 1, 
            senderId.lastIndexOf(">"));
        }
      }
      fileList = readMessage(msgPart, attachmentMessages, sourceFileName, 
        bodyContentType, ignoreCase, leaveCopyOnServer);
    }
    catch (Exception e) {
      throw e;
    }

    return fileList;
  }

  public String getUniqueId(Object message) throws Exception {
    Message msg = (Message)message;
    if (this.mailProtocol.equalsIgnoreCase("imap")) {
      IMAPFolder ifolder = (IMAPFolder)this.folder;
      return Long.toString(ifolder.getUID(msg));
    }
    POP3Folder mailFolder = (POP3Folder)this.folder;
    return mailFolder.getUID(msg);
  }

  private Map<String, InputStream> readMessage(String msgPart, List<Message> attachmentMessages, String sourceFileName, String bodyContentType, boolean ignoreCase, boolean leaveCopyOnServer)
    throws Exception
  {
    Map list = null;
    Message msg = null;
    if ((msgPart.equalsIgnoreCase("ATTACHMENT")) || 
      (msgPart.equalsIgnoreCase("MULTIPART"))) {
      list = new HashMap();
      List filenamelist = new ArrayList();
      if (sourceFileName != null) {
        sourceFileName = MimeUtility.decodeText(sourceFileName);
      }
      for (int i = 0; i < attachmentMessages.size(); i++) {
        msg = (Message)attachmentMessages.get(i);
        List<Part> partList = getAttachment(msg, sourceFileName, 
          ignoreCase);
        msg.setFlag(Flags.Flag.DELETED, !leaveCopyOnServer);
        if ((partList == null) || (partList.isEmpty()))
          continue;
        for (Part part : partList) {
          if ((part.getInputStream() == null) && 
            (!msgPart.equalsIgnoreCase("MULTIPART"))) {
            throw new Exception(
              "Error in getting attachment, " + 
              sourceFileName + 
              " not found in attachment");
          }

          String fName = MimeUtility.decodeText(part.getFileName()).trim();
          filenamelist = checkDuplicate(filenamelist, fName);
          fName = (String)filenamelist.get(filenamelist.size()-1);
          
//          list.put(MimeUtility.decodeText(part.getFileName()).trim(), 
//            part.getInputStream());
          
          list.put(fName, part.getInputStream());
          
        }

      }

    }

    if ((!msgPart.equalsIgnoreCase("BODY")) && 
      (!msgPart.equalsIgnoreCase("ATTACHMENT")) && 
      (!msgPart.equalsIgnoreCase("MULTIPART"))) {
      throw new Exception("Unknown message part:" + msgPart);
    }
    return list;
  }

  public void close() throws Exception {
    try {
      if ((this.folder != null) && (this.mailProtocol.equalsIgnoreCase("imap")))
        this.folder.expunge();
    }
    catch (Exception localException1) {
    }
    try {
      if (this.folder != null)
        this.folder.close(true);
      if (this.store != null)
        this.store.close();
    } catch (Exception e) {
      throw new Exception(e);
    }
  }

  public void getFiles(String protocol, String host, String domain, String cdoMachine, boolean secure, String userName, String password, int port, int[] messageNumber, boolean newMessage, String senderEmailAddress, String subject, String msgPart, String sourceFileName, boolean leaveCopyOnServer, String uniqueId, String mailContent, String bodyContentType, boolean ignoreCase, String directoryPath, Context context)
		    throws Exception
		  {
		    OutputStream os = null;
		    Map fileList = null;
		    List msgList = null;
		    try {
		      msgList = receiveEmail(protocol, host, domain, cdoMachine, secure, 
		        userName, password, port, messageNumber, newMessage, context);
		      System.out.println("Mail found = " + msgList.size());
		      fileList = receiveMail(msgList, senderEmailAddress, subject, 
		        msgPart, sourceFileName, leaveCopyOnServer, uniqueId, 
		        mailContent, bodyContentType, ignoreCase, context);

		      if (directoryPath != "") if ((directoryPath != null) && 
		          (!fileList.isEmpty())) {
		          directoryPath = directoryPath.replaceAll("\\\\", "/");
		          File file = new File(directoryPath);
		          if (!file.exists())
		            file.mkdir();
		          Set set = fileList.entrySet();
		          Iterator iterator = set.iterator();
		          int count = 1;
		          while (iterator.hasNext()) {
		            System.out.println("Read Mail Count:: " + count);
		            Map.Entry mapEntry = 
		              (Map.Entry)iterator
		              .next();
		            File attachmentFile = new File(directoryPath + "/" + 
		              ((String)mapEntry.getKey()).toString());
		            attachmentFile.createNewFile();
		            os = new FileOutputStream(attachmentFile);
		            byte[] b = new byte[1024];
		            int i = 0;
		            while ((i = ((InputStream)mapEntry.getValue()).read(b)) != -1) {
		              os.write(b, 0, i);
		            }
		            os.flush();
		            os.close();
		            count++;
		          }
		        } 
		    }
		    catch (Exception e) {
		      e.printStackTrace();
		      throw e;
		    } finally {
		      if (os != null) {
		        os.flush();
		        os.close();
		      }
		    }
		  }
  
  public List checkDuplicate(List filenamelist,String fname) throws Exception{
	  int count = 0;
	  String basename = FilenameUtils.getBaseName(fname);
	  String fileExtension = FilenameUtils.getExtension(fname);
	  String valueSeprator = (String)DatabaseUtils.getPropertiesMap().get("aoc.environment.valueSeprator");
	  String filename = "";
	  if(filenamelist.contains(fname)){
		  if(fname.contains(valueSeprator)){
			  String arr[] = basename.split(valueSeprator);
			  count = Integer.parseInt(arr[1])+1;
			  filename = arr[0] + valueSeprator + count + "."+fileExtension;
			  filenamelist.add(filename);
		  }else{
			  String arr[] = basename.split(valueSeprator);
			  if(arr.length > 1)
				  count = Integer.parseInt(arr[1])+1;
			  else
				  count++;
			  filename = arr[0] + valueSeprator + count + "."+fileExtension;
			  checkDuplicate(filenamelist, filename);
		  }
		  
	  }else{
		  filenamelist.add(fname);
	  }
	  
	  return filenamelist;
  }
		}
