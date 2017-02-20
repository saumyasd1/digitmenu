package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.ProductLine;

public interface OrderFileAttachmentDao extends GenericDao<OrderFileAttachment, Long>{
	
	public List<OrderFileAttachment> readAllByOrderID(Long orderID);
	
	public List<OrderFileAttachment> readByOrderQueueID(Long orderID, Long emailQueueId);
	
	public List<OrderFileAttachment> readFileByID(Long fileID);
	
	public Map getAdditionalFilesList(long orderFileQueueId);
	
	public void insertEmailBody(OrderEmailQueue orderEmailQueue,String emailBody,ProductLine productLineObj, String filePath);

	public void checkDisregardMail(Long entityId);
}
