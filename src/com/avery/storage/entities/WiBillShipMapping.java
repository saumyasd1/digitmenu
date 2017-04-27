package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.WiBillShipMappingMixIn;
import com.avery.storage.service.WiBillShipMappingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_billshipmapping")
@Path("wibillship")
public class WiBillShipMapping extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiBillShipMapping() {

	}

	@Column(name = "addressEmailSubject", length = 100)
	private String addressEmailSubject;

	@Column(name = "beginendwith", length = 50)
	private String beginendwith;

	@Column(name = "keywording", length = 500)
	private String keywording;

	@Column(name = "orgCode", length = 50)
	private String orgCode;

	@Column(name = "billToCode", length = 50)
	private String billToCode;

	@Column(name = "shipToCode", length = 50)
	private String shipToCode;

	@Column(name = "shippingMethod", length = 100)
	private String shippingMethod;

	@Column(name = "freightTerm", length = 100)
	private String freightTerm;

	@Column(name = "packingInstruction", length = 500)
	private String packingInstruction;

	@Column(name = "shippingInstruction", length = 500)
	private String shippingInstruction;

	@Column(name = "endCustomer", length = 100)
	private String endCustomer;

	@Column(name = "manufacturingNote", length = 500)
	private String manufacturingNote;

	@Column(name = "csr", length = 50)
	private String csr;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wi_id")
	private Wi varWi;

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiBillShipMapping> wiBillShipMapping = null;
		Map responseMap = new HashMap();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiBillShipMapping.class, WiBillShipMappingMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			WiBillShipMappingService wiBillShipMappingService = (WiBillShipMappingService) SpringConfig.getInstance()
					.getBean("wiBillShipMappingService");
			wiBillShipMapping = wiBillShipMappingService.readAll();
			if (wiBillShipMapping == null)
				throw new Exception("Unable to find data list ");
			responseMap.put("success", "true");
			responseMap.put("data", wiBillShipMapping);
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching roles list ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching roles list ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public String getAddressEmailSubject() {
		return addressEmailSubject;
	}

	public void setAddressEmailSubject(String addressEmailSubject) {
		this.addressEmailSubject = addressEmailSubject;
	}

	public String getBeginendwith() {
		return beginendwith;
	}

	public void setBeginendwith(String beginendwith) {
		this.beginendwith = beginendwith;
	}

	public String getKeywording() {
		return keywording;
	}

	public void setKeywording(String keywording) {
		this.keywording = keywording;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
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

	public String getShippingMethod() {
		return shippingMethod;
	}

	public void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}

	public String getFreightTerm() {
		return freightTerm;
	}

	public void setFreightTerm(String freightTerm) {
		this.freightTerm = freightTerm;
	}

	public String getPackingInstruction() {
		return packingInstruction;
	}

	public void setPackingInstruction(String packingInstruction) {
		this.packingInstruction = packingInstruction;
	}

	public String getShippingInstruction() {
		return shippingInstruction;
	}

	public void setShippingInstruction(String shippingInstruction) {
		this.shippingInstruction = shippingInstruction;
	}

	public String getEndCustomer() {
		return endCustomer;
	}

	public void setEndCustomer(String endCustomer) {
		this.endCustomer = endCustomer;
	}

	public String getManufacturingNote() {
		return manufacturingNote;
	}

	public void setManufacturingNote(String manufacturingNote) {
		this.manufacturingNote = manufacturingNote;
	}

	public String getCsr() {
		return csr;
	}

	public void setCsr(String csr) {
		this.csr = csr;
	}

	public Wi getVarWi() {
		return varWi;
	}

	public void setVarWi(Wi varWi) {
		this.varWi = varWi;
	}

}
