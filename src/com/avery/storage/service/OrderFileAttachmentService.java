package com.avery.storage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderFileAttachmentDao;
import com.avery.storage.entities.OrderEmailQueue;
import com.avery.storage.entities.OrderFileAttachment;
import com.avery.storage.entities.ProductLine;

@Component
public class OrderFileAttachmentService extends GenericEntityService<OrderFileAttachment, Long>{
	
	private OrderFileAttachmentDao orderFileAttachmentDao;

	public OrderFileAttachmentDao getOrderFileAttachmentDao() {
		return orderFileAttachmentDao;
	}

	@Autowired
	public void setOrderFileAttachmentDao(
			OrderFileAttachmentDao orderFileAttachmentDao) {
		this.orderFileAttachmentDao = orderFileAttachmentDao;
	}


	@Transactional
	public List<OrderFileAttachment> readAllByOrderID(Long entityId){
		
		return getOrderFileAttachmentDao().readAllByOrderID(entityId);
		
	}
	
	@Transactional
	public List<OrderFileAttachment> readByOrderQueueID(Long entityId){
		
		return getOrderFileAttachmentDao().readByOrderQueueID(entityId);
		
	}
	
	@Transactional
	public List<OrderFileAttachment> readFileByID(Long entityId){
		
		return getOrderFileAttachmentDao().readFileByID(entityId);
		
	}
	
	@Transactional
	public Map getAdditionalFilesList(long orderFileQueueId){
		 
		return getOrderFileAttachmentDao().getAdditionalFilesList(orderFileQueueId);
	}
	
	@Transactional
	public void insertEmailBody(OrderEmailQueue orderEmailQueue,String emailBody,ProductLine productLineObj, String filePath) throws Exception{
		getOrderFileAttachmentDao().insertEmailBody(orderEmailQueue,emailBody,productLineObj, filePath);
		
	}
	
	@Transactional
	public void checkDisregardMail(Long entityId){
		 
		getOrderFileAttachmentDao().checkDisregardMail(entityId);
	}
	
}
