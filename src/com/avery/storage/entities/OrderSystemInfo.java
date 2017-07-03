package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.OrderSystemInfoMixIn;
import com.avery.storage.MixIn.OrgInfoMixin;
import com.avery.storage.MixIn.SystemInfoMixIn;
import com.avery.storage.service.OrderSystemInfoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "ordersysteminfo")
@Path("ordersysteminfo")
public class OrderSystemInfo extends MainAbstractEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4788222987397974679L;
	@Column(name = "artworkHold", length = 5)
	private String artworkHold;

	@Column(name = "csrName", length = 250)
	private String csrName;

	@Column(name = "manufacturingNotes", length = 500)
	private String manufacturingNotes;

	@Column(name = "packingInstruction", length = 500)
	private String packingInstruction;

	@Column(name = "shippingMark", length = 500)
	private String shippingMark;

	@Column(name = "discountOffer")
	private boolean discountOffer;

	@Column(name = "invoiceNote", length = 500)
	private String invoiceNote;

	@Column(name = "splitShipSetBy", length = 5)
	private String splitShipSetBy;

	@Column(name = "variableDataBreakdown", length = 500)
	String variableDataBreakdown;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "productLineId")
	private ProductLine varProductLine;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "systemId")
	private SystemInfo varSystem;

	@OneToMany(mappedBy = "varOrderSystemInfo", fetch = FetchType.EAGER)
	private List<OrgInfo> listOrgInfo;

	public OrderSystemInfo() {
	}

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

	public boolean isDiscountOffer() {
		return discountOffer;
	}

	public void setDiscountOffer(boolean discountOffer) {
		this.discountOffer = discountOffer;
	}

	public String getInvoiceNote() {
		return invoiceNote;
	}

	public void setInvoiceNote(String invoiceNote) {
		this.invoiceNote = invoiceNote;
	}

	public String getSplitShipSetBy() {
		return splitShipSetBy;
	}

	public void setSplitShipSetBy(String splitShipSetBy) {
		this.splitShipSetBy = splitShipSetBy;
	}

	public String getVariableDataBreakdown() {
		return variableDataBreakdown;
	}

	public void setVariableDataBreakdown(String variableDataBreakdown) {
		this.variableDataBreakdown = variableDataBreakdown;
	}

	public ProductLine getVarProductLine() {
		return varProductLine;
	}

	public void setVarProductLine(ProductLine varProductLine) {
		this.varProductLine = varProductLine;
	}

	public SystemInfo getVarSystem() {
		return varSystem;
	}

	public void setVarSystem(SystemInfo varSystem) {
		this.varSystem = varSystem;
	}

	public List<OrgInfo> getListOrgInfo() {
		return listOrgInfo;
	}

	public void setListOrgInfo(List<OrgInfo> listOrgInfo) {
		this.listOrgInfo = listOrgInfo;
	}

	@GET
	@Path("/productline")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getByProductlineId(@Context UriInfo ui, @Context HttpHeaders hh,
			@QueryParam("id") String productlineId) {
		Response.ResponseBuilder rb = null;
		Map entitiesMap = null;
		try {
			Long entityId = Long.parseLong(productlineId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			mapper.addMixIn(OrderSystemInfo.class, OrderSystemInfoMixIn.class);
			mapper.addMixIn(OrgInfo.class, OrgInfoMixin.class);
			mapper.addMixIn(SystemInfo.class, SystemInfoMixIn.class);
			OrderSystemInfoService orderSystemInfoService = (OrderSystemInfoService) SpringConfig.getInstance()
					.getBean("orderSystemInfoService");
			entitiesMap = orderSystemInfoService.getByProductlineId(entityId);
			if (entitiesMap == null)
				throw new Exception("Unable to find OrderSystemInfo");
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (NumberFormatException nfe) {
			throw nfe;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

}
