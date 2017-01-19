package com.avery.storage.entities;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.StringWriter;
import java.util.ArrayList;
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
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
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
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.AdditionalFilesMixIn;
import com.avery.storage.MixIn.OrderFileAttachmentMixIn;
import com.avery.storage.MixIn.PartnerDataStructureMixin;
import com.avery.storage.MixIn.ProductLineMixIn;
import com.avery.storage.MixIn.ViewMailMixIn;
import com.avery.storage.service.OrderFileAttachmentService;
import com.avery.utils.ApplicationUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "orderfileattachment")
@Path("orderattachements")
public class OrderFileAttachment extends MainAbstractEntity {
	
	public OrderFileAttachment(){
		
	}

	private static final long serialVersionUID = -5438437762230204443L;

	@Column(name = "fileName", length = 250)
	private String fileName;
	
	@Column(name = "fileExtension", length = 50)
	private String fileExtension;
	
	@Column(name = "fileContentType", length = 100)
	private String fileContentType;
	
	@Column(name = "fileData", length = 100)
	private String fileData;
	
	@Column(name = "additionalDataFileKey", length = 100)
	private String additionalDataFileKey;
	
	@Column(name = "filePath", length=250)
	private String filePath;
	
	@Column(name = "status", length = 100)
	private String status;
	
	@Column(name = "comment", length = 250)
	private String comment;
	
	@Column(name="error",length=50)
	private String error;
	
	@Column(name="orderFileId")
	Integer orderFileId;
	
	@Column(name="productLineMatch",length=100)
	private String productLineMatch;
	
	@Column(name="rboMatch",length=100)
	private String rboMatch;
	
	@Column(name="fileContentMatch",length=100)
	private String fileContentMatch;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "orderEmailQueueId")
	OrderEmailQueue varOrderEmailQueue;
	
	@ManyToOne( fetch = FetchType.EAGER)
	@JoinColumn(name = "productLineId")
	ProductLine varProductLine;
	
	@OneToMany(mappedBy = "varOrderFileAttachment", fetch = FetchType.LAZY)
	List<OrderQueue> listOrderFileQueue;

	// transient variables added for getting colorCode, iconName and value
	@Transient
	private String iconName;

	@Transient
	private String colorCode;

	@Transient
	private String codeValue;

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

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileExtension() {
		return fileExtension;
	}

	public void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public String getFileData() {
		return fileData;
	}

	public void setFileData(String fileData) {
		this.fileData = fileData;
	}

	public String getAdditionalDataFileKey() {
		return additionalDataFileKey;
	}

	public void setAdditionalDataFileKey(String additionalDataFileKey) {
		this.additionalDataFileKey = additionalDataFileKey;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public Integer getOrderFileId() {
		return orderFileId;
	}

	public void setOrderFileId(Integer orderFileId) {
		this.orderFileId = orderFileId;
	}

	public String getProductLineMatch() {
		return productLineMatch;
	}

	public void setProductLineMatch(String productLineMatch) {
		this.productLineMatch = productLineMatch;
	}

	public String getRboMatch() {
		return rboMatch;
	}

	public void setRboMatch(String rboMatch) {
		this.rboMatch = rboMatch;
	}

	public String getFileContentMatch() {
		return fileContentMatch;
	}

	public void setFileContentMatch(String fileContentMatch) {
		this.fileContentMatch = fileContentMatch;
	}

	public OrderEmailQueue getVarOrderEmailQueue() {
		return varOrderEmailQueue;
	}

	public void setVarOrderEmailQueue(OrderEmailQueue varOrderEmailQueue) {
		this.varOrderEmailQueue = varOrderEmailQueue;
	}

	public ProductLine getVarProductLine() {
		return varProductLine;
	}

	public void setVarProductLine(ProductLine varProductLine) {
		this.varProductLine = varProductLine;
	}

	public List<OrderQueue> getListOrderFileQueue() {
		return listOrderFileQueue;
	}

	public void setListOrderFileQueue(List<OrderQueue> listOrderFileQueue) {
		this.listOrderFileQueue = listOrderFileQueue;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<OrderFileAttachment> orderFileAttachment = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			orderFileAttachment = orderFileAttachmentService.readAll();
			if (orderFileAttachment == null)
				throw new Exception("Unable to find Order Attachments");
			mapper.writeValue(writer, orderFileAttachment);
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
			OrderFileAttachment orderFileAttachment = mapper.readValue(data, OrderFileAttachment.class);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			
			id = orderFileAttachmentService.create(orderFileAttachment);
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
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			// read existing entity from database
			OrderFileAttachment orderFileAttachment = orderFileAttachmentService.read(Long.parseLong(id));
			if (orderFileAttachment == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("File Attachment entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(orderFileAttachment);
			// build updated entity object from input data
			orderFileAttachment = updater.readValue(data);
			// update entity in database
			orderFileAttachmentService.update(orderFileAttachment);
			// prepare response
			mapper.writeValue(writer, orderFileAttachment);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating file attachment entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating file attachment entity with id " + id, e);
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
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			OrderFileAttachment orderFileAttachment = orderFileAttachmentService.read(entityId);
			if (orderFileAttachment == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("File Attachment entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, orderFileAttachment);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching file attachment entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching file attachment with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}
	
	
	@GET
	@Path("/order/{id:[0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getByOrderID(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String orderId) {
		Response.ResponseBuilder rb = null;
		List<OrderFileAttachment> orderFileAttachment = null;
		try{
			Long entityId = Long.parseLong(orderId);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(OrderFileAttachment.class, OrderFileAttachmentMixIn.class);
			mapper.addMixIn(ProductLine.class, ProductLineMixIn.class);
			mapper.addMixIn(ProductLine.class, PartnerDataStructureMixin.class);//adding partnerDataStructureMixin for data population on attchmnt grid(Krishna varshney)
			mapper.addMixIn(ProductLine.class, ViewMailMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			orderFileAttachment = orderFileAttachmentService.readAllByOrderID(entityId);
			if (orderFileAttachment == null)
				throw new Exception("Unable to find order attachments");
			Map entitiesMap = new HashMap();
			entitiesMap.put("viewmail", orderFileAttachment);
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
	
/*	@GET
	@Path("/download/{id:[0-9]+}")
	@Produces(MediaType.MULTIPART_FORM_DATA)
	public Response getFileByID(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String fileId) {
		OrderFileAttachment orderFileAttachment = null;
		try{
			Long entityId = Long.parseLong(fileId);
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
					.getInstance().getBean("orderFileAttachmentService");
			
			orderFileAttachment = orderFileAttachmentService.read(entityId);
			//orderFileAttachment = orderFileAttachmentService.readFileByID(entityId);
			if (orderFileAttachment == null)
				throw new Exception("Unable to find order attachments");
			//FormDataMultiPart form = new FormDataMultiPart();
			
			InputStream is = orderFileAttachment.getFileData().getBinaryStream();
			byte[] bytes = IOUtils.toByteArray(is);
			String fileName = "\""+orderFileAttachment.getFileName()+"\"";
			//FormDataBodyPart bodyPart = new FormDataBodyPart("file", is, MediaType.APPLICATION_OCTET_STREAM_TYPE);
			

			//bodyPart.setContentDisposition(FormDataContentDisposition.name("file")
              //                                             .fileName(orderFileAttachment.getFileName()).build());
			//form.bodyPart(bodyPart);
			//mapper.writeValue(writer, orderFileAttachment);
			//rb = Response.ok(form,MediaType.MULTIPART_FORM_DATA);
			return Response
		            .ok(bytes, MediaType.APPLICATION_OCTET_STREAM)
		            .header("content-disposition","attachment; filename = \"" + URLEncoder.encode(orderFileAttachment.getFileName(), "utf-8").replace("+", " ")+ "\"")
		            .build();
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		//return rb.build();
	}
*/
	   
	    
	    @PUT
		@Path("/updateattachments")
		public Response updateEntities(@Context UriInfo ui,
				@Context HttpHeaders hh, String data) {
	    	List<Map<String,Object>> jsonData=null;
			Map<String,Object> jsonMap=null;
			Response.ResponseBuilder rb = null;
			try {
				
				ObjectMapper mapper = new ObjectMapper();
				mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
						false);
				// toggle this property value based on your input JSON dataR
				mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
				OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
						.getInstance().getBean("orderFileAttachmentService");
				jsonMap=ApplicationUtils.convertJSONtoObjectMaps(data);
				jsonData=(List<Map<String,Object>>)jsonMap.get("json");
				for(int i=0;i<jsonData.size();i++){
					Map<String,Object> fileAttachment=(Map<String,Object>)jsonData.get(i);
					int id=(int)fileAttachment.get("id");
					OrderFileAttachment fileAttachementObj=orderFileAttachmentService.read((long)id);
					int productLineId = (fileAttachment.get("productLineId")==null?0:(int)fileAttachment.get("productLineId"));
					if(productLineId!=0){
						ProductLine  productLineObj =new ProductLine();
						productLineObj.setId(productLineId);
						fileAttachementObj.setVarProductLine(productLineObj);
					}
					int attachmentId = (fileAttachment.get("id")==null?0:(int)fileAttachment.get("id"));
					if(attachmentId!=0){
						fileAttachementObj.setId(attachmentId);
					}
					int attachmentStatus = (fileAttachment.get("status")==null?0:(int)fileAttachment.get("status"));
					if(attachmentStatus==0)
						fileAttachementObj.setStatus(Integer.toString(attachmentStatus));
					
					String fileContentType = (fileAttachment.get("fileContentType")==null?"":(String)fileAttachment.get("fileContentType"));
					if(!fileContentType.equals("")){ 
						fileAttachementObj.setFileContentType(fileContentType);
					}
					String additionalDataFileKey =(fileAttachment.get("additionalDataFileKey")==null?"":(String)fileAttachment.get("additionalDataFileKey"));
					if(!additionalDataFileKey.equals("")){ 
						fileAttachementObj.setAdditionalDataFileKey(additionalDataFileKey);
					}
					//Changing status before updating above parameters
					if(productLineId!=0 && fileContentType.equals("Disregard")){
						fileAttachementObj.setStatus("7");//In statuscode table Disregard:7
					}
					else if(productLineId==0 && fileContentType.equals("Disregard") ){
						fileAttachementObj.setStatus("7");
					}
					else if(productLineId!=0){
						fileAttachementObj.setStatus("8");//In statuscode table Identified:8
					}
					
					orderFileAttachmentService.update(fileAttachementObj);
				}
				Map entitiesMap = new HashMap();
				StringWriter writer = new StringWriter();
				entitiesMap.put("success", true);
				mapper.writeValue(writer, entitiesMap);
				rb = Response.ok(writer.toString());
				
			} catch (WebApplicationException ex) {
				AppLogger.getSystemLogger().error("Error while Saving attachment", ex);
				throw ex;
			} catch (Exception e) {
				AppLogger.getSystemLogger().error(
						"Error while Saving attachment", e);
				throw new WebApplicationException(Response
						.status(Status.INTERNAL_SERVER_ERROR)
						.entity(ExceptionUtils.getRootCauseMessage(e))
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			return rb.build();
		}
	    
	    
	    
	    @GET
		@Path("/additionalfiles/{orderid}")
	    public Response getOrderFile(@Context UriInfo ui,
	    @Context HttpHeaders hh,@PathParam("orderid") String orderid) {
	    	Long orderFileQueueId = Long.parseLong(orderid);
	    	Response.ResponseBuilder rb = null;
	    	Map entitiesMap = new HashMap();
	    	try {
	    		ObjectMapper mapper = new ObjectMapper();
				StringWriter writer = new StringWriter();
				mapper.addMixIn(OrderFileAttachment.class, AdditionalFilesMixIn.class);
				OrderFileAttachmentService orderFileAttachmentService = (OrderFileAttachmentService) SpringConfig
						.getInstance().getBean("orderFileAttachmentService");
				entitiesMap = orderFileAttachmentService.getAdditionalFilesList(orderFileQueueId);
				if (entitiesMap == null || entitiesMap.isEmpty())
					throw new Exception("Unable to find any data");
				mapper.writeValue(writer, entitiesMap);
				rb = Response.ok(writer.toString());
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new WebApplicationException(Response
						.status(Status.INTERNAL_SERVER_ERROR)
						.entity(ExceptionUtils.getRootCauseMessage(e))
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
	    	
	    	return rb.build();
	    }

	    
	    @GET
		@Path("/download/{filePath : .+}")
		@Produces(MediaType.MULTIPART_FORM_DATA)
		public Response getFileByID(@Context UriInfo ui,
				@Context HttpHeaders hh, @PathParam("filePath") String filePath) {
			OrderFileAttachment orderFileAttachment = null;
			try{
				
				File file = new File(filePath);
				if(!file.exists()){
//					throw new FileNotFoundException("The file is not available at location:\""+filePath+"\".");
					return Response.ok("The file is not available",MediaType.TEXT_PLAIN).build();
				}
					
				String fileName = filePath.substring(filePath.lastIndexOf("/")+1);
				
				
				return Response
			            .ok(file, MediaType.APPLICATION_OCTET_STREAM)
			            .header("content-disposition","attachment; filename = " + fileName)
			            .build();
			} catch (WebApplicationException ex) {
				throw ex;
			} catch (Exception e) {
				e.printStackTrace();
				throw new WebApplicationException(Response
						.status(Status.INTERNAL_SERVER_ERROR)
						.entity(ExceptionUtils.getRootCauseMessage(e))
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			//return rb.build();
		}
	

	    
}
