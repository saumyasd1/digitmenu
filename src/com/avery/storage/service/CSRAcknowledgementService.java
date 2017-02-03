package com.avery.storage.service;

import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.avery.app.config.SpringConfig;
import com.avery.utils.ApplicationConstants;

public class CSRAcknowledgementService {
	
	public void sendNotificationToCSR(long emailqueueid, String toUSerName, String csrName)
			throws MessagingException {
		final String userName = ApplicationConstants.TEST_NOTIFICATION_EMAILID;
		final String password = ApplicationConstants.TEST_NOTIFICATION_PASSWORD;
		// AcknowledgementService acknowledgementService = new
		// AcknowledgementService();
		String subject = "New Email Assigned";
		String body = "This is a system generated Email, please do not reply.\n\n" + "Dear "+csrName+",\n\n"
				+ "A new Email has been assigned to you with following details"
				+ "\nPlease take necessary actions.\n\n" + "Your EmailQueue Id for Order Tracking is : " + emailqueueid
				+ "\n\nBest Regards\n\n"
				+ "---------------------------------------------------------------------\n"
				+ "The information transmitted is intended only for the person or entity to which it is addressed and may contain confidential "
				+ "and/or privileged material. Any review, retransmission, dissemination or other use of, or taking of any action in reliance "
				+ "upon, this information by persons or entities other than the intended recipient is prohibited. If you received this in error,"
				+ " please contact the sender and delete the material from any computer."
				+ "\n---------------------------------------------------------------------";

		try {

			Properties properties = new Properties();
			properties.put("mail.smtp.host", "smtp.gmail.com");
			properties.put("mail.smtp.socketFactory.port", "465");
			properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
			properties.put("mail.smtp.auth", "true");
			properties.put("mail.smtp.port", "465");

			// Get the Session object.
			Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(userName, password);
				}
			});

			// Create a default MimeMessage object.
			MimeMessage message = new MimeMessage(session);

			// Set From: header field of the header.
			message.setFrom(new InternetAddress(userName));

			// Set To: header field of the header.
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(toUSerName));

			// Set Subject: header field
			message.setSubject(subject);

			// Now set the actual message
			message.setText(body);

			Date acknowledgementDate = new Date();

			message.setSentDate(acknowledgementDate);
			// Send message
			Transport.send(message);
		} catch (MessagingException mex) {
			mex.printStackTrace();
			throw new MessagingException(
					"Error while sending mail from:\"" + userName + "\" to:\"" + toUSerName + "\".", mex);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
