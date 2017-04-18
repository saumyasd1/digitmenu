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

/**
 * @author Vishal
 *
 */
public class SendNotification {

	/**
	 * Method for sending notification
	 * 
	 * @param fromUserName
	 * @param fromUserPass
	 * @param toUserName
	 * @param subject
	 * @param mailBody
	 */
	public void send(final String fromUserName, final String fromUserPass, String toUserName, String subject,
			String mailBody) {
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
					return new PasswordAuthentication(fromUserName, fromUserPass);
				}
			});

			// Create a default MimeMessage object.
			MimeMessage message = new MimeMessage(session);

			// Set From: header field of the header.
			message.setFrom(new InternetAddress(fromUserName));

			// Set To: header field of the header.
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(toUserName));

			// Set Subject: header field
			message.setSubject(subject);

			// Now set the actual message
			message.setText(mailBody);

			Date acknowledgementDate = new Date();

			message.setSentDate(acknowledgementDate);
			// Send message
			Transport.send(message);
		} catch (MessagingException mex) {
			mex.printStackTrace();
			try {
				throw new MessagingException(
						"Error while sending mail from:\"" + fromUserName + "\" to:\"" + toUserName + "\".", mex);
			} catch (MessagingException e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
