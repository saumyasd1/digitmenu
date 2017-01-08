package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.criterion.Projections;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.OrgInfoService;
import com.fasterxml.jackson.databind.ObjectMapper;


@Path("orginfo")
@Entity
@Table(name="orginfo")
public class OrgInfo extends MainAbstractEntity{
	/**
	 * 
	 */
	private static final long serialVersionUID = -2757286170711042719L;
	@Column(name="orgCodeId")
	private int orgCodeId;
	@Column(name="isDefault")
	private boolean isDefault;
	@Column(name="billToCode",length=250)
	private String billToCode;
	@Column(name="shipToCode",length=250)
	private String shipToCode;
	@Column(name="freightTerm",length=250)
	private String freightTerm;
	@Column(name="shippingMethod",length=255)
	private String shippingMethod;
	@Column(name="shippingInstruction",length=255)
	private String shippingInstruction;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="orderSystemInfoId")
	private OrderSystemInfo varOrderSystemInfo;

	private transient Long systemId; 
	
	private transient String artworkHold; 
	
	private transient String csrName; 
	
	private transient String invoiceNote; 
	
	private transient String manufacturingNotes; 
	
	private transient String packingInstruction; 
	
	private transient String shippingMark; 
	
	private transient String variableDataBreakdown; 
	
	private transient String splitShipSetBy; 
	

	public String getArtworkHold() {
		return artworkHold;
	}
	public void setArtworkHold(String artworkHold) {
		this.artworkHold = artworkHold;
	}
	public String getCsrName() {
		return csrName;
	}
	public void setCsrName(String csrName) {
		this.csrName = csrName;
	}
	public String getInvoiceNote() {
		return invoiceNote;
	}
	public void setInvoiceNote(String invoiceNote) {
		this.invoiceNote = invoiceNote;
	}
	public String getManufacturingNotes() {
		return manufacturingNotes;
	}
	public void setManufacturingNotes(String manufacturingNotes) {
		this.manufacturingNotes = manufacturingNotes;
	}
	public String getPackingInstruction() {
		return packingInstruction;
	}
	public void setPackingInstruction(String packingInstruction) {
		this.packingInstruction = packingInstruction;
	}
	public String getShippingMark() {
		return shippingMark;
	}
	public void setShippingMark(String shippingMark) {
		this.shippingMark = shippingMark;
	}
	public String getVariableDataBreakdown() {
		return variableDataBreakdown;
	}
	public void setVariableDataBreakdown(String variableDataBreakdown) {
		this.variableDataBreakdown = variableDataBreakdown;
	}
	public String getSplitShipSetBy() {
		return splitShipSetBy;
	}
	public void setSplitShipSetBy(String splitShipSetBy) {
		this.splitShipSetBy = splitShipSetBy;
	}
	public Long getSystemId() {
		return systemId;
	}
	public void setSystemId(Long systemId) {
		this.systemId = systemId;
	}
	public  int getOrgCodeId() {
		return orgCodeId;
	}
	public void setOrgCodeId(int orgCodeId) {
		this.orgCodeId = orgCodeId;
	}
	public boolean isDefault() {
		return isDefault;
	}
	public void setDefault(boolean isDefault) {
		this.isDefault = isDefault;
	}
	public String getBillToCode() {
		return billToCode;
	}
	public void setBillToCode(String billToCode) {
		this.billToCode = billToCode;
	}
	public String getShipToCode() {
		return shipToCode;
	}
	public void setShipToCode(String shipToCode) {
		this.shipToCode = shipToCode;
	}
	public String getFreightTerm() {
		return freightTerm;
	}
	public void setFreightTerm(String freightTerm) {
		this.freightTerm = freightTerm;
	}
	public String getShippingMethod() {
		return shippingMethod;
	}
	
	public void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}
	
	public String getShippingInstruction() {
		return shippingInstruction;
	}
	public void setShippingInstruction(String shippingInstruction) {
		this.shippingInstruction = shippingInstruction;
	}
	
	public OrderSystemInfo getVarOrderSystemInfo() {
		return varOrderSystemInfo;
	}
	
	public void setVarOrderSystemInfo(OrderSystemInfo varOrderSystemInfo) {
		this.varOrderSystemInfo = varOrderSystemInfo;
	}
	
	@GET
	@Path("/orgsysteminfo/{productlineid:[0-9]+}/{orgid:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response readOrgInfoByProductLneId(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("productlineid")Long productLineId, @PathParam("orgid")Long orgCodeId) {
		Response.ResponseBuilder rb = null;
		List<OrgInfo> propertyValues = null;
		try{
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			OrgInfoService orgInfoService = (OrgInfoService) SpringConfig
					.getInstance().getBean("orgInfoService");
			propertyValues = orgInfoService.readOrgInfoByProductLneId(productLineId,orgCodeId);
			if (propertyValues == null)
				throw new Exception("Unable to find values.");
			mapper.writeValue(writer, propertyValues);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching values for :: Product Line"+productLineId, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching values for :: Product Line"+productLineId, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}
}
