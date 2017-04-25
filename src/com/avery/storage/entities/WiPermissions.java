package com.avery.storage.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.ws.rs.Path;

import com.avery.storage.MainAbstractEntity;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_permissions")
@Path("wipermissions")
public class WiPermissions extends MainAbstractEntity {

	public WiPermissions() {

	}

	private static final long serialVersionUID = -7583544833630759455L;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wiRoles_id")
	WiRoles varWiRoles;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wiStatus_id")
	WiStatus varWiStatus;
	
	@Column(name="flag", length=10)
	private String flag;
	
	@Column(name="fwd", length=10)
	private String fwd;
	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "wiUser_id")
//	WiUser varWiUser;

	public WiRoles getVarWiRoles() {
		return varWiRoles;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}
	
	public String getFwd() {
		return fwd;
	}

	public void setFwd(String fwd) {
		this.fwd = fwd;
	}

	public void setVarWiRoles(WiRoles varWiRoles) {
		this.varWiRoles = varWiRoles;
	}

//	public WiUser getVarWiUser() {
//		return varWiUser;
//	}
//
//	public void setVarWiUser(WiUser varWiUser) {
//		this.varWiUser = varWiUser;
//	}

	public WiStatus getVarWiStatus() {
		return varWiStatus;
	}

	public void setVarWiStatus(WiStatus varWiStatus) {
		this.varWiStatus = varWiStatus;
	}

}