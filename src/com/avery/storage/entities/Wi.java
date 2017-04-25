package com.avery.storage.entities;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.glassfish.jersey.media.multipart.FormDataParam;

import com.avery.app.config.PropertiesConfig;
import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.WiMixIn;
import com.avery.storage.MixIn.WiSchemaIdentificationMixIn;
import com.avery.storage.service.WiAocFieldService;
import com.avery.storage.service.WiService;
import com.avery.storage.service.WiSystemLevelService;
import com.avery.utils.PropertiesConstants;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi")
@Path("wi")
public class Wi extends MainAbstractEntity {

	public Wi() {

	}

	private static final long serialVersionUID = 1833552362987121156L;
	@Column(name = "status", length = 50)
	private String status;

	@Column(name = "factoryName", length = 50)
	private String factoryName;

	@Column(name = "csrEmailAddress", length = 50)
	private String csrEmailAddress;

	@Column(name = "cooValidationSKUFieldName", length = 100)
	private String cooValidationSKUFieldName;

	@Column(name = "sampleItemRequiredWI", length = 10)
	private String sampleItemRequiredWI;

	@Column(name = "internalInformation", length = 250)
	private String internalInformation;

	@Column(name = "aocWaive", length = 10)
	private String aocWaive;

	@Column(name = "link", length = 250)
	private String link;

	@Column(name = "structureName", length = 100)
	private String structureName;

	@Column(name = "sampleOrderIdentified", length = 250)
	private String sampleOrderIdentified;

	@Column(name = "orderPlacementMethod", length = 50)
	private String orderPlacementMethod;

	@Column(name = "sampleItemApproved", length = 10)
	private String sampleItemApproved;

	@Column(name = "bulkOrderIdentified", length = 250)
	private String bulkOrderIdentified;

	@Column(name = "factoryEmailDomain", length = 50)
	private String factoryEmailDomain;

	@Column(name = "atoNato", length = 50)
	private String atoNato;

	@Column(name = "productLine", length = 50)
	private String productLine;

	@Column(name = "fileNaming", length = 250)
	private String fileNaming;

	@Column(name = "sizeValidationStructure", length = 10)
	private String sizeValidationStructure;

	@Column(name = "billToSite", length = 250)
	private String billToSite;

	@Column(name = "cooValidationStructure", length = 10)
	private String cooValidationStructure;

	@Column(name = "rboName", length = 50)
	private String rboName;

	@Column(name = "glidCustomerItem", length = 50)
	private String glidCustomerItem;

	@Column(name = "orderFileFormat", length = 50)
	private String orderFileFormat;

	@Column(name = "site", length = 50)
	private String site;

	@Column(name = "attachmentProcess", length = 250)
	private String attachmentProcess;

	@Column(name = "specialRulesRemark", length = 500)
	private String specialRulesRemark;

	@Column(name = "customerItemIdentifier", length = 50)
	private String customerItemIdentifier;

	@Column(name = "isSampleItem", length = 250)
	private String isSampleItem;

	@Column(name = "additionalAttachment", length = 50)
	private String additionalAttachment;

	@Column(name = "sampleOrderRequiredMOQ", length = 10)
	private String sampleOrderRequiredMOQ;

	@Column(name = "specificFactoryEmailAddress", length = 50)
	private String specificFactoryEmailAddress;

	@Column(name = "isOrderWithAttachment", length = 10)
	private String isOrderWithAttachment;

	@Column(name = "fabricContentValidationStructure", length = 10)
	private String fabricContentValidationStructure;

	@Column(name = "discountPrice", length = 10)
	private String discountPrice;

	@Column(name = "sampleBulkOthers", length = 250)
	private String sampleBulkOthers;

	@Column(name = "billToSiteNumber", length = 250)
	private String billToSiteNumber;

	@Column(name = "fabricContentValidationSKUFieldName", length = 100)
	private String fabricContentValidationSKUFieldName;

	@Column(name = "orderGrouping", length = 250)
	private String orderGrouping;

	@Column(name = "pricingAggrement", length = 10)
	private String pricingAggrement;

	@Column(name = "sizeValidationSKUFieldName", length = 100)
	private String sizeValidationSKUFieldName;

	@Column(name = "folderLayers", length = 250)
	private String folderLayers;

	@Column(name = "system", length = 50)
	private String system;

	@Column(name = "sampleBulkOrderPresentWI", length = 10)
	private String sampleBulkOrderPresentWI;

	@Column(name = "shipToSite", length = 250)
	private String shipToSite;

	@Column(name = "attachmentIdentifier", length = 250)
	private String attachmentIdentifier;

	@Column(name = "shipToSiteNumber", length = 250)
	private String shipToSiteNumber;

	@Column(name = "aocDefaultOneBillToSite", length = 10)
	private String aocDefaultOneBillToSite;

	@Column(name = "aocDefaultOneShipToSite", length = 10)
	private String aocDefaultOneShipToSite;

	@Column(name = "llkk", length = 10)
	private String llkk;

	@Column(name = "factoryTransfer", length = 10)
	private String factoryTransfer;

	@Column(name = "shipmentSample", length = 10)
	private String shipmentSample;

	@Column(name = "sizeCheck", length = 10)
	private String sizeCheck;

	@Column(name = "fabricCheck", length = 10)
	private String fabricCheck;

	@Column(name = "localBilling", length = 10)
	private String localBilling;

	@Column(name = "waiveMOA", length = 10)
	private String waiveMOA;

	@Column(name = "waiveMOQ", length = 10)
	private String waiveMOQ;

	@Column(name = "fibreContentValidationSKUFieldName", length = 100)
	private String fibreContentValidationSKUFieldName;

	@OneToMany(mappedBy = "varWi", fetch = FetchType.LAZY)
	private List<WiSystem> listWiSystem;

	@OneToMany(mappedBy = "varWi", fetch = FetchType.LAZY)
	private List<WiOrg> listWiOrg;

	@OneToMany(mappedBy = "varWi", fetch = FetchType.LAZY)
	private List<WiSchemaIdentification> listWiSchemaIdentification;

	@OneToMany(mappedBy = "varWi", fetch = FetchType.LAZY)
	private List<WiAocField> listWiAocField;

	@OneToMany(mappedBy = "varWi", fetch = FetchType.LAZY)
	private List<WiSystemLevel> listWiSystemLevel;

	@OneToMany(mappedBy = "varWi", fetch = FetchType.LAZY)
	private List<WiFiles> listWiFiles;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "assignee_id")
	private WiUser varWiUser;

	@OneToMany(mappedBy = "varWi", fetch = FetchType.LAZY)
	private List<WiBillShipMapping> listWiBillShipMapping;

	@Transient
	private String iconName;

	@Transient
	private String colorCode;

	@Transient
	private String codeValue;

	@Transient
	private String assigneeFirstName;

	@Transient
	private String assigneeLastName;

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		// List<Wi> wi = null;
		Map entitiesMap = null;
		try {
			MultivaluedMap queryMap = ui.getQueryParameters();
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(Wi.class, WiMixIn.class);
			WiService wiService = (WiService) SpringConfig.getInstance().getBean("wiService");
			entitiesMap = wiService.readWithCriteria(queryMap);
			mapper.writeValue(writer, entitiesMap);
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

	@Override
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		Map responseMap = new HashMap();
		try {
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			WiService wiService = (WiService) SpringConfig.getInstance().getBean("wiService");
			Long wiId = wiService.create(data);
			responseMap.put("success", "true");
			responseMap.put("id", wiId);
			responseMap.put("msg", "Data has been saved successfully");
			mapper.writeValue(writer, responseMap);
			return Response.ok(writer.toString()).build();
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	@PUT
	@Path("update")
	public Response updateWiData(@Context UriInfo ui, @Context HttpHeaders hh, String data) {
		Response.ResponseBuilder rb = null;
		Map responseMap = new HashMap();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			WiService wiService = (WiService) SpringConfig.getInstance().getBean("wiService");
			Long wiId = wiService.update(data);
			responseMap.put("success", "true");
			responseMap.put("id", wiId);
			responseMap.put("msg", "Data has been saved successfully");
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in updating data entity with id ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in updating data entity with id ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

	@GET
	@Path("wiorderdetail")
	public Response getDataForViewForm(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("id") String id) {
		Map<?, ?> entitiesMap = null;
		Response.ResponseBuilder rb = null;
		try {
			Long entityId = Long.parseLong(id);
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(Wi.class, WiMixIn.class);
			mapper.addMixIn(WiSchemaIdentification.class, WiSchemaIdentificationMixIn.class);
			WiService wiService = (WiService) SpringConfig.getInstance().getBean("wiService");
			entitiesMap = wiService.getDataForViewForm(entityId);
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		} catch (ArrayIndexOutOfBoundsException e) {
			return Response.ok("No data found").status(Status.INTERNAL_SERVER_ERROR).build();
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

	@POST
	@Path("/fileupload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(@Context UriInfo ui, @Context HttpHeaders hh, @FormDataParam("file") InputStream is,
			@FormDataParam("fileName") String fileName, @FormDataParam("id") String entityId,
			@FormDataParam("fileType") String fileType, @FormDataParam("wiId") String wiId) {
		Response.ResponseBuilder rb = null;
		// InputStream in =
		// this.getClass().getClassLoader().getResourceAsStream("application-system.properties");
		// Properties props = new Properties();
		String defaultDirectoryPath = PropertiesConfig.getString(PropertiesConstants.WIFILES_PATH);
		String filePath = null;
		boolean isAocFileType = false;
		boolean isSystemLevel = false;
		boolean successFlag = false;
		String directoryName = defaultDirectoryPath.substring(defaultDirectoryPath.lastIndexOf("/"));
		try {
			// props.load(in);
			if (fileType.equalsIgnoreCase("Order")) {
				filePath = defaultDirectoryPath + File.separator + "order";
			} else if (fileType.equalsIgnoreCase("Attachment")) {
				filePath = defaultDirectoryPath + File.separator + "attachment";
			} else if (fileType.equalsIgnoreCase("Sample")) {
				filePath = defaultDirectoryPath + File.separator + "sample";
			} else if (fileType.equalsIgnoreCase("AocField")) {
				filePath = defaultDirectoryPath + File.separator + "aocfield" + File.separator + wiId;
				isAocFileType = true;
			} else if (fileType.equalsIgnoreCase("SystemLevel")) {
				filePath = defaultDirectoryPath + File.separator + "systemlevel" + File.separator + wiId;
				isSystemLevel = true;
			} else {
				AppLogger.getSystemLogger().error("Error in uploading the file -> Wrong filetype");
				return Response.ok("There was some problem in uploading the file", MediaType.TEXT_PLAIN)
						.status(Status.INTERNAL_SERVER_ERROR).build();
			}
			new File(filePath).mkdir();
			File targetFile = new File(filePath + File.separatorChar + fileName);
			FileUtils.copyInputStreamToFile(is, targetFile);
			WiService wiService = (WiService) SpringConfig.getInstance().getBean("wiService");
			WiAocFieldService wiAocFieldService = (WiAocFieldService) SpringConfig.getInstance()
					.getBean("wiAocFieldService");
			WiSystemLevelService wiSystemLevelService = (WiSystemLevelService) SpringConfig.getInstance()
					.getBean("wiSystemLevelService");
			if (isAocFileType) {
				successFlag = wiAocFieldService.saveFileData(entityId, wiId, filePath, fileName);
			} else if (isSystemLevel) {
				successFlag = wiSystemLevelService.saveFileData(entityId, wiId, filePath, fileName);
			} else {
				successFlag = wiService.saveFileData(entityId, filePath, fileName, fileType);
			}
			if (successFlag == false)
				return Response.ok("There was some problem in uploading the file", MediaType.TEXT_PLAIN)
						.status(Status.INTERNAL_SERVER_ERROR).build();
		} catch (IOException e) {
			e.printStackTrace();
			AppLogger.getSystemLogger().error("Error in uploading the file -> ", e);
			return Response.ok("There was some problem in uploading the file", MediaType.TEXT_PLAIN)
					.status(Status.INTERNAL_SERVER_ERROR).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		rb = Response.ok("File uploaded successfully", MediaType.TEXT_PLAIN).status(Status.OK);
		return rb.build();
	}

	@POST
	@Path("submit")
	public Response submitWi(@Context UriInfo ui, @Context HttpHeaders hh, String data) {
		Response.ResponseBuilder rb = null;
		Map responseMap = new HashMap();
		boolean successFlag = false;
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			WiService wiService = (WiService) SpringConfig.getInstance().getBean("wiService");
			successFlag = wiService.submitWi(data);
			responseMap.put("success", "true");
			responseMap.put("msg", "WI has been submitted successfully");
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in submitting the WI -> ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in submitting the WI -> ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

	///////////////////////////////////////////////////////////////////////////////////////////////

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFactoryName() {
		return factoryName;
	}

	public void setFactoryName(String factoryName) {
		this.factoryName = factoryName;
	}

	public String getCsrEmailAddress() {
		return csrEmailAddress;
	}

	public void setCsrEmailAddress(String csrEmailAddress) {
		this.csrEmailAddress = csrEmailAddress;
	}

	public String getCooValidationSKUFieldName() {
		return cooValidationSKUFieldName;
	}

	public void setCooValidationSKUFieldName(String cooValidationSKUFieldName) {
		this.cooValidationSKUFieldName = cooValidationSKUFieldName;
	}

	public String getSampleItemRequiredWI() {
		return sampleItemRequiredWI;
	}

	public void setSampleItemRequiredWI(String sampleItemRequiredWI) {
		this.sampleItemRequiredWI = sampleItemRequiredWI;
	}

	public String getInternalInformation() {
		return internalInformation;
	}

	public void setInternalInformation(String internalInformation) {
		this.internalInformation = internalInformation;
	}

	public String getAocWaive() {
		return aocWaive;
	}

	public void setAocWaive(String aocWaive) {
		this.aocWaive = aocWaive;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getStructureName() {
		return structureName;
	}

	public void setStructureName(String structureName) {
		this.structureName = structureName;
	}

	public String getSampleOrderIdentified() {
		return sampleOrderIdentified;
	}

	public void setSampleOrderIdentified(String sampleOrderIdentified) {
		this.sampleOrderIdentified = sampleOrderIdentified;
	}

	public String getOrderPlacementMethod() {
		return orderPlacementMethod;
	}

	public void setOrderPlacementMethod(String orderPlacementMethod) {
		this.orderPlacementMethod = orderPlacementMethod;
	}

	public String getSampleItemApproved() {
		return sampleItemApproved;
	}

	public void setSampleItemApproved(String sampleItemApproved) {
		this.sampleItemApproved = sampleItemApproved;
	}

	public String getBulkOrderIdentified() {
		return bulkOrderIdentified;
	}

	public void setBulkOrderIdentified(String bulkOrderIdentified) {
		this.bulkOrderIdentified = bulkOrderIdentified;
	}

	public String getFactoryEmailDomain() {
		return factoryEmailDomain;
	}

	public void setFactoryEmailDomain(String factoryEmailDomain) {
		this.factoryEmailDomain = factoryEmailDomain;
	}

	public String getAtoNato() {
		return atoNato;
	}

	public void setAtoNato(String atoNato) {
		this.atoNato = atoNato;
	}

	public String getProductLine() {
		return productLine;
	}

	public void setProductLine(String productLine) {
		this.productLine = productLine;
	}

	public String getFileNaming() {
		return fileNaming;
	}

	public void setFileNaming(String fileNaming) {
		this.fileNaming = fileNaming;
	}

	public String getSizeValidationStructure() {
		return sizeValidationStructure;
	}

	public void setSizeValidationStructure(String sizeValidationStructure) {
		this.sizeValidationStructure = sizeValidationStructure;
	}

	public String getBillToSite() {
		return billToSite;
	}

	public void setBillToSite(String billToSite) {
		this.billToSite = billToSite;
	}

	public String getCooValidationStructure() {
		return cooValidationStructure;
	}

	public void setCooValidationStructure(String cooValidationStructure) {
		this.cooValidationStructure = cooValidationStructure;
	}

	public String getRboName() {
		return rboName;
	}

	public void setRboName(String rboName) {
		this.rboName = rboName;
	}

	public String getGlidCustomerItem() {
		return glidCustomerItem;
	}

	public void setGlidCustomerItem(String glidCustomerItem) {
		this.glidCustomerItem = glidCustomerItem;
	}

	public String getOrderFileFormat() {
		return orderFileFormat;
	}

	public void setOrderFileFormat(String orderFileFormat) {
		this.orderFileFormat = orderFileFormat;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getAttachmentProcess() {
		return attachmentProcess;
	}

	public void setAttachmentProcess(String attachmentProcess) {
		this.attachmentProcess = attachmentProcess;
	}

	public String getSpecialRulesRemark() {
		return specialRulesRemark;
	}

	public void setSpecialRulesRemark(String specialRulesRemark) {
		this.specialRulesRemark = specialRulesRemark;
	}

	public String getCustomerItemIdentifier() {
		return customerItemIdentifier;
	}

	public void setCustomerItemIdentifier(String customerItemIdentifier) {
		this.customerItemIdentifier = customerItemIdentifier;
	}

	public String getIsSampleItem() {
		return isSampleItem;
	}

	public void setIsSampleItem(String isSampleItem) {
		this.isSampleItem = isSampleItem;
	}

	public String getAdditionalAttachment() {
		return additionalAttachment;
	}

	public void setAdditionalAttachment(String additionalAttachment) {
		this.additionalAttachment = additionalAttachment;
	}

	public String getSampleOrderRequiredMOQ() {
		return sampleOrderRequiredMOQ;
	}

	public void setSampleOrderRequiredMOQ(String sampleOrderRequiredMOQ) {
		this.sampleOrderRequiredMOQ = sampleOrderRequiredMOQ;
	}

	public String getSpecificFactoryEmailAddress() {
		return specificFactoryEmailAddress;
	}

	public void setSpecificFactoryEmailAddress(String specificFactoryEmailAddress) {
		this.specificFactoryEmailAddress = specificFactoryEmailAddress;
	}

	public String getIsOrderWithAttachment() {
		return isOrderWithAttachment;
	}

	public void setIsOrderWithAttachment(String isOrderWithAttachment) {
		this.isOrderWithAttachment = isOrderWithAttachment;
	}

	public String getFabricContentValidationStructure() {
		return fabricContentValidationStructure;
	}

	public void setFabricContentValidationStructure(String fabricContentValidationStructure) {
		this.fabricContentValidationStructure = fabricContentValidationStructure;
	}

	public String getDiscountPrice() {
		return discountPrice;
	}

	public void setDiscountPrice(String discountPrice) {
		this.discountPrice = discountPrice;
	}

	public String getSampleBulkOthers() {
		return sampleBulkOthers;
	}

	public void setSampleBulkOthers(String sampleBulkOthers) {
		this.sampleBulkOthers = sampleBulkOthers;
	}

	public String getBillToSiteNumber() {
		return billToSiteNumber;
	}

	public void setBillToSiteNumber(String billToSiteNumber) {
		this.billToSiteNumber = billToSiteNumber;
	}

	public String getFabricContentValidationSKUFieldName() {
		return fabricContentValidationSKUFieldName;
	}

	public void setFabricContentValidationSKUFieldName(String fabricContentValidationSKUFieldName) {
		this.fabricContentValidationSKUFieldName = fabricContentValidationSKUFieldName;
	}

	public String getOrderGrouping() {
		return orderGrouping;
	}

	public void setOrderGrouping(String orderGrouping) {
		this.orderGrouping = orderGrouping;
	}

	public String getPricingAggrement() {
		return pricingAggrement;
	}

	public void setPricingAggrement(String pricingAggrement) {
		this.pricingAggrement = pricingAggrement;
	}

	public String getSizeValidationSKUFieldName() {
		return sizeValidationSKUFieldName;
	}

	public void setSizeValidationSKUFieldName(String sizeValidationSKUFieldName) {
		this.sizeValidationSKUFieldName = sizeValidationSKUFieldName;
	}

	public String getFolderLayers() {
		return folderLayers;
	}

	public void setFolderLayers(String folderLayers) {
		this.folderLayers = folderLayers;
	}

	public String getSystem() {
		return system;
	}

	public void setSystem(String system) {
		this.system = system;
	}

	public String getSampleBulkOrderPresentWI() {
		return sampleBulkOrderPresentWI;
	}

	public void setSampleBulkOrderPresentWI(String sampleBulkOrderPresentWI) {
		this.sampleBulkOrderPresentWI = sampleBulkOrderPresentWI;
	}

	public String getShipToSite() {
		return shipToSite;
	}

	public void setShipToSite(String shipToSite) {
		this.shipToSite = shipToSite;
	}

	public String getAttachmentIdentifier() {
		return attachmentIdentifier;
	}

	public void setAttachmentIdentifier(String attachmentIdentifier) {
		this.attachmentIdentifier = attachmentIdentifier;
	}

	public String getShipToSiteNumber() {
		return shipToSiteNumber;
	}

	public void setShipToSiteNumber(String shipToSiteNumber) {
		this.shipToSiteNumber = shipToSiteNumber;
	}

	public String getAocDefaultOneBillToSite() {
		return aocDefaultOneBillToSite;
	}

	public void setAocDefaultOneBillToSite(String aocDefaultOneBillToSite) {
		this.aocDefaultOneBillToSite = aocDefaultOneBillToSite;
	}

	public String getAocDefaultOneShipToSite() {
		return aocDefaultOneShipToSite;
	}

	public void setAocDefaultOneShipToSite(String aocDefaultOneShipToSite) {
		this.aocDefaultOneShipToSite = aocDefaultOneShipToSite;
	}

	public String getLlkk() {
		return llkk;
	}

	public void setLlkk(String llkk) {
		this.llkk = llkk;
	}

	public String getFactoryTransfer() {
		return factoryTransfer;
	}

	public void setFactoryTransfer(String factoryTransfer) {
		this.factoryTransfer = factoryTransfer;
	}

	public String getShipmentSample() {
		return shipmentSample;
	}

	public void setShipmentSample(String shipmentSample) {
		this.shipmentSample = shipmentSample;
	}

	public String getSizeCheck() {
		return sizeCheck;
	}

	public void setSizeCheck(String sizeCheck) {
		this.sizeCheck = sizeCheck;
	}

	public String getFabricCheck() {
		return fabricCheck;
	}

	public void setFabricCheck(String fabricCheck) {
		this.fabricCheck = fabricCheck;
	}

	public String getLocalBilling() {
		return localBilling;
	}

	public void setLocalBilling(String localBilling) {
		this.localBilling = localBilling;
	}

	public String getWaiveMOA() {
		return waiveMOA;
	}

	public void setWaiveMOA(String waiveMOA) {
		this.waiveMOA = waiveMOA;
	}

	public String getWaiveMOQ() {
		return waiveMOQ;
	}

	public void setWaiveMOQ(String waiveMOQ) {
		this.waiveMOQ = waiveMOQ;
	}

	public String getFibreContentValidationSKUFieldName() {
		return fibreContentValidationSKUFieldName;
	}

	public void setFibreContentValidationSKUFieldName(String fibreContentValidationSKUFieldName) {
		this.fibreContentValidationSKUFieldName = fibreContentValidationSKUFieldName;
	}

	public List<WiSystem> getListWiSystem() {
		return listWiSystem;
	}

	public void setListWiSystem(List<WiSystem> listWiSystem) {
		this.listWiSystem = listWiSystem;
	}

	public List<WiOrg> getListWiOrg() {
		return listWiOrg;
	}

	public void setListWiOrg(List<WiOrg> listWiOrg) {
		this.listWiOrg = listWiOrg;
	}

	public List<WiSchemaIdentification> getListWiSchemaIdentification() {
		return listWiSchemaIdentification;
	}

	public void setListWiSchemaIdentification(List<WiSchemaIdentification> listWiSchemaIdentification) {
		this.listWiSchemaIdentification = listWiSchemaIdentification;
	}

	public List<WiAocField> getListWiAocField() {
		return listWiAocField;
	}

	public void setListWiAocField(List<WiAocField> listWiAocField) {
		this.listWiAocField = listWiAocField;
	}

	public List<WiSystemLevel> getListWiSystemLevel() {
		return listWiSystemLevel;
	}

	public void setListWiSystemLevel(List<WiSystemLevel> listWiSystemLevel) {
		this.listWiSystemLevel = listWiSystemLevel;
	}

	public List<WiFiles> getListWiFiles() {
		return listWiFiles;
	}

	public void setListWiFiles(List<WiFiles> listWiFiles) {
		this.listWiFiles = listWiFiles;
	}

	public WiUser getVarWiUser() {
		return varWiUser;
	}

	public void setVarWiUser(WiUser varWiUser) {
		this.varWiUser = varWiUser;
	}

	public List<WiBillShipMapping> getListWiBillShipMapping() {
		return listWiBillShipMapping;
	}

	public void setListWiBillShipMapping(List<WiBillShipMapping> listWiBillShipMapping) {
		this.listWiBillShipMapping = listWiBillShipMapping;
	}

	public String getIconName() {
		return iconName;
	}

	public void setIconName(String iconName) {
		this.iconName = iconName;
	}

	public String getColorCode() {
		return colorCode;
	}

	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
	}

	public String getCodeValue() {
		return codeValue;
	}

	public void setCodeValue(String codeValue) {
		this.codeValue = codeValue;
	}

	public String getAssigneeFirstName() {
		return assigneeFirstName;
	}

	public void setAssigneeFirstName(String assigneeFirstName) {
		this.assigneeFirstName = assigneeFirstName;
	}

	public String getAssigneeLastName() {
		return assigneeLastName;
	}

	public void setAssigneeLastName(String assigneeLastName) {
		this.assigneeLastName = assigneeLastName;
	}

}
