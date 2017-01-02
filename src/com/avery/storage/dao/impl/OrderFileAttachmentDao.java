package com.avery.storage.dao.impl;

import java.util.List;
import java.util.Map;

import com.avery.storage.dao.GenericDao;
import com.avery.storage.entities.OrderFileAttachment;

public interface OrderFileAttachmentDao extends GenericDao<OrderFileAttachment, Long>{
	
	public List<OrderFileAttachment> readAllByOrderID(Long orderID);
	
	public List<OrderFileAttachment> readFileByID(Long fileID);
	
}
