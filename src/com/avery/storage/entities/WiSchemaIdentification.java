package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.WiSchemaIdentificationMixIn;
import com.avery.storage.service.WiSchemaIdentificationService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_schemaidentification")
public class WiSchemaIdentification extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiSchemaIdentification() {

	}

	@Column(name = "emailSubjectDataStructureOtherRule", length = 250)
	private String emailSubjectDataStructureOtherRule;

	@Column(name = "attachmentFormat", length = 100)
	private String attachmentFormat;

	@Column(name = "emailKeyWording", length = 100)
	private String emailKeyWording;

	@Column(name = "orderFileContainExactMatch", length = 50)
	private String orderFileContainExactMatch;

	@Column(name = "attachmentExcelCell", length = 100)
	private String attachmentExcelCell;

	@Column(name = "orderExcelCell", length = 50)
	private String orderExcelCell;

	@Column(name = "orderTextFirstLastPage", length = 50)
	private String orderTextFirstLastPage;

	@Column(name = "orderExcelSheet", length = 50)
	private String orderExcelSheet;

	@Column(name = "orderTextPosition", length = 50)
	private String orderTextPosition;

	@Column(name = "orderFormat", length = 100)
	private String orderFormat;

	@Column(name = "attachmentFileContainExactMatch", length = 50)
	private String attachmentFileContainExactMatch;

	@Column(name = "orderFileKeyWording", length = 100)
	private String orderFileKeyWording;

	@Column(name = "isOrder", length = 10)
	private String isOrder;

	@Column(name = "attachmentFileKeyWording", length = 100)
	private String attachmentFileKeyWording;

	@Column(name = "attach", length = 10)
	private String attach;

	@Column(name = "attachmentTextPosition", length = 50)
	private String attachmentTextPosition;

	@Column(name = "emailSubjectDataStructureRule", length = 10)
	private String emailSubjectDataStructureRule;

	@Column(name = "attachmentTextFirstLastPage", length = 50)
	private String attachmentTextFirstLastPage;

	@Column(name = "emailContainExactMatch", length = 50)
	private String emailContainExactMatch;

	@Column(name = "attachmentExcelSheet", length = 100)
	private String attachmentExcelSheet;

	@Column(name = "emailSubjectRequired")
	private boolean emailSubjectRequired;

	@Column(name = "emailBodyRequired")
	private boolean emailBodyRequired;

	@Column(name = "orderFileRequired")
	private boolean orderFileRequired;

	@Column(name = "attachmentFileRequired")
	private boolean attachmentFileRequired;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wi_Id")
	Wi varWi;

	public String getEmailSubjectDataStructureOtherRule() {
		return emailSubjectDataStructureOtherRule;
	}

	public void setEmailSubjectDataStructureOtherRule(String emailSubjectDataStructureOtherRule) {
		this.emailSubjectDataStructureOtherRule = emailSubjectDataStructureOtherRule;
	}

	public String getAttachmentFormat() {
		return attachmentFormat;
	}

	public void setAttachmentFormat(String attachmentFormat) {
		this.attachmentFormat = attachmentFormat;
	}

	public String getEmailKeyWording() {
		return emailKeyWording;
	}

	public void setEmailKeyWording(String emailKeyWording) {
		this.emailKeyWording = emailKeyWording;
	}

	public String getOrderFileContainExactMatch() {
		return orderFileContainExactMatch;
	}

	public void setOrderFileContainExactMatch(String orderFileContainExactMatch) {
		this.orderFileContainExactMatch = orderFileContainExactMatch;
	}

	public String getAttachmentExcelCell() {
		return attachmentExcelCell;
	}

	public void setAttachmentExcelCell(String attachmentExcelCell) {
		this.attachmentExcelCell = attachmentExcelCell;
	}

	public String getOrderExcelCell() {
		return orderExcelCell;
	}

	public void setOrderExcelCell(String orderExcelCell) {
		this.orderExcelCell = orderExcelCell;
	}

	public String getOrderTextFirstLastPage() {
		return orderTextFirstLastPage;
	}

	public void setOrderTextFirstLastPage(String orderTextFirstLastPage) {
		this.orderTextFirstLastPage = orderTextFirstLastPage;
	}

	public String getOrderExcelSheet() {
		return orderExcelSheet;
	}

	public void setOrderExcelSheet(String orderExcelSheet) {
		this.orderExcelSheet = orderExcelSheet;
	}

	public String getOrderTextPosition() {
		return orderTextPosition;
	}

	public void setOrderTextPosition(String orderTextPosition) {
		this.orderTextPosition = orderTextPosition;
	}

	public String getOrderFormat() {
		return orderFormat;
	}

	public void setOrderFormat(String orderFormat) {
		this.orderFormat = orderFormat;
	}

	public String getAttachmentFileContainExactMatch() {
		return attachmentFileContainExactMatch;
	}

	public void setAttachmentFileContainExactMatch(String attachmentFileContainExactMatch) {
		this.attachmentFileContainExactMatch = attachmentFileContainExactMatch;
	}

	public String getOrderFileKeyWording() {
		return orderFileKeyWording;
	}

	public void setOrderFileKeyWording(String orderFileKeyWording) {
		this.orderFileKeyWording = orderFileKeyWording;
	}

	public String getIsOrder() {
		return isOrder;
	}

	public void setIsOrder(String isOrder) {
		this.isOrder = isOrder;
	}

	public String getAttachmentFileKeyWording() {
		return attachmentFileKeyWording;
	}

	public void setAttachmentFileKeyWording(String attachmentFileKeyWording) {
		this.attachmentFileKeyWording = attachmentFileKeyWording;
	}

	public String getAttach() {
		return attach;
	}

	public void setAttach(String attach) {
		this.attach = attach;
	}

	public String getAttachmentTextPosition() {
		return attachmentTextPosition;
	}

	public void setAttachmentTextPosition(String attachmentTextPosition) {
		this.attachmentTextPosition = attachmentTextPosition;
	}

	public String getEmailSubjectDataStructureRule() {
		return emailSubjectDataStructureRule;
	}

	public void setEmailSubjectDataStructureRule(String emailSubjectDataStructureRule) {
		this.emailSubjectDataStructureRule = emailSubjectDataStructureRule;
	}

	public String getAttachmentTextFirstLastPage() {
		return attachmentTextFirstLastPage;
	}

	public void setAttachmentTextFirstLastPage(String attachmentTextFirstLastPage) {
		this.attachmentTextFirstLastPage = attachmentTextFirstLastPage;
	}

	public String getEmailContainExactMatch() {
		return emailContainExactMatch;
	}

	public void setEmailContainExactMatch(String emailContainExactMatch) {
		this.emailContainExactMatch = emailContainExactMatch;
	}

	public String getAttachmentExcelSheet() {
		return attachmentExcelSheet;
	}

	public void setAttachmentExcelSheet(String attachmentExcelSheet) {
		this.attachmentExcelSheet = attachmentExcelSheet;
	}

	public boolean isEmailSubjectRequired() {
		return emailSubjectRequired;
	}

	public void setEmailSubjectRequired(boolean emailSubjectRequired) {
		this.emailSubjectRequired = emailSubjectRequired;
	}

	public boolean isEmailBodyRequired() {
		return emailBodyRequired;
	}

	public void setEmailBodyRequired(boolean emailBodyRequired) {
		this.emailBodyRequired = emailBodyRequired;
	}

	public boolean isOrderFileRequired() {
		return orderFileRequired;
	}

	public void setOrderFileRequired(boolean orderFileRequired) {
		this.orderFileRequired = orderFileRequired;
	}

	public boolean isAttachmentFileRequired() {
		return attachmentFileRequired;
	}

	public void setAttachmentFileRequired(boolean attachmentFileRequired) {
		this.attachmentFileRequired = attachmentFileRequired;
	}

	public Wi getVarWi() {
		return varWi;
	}

	public void setVarWi(Wi varWi) {
		this.varWi = varWi;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiSchemaIdentification> wiSchemaIdentification = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiSchemaIdentification.class, WiSchemaIdentificationMixIn.class);
			WiSchemaIdentificationService wiSchemaIdentificationService = (WiSchemaIdentificationService) SpringConfig
					.getInstance().getBean("wiSchemaIdentificationService");
			wiSchemaIdentification = wiSchemaIdentificationService.readAll();
			mapper.writeValue(writer, wiSchemaIdentification);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

}
