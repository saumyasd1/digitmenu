package com.avery.storage.entities;

import static com.avery.utils.ApplicationConstants.ID;
import static com.avery.utils.ApplicationConstants.PASSWORD;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.glassfish.jersey.media.multipart.FormDataParam;

import com.avery.app.config.PropertiesConfig;
import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.UserMixIn;
import com.avery.storage.service.SystemCsrCodeService;
import com.avery.storage.service.UserService;
import com.avery.utils.HashPassword;
import com.avery.utils.PropertiesConstants;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "user")
@Path("users")
public class User extends MainAbstractEntity {

	/**
	 * @author Saumya
	 */
	private static final long serialVersionUID = 1833552362987121156L;

	@Column(name = "comment", length = 250)
	private String comment;
	@Column(name = "firstName", length = 64)
	private String firstName;
	@Column(name = "lastName", length = 64)
	private String lastName;
	@Column(name = "email", length = 255)
	private String email;
	@Column(name = "gender", length = 6)
	private String gender;
	@Column(name = "jobTitle", length = 64)
	private String jobTitle;
	@Column(name = "password", length = 255)
	private String password;
	@Column(name = "role", length = 20)
	private String role;
	@Column(name = "siteId")
	Integer siteId;
	@Column(name = "status")
	Integer status;
	@Column(name = "middleName", length = 64)
	private String middleName;

	@Transient
	private String csrCodeOwnerName;

	@Transient
	private String csrNonCodeOwnerName;

	@Transient
	private String siteName;

	@Transient
	private String roleName;

	public User() {
	}

	public User(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	@Column(name = "fileName", length = 100)
	private String fileName;
	@Column(name = "filePath")
	private String filePath;

	@Column(name = "systemCsrCodeOwner", length = 150)
	private String systemCsrCodeOwner;

	@Column(name = "systemCsrNonCodeOwner", length = 150)
	private String systemCsrNonCodeOwner;

	@OneToMany(mappedBy = "varUser", fetch = FetchType.LAZY)
	private List<SystemCsrCode> varSystemCsrCode;
	
	/* Business Logic Starts */

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<?, ?> entitiesMap = new HashMap();
		List<User> userList = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap = ui.getQueryParameters();
			mapper.addMixIn(User.class, UserMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			Map responseMap = new HashMap();
			entitiesMap = userService.readWithCriteria(queryParamMap);
			if (entitiesMap == null || entitiesMap.isEmpty())
				throw new Exception("Unable to find partners");
			else {
				List listofPL = (List) entitiesMap.get("users");
				List listOfPR = new LinkedList<Partner>();
				for (int i = 0; i < listofPL.size(); i++) {
					User currentuser = (User) listofPL.get(i);
					String lastmodifiedUserId = currentuser.getLastModifiedBy();
					if (lastmodifiedUserId != null) {
						String LastModifiedByName = userService.getUsernameById(lastmodifiedUserId);
						currentuser.setLastModifiedBy(LastModifiedByName);
					}
					listOfPR.add(currentuser);
				}
				// Collections.sort(listOfPR, userIdComparator);
				responseMap.put("users", listOfPR);
			}
			if (entitiesMap.containsKey("totalCount"))
				responseMap.put("totalCount", entitiesMap.get("totalCount"));
			mapper.writeValue(writer, responseMap);

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
		Long id = 0L;
		Map<String, Object> responseMap = new HashMap<String, Object>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			User user = mapper.readValue(data, User.class);
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			SystemCsrCodeService systemCsrCodeService = (SystemCsrCodeService) SpringConfig.getInstance()
					.getBean("systemCsrCodeService");
			boolean userExist = userService.checkDuplicateUser(user);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			if (userExist) {
				responseMap.put("valueExist", true);
				mapper.writeValue(writer, responseMap);
			} else {
				user.setPassword(com.avery.utils.HashPassword.simpleHash(user.getPassword()));
				user.setCreatedDate(new Date());
				user.setLastModifiedDate(new Date());
				user.setStatus(100);
				id = userService.create(user);
				String systemCsrCodeOwner = user.getSystemCsrCodeOwner();
				systemCsrCodeService.updateOwnerStatus(systemCsrCodeOwner, "", id.toString());
				responseMap.put("valueExist", false);
				responseMap.put("id", id);
				mapper.writeValue(writer, responseMap);
			}
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
		Map<String, Object> responseMap = new HashMap<String, Object>();
		String[] str = data.replace("{", "").replace("}", "").split(",");
		String userId = "";
		for (String tmp : str) {
			if (tmp.contains("userId")) {
				String[] tmp1 = tmp.split(":");
				userId = tmp1[1];
			}
		}
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
			mapper.addMixIn(User.class, UserMixIn.class);
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			SystemCsrCodeService systemCsrCodeService = (SystemCsrCodeService) SpringConfig.getInstance()
					.getBean("systemCsrCodeService");
			User user = userService.read(Long.parseLong(id));
			String oldSystemCsrCodeOwner = user.getSystemCsrCodeOwner();
			String password = user.getPassword();
			Date createdDate = user.getCreatedDate();
			ObjectReader updater = mapper.readerForUpdating(user);
			user = updater.readValue(data);
			if (user == null) {
				throw new WebApplicationException(
						Response.status(Status.BAD_REQUEST).entity("User entity with id \"" + id + "\" doesn't exist")
								.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			boolean userExist = userService.checkDuplicateUser(user);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			if (userExist) {
				responseMap.put("valueExist", true);
				mapper.writeValue(writer, responseMap);
			} else {
				if (user.getPassword() != null && !user.getPassword().equals("")
						&& !user.getPassword().equals(password))
					user.setPassword(HashPassword.simpleHash(user.getPassword()));
				else {
					user.setPassword(password);
				}
				user.setLastModifiedDate(new Date());
				user.setCreatedDate(createdDate);
				user.setLastModifiedBy(userId);
				userService.update(user);
				String systemCsrCodeOwner = user.getSystemCsrCodeOwner();
				systemCsrCodeService.updateOwnerStatus(systemCsrCodeOwner, oldSystemCsrCodeOwner, id);
				responseMap.put("valueExist", false);
				responseMap.put("user", user);
				mapper.writeValue(writer, responseMap);
			}
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in updating user entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in updating user entity with id " + id, e);
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
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			User user = userService.read(entityId);
			if (user == null)
				throw new WebApplicationException(
						Response.status(Status.BAD_REQUEST).entity("User entity with id \"" + id + "\" doesn't exist")
								.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, user);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in fetching user entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in fetching user entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

	@Override
	public Response deleteEntity(UriInfo ui, HttpHeaders hh, String id) {
		try {
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			// read existing entity from database
			User user = userService.read(Long.parseLong(id));
			if (user == null) {
				throw new WebApplicationException(
						Response.status(Status.BAD_REQUEST).entity("User entity with id \"" + id + "\" doesn't exist")
								.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			// prepare response
			userService.delete(user);
			return Response.ok(id).build();
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error("Error in deleting User entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error("Error in deleting User entity with id " + id, e);
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	@GET
	@Path("/checkcurrentpassword/{id: [0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response CheckUserPassword(@Context UriInfo ui, @Context HttpHeaders hh,
			@QueryParam(PASSWORD) String password, @PathParam(ID) String id) {
		try {
			Long _id = Long.parseLong(id);
			password = (password == null) ? "" : password;
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			User user = userService.read(_id);
			if (user != null && (HashPassword.simpleHash(password).equals(user.getPassword()))) {
				return Response.ok("{\"success\":true,\"passwordmatch\":true}").build();
			} else {
				return Response.ok("{\"success\":true,\"passwordmatch\":false}").build();
			}
		} catch (WebApplicationException aep) {
			throw aep;
		} catch (Exception e) {
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
	}

	// Getting list of all users
	@GET
	@Path("/csrlist")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCSRList(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("siteId") int siteId,
			@QueryParam("roleId") int roleId) {
		Response.ResponseBuilder rb = null;
		List<User> csrList = null;
		try {
			List<User> actualCsrList = new ArrayList<User>();
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
//			mapper.addMixIn(User.class, UserMixIn.class);
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			csrList = userService.getSortedList(siteId, roleId);
			if (csrList == null || csrList.isEmpty())
				throw new Exception("Unable to find csr");
			SystemCsrCodeService systemCsrCodeService = (SystemCsrCodeService) SpringConfig.getInstance()
					.getBean("systemCsrCodeService");
			for (User user : csrList) {
				int i = 0;
				String csrCodeOwner = user.getSystemCsrCodeOwner();
				if (csrCodeOwner != null) {
					String csrCode = systemCsrCodeService.getSystemcsrcodeById(csrCodeOwner);
					if (csrCode != null && csrCode != "") {
						String[] csrCodeOwnerList = csrCode.split(",");
						String[] csrCodeOwnerIdList = csrCodeOwner.split(",");
						for (String csrCodeOwnerName : csrCodeOwnerList) {
							User userModified = new User();
							userModified.setId(user.getId());
							userModified.setFirstName(user.getFirstName());
							userModified.setLastName(user.getLastName());
							userModified.setMiddleName(user.getMiddleName());
							userModified.setSystemCsrCodeOwner(csrCodeOwnerIdList[i]);
							userModified.setcsrCodeOwnerName(csrCodeOwnerName);
							actualCsrList.add(userModified);
							i++;
						}
					} else {
						actualCsrList.add(user);
					}
				} else {
					actualCsrList.add(user);
				}

			}
			mapper.writeValue(writer, actualCsrList);
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
	@Path("/globaltimezone")
	public Response getApplicationDefaultTimeZone(@Context UriInfo ui, @Context HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		String timeZone;
		Map responseMap = new HashMap();
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			timeZone = userService.getApplicationDefaultTimeZone();
			if (timeZone == null | "".equals(timeZone))
				timeZone = TimeZone.getDefault().getID();
			responseMap.put("timeZone", timeZone);
			mapper.writeValue(writer, responseMap);
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

	public static Comparator<User> userIdComparator = new Comparator<User>() {
		@Override
		public int compare(User user1, User user2) {
			return (int) (user1.getId() - user2.getId());
		}
	};

	@POST
	@Path("/pictureupload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response savepicture(@FormDataParam("fileName") String picname, @FormDataParam("file") InputStream userimage,
			@FormDataParam("roleId") int roleId, @FormDataParam("userId") String userId) throws Exception {
		Response.ResponseBuilder rb = null;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		Map<String, String> responseMap = new HashMap<String, String>();
		String uploadDir = PropertiesConfig.getString(PropertiesConstants.PIC_PATH);
		if (roleId == 1)
			uploadDir = uploadDir + "/1";
		if (roleId == 2)
			uploadDir = uploadDir + "/2";
		if (roleId == 3)
			uploadDir = uploadDir + "/3";
		uploadDir = uploadDir + "/" + userId;
		String extens = picname.substring(picname.lastIndexOf("."), picname.length());
		String filename = userId + extens;
		try {
			// to store image in file
			File targetFile = new File(uploadDir, filename);
			if (targetFile.exists()) {
				targetFile.delete();
			}
			FileUtils.copyInputStreamToFile(userimage, targetFile);
			// to store fileName and filePath in DB
			UserService userService = (UserService) SpringConfig.getInstance().getBean("userService");
			User user = userService.read(Long.parseLong(userId));
			user.setFileName(filename);
			user.setFilePath(uploadDir);
			userService.update(user);
			responseMap.put("upload", "Successful");
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (IOException e) {
			responseMap.put("upload", "Unsuccessful");
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		}
		return rb.build();
	}

	/* Business Logic Ends */

	// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileName() {
		return fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getSystemCsrCodeOwner() {
		return systemCsrCodeOwner;
	}

	public void setSystemCsrCodeOwner(String systemCsrCodeOwner) {
		this.systemCsrCodeOwner = systemCsrCodeOwner;
	}

	public String getSystemCsrNonCodeOwner() {
		return systemCsrNonCodeOwner;
	}

	public void setSystemCsrNonCodeOwner(String systemCsrNonCodeOwner) {
		this.systemCsrNonCodeOwner = systemCsrNonCodeOwner;
	}

	public void setcsrCodeOwnerName(String csrCodeOwnerName) {
		this.csrCodeOwnerName = csrCodeOwnerName;
	}

	public String getcsrCodeOwnerName() {
		return csrCodeOwnerName;
	}

	public void setcsrNonCodeOwnerName(String csrNonCodeOwnerName) {
		this.csrNonCodeOwnerName = csrNonCodeOwnerName;
	}

	public String getcsrNonCodeOwnerName() {
		return csrNonCodeOwnerName;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public List<SystemCsrCode> getVarSystemCsrCode() {
		return varSystemCsrCode;
	}

	public void setVarSystemCsrCode(List<SystemCsrCode> varSystemCsrCode) {
		this.varSystemCsrCode = varSystemCsrCode;
	}
	
}
