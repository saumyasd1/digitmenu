package com.avery.storage.entities;

/**
 * This class is being used for mapping purpose for the
 * readAllOrgInfoAndOrgName() method of the OrgInfoDaoImpl class
 * 
 * @author Vishal
 *
 */
public class OrgInfoName {

	private int id;

	private int orgCodeId;

	private String orgName;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getOrgCodeId() {
		return orgCodeId;
	}

	public void setOrgCodeId(int orgCodeId) {
		this.orgCodeId = orgCodeId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

}
