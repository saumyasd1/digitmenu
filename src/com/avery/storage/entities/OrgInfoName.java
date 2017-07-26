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

	private String name;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
