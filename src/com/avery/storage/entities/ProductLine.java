
package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.FetchProfile;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.AdditionalFilesMixIn;
import com.avery.storage.MixIn.OrderSystemInfoMixIn;
import com.avery.storage.MixIn.OrgInfoMixin;
import com.avery.storage.MixIn.PartnerDataStructureMixin;
import com.avery.storage.MixIn.PartnerMixIn;
import com.avery.storage.MixIn.ProductLineEditMixIn;
import com.avery.storage.MixIn.ProductLineMixIn;
import com.avery.storage.MixIn.RboMixIn;
import com.avery.storage.MixIn.SystemInfoMixIn;
import com.avery.storage.service.ProductLineService;
import com.avery.storage.service.SiteService;
import com.avery.storage.service.UserService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "partner_rboproductline")
@Path("productLines")
@FetchProfile(name = "single-entity", fetchOverrides = {
		@FetchProfile.FetchOverride(entity = ProductLine.class, association = "listOrderSystemInfo", mode = FetchMode.JOIN) })
public class ProductLine extends MainAbstractEntity {

	public ProductLine() {

	}

	private static final long serialVersionUID = -8487156716364715527L;

	@Column(name = "active")
	private Boolean active;

	@Column(name = "site")
	private Integer site;

//	@ColumnDefault("''")
//	@Column(name = "attachmentFileMatchLocation", length = 100)
//	private String attachmentFileMatchLocation;// 100

	@ColumnDefault("''")
	@Column(name = "attachmentFileMatchRequired")
	private Boolean attachmentFileMatchRequired;

	@Column(name = "factoryMOQCheck", length = 100)
	private String factoryMOQCheck;

	@Column(name = "factoryMOQValue", length = 100)
	private String factoryMOQValue;

	@Column(name = "assignCSRName")
	private String assignCSRName;

	@Column(name = "attachmentFileNameExtension_1", length = 50)
	private String attachmentFileNameExtension_1;// 50

	@Column(name = "attachmentFileNameExtension_2", length = 50)
	private String attachmentFileNameExtension_2;// 50

//	@Column(name = "attachmentFileNameExtension_3", length = 50)
//	private String attachmentFileNameExtension_3;// 50
//
//	@Column(name = "attachmentFileNameExtension_4", length = 50)
//	private String attachmentFileNameExtension_4;// 50

	@Column(name = "attachmentFileNamePattern_1", length = 100)
	private String attachmentFileNamePattern_1;// 100

	@Column(name = "attachmentFileNamePattern_2", length = 100)
	private String attachmentFileNamePattern_2;// 100

	@Column(name = "attachmentFileNamePattern_3", length = 100)
	private String attachmentFileNamePattern_3;// 100

	@Column(name = "attachmentFileNamePattern_4", length = 100)
	private String attachmentFileNamePattern_4;// 100

	@Column(name = "attachmentFileOrderMatch", length = 100)
	private String attachmentFileOrderMatch;// 100

//	@Column(name = "attachmentFileOrderMatchLocation", length = 100)
//	private String attachmentFileOrderMatchLocation;// 100

	@Column(name = "attachmentFileOrderMatchRequired")
	private Boolean attachmentFileOrderMatchRequired;
//
//	@Column(name = "attachmentFileProductlineMatchLocation", length = 100)
//	private String attachmentFileProductlineMatchLocation;// 100

	@Column(name = "attachmentFileProductlineMatchRequired")
	private Boolean attachmentFileProductlineMatchRequired;

	@Column(name = "attachmentFileRBOMatch", length = 100)
	private String attachmentFileRBOMatch;// 100

	@Column(name = "attachmentIdentifier_1", length = 50)
	private String attachmentIdentifier_1;// 50

	@Column(name = "attachmentIdentifier_2", length = 50)
	private String attachmentIdentifier_2;// 50

	@Column(name = "attachmentIdentifier_3", length = 50)
	private String attachmentIdentifier_3;// 50

	@Column(name = "attachmentIdentifier_4", length = 50)
	private String attachmentIdentifier_4;// 50

//	@Column(name = "attachmentMappingID_1", length = 50)
//	private String attachmentMappingID_1;// 50
//
//	@Column(name = "attachmentMappingID_2", length = 50)
//	private String attachmentMappingID_2;// 50
//
//	@Column(name = "attachmentMappingID_3", length = 50)
//	private String attachmentMappingID_3;// 50
//
//	@Column(name = "attachmentMappingID_4", length = 50)
//	private String attachmentMappingID_4;// 50

	@Column(name = "attachmentProductlineMatch", length = 100)
	private String attachmentProductlineMatch;// 100

	@Column(name = "attachmentRequired")
	private Boolean attachmentRequired;

	@Column(name = "attachmentSchemaID_1", length = 50)
	private String attachmentSchemaID_1;// 50

	@Column(name = "attachmentSchemaID_2", length = 50)
	private String attachmentSchemaID_2;// 50

//	@Column(name = "attachmentSchemaID_3", length = 50)
//	private String attachmentSchemaID_3;// 50
//
//	@Column(name = "attachmentSchemaID_4", length = 50)
//	private String attachmentSchemaID_4;// 50
//
//	@Column(name = "attachmentSchemaType_1", length = 50)
//	private String attachmentSchemaType_1;// 50
//
//	@Column(name = "attachmentSchemaType_2", length = 50)
//	private String attachmentSchemaType_2;// 50
//
//	@Column(name = "attachmentSchemaType_3", length = 50)
//	private String attachmentSchemaType_3;// 50
//
//	@Column(name = "attachmentSchemaType_4", length = 50)
//	private String attachmentSchemaType_4;// 50

	@Column(name = "comment", length = 250)
	private String comment;// 250

	@Column(name = "controlData")
	private Boolean controlData;

	@Column(name = "CSRPrimaryId", length = 250)
	private String csrPrimaryId;// 250

	@Column(name = "CSRSecondaryId", length = 250)
	private String csrSecondaryId;// 250

	@Column(name = "emailSubjectProductLineMatch", length = 100)
	private String emailSubjectProductLineMatch;// 100

//	@Column(name = "emailSubjectProductlineMatchLocation", length = 100)
//	private String emailSubjectProductlineMatchLocation;

	@Column(name = "emailSubjectProductlineMatchRequired")
	private Boolean emailSubjectProductlineMatchRequired;

	@Column(name = "emailSubjectRBOMatch", length = 100)
	private String emailSubjectRBOMatch;

//	@Column(name = "emailSubjectRBOMatchLocation", length = 100)
//	private String emailSubjectRBOMatchLocation;// 100

	@Column(name = "emailSubjectRBOMatchRequired")
	private Boolean emailSubjectRBOMatchRequired;

	@Column(name = "emailBodyProductLineMatch", length = 100)
	private String emailBodyProductLineMatch;

//	@Column(name = "emailBodyProductlineMatchLocation", length = 100)
//	private String emailBodyProductlineMatchLocation;

	@Column(name = "emailBodyProductlineMatchRequired")
	private Boolean emailBodyProductlineMatchRequired;

	@Column(name = "emailBodyRBOMatch", length = 100)
	private String emailBodyRBOMatch;

//	@Column(name = "emailBodyRBOMatchLocation", length = 100)
//	private String emailBodyRBOMatchLocation;

	@Column(name = "emailBodyRBOMatchRequired")
	private Boolean emailBodyRBOMatchRequired;

//	@Column(name = "fileRBOMatchLocation", length = 100)
//	private String fileRBOMatchLocation;

	@Column(name = "fileRBOMatchRequired")
	private Boolean fileRBOMatchRequired;

	@Column(name = "factoryTransfer")
	private Boolean factoryTransfer;

//	@Column(name = "fileMatchLocation", length = 100)
//	private String fileMatchLocation;// 100

	@Column(name = "fileMatchRequired")
	private Boolean fileMatchRequired;

	@Column(name = "fileOrderMatch", length = 100)
	private String fileOrderMatch;// 100

	@Column(name = "fileOrderMatchLocation", length = 100)
	private String fileOrderMatchLocation;// 100

//	@Column(name = "fileOrderMatchRequired")
//	private Boolean fileOrderMatchRequired;

	@Column(name = "fileProductlineMatch", length = 100)
	private String fileProductlineMatch;// 100

//	@Column(name = "fileProductLineMatchLocation", length = 100)
//	private String fileProductLineMatchLocation;// 100

	@Column(name = "fileProductLineMatchRequired")
	private Boolean fileProductLineMatchRequired;

	@Column(name = "fileRBOMatch", length = 100)
	private String fileRBOMatch;// 100

	@Column(name = "invoicelineInstruction", length = 500)
	private String invoicelineInstruction;// 500

	@Column(name = "LLKK")
	private Boolean llkk;

	@Column(name = "localBilling")
	private Boolean localBilling;

	@Column(name = "miscCSRInstruction", length = 500)
	private String miscCSRInstruction;// 500

	@Column(name = "orderFileNameExtension", length = 100)
	private String orderFileNameExtension;// 100

	@Column(name = "orderFileNamePattern", length = 25)
	private String orderFileNamePattern;// 25

	@Column(name = "orderMappingID", length = 50)
	private String orderMappingID;// 50

	@Column(name = "orderSchemaID", length = 50)
	private String orderSchemaID;// 50

	@Column(name = "orderSchemaType", length = 50)
	private String orderSchemaType;// 50

	@Column(name = "others")
	private Boolean others;// Others (pls specify)

	@Column(name = "preProcessPID", length = 50)
	private String preProcessPID;// 50

	@Column(name = "productLineType", length = 25)
	private String productLineType;// 25

	@Column(name = "DataStructureName", length = 100)
	private String dataStructureName;

	@Column(name = "shipmentSample")
	private Boolean shipmentSample;

	@Column(name = "waiveMOA")
	private Boolean waiveMOA;

	@Column(name = "waiveMOQ")
	private Boolean waiveMOQ;

	@Column(name = "localItem")
	private Boolean localItem;

	@Column(name = "averyItem")
	private Boolean averyItem;

	@Column(name = "fiberpercentagecheck", length = 100)
	private String fiberpercentagecheck;

	@Column(name = "coocheck", length = 100)
	private String coocheck;

	@Column(name = "customerItemIdentifierDescription", length = 500)
	private String customerItemIdentifierDescription;

	@Column(name = "defaultSystem", length = 500)
	private String defaultSystem;

	@Column(name = "productLineMatchFlag", length = 50)
	private String productLineMatchFlag;

	@Column(name = "email", length = 100)
	private String email;

	@Column(name = "sizeCheck", length = 100)
	private String sizeCheck;

	@Column(name = "orderInMailBody")
	private Boolean orderInMailBody;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "rboId")
	private RBO rbo;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "partnerId")
	private Partner varPartner;

	@OneToMany(mappedBy = "varProductLine", fetch = FetchType.LAZY)
	private Set<OrderSystemInfo> listOrderSystemInfo;

	// New Column added to match the POJO with DEV DB

	@Column(name = "revisecancelorder", length = 50)
	private String revisecancelorder;

	@Column(name = "defaultBillToCode", length = 255)
	private String defaultBillToCode;

	@Column(name = "defaultShipToCode", length = 255)
	private String defaultShipToCode;

	@Column(name = "discountOffer")
	private Boolean discountOffer;

	@Column(name = "shippingMark")
	private Boolean shippingMark;

	@Column(name = "GroupingField_1", length = 1000)
	private String groupingField_1;

	@Column(name = "GroupingField_2", length = 100)
	private String groupingField_2;

	@Column(name = "GroupingField_3", length = 100)
	private String groupingField_3;

	@Column(name = "GroupingField_4", length = 100)
	private String groupingField_4;

	@Column(name = "GroupingField_5", length = 100)
	private String groupingField_5;

	@Column(name = "GroupingField_6", length = 100)
	private String groupingField_6;

	@Column(name = "GroupingField_7", length = 100)
	private String groupingField_7;

	@Column(name = "GroupingField_8", length = 100)
	private String groupingField_8;

	@Column(name = "GroupingField_9", length = 100)
	private String groupingField_9;

	@Column(name = "GroupingField_10", length = 100)
	private String groupingField_10;

	@Column(name = "GroupingField_11", length = 100)
	private String groupingField_11;

	@Column(name = "GroupingField_12", length = 100)
	private String groupingField_12;

	@Column(name = "GroupingField_13", length = 100)
	private String groupingField_13;

	@Column(name = "GroupingField_14", length = 100)
	private String groupingField_14;

	@Column(name = "GroupingField_15", length = 100)
	private String groupingField_15;

	@Column(name = "GroupingField_16", length = 100)
	private String groupingField_16;

	@Column(name = "GroupingField_17", length = 100)
	private String groupingField_17;

	@Column(name = "GroupingField_18", length = 100)
	private String groupingField_18;

	@Column(name = "GroupingField_19", length = 100)
	private String groupingField_19;

	@Column(name = "GroupingField_20", length = 100)
	private String groupingField_20;

	@Column(name = "itemIdentifier", length = 100)
	private String itemIdentifier;

	@Column(name = "defaultOrgCode", length = 50)
	private String defaultOrgCode;

	@Column(name = "emailBodyPartnerRequired")
	private Boolean emailBodyPartnerRequired;

	@Column(name = "emailBodyPartnerMatch", length = 250)
	private String emailBodyPartnerMatch;

	@Column(name = "emailSubjectPartnerRequired")
	private Boolean emailSubjectPartnerRequired;

	@Column(name = "emailSubjectPartnerMatch", length = 250)
	private String emailSubjectPartnerMatch;

	@Column(name = "fileOrderPartnerMatch", length = 250)
	private String fileOrderPartnerMatch;

	@Column(name = "fileOrderPartnerRequired")
	private Boolean fileOrderPartnerRequired;

	@Column(name = "OrderInEmailBodyMatch", length = 250)
	private String orderInEmailBodyMatch;

	@Column(name = "OrderInEmailSubjectMatch", length = 250)
	private String orderInEmailSubjectMatch;

//	@Column(name = "fileOrderPartnerMatchLocation", length = 50)
//	private String fileOrderPartnerMatchLocation;

	@Column(name = "wi_id")
	private Integer wi_id;

	@Transient
	private String siteName;

	private transient long siteId;

//	private transient String fileOrderMatchSheet;

	private transient String fileOrderMatchCell;

	private transient String fileProductlineSheetMatch;

	private transient String fileProductlineCellMatch;

	private transient String fileRBOSheetMatch;

	private transient String fileRBOCellMatch;

//	private transient String attachmentFileProductlineMatchSheet;

	private transient String attachmentFileProductlineMatch;

	private transient String attachmentFileProductlineMatchCell;

	private transient String attachmentFileOrderMatchCell;

//	private transient String attachmentFileOrderMatchSheet;

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<ProductLine> productline = null;
		Map entitiesMap = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap queryMap = ui.getQueryParameters();
			mapper.addMixIn(ProductLine.class, ProductLineMixIn.class);
			/*
			 * mapper.addMixIn(Partner.class, PartnerMixIn.class); // because of
			 * partner profile Apperance Change by Rajo
			 * mapper.addMixIn(RBO.class,RboMixIn.class);
			 * mapper.addMixIn(OrderSystemInfo.class,
			 * OrderSystemInfoMixIn.class); mapper.addMixIn(ProductLine.class,
			 * OrderSystemInfoMixIn.class);
			 */
			mapper.addMixIn(Partner.class, PartnerMixIn.class);
			mapper.addMixIn(RBO.class, RboMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			entitiesMap = productLineService.readWithCriteria(queryMap);
			if (entitiesMap == null)
				throw new Exception("Unable to find Product Line");
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

//	@Override
//	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
//		Long id;
//		Boolean valueExist = false;
//		Map<String, Object> responseMap = new HashMap<String, Object>();
//		responseMap.put("valueExist", valueExist);
//		try {
//			ObjectMapper mapper = new ObjectMapper();
//			ObjectMapper responseMapper = new ObjectMapper();
//			StringWriter writer = new StringWriter();
//			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
//			ProductLine productline = mapper.readValue(data, ProductLine.class);
//			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
//					.getBean("productLineService");
//			valueExist = productLineService.checkDuplicateValues(productline);
//			if (!valueExist) {
//				productLineService.create(data);
//			}
//			responseMap.put("valueExist", valueExist);
//			responseMapper.writeValue(writer, responseMap);
//			return Response.ok(writer.toString()).build();
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
//					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
//		}
//	}
	
	@Override
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		Long id;
		Boolean valueExist = false;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		responseMap.put("valueExist", valueExist);
		try {
			ObjectMapper mapper = new ObjectMapper();
			ObjectMapper responseMapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			ProductLine productline = mapper.readValue(data, ProductLine.class);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			valueExist = productLineService.checkDuplicateValues(productline);
			if (!valueExist) {
				id = productLineService.create(data);
				responseMap.put("id", id);
				responseMap.put("success", true);
			}
			responseMap.put("valueExist", valueExist);
			responseMapper.writeValue(writer, responseMap);
			return Response.ok(writer.toString()).build();
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	@Override
	public Response updateEntity(UriInfo ui, HttpHeaders hh, String id, String data) {
		Response.ResponseBuilder rb = null;
		boolean valueExist = false;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(Partner.class, PartnerMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			ProductLine productline = mapper.readValue(data, ProductLine.class);
			productline.setId(Long.valueOf(id));
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			valueExist = productLineService.checkDuplicateValues(productline);
			if (!valueExist) {
				productLineService.update(data);
			}
			responseMap.put("valueExist", valueExist);
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in updating product line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in updating product line entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
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
			mapper.addMixIn(ProductLine.class, ProductLineEditMixIn.class);
			mapper.addMixIn(RBO.class, RboMixIn.class);
			mapper.addMixIn(OrderSystemInfo.class, OrderSystemInfoMixIn.class);
			mapper.addMixIn(Partner.class, PartnerMixIn.class);
			mapper.addMixIn(SystemInfo.class, SystemInfoMixIn.class);
			mapper.addMixIn(OrgInfo.class, OrgInfoMixin.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			ProductLine productline = productLineService.read(entityId);
			// ErrorCode lazyCode = findErrorCodeById(1);
			// // eager load associations
			// Hibernate.initialize(lazyCode);
			if (productline == null)
				throw new WebApplicationException(Response.status(Status.BAD_REQUEST)
						.entity("Product Line entity with id \"" + id + "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			Set<OrderSystemInfo> obj = productline.getListOrderSystemInfo();
			int count = 0;
			if (obj.size() != 0) {
				for (OrderSystemInfo oSysInfoObj : obj) {
					SystemInfo sysInfoList = oSysInfoObj.getVarSystem();
					if (sysInfoList != null) {
						Site site = sysInfoList.getSite();
						if (site != null)
							productline.setSiteId(site.getId());
					}
					break;
				}

			}
			mapper.writeValue(writer, productline);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching Product Line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching partner entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	@PUT
	@Path("/update")
	public Response updateProductline(@Context UriInfo ui, @Context HttpHeaders hh, String data) {
		Response.ResponseBuilder rb = null;
		boolean valueExist = false;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(Partner.class, PartnerMixIn.class);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			ProductLine productline = mapper.readValue(data, ProductLine.class);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			valueExist = productLineService.checkDuplicateValues(productline);
			if (!valueExist) {
				Long productlineId = productLineService.update(data);
				responseMap.put("success", true);
				responseMap.put("id", productlineId);
			}
			responseMap.put("valueExist", valueExist);
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in updating product line ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in updating product line ", e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

	@GET
	@Path("/partner/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getByPartnerID(@Context UriInfo ui, @Context HttpHeaders hh, @PathParam("id") String partnerId) {
		Response.ResponseBuilder rb = null;
		Map<?, ?> productline = new HashMap();
		;
		Map returnproductline = new HashMap();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(ProductLine.class, ProductLineMixIn.class);
			mapper.addMixIn(RBO.class, RboMixIn.class);
			mapper.addMixIn(OrderSystemInfo.class, OrderSystemInfoMixIn.class);
			mapper.addMixIn(OrderSystemInfo.class, ProductLineMixIn.class);
			mapper.addMixIn(Partner.class, PartnerMixIn.class);
			mapper.addMixIn(SystemInfo.class, SystemInfoMixIn.class);
			MultivaluedMap<String, String> queryParamMap = ui.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			productline = productLineService.readAllByPartnerID(queryParamMap);
			if (productline == null)
				throw new Exception("Unable to find Product Line");
			List listofPL = (List) productline.get("productlines");
			List listOfPLR = new LinkedList<ProductLine>();
			SiteService siteService = (SiteService) SpringConfig.getInstance().getBean("siteService");

			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			for (int i = 0; i < listofPL.size(); i++) {
				ProductLine currentProductline = (ProductLine) listofPL.get(i);
				String lastmodifiedUserId = currentProductline.getLastModifiedBy();
				if (lastmodifiedUserId != null) {
					String LastModifiedByName = userService.getUsernameById(lastmodifiedUserId);
					currentProductline.setLastModifiedBy(LastModifiedByName);
				}
				if (currentProductline.getSite() != null && currentProductline.getSite() != 0) {
					int siteId1 = (int) currentProductline.getSite();
					Site site = siteService.read((long) siteId1);
					if (site != null)
						currentProductline.setSitename(site.getName());
				}
				listOfPLR.add(currentProductline);
			}
			returnproductline.put("productlines", listOfPLR);
			if (productline.containsKey("totalCount"))
				returnproductline.put("totalCount", productline.get("totalCount"));
			mapper.writeValue(writer, returnproductline);
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
	public Response deleteEntity(UriInfo ui, HttpHeaders hh, String id) {
		try {
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			// read existing entity from database
			ProductLine productLine = productLineService.read(Long.parseLong(id));
			if (productLine == null) {
				throw new WebApplicationException(Response.status(Status.BAD_REQUEST)
						.entity("Product Line entity with id \"" + id + "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			productLineService.delete(productLine);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in deleting Product Line entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in deleting Product Line entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	@GET
	@Path("/productLineType")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProductLineType(@Context UriInfo ui, @Context HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<ProductLine> productline = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(ProductLine.class, PartnerDataStructureMixin.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			productline = productLineService.readAll();
			if (productline == null)
				throw new Exception("Unable to find Product Line");
			mapper.writeValue(writer, productline);
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

	@GET
	@Path("/uniquepartners")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllDistantPartners(@Context UriInfo ui, @Context HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List list = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap = ui.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			list = productLineService.getAllDistantPartners(queryParamMap);
			if (list == null)
				throw new Exception("Unable to find Partners");
			mapper.writeValue(writer, list);
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

	@GET
	@Path("/rbo/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllRBOByPartner(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("id") String partnerId) {
		Response.ResponseBuilder rb = null;
		List list = null;
		try {
			int id = Integer.parseInt(partnerId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(ProductLine.class, PartnerDataStructureMixin.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			list = productLineService.getAllRBOByPartner(id);
			if (list == null)
				throw new Exception("Unable to find Partners");
			mapper.writeValue(writer, list);
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

	@GET
	@Path("/getproductlines/{partnerId:[0-9]+}/{rboid:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProductLineBasedOnRbo(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("partnerId") String partnerid, @PathParam("rboid") String rboid) {
		Response.ResponseBuilder rb = null;
		List list = null;
		try {

			int partnerId = Integer.parseInt(partnerid);
			int rboId = Integer.parseInt(rboid);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(ProductLine.class, PartnerDataStructureMixin.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			list = productLineService.getAllProductLineByRBO(partnerId, rboId);
			if (list == null)
				throw new Exception("Unable to find Partners");
			mapper.writeValue(writer, list);
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

	@GET
	@Path("/getdatastructures/{partnerId:[0-9]+}/{rboid:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getRelatedDataStructures(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("partnerId") String partnerid, @PathParam("rboid") String rboid) {
		Response.ResponseBuilder rb = null;
		List list = null;
		try {

			Long partnerId = Long.parseLong(partnerid);
			Long rboId = Long.parseLong(rboid);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(ProductLine.class, PartnerDataStructureMixin.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			list = productLineService.getRelatedDataStructures(partnerId, rboId);
			if (list == null)
				throw new Exception("Unable to find Partners");
			mapper.writeValue(writer, list);
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

	/**
	 * @param ui
	 * @param hh
	 * @param orderid
	 * @return data structures list by matching the id's in the comment
	 */
	@GET
	@Path("/datastructure/{orderid:[0-9]+}")
	public Response getDataStructureBasedOnAttachmentId(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("orderid") String orderid) {
		Long fileAttachmentId = Long.parseLong(orderid);
		Response.ResponseBuilder rb = null;
		Map entitiesMap = new HashMap();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.addMixIn(OrderFileAttachment.class, AdditionalFilesMixIn.class);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			entitiesMap = productLineService.getDataStructure(fileAttachmentId);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find any data");
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}

		return rb.build();
	}

	@GET
	@Path("/rboList")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPartnersByID(@Context UriInfo ui, @Context HttpHeaders hh,
			@QueryParam("partnerId") String partnerId) {
		Response.ResponseBuilder rb = null;
		Map<?, ?> productline = new HashMap();
		;
		Map returnproductline = new HashMap();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(ProductLine.class, ProductLineMixIn.class);
			mapper.addMixIn(RBO.class, RboMixIn.class);
			mapper.addMixIn(OrderSystemInfo.class, OrderSystemInfoMixIn.class);
			mapper.addMixIn(OrderSystemInfo.class, ProductLineMixIn.class);
			mapper.addMixIn(Partner.class, PartnerMixIn.class);
			mapper.addMixIn(SystemInfo.class, SystemInfoMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			ProductLineService productLineService = (ProductLineService) SpringConfig.getInstance()
					.getBean("productLineService");
			productline = productLineService.getRboListById(partnerId);
			if (productline == null)
				throw new Exception("Unable to find Product Line");
			List listofPL = (List) productline.get("productlines");
			List listOfPLR = new LinkedList<ProductLine>();
			SiteService siteService = (SiteService) SpringConfig.getInstance().getBean("siteService");
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			for (int i = 0; i < listofPL.size(); i++) {
				ProductLine currentProductline = (ProductLine) listofPL.get(i);
				String lastmodifiedUserId = currentProductline.getLastModifiedBy();
				if (lastmodifiedUserId != null) {
					String LastModifiedByName = userService.getUsernameById(lastmodifiedUserId);
					currentProductline.setLastModifiedBy(LastModifiedByName);
				}
				if (currentProductline.getSite() != null && currentProductline.getSite() != 0) {
					int siteId1 = (int) currentProductline.getSite();
					Site site = siteService.read((long) siteId1);
					if (site != null)
						currentProductline.setSitename(site.getName());
				}
				listOfPLR.add(currentProductline);
			}
			returnproductline.put("productlines", listOfPLR);
			mapper.writeValue(writer, returnproductline);
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

	// Start of Getters and Setters

	public Boolean getOrderInMailBody() {
		return orderInMailBody;
	}

	public void setOrderInMailBody(Boolean orderInMailBody) {
		this.orderInMailBody = orderInMailBody;
	}

	public String getAssignCSRName() {
		return assignCSRName;
	}

	public void setAssignCSRName(String assignCSRName) {
		this.assignCSRName = assignCSRName;
	}

	public String getFactoryMOQValue() {
		return factoryMOQValue;
	}

	public void setFactoryMOQValue(String factoryMOQValue) {
		this.factoryMOQValue = factoryMOQValue;
	}

	public String getProductLineMatchFlag() {
		return productLineMatchFlag;
	}

	public void setProductLineMatchFlag(String productLineMatchFlag) {
		this.productLineMatchFlag = productLineMatchFlag;
	}

//	public String getFileOrderMatchSheet() {
//		return fileOrderMatchSheet;
//	}
//
//	public void setFileOrderMatchSheet(String fileOrderMatchSheet) {
//		this.fileOrderMatchSheet = fileOrderMatchSheet;
//	}

	public String getFileOrderMatchCell() {
		return fileOrderMatchCell;
	}

	public void setFileOrderMatchCell(String fileOrderMatchCell) {
		this.fileOrderMatchCell = fileOrderMatchCell;
	}

	public String getFileProductlineSheetMatch() {
		return fileProductlineSheetMatch;
	}

	public void setFileProductlineSheetMatch(String fileProductlineSheetMatch) {
		this.fileProductlineSheetMatch = fileProductlineSheetMatch;
	}

	public String getFileProductlineCellMatch() {
		return fileProductlineCellMatch;
	}

	public void setFileProductlineCellMatch(String fileProductlineCellMatch) {
		this.fileProductlineCellMatch = fileProductlineCellMatch;
	}

	public String getFileRBOSheetMatch() {
		return fileRBOSheetMatch;
	}

	public void setFileRBOSheetMatch(String fileRBOSheetMatch) {
		this.fileRBOSheetMatch = fileRBOSheetMatch;
	}

	public String getFileRBOCellMatch() {
		return fileRBOCellMatch;
	}

	public void setFileRBOCellMatch(String fileRBOCellMatch) {
		this.fileRBOCellMatch = fileRBOCellMatch;
	}

//	public String getAttachmentFileProductlineMatchSheet() {
//		return attachmentFileProductlineMatchSheet;
//	}
//
//	public void setAttachmentFileProductlineMatchSheet(String attachmentFileProductlineMatchSheet) {
//		this.attachmentFileProductlineMatchSheet = attachmentFileProductlineMatchSheet;
//	}

	public String getAttachmentFileProductlineMatch() {
		return attachmentFileProductlineMatch;
	}

	public void setAttachmentFileProductlineMatch(String attachmentFileProductlineMatch) {
		this.attachmentFileProductlineMatch = attachmentFileProductlineMatch;
	}

	public String getAttachmentFileProductlineMatchCell() {
		return attachmentFileProductlineMatchCell;
	}

	public void setAttachmentFileProductlineMatchCell(String attachmentFileProductlineMatchCell) {
		this.attachmentFileProductlineMatchCell = attachmentFileProductlineMatchCell;
	}

	public String getAttachmentFileOrderMatchCell() {
		return attachmentFileOrderMatchCell;
	}

	public void setAttachmentFileOrderMatchCell(String attachmentFileOrderMatchCell) {
		this.attachmentFileOrderMatchCell = attachmentFileOrderMatchCell;
	}

//	public String getAttachmentFileOrderMatchSheet() {
//		return attachmentFileOrderMatchSheet;
//	}
//
//	public void setAttachmentFileOrderMatchSheet(String attachmentFileOrderMatchSheet) {
//		this.attachmentFileOrderMatchSheet = attachmentFileOrderMatchSheet;
//	}

	public long getSiteId() {
		return siteId;
	}

	public void setSiteId(long l) {
		this.siteId = l;
	}

	public Set<OrderSystemInfo> getListOrderSystemInfo() {
		return listOrderSystemInfo;
	}

	public void setListOrderSystemInfo(Set<OrderSystemInfo> listOrderSystemInfo) {
		this.listOrderSystemInfo = listOrderSystemInfo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean isActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

//	public String getAttachmentFileMatchLocation() {
//		return attachmentFileMatchLocation;
//	}
//
//	public void setAttachmentFileMatchLocation(String attachmentFileMatchLocation) {
//		this.attachmentFileMatchLocation = attachmentFileMatchLocation;
//	}

	public Boolean isAttachmentFileMatchRequired() {
		return attachmentFileMatchRequired;
	}

	public void setAttachmentFileMatchRequired(Boolean attachmentFileMatchRequired) {
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

//	public String getAttachmentFileNameExtension_3() {
//		return attachmentFileNameExtension_3;
//	}
//
//	public void setAttachmentFileNameExtension_3(String attachmentFileNameExtension_3) {
//		this.attachmentFileNameExtension_3 = attachmentFileNameExtension_3;
//	}
//
//	public String getAttachmentFileNameExtension_4() {
//		return attachmentFileNameExtension_4;
//	}
//
//	public void setAttachmentFileNameExtension_4(String attachmentFileNameExtension_4) {
//		this.attachmentFileNameExtension_4 = attachmentFileNameExtension_4;
//	}

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

//	public String getAttachmentFileOrderMatchLocation() {
//		return attachmentFileOrderMatchLocation;
//	}
//
//	public void setAttachmentFileOrderMatchLocation(String attachmentFileOrderMatchLocation) {
//		this.attachmentFileOrderMatchLocation = attachmentFileOrderMatchLocation;
//	}

	public Boolean isAttachmentFileOrderMatchRequired() {
		return attachmentFileOrderMatchRequired;
	}

	public void setAttachmentFileOrderMatchRequired(Boolean attachmentFileOrderMatchRequired) {
		this.attachmentFileOrderMatchRequired = attachmentFileOrderMatchRequired;
	}

//	public String getAttachmentFileProductlineMatchLocation() {
//		return attachmentFileProductlineMatchLocation;
//	}
//
//	public void setAttachmentFileProductlineMatchLocation(String attachmentFileProductlineMatchLocation) {
//		this.attachmentFileProductlineMatchLocation = attachmentFileProductlineMatchLocation;
//	}

	public Boolean isAttachmentFileProductlineMatchRequired() {
		return attachmentFileProductlineMatchRequired;
	}

	public void setAttachmentFileProductlineMatchRequired(Boolean attachmentFileProductlineMatchRequired) {
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

//	public String getAttachmentMappingID_1() {
//		return attachmentMappingID_1;
//	}
//
//	public void setAttachmentMappingID_1(String attachmentMappingID_1) {
//		this.attachmentMappingID_1 = attachmentMappingID_1;
//	}
//
//	public String getAttachmentMappingID_2() {
//		return attachmentMappingID_2;
//	}
//
//	public void setAttachmentMappingID_2(String attachmentMappingID_2) {
//		this.attachmentMappingID_2 = attachmentMappingID_2;
//	}
//
//	public String getAttachmentMappingID_3() {
//		return attachmentMappingID_3;
//	}
//
//	public void setAttachmentMappingID_3(String attachmentMappingID_3) {
//		this.attachmentMappingID_3 = attachmentMappingID_3;
//	}
//
//	public String getAttachmentMappingID_4() {
//		return attachmentMappingID_4;
//	}
//
//	public void setAttachmentMappingID_4(String attachmentMappingID_4) {
//		this.attachmentMappingID_4 = attachmentMappingID_4;
//	}

	public String getAttachmentProductlineMatch() {
		return attachmentProductlineMatch;
	}

	public void setAttachmentProductlineMatch(String attachmentProductlineMatch) {
		this.attachmentProductlineMatch = attachmentProductlineMatch;
	}

	public Boolean isAttachmentRequired() {
		return attachmentRequired;
	}

	public void setAttachmentRequired(Boolean attachmentRequired) {
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

//	public String getAttachmentSchemaID_3() {
//		return attachmentSchemaID_3;
//	}
//
//	public void setAttachmentSchemaID_3(String attachmentSchemaID_3) {
//		this.attachmentSchemaID_3 = attachmentSchemaID_3;
//	}
//
//	public String getAttachmentSchemaID_4() {
//		return attachmentSchemaID_4;
//	}
//
//	public void setAttachmentSchemaID_4(String attachmentSchemaID_4) {
//		this.attachmentSchemaID_4 = attachmentSchemaID_4;
//	}
//
//	public String getAttachmentSchemaType_1() {
//		return attachmentSchemaType_1;
//	}
//
//	public void setAttachmentSchemaType_1(String attachmentSchemaType_1) {
//		this.attachmentSchemaType_1 = attachmentSchemaType_1;
//	}
//
//	public String getAttachmentSchemaType_2() {
//		return attachmentSchemaType_2;
//	}
//
//	public void setAttachmentSchemaType_2(String attachmentSchemaType_2) {
//		this.attachmentSchemaType_2 = attachmentSchemaType_2;
//	}
//
//	public String getAttachmentSchemaType_3() {
//		return attachmentSchemaType_3;
//	}
//
//	public void setAttachmentSchemaType_3(String attachmentSchemaType_3) {
//		this.attachmentSchemaType_3 = attachmentSchemaType_3;
//	}
//
//	public String getAttachmentSchemaType_4() {
//		return attachmentSchemaType_4;
//	}
//
//	public void setAttachmentSchemaType_4(String attachmentSchemaType_4) {
//		this.attachmentSchemaType_4 = attachmentSchemaType_4;
//	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Boolean isControlData() {
		return controlData;
	}

	public void setControlData(Boolean controlData) {
		this.controlData = controlData;
	}

	public String getCsrPrimaryId() {
		return csrPrimaryId;
	}

	public void setCsrPrimaryId(String csrPrimaryId) {
		this.csrPrimaryId = csrPrimaryId;
	}

	public String getCsrSecondaryId() {
		return csrSecondaryId;
	}

	public void setCsrSecondaryId(String csrSecondaryId) {
		this.csrSecondaryId = csrSecondaryId;
	}

	public String getEmailSubjectProductLineMatch() {
		return emailSubjectProductLineMatch;
	}

	public void setEmailSubjectProductLineMatch(String emailSubjectProductLineMatch) {
		this.emailSubjectProductLineMatch = emailSubjectProductLineMatch;
	}

//	public String getEmailSubjectProductlineMatchLocation() {
//		return emailSubjectProductlineMatchLocation;
//	}
//
//	public void setEmailSubjectProductlineMatchLocation(String emailSubjectProductlineMatchLocation) {
//		this.emailSubjectProductlineMatchLocation = emailSubjectProductlineMatchLocation;
//	}

	public Boolean isEmailSubjectProductlineMatchRequired() {
		return emailSubjectProductlineMatchRequired;
	}

	public void setEmailSubjectProductlineMatchRequired(Boolean emailSubjectProductlineMatchRequired) {
		this.emailSubjectProductlineMatchRequired = emailSubjectProductlineMatchRequired;
	}

	public String getEmailSubjectRBOMatch() {
		return emailSubjectRBOMatch;
	}

	public void setEmailSubjectRBOMatch(String emailSubjectRBOMatch) {
		this.emailSubjectRBOMatch = emailSubjectRBOMatch;
	}

//	public String getEmailSubjectRBOMatchLocation() {
//		return emailSubjectRBOMatchLocation;
//	}
//
//	public void setEmailSubjectRBOMatchLocation(String emailSubjectRBOMatchLocation) {
//		this.emailSubjectRBOMatchLocation = emailSubjectRBOMatchLocation;
//	}

	public Boolean isEmailSubjectRBOMatchRequired() {
		return emailSubjectRBOMatchRequired;
	}

	public void setEmailSubjectRBOMatchRequired(Boolean emailSubjectRBOMatchRequired) {
		this.emailSubjectRBOMatchRequired = emailSubjectRBOMatchRequired;
	}

	public String getEmailBodyProductLineMatch() {
		return emailBodyProductLineMatch;
	}

	public void setEmailBodyProductLineMatch(String emailBodyProductLineMatch) {
		this.emailBodyProductLineMatch = emailBodyProductLineMatch;
	}

//	public String getEmailBodyProductlineMatchLocation() {
//		return emailBodyProductlineMatchLocation;
//	}
//
//	public void setEmailBodyProductlineMatchLocation(String emailBodyProductlineMatchLocation) {
//		this.emailBodyProductlineMatchLocation = emailBodyProductlineMatchLocation;
//	}

	public Boolean isEmailBodyProductlineMatchRequired() {
		return emailBodyProductlineMatchRequired;
	}

	public void setEmailBodyProductlineMatchRequired(Boolean emailBodyProductlineMatchRequired) {
		this.emailBodyProductlineMatchRequired = emailBodyProductlineMatchRequired;
	}

	public String getEmailBodyRBOMatch() {
		return emailBodyRBOMatch;
	}

	public void setEmailBodyRBOMatch(String emailBodyRBOMatch) {
		this.emailBodyRBOMatch = emailBodyRBOMatch;
	}

//	public String getEmailBodyRBOMatchLocation() {
//		return emailBodyRBOMatchLocation;
//	}
//
//	public void setEmailBodyRBOMatchLocation(String emailBodyRBOMatchLocation) {
//		this.emailBodyRBOMatchLocation = emailBodyRBOMatchLocation;
//	}

	public Boolean isEmailBodyRBOMatchRequired() {
		return emailBodyRBOMatchRequired;
	}

	public void setEmailBodyRBOMatchRequired(Boolean emailBodyRBOMatchRequired) {
		this.emailBodyRBOMatchRequired = emailBodyRBOMatchRequired;
	}

//	public String getFileRBOMatchLocation() {
//		return fileRBOMatchLocation;
//	}
//
//	public void setFileRBOMatchLocation(String fileRBOMatchLocation) {
//		this.fileRBOMatchLocation = fileRBOMatchLocation;
//	}

	public Boolean isFileRBOMatchRequired() {
		return fileRBOMatchRequired;
	}

	public void setFileRBOMatchRequired(Boolean fileRBOMatchRequired) {
		this.fileRBOMatchRequired = fileRBOMatchRequired;
	}

	public Boolean isFactoryTransfer() {
		return factoryTransfer;
	}

	public void setFactoryTransfer(Boolean factoryTransfer) {
		this.factoryTransfer = factoryTransfer;
	}

//	public String getFileMatchLocation() {
//		return fileMatchLocation;
//	}
//
//	public void setFileMatchLocation(String fileMatchLocation) {
//		this.fileMatchLocation = fileMatchLocation;
//	}

	public Boolean isFileMatchRequired() {
		return fileMatchRequired;
	}

	public void setFileMatchRequired(Boolean fileMatchRequired) {
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

//	public Boolean isFileOrderMatchRequired() {
//		return fileOrderMatchRequired;
//	}
//
//	public void setFileOrderMatchRequired(Boolean fileOrderMatchRequired) {
//		this.fileOrderMatchRequired = fileOrderMatchRequired;
//	}

	public String getFileProductlineMatch() {
		return fileProductlineMatch;
	}

	public void setFileProductlineMatch(String fileProductlineMatch) {
		this.fileProductlineMatch = fileProductlineMatch;
	}

//	public String getFileProductLineMatchLocation() {
//		return fileProductLineMatchLocation;
//	}
//
//	public void setFileProductLineMatchLocation(String fileProductLineMatchLocation) {
//		this.fileProductLineMatchLocation = fileProductLineMatchLocation;
//	}

	public Boolean isFileProductLineMatchRequired() {
		return fileProductLineMatchRequired;
	}

	public void setFileProductLineMatchRequired(Boolean fileProductLineMatchRequired) {
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

	public Boolean getLlkk() {
		return llkk;
	}

	public void setLlkk(Boolean llkk) {
		this.llkk = llkk;
	}

	public Boolean isLocalBilling() {
		return localBilling;
	}

	public void setLocalBilling(Boolean localBilling) {
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

	public Boolean isOthers() {
		return others;
	}

	public void setOthers(Boolean others) {
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

	public Boolean isShipmentSample() {
		return shipmentSample;
	}

	public void setShipmentSample(Boolean shipmentSample) {
		this.shipmentSample = shipmentSample;
	}

	public Boolean isWaiveMOA() {
		return waiveMOA;
	}

	public void setWaiveMOA(Boolean waiveMOA) {
		this.waiveMOA = waiveMOA;
	}

	public Boolean isWaiveMOQ() {
		return waiveMOQ;
	}

	public void setWaiveMOQ(Boolean waiveMOQ) {
		this.waiveMOQ = waiveMOQ;
	}

	public Boolean isLocalItem() {
		return localItem;
	}

	public void setLocalItem(Boolean localItem) {
		this.localItem = localItem;
	}

	public Boolean isAveryItem() {
		return averyItem;
	}

	public void setAveryItem(Boolean averyItem) {
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

	public String getDataStructureName() {
		return dataStructureName;
	}

	public void setDataStructureName(String dataStructureName) {
		this.dataStructureName = dataStructureName;
	}

	public void setSitename(String siteName) {
		this.siteName = siteName;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSite(Integer site) {
		this.site = site;
	}

	public Integer getSite() {
		return site;
	}

	public String getRevisecancelorder() {
		return revisecancelorder;
	}

	public void setRevisecancelorder(String revisecancelorder) {
		this.revisecancelorder = revisecancelorder;
	}

	public String getDefaultBillToCode() {
		return defaultBillToCode;
	}

	public void setDefaultBillToCode(String defaultBillToCode) {
		this.defaultBillToCode = defaultBillToCode;
	}

	public String getDefaultShipToCode() {
		return defaultShipToCode;
	}

	public void setDefaultShipToCode(String defaultShipToCode) {
		this.defaultShipToCode = defaultShipToCode;
	}

	public Boolean getDiscountOffer() {
		return discountOffer;
	}

	public void setDiscountOffer(Boolean discountOffer) {
		this.discountOffer = discountOffer;
	}

	public Boolean getShippingMark() {
		return shippingMark;
	}

	public void setShippingMark(Boolean shippingMark) {
		this.shippingMark = shippingMark;
	}

	public String getGroupingField_1() {
		return groupingField_1;
	}

	public void setGroupingField_1(String groupingField_1) {
		this.groupingField_1 = groupingField_1;
	}

	public String getGroupingField_2() {
		return groupingField_2;
	}

	public void setGroupingField_2(String groupingField_2) {
		this.groupingField_2 = groupingField_2;
	}

	public String getGroupingField_3() {
		return groupingField_3;
	}

	public void setGroupingField_3(String groupingField_3) {
		this.groupingField_3 = groupingField_3;
	}

	public String getGroupingField_4() {
		return groupingField_4;
	}

	public void setGroupingField_4(String groupingField_4) {
		this.groupingField_4 = groupingField_4;
	}

	public String getGroupingField_5() {
		return groupingField_5;
	}

	public void setGroupingField_5(String groupingField_5) {
		this.groupingField_5 = groupingField_5;
	}

	public String getGroupingField_6() {
		return groupingField_6;
	}

	public void setGroupingField_6(String groupingField_6) {
		this.groupingField_6 = groupingField_6;
	}

	public String getGroupingField_7() {
		return groupingField_7;
	}

	public void setGroupingField_7(String groupingField_7) {
		this.groupingField_7 = groupingField_7;
	}

	public String getGroupingField_8() {
		return groupingField_8;
	}

	public void setGroupingField_8(String groupingField_8) {
		this.groupingField_8 = groupingField_8;
	}

	public String getGroupingField_9() {
		return groupingField_9;
	}

	public void setGroupingField_9(String groupingField_9) {
		this.groupingField_9 = groupingField_9;
	}

	public String getGroupingField_10() {
		return groupingField_10;
	}

	public void setGroupingField_10(String groupingField_10) {
		this.groupingField_10 = groupingField_10;
	}

	public String getGroupingField_11() {
		return groupingField_11;
	}

	public void setGroupingField_11(String groupingField_11) {
		this.groupingField_11 = groupingField_11;
	}

	public String getGroupingField_12() {
		return groupingField_12;
	}

	public void setGroupingField_12(String groupingField_12) {
		this.groupingField_12 = groupingField_12;
	}

	public String getGroupingField_13() {
		return groupingField_13;
	}

	public void setGroupingField_13(String groupingField_13) {
		this.groupingField_13 = groupingField_13;
	}

	public String getGroupingField_14() {
		return groupingField_14;
	}

	public void setGroupingField_14(String groupingField_14) {
		this.groupingField_14 = groupingField_14;
	}

	public String getGroupingField_15() {
		return groupingField_15;
	}

	public void setGroupingField_15(String groupingField_15) {
		this.groupingField_15 = groupingField_15;
	}

	public String getGroupingField_16() {
		return groupingField_16;
	}

	public void setGroupingField_16(String groupingField_16) {
		this.groupingField_16 = groupingField_16;
	}

	public String getGroupingField_17() {
		return groupingField_17;
	}

	public void setGroupingField_17(String groupingField_17) {
		this.groupingField_17 = groupingField_17;
	}

	public String getGroupingField_18() {
		return groupingField_18;
	}

	public void setGroupingField_18(String groupingField_18) {
		this.groupingField_18 = groupingField_18;
	}

	public String getGroupingField_19() {
		return groupingField_19;
	}

	public void setGroupingField_19(String groupingField_19) {
		this.groupingField_19 = groupingField_19;
	}

	public String getGroupingField_20() {
		return groupingField_20;
	}

	public void setGroupingField_20(String groupingField_20) {
		this.groupingField_20 = groupingField_20;
	}

	public String getItemIdentifier() {
		return itemIdentifier;
	}

	public void setItemIdentifier(String itemIdentifier) {
		this.itemIdentifier = itemIdentifier;
	}

	public String getDefaultOrgCode() {
		return defaultOrgCode;
	}

	public void setDefaultOrgCode(String defaultOrgCode) {
		this.defaultOrgCode = defaultOrgCode;
	}

	public Boolean getEmailBodyPartnerRequired() {
		return emailBodyPartnerRequired;
	}

	public void setEmailBodyPartnerRequired(Boolean emailBodyPartnerRequired) {
		this.emailBodyPartnerRequired = emailBodyPartnerRequired;
	}

	public String getEmailBodyPartnerMatch() {
		return emailBodyPartnerMatch;
	}

	public void setEmailBodyPartnerMatch(String emailBodyPartnerMatch) {
		this.emailBodyPartnerMatch = emailBodyPartnerMatch;
	}

	public Boolean getEmailSubjectPartnerRequired() {
		return emailSubjectPartnerRequired;
	}

	public void setEmailSubjectPartnerRequired(Boolean emailSubjectPartnerRequired) {
		this.emailSubjectPartnerRequired = emailSubjectPartnerRequired;
	}

	public String getEmailSubjectPartnerMatch() {
		return emailSubjectPartnerMatch;
	}

	public void setEmailSubjectPartnerMatch(String emailSubjectPartnerMatch) {
		this.emailSubjectPartnerMatch = emailSubjectPartnerMatch;
	}

	public String getFileOrderPartnerMatch() {
		return fileOrderPartnerMatch;
	}

	public void setFileOrderPartnerMatch(String fileOrderPartnerMatch) {
		this.fileOrderPartnerMatch = fileOrderPartnerMatch;
	}

	public Boolean getFileOrderPartnerRequired() {
		return fileOrderPartnerRequired;
	}

	public void setFileOrderPartnerRequired(Boolean fileOrderPartnerRequired) {
		this.fileOrderPartnerRequired = fileOrderPartnerRequired;
	}

	public String getOrderInEmailBodyMatch() {
		return orderInEmailBodyMatch;
	}

	public void setOrderInEmailBodyMatch(String orderInEmailBodyMatch) {
		this.orderInEmailBodyMatch = orderInEmailBodyMatch;
	}

	public String getOrderInEmailSubjectMatch() {
		return orderInEmailSubjectMatch;
	}

	public void setOrderInEmailSubjectMatch(String orderInEmailSubjectMatch) {
		this.orderInEmailSubjectMatch = orderInEmailSubjectMatch;
	}

//	public String getFileOrderPartnerMatchLocation() {
//		return fileOrderPartnerMatchLocation;
//	}
//
//	public void setFileOrderPartnerMatchLocation(String fileOrderPartnerMatchLocation) {
//		this.fileOrderPartnerMatchLocation = fileOrderPartnerMatchLocation;
//	}

	public Integer getWi_id() {
		return wi_id;
	}

	public void setWi_id(Integer wi_id) {
		this.wi_id = wi_id;
	}

	public Boolean getActive() {
		return active;
	}

	public Boolean getAttachmentFileMatchRequired() {
		return attachmentFileMatchRequired;
	}

	public Boolean getAttachmentFileOrderMatchRequired() {
		return attachmentFileOrderMatchRequired;
	}

	public Boolean getAttachmentFileProductlineMatchRequired() {
		return attachmentFileProductlineMatchRequired;
	}

	public Boolean getAttachmentRequired() {
		return attachmentRequired;
	}

	public Boolean getControlData() {
		return controlData;
	}

	public Boolean getEmailSubjectProductlineMatchRequired() {
		return emailSubjectProductlineMatchRequired;
	}

	public Boolean getEmailSubjectRBOMatchRequired() {
		return emailSubjectRBOMatchRequired;
	}

	public Boolean getEmailBodyProductlineMatchRequired() {
		return emailBodyProductlineMatchRequired;
	}

	public Boolean getEmailBodyRBOMatchRequired() {
		return emailBodyRBOMatchRequired;
	}

	public Boolean getFileRBOMatchRequired() {
		return fileRBOMatchRequired;
	}

	public Boolean getFactoryTransfer() {
		return factoryTransfer;
	}

	public Boolean getFileMatchRequired() {
		return fileMatchRequired;
	}

//	public Boolean getFileOrderMatchRequired() {
//		return fileOrderMatchRequired;
//	}

	public Boolean getFileProductLineMatchRequired() {
		return fileProductLineMatchRequired;
	}

	public Boolean getLocalBilling() {
		return localBilling;
	}

	public Boolean getOthers() {
		return others;
	}

	public Boolean getShipmentSample() {
		return shipmentSample;
	}

	public Boolean getWaiveMOA() {
		return waiveMOA;
	}

	public Boolean getWaiveMOQ() {
		return waiveMOQ;
	}

	public Boolean getLocalItem() {
		return localItem;
	}

	public Boolean getAveryItem() {
		return averyItem;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getFactoryMOQCheck() {
		return factoryMOQCheck;
	}

	public void setFactoryMOQCheck(String factoryMOQCheck) {
		this.factoryMOQCheck = factoryMOQCheck;
	}

	public String getFiberpercentagecheck() {
		return fiberpercentagecheck;
	}

	public void setFiberpercentagecheck(String fiberpercentagecheck) {
		this.fiberpercentagecheck = fiberpercentagecheck;
	}

	public String getCoocheck() {
		return coocheck;
	}

	public void setCoocheck(String coocheck) {
		this.coocheck = coocheck;
	}

	public String getSizeCheck() {
		return sizeCheck;
	}

	public void setSizeCheck(String sizeCheck) {
		this.sizeCheck = sizeCheck;
	}
	
}
