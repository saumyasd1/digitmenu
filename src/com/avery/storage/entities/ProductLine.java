package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.MixIn.ProductLineMixIn;
import com.avery.storage.service.ProductLineService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "partner_rboproductline")
@Path("productLines")
public class ProductLine extends MainAbstractEntity{
	
	public ProductLine(){
		
	}
	
	private static final long serialVersionUID = -8487156716364715527L;

	@Column(name = "active")
	boolean active;
	@Column(name = "attachmentFileMatchLocation", length = 100)
	String attachmentFileMatchLocation;// 100
	@Column(name = "attachmentFileMatchRequired")
	boolean attachmentFileMatchRequired;
	@Column(name = "attachmentFileNameExtension_1", length = 50)
	String attachmentFileNameExtension_1;// 50
	@Column(name = "attachmentFileNameExtension_2", length = 50)
	String attachmentFileNameExtension_2;// 50
	@Column(name = "attachmentFileNameExtension_3", length = 50)
	String attachmentFileNameExtension_3;// 50
	@Column(name = "attachmentFileNameExtension_4", length = 50)
	String attachmentFileNameExtension_4;// 50
	@Column(name = "attachmentFileNamePattern_1", length = 100)
	String attachmentFileNamePattern_1;// 100
	@Column(name = "attachmentFileNamePattern_2", length = 100)
	String attachmentFileNamePattern_2;// 100
	@Column(name = "attachmentFileNamePattern_3", length = 100)
	String attachmentFileNamePattern_3;// 100
	@Column(name = "attachmentFileNamePattern_4", length = 100)
	String attachmentFileNamePattern_4;// 100
	@Column(name = "attachmentFileOrderMatch", length = 100)
	String attachmentFileOrderMatch;// 100
	@Column(name = "attachmentFileOrderMatchLocation", length = 100)
	String attachmentFileOrderMatchLocation;// 100
	@Column(name = "attachmentFileOrderMatchRequired")
	boolean attachmentFileOrderMatchRequired;
	@Column(name = "attachmentFileProductlineMatchLocation", length = 100)
	String attachmentFileProductlineMatchLocation;// 100
	@Column(name = "attachmentFileProductlineMatchRequired")
	boolean attachmentFileProductlineMatchRequired;
	@Column(name = "attachmentFileRBOMatch", length = 100)
	String attachmentFileRBOMatch;// 100
	@Column(name = "attachmentIdentifier_1", length = 50)
	String attachmentIdentifier_1;// 50
	@Column(name = "attachmentIdentifier_2", length = 50)
	String attachmentIdentifier_2;// 50
	@Column(name = "attachmentIdentifier_3", length = 50)
	String attachmentIdentifier_3;// 50
	@Column(name = "attachmentIdentifier_4", length = 50)
	String attachmentIdentifier_4;// 50
	@Column(name = "attachmentMappingID_1", length = 50)
	String attachmentMappingID_1;// 50
	@Column(name = "attachmentMappingID_2", length = 50)
	String attachmentMappingID_2;// 50
	@Column(name = "attachmentMappingID_3", length = 50)
	String attachmentMappingID_3;// 50
	@Column(name = "attachmentMappingID_4", length = 50)
	String attachmentMappingID_4;// 50
	@Column(name = "attachmentProductlineMatch", length = 100)
	String attachmentProductlineMatch;// 100
	@Column(name = "attachmentRequired")
	boolean attachmentRequired;
	@Column(name = "attachmentSchemaID_1", length = 50)
	String attachmentSchemaID_1;// 50
	@Column(name = "attachmentSchemaID_2", length = 50)
	String attachmentSchemaID_2;// 50
	@Column(name = "attachmentSchemaID_3", length = 50)
	String attachmentSchemaID_3;// 50
	@Column(name = "attachmentSchemaID_4", length = 50)
	String attachmentSchemaID_4;// 50
	@Column(name = "attachmentSchemaType_1", length = 50)
	String attachmentSchemaType_1;// 50
	@Column(name = "attachmentSchemaType_2", length = 50)
	String attachmentSchemaType_2;// 50
	@Column(name = "attachmentSchemaType_3", length = 50)
	String attachmentSchemaType_3;// 50
	@Column(name = "attachmentSchemaType_4", length = 50)
	String attachmentSchemaType_4;// 50
	@Column(name = "comment", length = 250)
	String comment;// 250
	@Column(name = "controlData")
	boolean controlData;
	@Column(name = "CSRPrimaryId", length = 250)
	private String CSRPrimaryId;// 250
	@Column(name = "CSRSecondaryId", length = 250)
	String CSRSecondaryId;// 250
	@Column(name = "emailSubjectProductLineMatch", length = 100)
	String emailSubjectProductLineMatch;// 100
	@Column(name = "emailSubjectProductlineMatchLocation", length = 100)
	String emailSubjectProductlineMatchLocation;
	@Column(name = "emailSubjectProductlineMatchRequired")
	boolean emailSubjectProductlineMatchRequired;
	@Column(name = "emailSubjectRBOMatch",length=100)
	String emailSubjectRBOMatch;
	@Column(name = "emailSubjectRBOMatchLocation", length = 100)
	String emailSubjectRBOMatchLocation;// 100
	@Column(name = "emailSubjectRBOMatchRequired")
	boolean emailSubjectRBOMatchRequired;
	@Column(name = "emailBodyProductLineMatch",length=100)
	String  emailBodyProductLineMatch;	
	@Column(name = "emailBodyProductlineMatchLocation",length=100)
	String emailBodyProductlineMatchLocation;	
	@Column(name = "emailBodyProductlineMatchRequired")
	boolean emailBodyProductlineMatchRequired;	
	@Column(name = "emailBodyRBOMatch",length=100)
	String  emailBodyRBOMatch;
	@Column(name = "emailBodyRBOMatchLocation",length=100)
	String emailBodyRBOMatchLocation;	
	@Column(name = "emailBodyRBOMatchRequired")
	boolean emailBodyRBOMatchRequired;	
	@Column(name = "fileRBOMatchLocation",length=100)
	String fileRBOMatchLocation;
	@Column(name = "fileRBOMatchRequired")
	boolean fileRBOMatchRequired;
	@Column(name = "factoryTransfer")
	boolean factoryTransfer;
	@Column(name = "fileMatchLocation", length = 100)
	String fileMatchLocation;// 100
	@Column(name = "fileMatchRequired")
	boolean fileMatchRequired;
	@Column(name = "fileOrderMatch", length = 100)
	String fileOrderMatch;// 100
	@Column(name = "fileOrderMatchLocation", length = 100)
	String fileOrderMatchLocation;// 100
	@Column(name = "fileOrderMatchRequired")
	boolean fileOrderMatchRequired;
	@Column(name = "fileProductlineMatch", length = 100)
	String fileProductlineMatch;// 100
	@Column(name = "fileProductLineMatchLocation", length = 100)
	String fileProductLineMatchLocation;// 100
	@Column(name = "fileProductLineMatchRequired")
	boolean fileProductLineMatchRequired;
	@Column(name = "fileRBOMatch", length = 100)
	String fileRBOMatch;// 100
	@Column(name = "invoicelineInstruction", length = 500)
	String invoicelineInstruction;// 500
	@Column(name = "LLKK")
	boolean LLKK;
	@Column(name = "localBilling")
	boolean localBilling;
	@Column(name = "miscCSRInstruction", length = 500)
	String miscCSRInstruction;// 500
	@Column(name = "orderFileNameExtension", length = 100)
	String orderFileNameExtension;// 100
	@Column(name = "orderFileNamePattern", length = 25)
	String orderFileNamePattern;// 25
	@Column(name = "orderMappingID", length = 50)
	String orderMappingID;// 50
	@Column(name = "orderSchemaID", length = 50)
	String orderSchemaID;// 50
	@Column(name = "orderSchemaType", length = 50)
	String orderSchemaType;// 50
	@Column(name = "others")
	boolean others;// Others (pls specify)
	@Column(name = "preProcessPID", length = 50)
	String preProcessPID;// 50
	@Column(name = "productLineType", length = 25)
	String productLineType;// 25
	@Column(name = "shipmentSample")
	boolean shipmentSample;
    @Column(name = "waiveMOA")
	boolean waiveMOA;
	@Column(name = "waiveMOQ")
	boolean waiveMOQ;
	@Column(name = "localItem")
	boolean localItem;
	@Column(name = "averyItem")
	boolean averyItem;	
	@Column(name = "customerItemIdentifierDescription",length=500)
	String customerItemIdentifierDescription;
	@Column(name = "defaultSystem",length=500)
	String defaultSystem;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "rboId")
	private RBO rbo;
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "partnerId")
	Partner varPartner;
//	@OneToMany(mappedBy="varProductLine",cascade=CascadeType.ALL,fetch=FetchType.EAGER)
//	List<OrderSystemInfo> listOrderSystemInfo=new ArrayList<OrderSystemInfo>();
	
	
	
	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getAttachmentFileMatchLocation() {
		return attachmentFileMatchLocation;
	}

	public void setAttachmentFileMatchLocation(String attachmentFileMatchLocation) {
		this.attachmentFileMatchLocation = attachmentFileMatchLocation;
	}

	public boolean isAttachmentFileMatchRequired() {
		return attachmentFileMatchRequired;
	}

	public void setAttachmentFileMatchRequired(boolean attachmentFileMatchRequired) {
		this.attachmentFileMatchRequired = attachmentFileMatchRequired;
	}

	public String getAttachmentFileNameExtension_1() {
		return attachmentFileNameExtension_1;
	}

	public void setAttachmentFileNameExtension_1(String attachmentFileNameExtension_1) {
		this.attachmentFileNameExtension_1 = attachmentFileNameExtension_1;
	}

	public String getAttachmentFileNameExtension_2() {
		return attachmentFileNameExtension_2;
	}

	public void setAttachmentFileNameExtension_2(String attachmentFileNameExtension_2) {
		this.attachmentFileNameExtension_2 = attachmentFileNameExtension_2;
	}

	public String getAttachmentFileNameExtension_3() {
		return attachmentFileNameExtension_3;
	}

	public void setAttachmentFileNameExtension_3(String attachmentFileNameExtension_3) {
		this.attachmentFileNameExtension_3 = attachmentFileNameExtension_3;
	}

	public String getAttachmentFileNameExtension_4() {
		return attachmentFileNameExtension_4;
	}

	public void setAttachmentFileNameExtension_4(String attachmentFileNameExtension_4) {
		this.attachmentFileNameExtension_4 = attachmentFileNameExtension_4;
	}

	public String getAttachmentFileNamePattern_1() {
		return attachmentFileNamePattern_1;
	}

	public void setAttachmentFileNamePattern_1(String attachmentFileNamePattern_1) {
		this.attachmentFileNamePattern_1 = attachmentFileNamePattern_1;
	}

	public String getAttachmentFileNamePattern_2() {
		return attachmentFileNamePattern_2;
	}

	public void setAttachmentFileNamePattern_2(String attachmentFileNamePattern_2) {
		this.attachmentFileNamePattern_2 = attachmentFileNamePattern_2;
	}

	public String getAttachmentFileNamePattern_3() {
		return attachmentFileNamePattern_3;
	}

	public void setAttachmentFileNamePattern_3(String attachmentFileNamePattern_3) {
		this.attachmentFileNamePattern_3 = attachmentFileNamePattern_3;
	}

	public String getAttachmentFileNamePattern_4() {
		return attachmentFileNamePattern_4;
	}

	public void setAttachmentFileNamePattern_4(String attachmentFileNamePattern_4) {
		this.attachmentFileNamePattern_4 = attachmentFileNamePattern_4;
	}

	public String getAttachmentFileOrderMatch() {
		return attachmentFileOrderMatch;
	}

	public void setAttachmentFileOrderMatch(String attachmentFileOrderMatch) {
		this.attachmentFileOrderMatch = attachmentFileOrderMatch;
	}

	public String getAttachmentFileOrderMatchLocation() {
		return attachmentFileOrderMatchLocation;
	}

	public void setAttachmentFileOrderMatchLocation(String attachmentFileOrderMatchLocation) {
		this.attachmentFileOrderMatchLocation = attachmentFileOrderMatchLocation;
	}

	public boolean isAttachmentFileOrderMatchRequired() {
		return attachmentFileOrderMatchRequired;
	}

	public void setAttachmentFileOrderMatchRequired(boolean attachmentFileOrderMatchRequired) {
		this.attachmentFileOrderMatchRequired = attachmentFileOrderMatchRequired;
	}

	public String getAttachmentFileProductlineMatchLocation() {
		return attachmentFileProductlineMatchLocation;
	}

	public void setAttachmentFileProductlineMatchLocation(String attachmentFileProductlineMatchLocation) {
		this.attachmentFileProductlineMatchLocation = attachmentFileProductlineMatchLocation;
	}

	public boolean isAttachmentFileProductlineMatchRequired() {
		return attachmentFileProductlineMatchRequired;
	}

	public void setAttachmentFileProductlineMatchRequired(boolean attachmentFileProductlineMatchRequired) {
		this.attachmentFileProductlineMatchRequired = attachmentFileProductlineMatchRequired;
	}

	public String getAttachmentFileRBOMatch() {
		return attachmentFileRBOMatch;
	}

	public void setAttachmentFileRBOMatch(String attachmentFileRBOMatch) {
		this.attachmentFileRBOMatch = attachmentFileRBOMatch;
	}

	public String getAttachmentIdentifier_1() {
		return attachmentIdentifier_1;
	}

	public void setAttachmentIdentifier_1(String attachmentIdentifier_1) {
		this.attachmentIdentifier_1 = attachmentIdentifier_1;
	}

	public String getAttachmentIdentifier_2() {
		return attachmentIdentifier_2;
	}

	public void setAttachmentIdentifier_2(String attachmentIdentifier_2) {
		this.attachmentIdentifier_2 = attachmentIdentifier_2;
	}

	public String getAttachmentIdentifier_3() {
		return attachmentIdentifier_3;
	}

	public void setAttachmentIdentifier_3(String attachmentIdentifier_3) {
		this.attachmentIdentifier_3 = attachmentIdentifier_3;
	}

	public String getAttachmentIdentifier_4() {
		return attachmentIdentifier_4;
	}

	public void setAttachmentIdentifier_4(String attachmentIdentifier_4) {
		this.attachmentIdentifier_4 = attachmentIdentifier_4;
	}

	public String getAttachmentMappingID_1() {
		return attachmentMappingID_1;
	}

	public void setAttachmentMappingID_1(String attachmentMappingID_1) {
		this.attachmentMappingID_1 = attachmentMappingID_1;
	}

	public String getAttachmentMappingID_2() {
		return attachmentMappingID_2;
	}

	public void setAttachmentMappingID_2(String attachmentMappingID_2) {
		this.attachmentMappingID_2 = attachmentMappingID_2;
	}

	public String getAttachmentMappingID_3() {
		return attachmentMappingID_3;
	}

	public void setAttachmentMappingID_3(String attachmentMappingID_3) {
		this.attachmentMappingID_3 = attachmentMappingID_3;
	}

	public String getAttachmentMappingID_4() {
		return attachmentMappingID_4;
	}

	public void setAttachmentMappingID_4(String attachmentMappingID_4) {
		this.attachmentMappingID_4 = attachmentMappingID_4;
	}

	public String getAttachmentProductlineMatch() {
		return attachmentProductlineMatch;
	}

	public void setAttachmentProductlineMatch(String attachmentProductlineMatch) {
		this.attachmentProductlineMatch = attachmentProductlineMatch;
	}

	public boolean isAttachmentRequired() {
		return attachmentRequired;
	}

	public void setAttachmentRequired(boolean attachmentRequired) {
		this.attachmentRequired = attachmentRequired;
	}

	public String getAttachmentSchemaID_1() {
		return attachmentSchemaID_1;
	}

	public void setAttachmentSchemaID_1(String attachmentSchemaID_1) {
		this.attachmentSchemaID_1 = attachmentSchemaID_1;
	}

	public String getAttachmentSchemaID_2() {
		return attachmentSchemaID_2;
	}

	public void setAttachmentSchemaID_2(String attachmentSchemaID_2) {
		this.attachmentSchemaID_2 = attachmentSchemaID_2;
	}

	public String getAttachmentSchemaID_3() {
		return attachmentSchemaID_3;
	}

	public void setAttachmentSchemaID_3(String attachmentSchemaID_3) {
		this.attachmentSchemaID_3 = attachmentSchemaID_3;
	}

	public String getAttachmentSchemaID_4() {
		return attachmentSchemaID_4;
	}

	public void setAttachmentSchemaID_4(String attachmentSchemaID_4) {
		this.attachmentSchemaID_4 = attachmentSchemaID_4;
	}

	public String getAttachmentSchemaType_1() {
		return attachmentSchemaType_1;
	}

	public void setAttachmentSchemaType_1(String attachmentSchemaType_1) {
		this.attachmentSchemaType_1 = attachmentSchemaType_1;
	}

	public String getAttachmentSchemaType_2() {
		return attachmentSchemaType_2;
	}

	public void setAttachmentSchemaType_2(String attachmentSchemaType_2) {
		this.attachmentSchemaType_2 = attachmentSchemaType_2;
	}

	public String getAttachmentSchemaType_3() {
		return attachmentSchemaType_3;
	}

	public void setAttachmentSchemaType_3(String attachmentSchemaType_3) {
		this.attachmentSchemaType_3 = attachmentSchemaType_3;
	}

	public String getAttachmentSchemaType_4() {
		return attachmentSchemaType_4;
	}

	public void setAttachmentSchemaType_4(String attachmentSchemaType_4) {
		this.attachmentSchemaType_4 = attachmentSchemaType_4;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public boolean isControlData() {
		return controlData;
	}

	public void setControlData(boolean controlData) {
		this.controlData = controlData;
	}

	public String getCSRPrimaryId() {
		return CSRPrimaryId;
	}

	public void setCSRPrimaryId(String cSRPrimaryId) {
		CSRPrimaryId = cSRPrimaryId;
	}

	public String getCSRSecondaryId() {
		return CSRSecondaryId;
	}

	public void setCSRSecondaryId(String cSRSecondaryId) {
		CSRSecondaryId = cSRSecondaryId;
	}

	public String getEmailSubjectProductLineMatch() {
		return emailSubjectProductLineMatch;
	}

	public void setEmailSubjectProductLineMatch(String emailSubjectProductLineMatch) {
		this.emailSubjectProductLineMatch = emailSubjectProductLineMatch;
	}

	public String getEmailSubjectProductlineMatchLocation() {
		return emailSubjectProductlineMatchLocation;
	}

	public void setEmailSubjectProductlineMatchLocation(String emailSubjectProductlineMatchLocation) {
		this.emailSubjectProductlineMatchLocation = emailSubjectProductlineMatchLocation;
	}

	public boolean isEmailSubjectProductlineMatchRequired() {
		return emailSubjectProductlineMatchRequired;
	}

	public void setEmailSubjectProductlineMatchRequired(boolean emailSubjectProductlineMatchRequired) {
		this.emailSubjectProductlineMatchRequired = emailSubjectProductlineMatchRequired;
	}

	public String getEmailSubjectRBOMatch() {
		return emailSubjectRBOMatch;
	}

	public void setEmailSubjectRBOMatch(String emailSubjectRBOMatch) {
		this.emailSubjectRBOMatch = emailSubjectRBOMatch;
	}

	public String getEmailSubjectRBOMatchLocation() {
		return emailSubjectRBOMatchLocation;
	}

	public void setEmailSubjectRBOMatchLocation(String emailSubjectRBOMatchLocation) {
		this.emailSubjectRBOMatchLocation = emailSubjectRBOMatchLocation;
	}

	public boolean isEmailSubjectRBOMatchRequired() {
		return emailSubjectRBOMatchRequired;
	}

	public void setEmailSubjectRBOMatchRequired(boolean emailSubjectRBOMatchRequired) {
		this.emailSubjectRBOMatchRequired = emailSubjectRBOMatchRequired;
	}

	public String getEmailBodyProductLineMatch() {
		return emailBodyProductLineMatch;
	}

	public void setEmailBodyProductLineMatch(String emailBodyProductLineMatch) {
		this.emailBodyProductLineMatch = emailBodyProductLineMatch;
	}

	public String getEmailBodyProductlineMatchLocation() {
		return emailBodyProductlineMatchLocation;
	}

	public void setEmailBodyProductlineMatchLocation(String emailBodyProductlineMatchLocation) {
		this.emailBodyProductlineMatchLocation = emailBodyProductlineMatchLocation;
	}

	public boolean isEmailBodyProductlineMatchRequired() {
		return emailBodyProductlineMatchRequired;
	}

	public void setEmailBodyProductlineMatchRequired(boolean emailBodyProductlineMatchRequired) {
		this.emailBodyProductlineMatchRequired = emailBodyProductlineMatchRequired;
	}

	public String getEmailBodyRBOMatch() {
		return emailBodyRBOMatch;
	}

	public void setEmailBodyRBOMatch(String emailBodyRBOMatch) {
		this.emailBodyRBOMatch = emailBodyRBOMatch;
	}

	public String getEmailBodyRBOMatchLocation() {
		return emailBodyRBOMatchLocation;
	}

	public void setEmailBodyRBOMatchLocation(String emailBodyRBOMatchLocation) {
		this.emailBodyRBOMatchLocation = emailBodyRBOMatchLocation;
	}

	public boolean isEmailBodyRBOMatchRequired() {
		return emailBodyRBOMatchRequired;
	}

	public void setEmailBodyRBOMatchRequired(boolean emailBodyRBOMatchRequired) {
		this.emailBodyRBOMatchRequired = emailBodyRBOMatchRequired;
	}

	public String getFileRBOMatchLocation() {
		return fileRBOMatchLocation;
	}

	public void setFileRBOMatchLocation(String fileRBOMatchLocation) {
		this.fileRBOMatchLocation = fileRBOMatchLocation;
	}

	public boolean isFileRBOMatchRequired() {
		return fileRBOMatchRequired;
	}

	public void setFileRBOMatchRequired(boolean fileRBOMatchRequired) {
		this.fileRBOMatchRequired = fileRBOMatchRequired;
	}

	public boolean isFactoryTransfer() {
		return factoryTransfer;
	}

	public void setFactoryTransfer(boolean factoryTransfer) {
		this.factoryTransfer = factoryTransfer;
	}

	public String getFileMatchLocation() {
		return fileMatchLocation;
	}

	public void setFileMatchLocation(String fileMatchLocation) {
		this.fileMatchLocation = fileMatchLocation;
	}

	public boolean isFileMatchRequired() {
		return fileMatchRequired;
	}

	public void setFileMatchRequired(boolean fileMatchRequired) {
		this.fileMatchRequired = fileMatchRequired;
	}

	public String getFileOrderMatch() {
		return fileOrderMatch;
	}

	public void setFileOrderMatch(String fileOrderMatch) {
		this.fileOrderMatch = fileOrderMatch;
	}

	public String getFileOrderMatchLocation() {
		return fileOrderMatchLocation;
	}

	public void setFileOrderMatchLocation(String fileOrderMatchLocation) {
		this.fileOrderMatchLocation = fileOrderMatchLocation;
	}

	public boolean isFileOrderMatchRequired() {
		return fileOrderMatchRequired;
	}

	public void setFileOrderMatchRequired(boolean fileOrderMatchRequired) {
		this.fileOrderMatchRequired = fileOrderMatchRequired;
	}

	public String getFileProductlineMatch() {
		return fileProductlineMatch;
	}

	public void setFileProductlineMatch(String fileProductlineMatch) {
		this.fileProductlineMatch = fileProductlineMatch;
	}

	public String getFileProductLineMatchLocation() {
		return fileProductLineMatchLocation;
	}

	public void setFileProductLineMatchLocation(String fileProductLineMatchLocation) {
		this.fileProductLineMatchLocation = fileProductLineMatchLocation;
	}

	public boolean isFileProductLineMatchRequired() {
		return fileProductLineMatchRequired;
	}

	public void setFileProductLineMatchRequired(boolean fileProductLineMatchRequired) {
		this.fileProductLineMatchRequired = fileProductLineMatchRequired;
	}

	public String getFileRBOMatch() {
		return fileRBOMatch;
	}

	public void setFileRBOMatch(String fileRBOMatch) {
		this.fileRBOMatch = fileRBOMatch;
	}

	public String getInvoicelineInstruction() {
		return invoicelineInstruction;
	}

	public void setInvoicelineInstruction(String invoicelineInstruction) {
		this.invoicelineInstruction = invoicelineInstruction;
	}

	public boolean isLLKK() {
		return LLKK;
	}

	public void setLLKK(boolean lLKK) {
		LLKK = lLKK;
	}

	public boolean isLocalBilling() {
		return localBilling;
	}

	public void setLocalBilling(boolean localBilling) {
		this.localBilling = localBilling;
	}

	public String getMiscCSRInstruction() {
		return miscCSRInstruction;
	}

	public void setMiscCSRInstruction(String miscCSRInstruction) {
		this.miscCSRInstruction = miscCSRInstruction;
	}

	public String getOrderFileNameExtension() {
		return orderFileNameExtension;
	}

	public void setOrderFileNameExtension(String orderFileNameExtension) {
		this.orderFileNameExtension = orderFileNameExtension;
	}

	public String getOrderFileNamePattern() {
		return orderFileNamePattern;
	}

	public void setOrderFileNamePattern(String orderFileNamePattern) {
		this.orderFileNamePattern = orderFileNamePattern;
	}

	public String getOrderMappingID() {
		return orderMappingID;
	}

	public void setOrderMappingID(String orderMappingID) {
		this.orderMappingID = orderMappingID;
	}

	public String getOrderSchemaID() {
		return orderSchemaID;
	}

	public void setOrderSchemaID(String orderSchemaID) {
		this.orderSchemaID = orderSchemaID;
	}

	public String getOrderSchemaType() {
		return orderSchemaType;
	}

	public void setOrderSchemaType(String orderSchemaType) {
		this.orderSchemaType = orderSchemaType;
	}

	public boolean isOthers() {
		return others;
	}

	public void setOthers(boolean others) {
		this.others = others;
	}

	public String getPreProcessPID() {
		return preProcessPID;
	}

	public void setPreProcessPID(String preProcessPID) {
		this.preProcessPID = preProcessPID;
	}

	public String getProductLineType() {
		return productLineType;
	}

	public void setProductLineType(String productLineType) {
		this.productLineType = productLineType;
	}

	public boolean isShipmentSample() {
		return shipmentSample;
	}

	public void setShipmentSample(boolean shipmentSample) {
		this.shipmentSample = shipmentSample;
	}

	public boolean isWaiveMOA() {
		return waiveMOA;
	}

	public void setWaiveMOA(boolean waiveMOA) {
		this.waiveMOA = waiveMOA;
	}

	public boolean isWaiveMOQ() {
		return waiveMOQ;
	}

	public void setWaiveMOQ(boolean waiveMOQ) {
		this.waiveMOQ = waiveMOQ;
	}

	public boolean isLocalItem() {
		return localItem;
	}

	public void setLocalItem(boolean localItem) {
		this.localItem = localItem;
	}

	public boolean isAveryItem() {
		return averyItem;
	}

	public void setAveryItem(boolean averyItem) {
		this.averyItem = averyItem;
	}

	public String getCustomerItemIdentifierDescription() {
		return customerItemIdentifierDescription;
	}

	public void setCustomerItemIdentifierDescription(String customerItemIdentifierDescription) {
		this.customerItemIdentifierDescription = customerItemIdentifierDescription;
	}

	public String getDefaultSystem() {
		return defaultSystem;
	}

	public void setDefaultSystem(String defaultSystem) {
		this.defaultSystem = defaultSystem;
	}

	public RBO getRbo() {
		return rbo;
	}

	public void setRbo(RBO rbo) {
		this.rbo = rbo;
	}

	public Partner getVarPartner() {
		return varPartner;
	}

	public void setVarPartner(Partner varPartner) {
		this.varPartner = varPartner;
	}


//	public List<OrderSystemInfo> getListOrderSystemInfo() {
//		return listOrderSystemInfo;
//	}
//
//	public void setListOrderSystemInfo(List<OrderSystemInfo> listOrderSystemInfo) {
//		this.listOrderSystemInfo = listOrderSystemInfo;
//	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<ProductLine> productline = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(ProductLine.class,ProductLineMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			productline = productLineService.readAll();
			if (productline == null)
				throw new Exception("Unable to find Product Line");
			mapper.writeValue(writer, productline);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	@Override
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		Long id;
		Boolean valueExist=false;
		Map<String,Object> responseMap=new HashMap<String,Object>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			ObjectMapper responseMapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			ProductLine productline = mapper.readValue(data, ProductLine.class);
			productline.setCreatedDate(new Date());
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			productLineService.create(data);
			responseMap.put("valueExist",false);
			responseMapper.writeValue(writer, responseMap);
			return Response.ok(writer.toString()).build();
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	@Override
	public Response updateEntity(UriInfo ui, HttpHeaders hh, String id,
			String data) {
		Response.ResponseBuilder rb = null;
		Map<String,Object> responseMap=new HashMap<String,Object>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			// read existing entity from database
			ProductLine productline = productLineService.read(Long.parseLong(id));
			if (productline == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Product Line entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(productline);
			// build updated entity object from input data
			productline = updater.readValue(data);
			boolean valueExist = productLineService.checkDuplicateValues(productline);
			if (valueExist) {
				responseMap.put("valueExist",true);
				mapper.writeValue(writer, responseMap);
			}else{
				productLineService.update(productline);
				responseMap.put("valueExist",false);
				responseMap.put("productline",productline);
				mapper.writeValue(writer, responseMap);
			}
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating product line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating product line entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}


	@Override
	public Response getEntity(UriInfo ui, HttpHeaders hh, String id) {
		Response.ResponseBuilder rb = null;
		try {
			Long entityId = Long.parseLong(id);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			ProductLine productline = productLineService.read(entityId);
			if (productline == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Product Line entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, productline);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching Product Line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching partner entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	
	@GET
	@Path("/partner/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getByPartnerID(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String partnerId) {
		Response.ResponseBuilder rb = null;
		Map<?,?> productline = null;
		try{
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(Partner.class,PartnerMixIn.class);
			MultivaluedMap<String, String> queryParamMap =ui.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			productline = productLineService.readAllByPartnerID(queryParamMap);
			if (productline == null)
				throw new Exception("Unable to find Product Line");
			mapper.writeValue(writer, productline);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
	@Override
	public Response deleteEntity(UriInfo ui, HttpHeaders hh, String id) {
		try {
			ProductLineService productLineService = (ProductLineService) SpringConfig
					.getInstance().getBean("productLineService");
			// read existing entity from database
			ProductLine productLine = productLineService.read(Long.parseLong(id));
			if (productLine == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Product Line entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			productLineService.delete(productLine);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Product Line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in deleting Product Line entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}
	
	
	
	
}
