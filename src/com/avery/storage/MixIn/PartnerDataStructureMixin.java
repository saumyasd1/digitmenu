package com.avery.storage.MixIn;


import java.util.List;

import com.avery.storage.entities.OrderSystemInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class PartnerDataStructureMixin {

	
	@JsonIgnore
	public abstract String getAttachmentFileMatchLocation();
	
	@JsonIgnore
	public abstract String setAttachmentFileMatchLocation();
	
	@JsonIgnore
	public abstract String getAttachmentFileNameExtension_1();
	
	@JsonIgnore
	public abstract String getAttachmentFileNameExtension_2();
	
	
	@JsonIgnore
	public abstract String getAttachmentFileNameExtension_3();
	
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
	public abstract String getAttachmentFileProductlineMatchLocation();
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
	public abstract String getAttachmentSchemaID_1();
	@JsonIgnore
	public abstract String getAttachmentSchemaID_2();
	@JsonIgnore
	public abstract String getAttachmentFileNameExtension_4();
	@JsonIgnore
	public abstract String getDefaultSystem();
	@JsonIgnore
	public abstract String getCustomerItemIdentifierDescription();
	@JsonIgnore
	public abstract String getPreProcessPID();
	@JsonIgnore
	public abstract String getOrderSchemaType();
	@JsonIgnore
	public abstract String getOrderSchemaID();
	@JsonIgnore
	public abstract String getOrderMappingID();
	@JsonIgnore
	public abstract String getOrderFileNamePattern();
	@JsonIgnore
	public abstract String getOrderFileNameExtension();
	@JsonIgnore
	public abstract String getMiscCSRInstruction();
	@JsonIgnore
	public abstract String getInvoicelineInstruction();
	@JsonIgnore
	public abstract String getFileRBOMatch();
	@JsonIgnore
	public abstract String getFileProductLineMatchLocation();
	@JsonIgnore
	public abstract String getFileProductlineMatch();
	@JsonIgnore
	public abstract String getAttachmentSchemaType_4();
	@JsonIgnore
	public abstract String getComment();
	@JsonIgnore
	public abstract String getCSRPrimaryId();
	@JsonIgnore
	public abstract String getCSRSecondaryId();
	@JsonIgnore
	public abstract String getEmailSubjectProductLineMatch();
	@JsonIgnore
	public abstract String getEmailSubjectProductlineMatchLocation();
	@JsonIgnore
	public abstract String getEmailSubjectRBOMatch();
	@JsonIgnore
	public abstract String getEmailSubjectRBOMatchLocation();
	@JsonIgnore
	public abstract String getVarPartner();
	@JsonIgnore
	public abstract String getEmailBodyProductLineMatch();
	@JsonIgnore
	public abstract String getEmailBodyProductlineMatchLocation();
	@JsonIgnore
	public abstract String getEmailBodyRBOMatch();
	@JsonIgnore
	public abstract String getEmailBodyRBOMatchLocation();
	@JsonIgnore
	public abstract String getFileRBOMatchLocation();
	
	@JsonIgnore
	public abstract List<OrderSystemInfo> getListOrderSystemInfo();
	}
	
	
	
	
	