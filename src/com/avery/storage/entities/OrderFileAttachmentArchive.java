package com.avery.storage.entities;

import java.sql.Blob;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.ws.rs.Path;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.avery.storage.MainAbstractEntity;
@Entity
@Table(name = "AR_OrderFileAttachment")
@Path("ar_orderFileAttachment")
public class OrderFileAttachmentArchive  extends MainAbstractEntity{

	private static final long serialVersionUID = -8176254863104079002L;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "OrderQueueID", nullable = true)
	private OrderQueue orderQueue;
	
	@Column(name = "OrderQueuePID",length=50)
    private String orderQueuePId; 
	
	@NotFound(action=NotFoundAction.IGNORE)
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PartnerID", nullable = true)
	private Partner partnerObj;
	
	
	@Column(name = "OrderFileAttachmentID")
    private int orderFileAttachmentId; 
	
	@Column(name = "RBOID",length = 50)
    private String rboID; 
	
	@Column(name = "ReceivedDate")
    private Date receivedDate;
	
	@Column(name = "FileName",length = 250)
    private String fileName;
	
	@Column(name = "FileExtension",length = 50)
    private String fileExtension;
	
	@Column(name = "FileData")
	@Lob
    private Blob fileData;
	
	
	@Column(name = "FileContentType",length = 50)
    private String fileContentType;
	
	@Column(name = "StyleNo",length = 50)
    private String styleNo;
	
	@Column(name = "Status",length = 50)
    private String status;
	
	@Column(name = "Error",length = 50)
    private String error;
	

	public OrderQueue getOrderQueue() {
		return orderQueue;
	}

	public void setOrderQueue(OrderQueue orderQueue) {
		this.orderQueue = orderQueue;
	}
	
	public String getOrderQueuePId() {
		return orderQueuePId;
	}

	public void setOrderQueuePId(String orderQueuePId) {
		this.orderQueuePId = orderQueuePId;
	}

	public int getOrderFileAttachmentId() {
		return orderFileAttachmentId;
	}

	public void setOrderFileAttachmentId(int orderFileAttachmentId) {
		this.orderFileAttachmentId = orderFileAttachmentId;
	}


	public Partner getPartnerObj() {
		return partnerObj;
	}

	public void setPartnerObj(Partner partnerObj) {
		this.partnerObj = partnerObj;
	}

	public String getRboID() {
		return rboID;
	}

	public void setRboID(String rboID) {
		this.rboID = rboID;
	}

	public Date getReceivedDate() {
		return receivedDate;
	}

	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileExtension() {
		return fileExtension;
	}

	public void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}

	public Blob getFileData() {
		return fileData;
	}

	public void setFileData(Blob fileData) {
		this.fileData = fileData;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public String getStyleNo() {
		return styleNo;
	}

	public void setStyleNo(String styleNo) {
		this.styleNo = styleNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

}
