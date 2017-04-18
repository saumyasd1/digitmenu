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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.WiUserMixIn;
import com.avery.storage.service.WiUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
@Entity
@Table(name = "wi_user")
@Path("wiusers")
public class WiUser extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1833552362987121156L;
	
	public WiUser() {

	}	

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
	
	@Column(name = "middleName", length = 64)
	private String middleName;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id")
	WiRoles varWiRoles;
	
	@OneToMany(mappedBy = "varWiUser", fetch = FetchType.LAZY)
	private List<WiPermissions> listWiPermissions;
	
	@OneToMany(mappedBy = "varWiUser", fetch = FetchType.LAZY)
	private List<Wi> listWi;
	
	@Transient
	private long roleId;
	
	@Transient
	private String roleName;

	@GET
	@Path("assignee")
	public Response getAssigneeList(@Context UriInfo ui, @Context HttpHeaders hh, @QueryParam("roleId") String roleId){
		Map responseMap = new HashMap();
		Response.ResponseBuilder rb = null;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		mapper.addMixIn(WiUser.class, WiUserMixIn.class);
		try {
			WiUserService wiUserService = (WiUserService) SpringConfig.getInstance().getBean("wiUserService");
			responseMap = wiUserService.getAssigneeList(roleId);
			mapper.writeValue(writer, responseMap);
			rb = Response.ok(writer.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			AppLogger.getSystemLogger().error("Error in loading the data -> ", e);
			e.printStackTrace();
			return Response.ok("There was some problem while loading the data").status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return rb.build();
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	
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

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public WiRoles getVarWiRoles() {
		return varWiRoles;
	}

	public void setVarWiRoles(WiRoles varWiRoles) {
		this.varWiRoles = varWiRoles;
	}

	public List<WiPermissions> getListWiPermissions() {
		return listWiPermissions;
	}

	public void setListWiPermissions(List<WiPermissions> listWiPermissions) {
		this.listWiPermissions = listWiPermissions;
	}
	
	public List<Wi> getListWi() {
		return listWi;
	}

	public void setListWi(List<Wi> listWi) {
		this.listWi = listWi;
	}

	public long getRoleId() {
		return roleId;
	}

	public void setRoleId(long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}
