package com.avery.storage.entities;

import java.io.StringWriter;
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
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.ProductLineArchiveService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "AR_Partner_RBOProductLine")
@Path("ar_partner_rboproductline")
public class ProductLineArchive extends MainAbstractEntity {

	@Column(name = "Partner_RBOProductLineID")  
	private String partner_rboproductlineid; 


	@Column(name = "PartnerID")  
	private String partnerid; 


	@Column(name = "RBOID")  
	private String rboid; 


	@Column(name = "RBOName")  
	private String rboname; 


	@Column(name = "ProductLineType")  
	private String productlinetype; 


	@Column(name = "CSRName")  
	private String csrname; 


	@Column(name = "CSREmail")  
	private String csremail; 


	@Column(name = "OrderEmailDomain")  
	private String orderemaildomain; 


	@Column(name = "PackingInstruction")  
	private String packinginstruction; 


	@Column(name = "InvoiceLineInstruction")  
	private String invoicelineinstruction; 


	@Column(name = "VariableDataBreakdown")  
	private String variabledatabreakdown; 


	@Column(name = "ManufacturingNotes")  
	private String manufacturingnotes; 


	@Column(name = "ShippingOnlyNotes")  
	private String shippingonlynotes; 


	@Column(name = "SplitShipSetBy")  
	private String splitshipsetby; 


	@Column(name = "OrderSchemaID")  
	private String orderschemaid; 


	@Column(name = "OrderSchemaType")  
	private String orderschematype; 


	@Column(name = "OrderMappingID")  
	private String ordermappingid; 


	@Column(name = "IsAttachmentRequired")  
	private String isattachmentrequired; 


	@Column(name = "AttachmentIdentifier_1")  
	private String attachmentidentifier_1; 


	@Column(name = "AttachmentSchemaType_1")  
	private String attachmentschematype_1; 


	@Column(name = "AttachmentMappingID_1")  
	private String attachmentmappingid_1; 


	@Column(name = "AttachmentIdentifier_2")  
	private String attachmentidentifier_2; 


	@Column(name = "AttachmentSchemaID_2")  
	private String attachmentschemaid_2; 


	@Column(name = "AttachmentSchemaType_2")  
	private String attachmentschematype_2; 


	@Column(name = "AttachmentMappingID_2")  
	private String attachmentmappingid_2; 


	@Column(name = "AttachmentIdentifier_3")  
	private String attachmentidentifier_3; 


	@Column(name = "AttachmentSchemaID_3")  
	private String attachmentschemaid_3; 


	@Column(name = "AttachmentSchemaType_3")  
	private String attachmentschematype_3; 


	@Column(name = "AttachmentMappingID_3")  
	private String attachmentmappingid_3; 


	@Column(name = "OrderToProcessSchemaID")  
	private String ordertoprocessschemaid; 


	@Column(name = "OrderToProcessMappingID")  
	private String ordertoprocessmappingid; 


	@Column(name = "PreProcessPID")  
	private String preprocesspid; 


	/**
	 * @return the partner_rboproductlineid
	 */
	public String getPartner_rboproductlineid() {
		return partner_rboproductlineid;
	}

	/**
	 * @param partner_rboproductlineid the partner_rboproductlineid to set
	 */
	public void setPartner_rboproductlineid(String partner_rboproductlineid) {
		this.partner_rboproductlineid = partner_rboproductlineid;
	}

	/**
	 * @return the partnerid
	 */
	public String getPartnerid() {
		return partnerid;
	}

	/**
	 * @param partnerid the partnerid to set
	 */
	public void setPartnerid(String partnerid) {
		this.partnerid = partnerid;
	}

	/**
	 * @return the rboid
	 */
	public String getRboid() {
		return rboid;
	}

	/**
	 * @param rboid the rboid to set
	 */
	public void setRboid(String rboid) {
		this.rboid = rboid;
	}

	/**
	 * @return the rboname
	 */
	public String getRboname() {
		return rboname;
	}

	/**
	 * @param rboname the rboname to set
	 */
	public void setRboname(String rboname) {
		this.rboname = rboname;
	}

	/**
	 * @return the productlinetype
	 */
	public String getProductlinetype() {
		return productlinetype;
	}

	/**
	 * @param productlinetype the productlinetype to set
	 */
	public void setProductlinetype(String productlinetype) {
		this.productlinetype = productlinetype;
	}

	/**
	 * @return the csrname
	 */
	public String getCsrname() {
		return csrname;
	}

	/**
	 * @param csrname the csrname to set
	 */
	public void setCsrname(String csrname) {
		this.csrname = csrname;
	}

	/**
	 * @return the csremail
	 */
	public String getCsremail() {
		return csremail;
	}

	/**
	 * @param csremail the csremail to set
	 */
	public void setCsremail(String csremail) {
		this.csremail = csremail;
	}

	/**
	 * @return the orderemaildomain
	 */
	public String getOrderemaildomain() {
		return orderemaildomain;
	}

	/**
	 * @param orderemaildomain the orderemaildomain to set
	 */
	public void setOrderemaildomain(String orderemaildomain) {
		this.orderemaildomain = orderemaildomain;
	}

	/**
	 * @return the packinginstruction
	 */
	public String getPackinginstruction() {
		return packinginstruction;
	}

	/**
	 * @param packinginstruction the packinginstruction to set
	 */
	public void setPackinginstruction(String packinginstruction) {
		this.packinginstruction = packinginstruction;
	}

	/**
	 * @return the invoicelineinstruction
	 */
	public String getInvoicelineinstruction() {
		return invoicelineinstruction;
	}

	/**
	 * @param invoicelineinstruction the invoicelineinstruction to set
	 */
	public void setInvoicelineinstruction(String invoicelineinstruction) {
		this.invoicelineinstruction = invoicelineinstruction;
	}

	/**
	 * @return the variabledatabreakdown
	 */
	public String getVariabledatabreakdown() {
		return variabledatabreakdown;
	}

	/**
	 * @param variabledatabreakdown the variabledatabreakdown to set
	 */
	public void setVariabledatabreakdown(String variabledatabreakdown) {
		this.variabledatabreakdown = variabledatabreakdown;
	}

	/**
	 * @return the manufacturingnotes
	 */
	public String getManufacturingnotes() {
		return manufacturingnotes;
	}

	/**
	 * @param manufacturingnotes the manufacturingnotes to set
	 */
	public void setManufacturingnotes(String manufacturingnotes) {
		this.manufacturingnotes = manufacturingnotes;
	}

	/**
	 * @return the shippingonlynotes
	 */
	public String getShippingonlynotes() {
		return shippingonlynotes;
	}

	/**
	 * @param shippingonlynotes the shippingonlynotes to set
	 */
	public void setShippingonlynotes(String shippingonlynotes) {
		this.shippingonlynotes = shippingonlynotes;
	}

	/**
	 * @return the splitshipsetby
	 */
	public String getSplitshipsetby() {
		return splitshipsetby;
	}

	/**
	 * @param splitshipsetby the splitshipsetby to set
	 */
	public void setSplitshipsetby(String splitshipsetby) {
		this.splitshipsetby = splitshipsetby;
	}

	/**
	 * @return the orderschemaid
	 */
	public String getOrderschemaid() {
		return orderschemaid;
	}

	/**
	 * @param orderschemaid the orderschemaid to set
	 */
	public void setOrderschemaid(String orderschemaid) {
		this.orderschemaid = orderschemaid;
	}

	/**
	 * @return the orderschematype
	 */
	public String getOrderschematype() {
		return orderschematype;
	}

	/**
	 * @param orderschematype the orderschematype to set
	 */
	public void setOrderschematype(String orderschematype) {
		this.orderschematype = orderschematype;
	}

	/**
	 * @return the ordermappingid
	 */
	public String getOrdermappingid() {
		return ordermappingid;
	}

	/**
	 * @param ordermappingid the ordermappingid to set
	 */
	public void setOrdermappingid(String ordermappingid) {
		this.ordermappingid = ordermappingid;
	}

	/**
	 * @return the isattachmentrequired
	 */
	public String getIsattachmentrequired() {
		return isattachmentrequired;
	}

	/**
	 * @param isattachmentrequired the isattachmentrequired to set
	 */
	public void setIsattachmentrequired(String isattachmentrequired) {
		this.isattachmentrequired = isattachmentrequired;
	}

	/**
	 * @return the attachmentidentifier_1
	 */
	public String getAttachmentidentifier_1() {
		return attachmentidentifier_1;
	}

	/**
	 * @param attachmentidentifier_1 the attachmentidentifier_1 to set
	 */
	public void setAttachmentidentifier_1(String attachmentidentifier_1) {
		this.attachmentidentifier_1 = attachmentidentifier_1;
	}

	/**
	 * @return the attachmentschematype_1
	 */
	public String getAttachmentschematype_1() {
		return attachmentschematype_1;
	}

	/**
	 * @param attachmentschematype_1 the attachmentschematype_1 to set
	 */
	public void setAttachmentschematype_1(String attachmentschematype_1) {
		this.attachmentschematype_1 = attachmentschematype_1;
	}

	/**
	 * @return the attachmentmappingid_1
	 */
	public String getAttachmentmappingid_1() {
		return attachmentmappingid_1;
	}

	/**
	 * @param attachmentmappingid_1 the attachmentmappingid_1 to set
	 */
	public void setAttachmentmappingid_1(String attachmentmappingid_1) {
		this.attachmentmappingid_1 = attachmentmappingid_1;
	}

	/**
	 * @return the attachmentidentifier_2
	 */
	public String getAttachmentidentifier_2() {
		return attachmentidentifier_2;
	}

	/**
	 * @param attachmentidentifier_2 the attachmentidentifier_2 to set
	 */
	public void setAttachmentidentifier_2(String attachmentidentifier_2) {
		this.attachmentidentifier_2 = attachmentidentifier_2;
	}

	/**
	 * @return the attachmentschemaid_2
	 */
	public String getAttachmentschemaid_2() {
		return attachmentschemaid_2;
	}

	/**
	 * @param attachmentschemaid_2 the attachmentschemaid_2 to set
	 */
	public void setAttachmentschemaid_2(String attachmentschemaid_2) {
		this.attachmentschemaid_2 = attachmentschemaid_2;
	}

	/**
	 * @return the attachmentschematype_2
	 */
	public String getAttachmentschematype_2() {
		return attachmentschematype_2;
	}

	/**
	 * @param attachmentschematype_2 the attachmentschematype_2 to set
	 */
	public void setAttachmentschematype_2(String attachmentschematype_2) {
		this.attachmentschematype_2 = attachmentschematype_2;
	}

	/**
	 * @return the attachmentmappingid_2
	 */
	public String getAttachmentmappingid_2() {
		return attachmentmappingid_2;
	}

	/**
	 * @param attachmentmappingid_2 the attachmentmappingid_2 to set
	 */
	public void setAttachmentmappingid_2(String attachmentmappingid_2) {
		this.attachmentmappingid_2 = attachmentmappingid_2;
	}

	/**
	 * @return the attachmentidentifier_3
	 */
	public String getAttachmentidentifier_3() {
		return attachmentidentifier_3;
	}

	/**
	 * @param attachmentidentifier_3 the attachmentidentifier_3 to set
	 */
	public void setAttachmentidentifier_3(String attachmentidentifier_3) {
		this.attachmentidentifier_3 = attachmentidentifier_3;
	}

	/**
	 * @return the attachmentschemaid_3
	 */
	public String getAttachmentschemaid_3() {
		return attachmentschemaid_3;
	}

	/**
	 * @param attachmentschemaid_3 the attachmentschemaid_3 to set
	 */
	public void setAttachmentschemaid_3(String attachmentschemaid_3) {
		this.attachmentschemaid_3 = attachmentschemaid_3;
	}

	/**
	 * @return the attachmentschematype_3
	 */
	public String getAttachmentschematype_3() {
		return attachmentschematype_3;
	}

	/**
	 * @param attachmentschematype_3 the attachmentschematype_3 to set
	 */
	public void setAttachmentschematype_3(String attachmentschematype_3) {
		this.attachmentschematype_3 = attachmentschematype_3;
	}

	/**
	 * @return the attachmentmappingid_3
	 */
	public String getAttachmentmappingid_3() {
		return attachmentmappingid_3;
	}

	/**
	 * @param attachmentmappingid_3 the attachmentmappingid_3 to set
	 */
	public void setAttachmentmappingid_3(String attachmentmappingid_3) {
		this.attachmentmappingid_3 = attachmentmappingid_3;
	}

	/**
	 * @return the ordertoprocessschemaid
	 */
	public String getOrdertoprocessschemaid() {
		return ordertoprocessschemaid;
	}

	/**
	 * @param ordertoprocessschemaid the ordertoprocessschemaid to set
	 */
	public void setOrdertoprocessschemaid(String ordertoprocessschemaid) {
		this.ordertoprocessschemaid = ordertoprocessschemaid;
	}

	/**
	 * @return the ordertoprocessmappingid
	 */
	public String getOrdertoprocessmappingid() {
		return ordertoprocessmappingid;
	}

	/**
	 * @param ordertoprocessmappingid the ordertoprocessmappingid to set
	 */
	public void setOrdertoprocessmappingid(String ordertoprocessmappingid) {
		this.ordertoprocessmappingid = ordertoprocessmappingid;
	}

	/**
	 * @return the preprocesspid
	 */
	public String getPreprocesspid() {
		return preprocesspid;
	}

	/**
	 * @param preprocesspid the preprocesspid to set
	 */
	public void setPreprocesspid(String preprocesspid) {
		this.preprocesspid = preprocesspid;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<Partner> partner = null;
		Map entitiesMap = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap = ui
					.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineArchiveService productLineArchiveService = (ProductLineArchiveService) SpringConfig
					.getInstance().getBean("productLineArchiveService");
			entitiesMap = productLineArchiveService
					.readWithCriteria(queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find archives");
			mapper.writeValue(writer, entitiesMap);
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
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			ProductLineArchive archive = mapper.readValue(data,
					ProductLineArchive.class);
			ProductLineArchiveService productLineArchiveService = (ProductLineArchiveService) SpringConfig
					.getInstance().getBean("productLineArchiveService");

			id = productLineArchiveService.create(archive);
			return Response.ok(id).build();
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
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			ProductLineArchiveService productLineArchiveService = (ProductLineArchiveService) SpringConfig
					.getInstance().getBean("partnerArchiveService");
			// read existing entity from database
			ProductLineArchive archive = productLineArchiveService.read(Long.parseLong(id));
			if (archive == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("archive entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(archive);
			// build updated entity object from input data
			archive = updater.readValue(data);
			// update entity in database
			productLineArchiveService.update(archive);
			// prepare response
			mapper.writeValue(writer, archive);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating archive entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating archive entity with id " + id, e);
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
			ProductLineArchiveService productLineArchiveService = (ProductLineArchiveService) SpringConfig
					.getInstance().getBean("productLineArchiveService");
			ProductLineArchive archive = productLineArchiveService.read(entityId);
			if (archive == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Archive entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, archive);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching archive entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching archive entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

}
