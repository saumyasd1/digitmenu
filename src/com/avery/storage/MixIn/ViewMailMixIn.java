package com.avery.storage.MixIn;

import java.sql.Date;
import java.util.Set;

import com.avery.storage.entities.OrderSystemInfo;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.RBO;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class ViewMailMixIn {
	
	@JsonIgnore
	public abstract String getFileOrderMatchSheet();
	
	@JsonIgnore
	public abstract String getFileOrderMatchCell();
	
	@JsonIgnore
	public abstract String getFileProductlineSheetMatch();
	
	@JsonIgnore
	public abstract String getFileProductlineCellMatch();
	
	@JsonIgnore
	public abstract String getFileRBOSheetMatch();
	
	@JsonIgnore
	public abstract String getFileRBOCellMatch();
	
	@JsonIgnore
	public abstract String getAttachmentFileProductlineMatchSheet();
	
	@JsonIgnore
	public abstract String getAttachmentFileProductlineMatch();
	
	@JsonIgnore
	public abstract String getAttachmentFileProductlineMatchCell();
	
	@JsonIgnore
	public abstract String getAttachmentFileOrderMatchCell();
	
	@JsonIgnore
	public abstract String getAttachmentFileOrderMatchSheet();
	
	@JsonIgnore
	public abstract long getSiteId();
	
	@JsonIgnore
	public abstract Set<OrderSystemInfo> getListOrderSystemInfo();
	
	@JsonIgnore
	public abstract String getEmail();
	
	@JsonIgnore
	public abstract Boolean isActive();
	
	@JsonIgnore
	public abstract String getAttachmentFileMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isAttachmentFileMatchRequired();
	
	@JsonIgnore
	public abstract String getAttachmentFileNameExtension_1();
	
	@JsonIgnore
	public abstract String getAttachmentFileNameExtension_2();
	
	@JsonIgnore
	public abstract String getAttachmentFileNameExtension_3();
	
	@JsonIgnore
	public abstract String getAttachmentFileNameExtension_4();
	
	@JsonIgnore
	public abstract String getAttachmentFileNamePattern_1();
	
	@JsonIgnore
	public abstract String getAttachmentFileNamePattern_2();
	
	@JsonIgnore
	public abstract String getAttachmentFileNamePattern_3();
	
	@JsonIgnore
	public abstract String getAttachmentFileNamePattern_4();
	
	@JsonIgnore
	public abstract String getAttachmentFileOrderMatch();
	
	@JsonIgnore
	public abstract String getAttachmentFileOrderMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isAttachmentFileOrderMatchRequired();
	
	@JsonIgnore
	public abstract String getAttachmentFileProductlineMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isAttachmentFileProductlineMatchRequired();
	
	@JsonIgnore
	public abstract String getAttachmentFileRBOMatch();
	
	@JsonIgnore
	public abstract String getAttachmentIdentifier_1();
	
	@JsonIgnore
	public abstract String getAttachmentIdentifier_2();
	
	@JsonIgnore
	public abstract String getAttachmentIdentifier_3();
	
	@JsonIgnore
	public abstract String getAttachmentIdentifier_4();
	
	@JsonIgnore
	public abstract String getAttachmentMappingID_1();
	
	@JsonIgnore
	public abstract String getAttachmentMappingID_2();
	
	@JsonIgnore
	public abstract String getAttachmentMappingID_3();
	
	@JsonIgnore
	public abstract String getAttachmentMappingID_4();
	
	@JsonIgnore
	public abstract String getAttachmentProductlineMatch();
	
	@JsonIgnore
	public abstract Boolean isAttachmentRequired();
	
	@JsonIgnore
	public abstract String getAttachmentSchemaID_1();
	
	@JsonIgnore
	public abstract String getAttachmentSchemaID_2();
	
	@JsonIgnore
	public abstract String getAttachmentSchemaID_3();
	
	@JsonIgnore
	public abstract String getAttachmentSchemaID_4();
	
	@JsonIgnore
	public abstract String getAttachmentSchemaType_1();
	
	@JsonIgnore
	public abstract String getAttachmentSchemaType_2();
	
	@JsonIgnore
	public abstract String getAttachmentSchemaType_3();
	
	@JsonIgnore
	public abstract String getAttachmentSchemaType_4();
	
	@JsonIgnore
	public abstract String getComment();
	
	@JsonIgnore
	public abstract Boolean isControlData();
	
	@JsonIgnore
	public abstract String getCSRPrimaryId();
	
	@JsonIgnore
	public abstract String getCSRSecondaryId();
	
	@JsonIgnore
	public abstract String getEmailSubjectProductLineMatch();
	
	@JsonIgnore
	public abstract String getEmailSubjectProductlineMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isEmailSubjectProductlineMatchRequired();
	
	@JsonIgnore
	public abstract String getEmailSubjectRBOMatch();
	
	@JsonIgnore
	public abstract String getEmailSubjectRBOMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isEmailSubjectRBOMatchRequired();
	
	@JsonIgnore
	public abstract String getEmailBodyProductLineMatch();
	
	@JsonIgnore
	public abstract String getEmailBodyProductlineMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isEmailBodyProductlineMatchRequired();
	
	@JsonIgnore
	public abstract String getEmailBodyRBOMatch();
	
	@JsonIgnore
	public abstract String getEmailBodyRBOMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isEmailBodyRBOMatchRequired();
	
	@JsonIgnore
	public abstract String getFileRBOMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isFileRBOMatchRequired();
	
	@JsonIgnore
	public abstract Boolean isFactoryTransfer();
	
	@JsonIgnore
	public abstract String getFileMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isFileMatchRequired();
	
	@JsonIgnore
	public abstract String getFileOrderMatch();
	
	@JsonIgnore
	public abstract String getFileOrderMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isFileOrderMatchRequired(); 
	
	@JsonIgnore
	public abstract String getFileProductlineMatch();
	
	@JsonIgnore
	public abstract String getFileProductLineMatchLocation();
	
	@JsonIgnore
	public abstract Boolean isFileProductLineMatchRequired();
	
	@JsonIgnore
	public abstract String getFileRBOMatch();
	
	@JsonIgnore
	public abstract String getInvoicelineInstruction();
	
	@JsonIgnore
	public abstract Boolean isLLKK();
	
	@JsonIgnore
	public abstract Boolean isLocalBilling();
	
	@JsonIgnore
	public abstract String getMiscCSRInstruction();
	
	@JsonIgnore
	public abstract String getOrderFileNameExtension();
	
	@JsonIgnore
	public abstract String getOrderFileNamePattern();
	
	@JsonIgnore
	public abstract String getOrderMappingID();
	
	@JsonIgnore
	public abstract String getOrderSchemaID();
	
	@JsonIgnore
	public abstract String getOrderSchemaType();
	
	@JsonIgnore
	public abstract Boolean isOthers();
	
	@JsonIgnore
	public abstract String getPreProcessPID();
	
	@JsonIgnore
	public abstract String getProductLineType();
	
	@JsonIgnore
	public abstract Boolean isShipmentSample();
	
	@JsonIgnore
	public abstract Boolean isWaiveMOA();
	
	@JsonIgnore
	public abstract Boolean isWaiveMOQ();
	
	@JsonIgnore
	public abstract Boolean isLocalItem();
	
	@JsonIgnore
	public abstract Boolean isAveryItem();	
	
	@JsonIgnore
	public abstract Boolean isFiberpercentagecheck();
	
	@JsonIgnore
	public abstract Boolean isCoocheck();
	
	@JsonIgnore
	public abstract String getCustomerItemIdentifierDescription();
	
	@JsonIgnore
	public abstract String getDefaultSystem();
	
	@JsonIgnore
	public abstract RBO getRbo();
	
	@JsonIgnore
	public abstract Partner getVarPartner();
	
	@JsonIgnore
	public abstract String getCreatedBy();
	
	@JsonIgnore
	public abstract Date getCreatedDate();
	
	@JsonIgnore
	public abstract String getLastModifiedBy();
	
	@JsonIgnore
	public abstract Date getLastModifiedDate();
}
