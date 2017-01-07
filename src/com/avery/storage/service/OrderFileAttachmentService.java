package com.avery.storage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.OrderFileAttachmentDao;
import com.avery.storage.entities.OrderFileAttachment;

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
	public List<OrderFileAttachment> readFileByID(Long entityId){
		
		return getOrderFileAttachmentDao().readFileByID(entityId);
		
	}
	
	
	public Map getAdditionalFilesList(long orderFileQueueId){
		 
		return getOrderFileAttachmentDao().getAdditionalFilesList(orderFileQueueId);
	}
	

}
