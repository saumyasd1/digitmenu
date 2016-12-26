package com.avery.storage.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.ws.rs.Path;

import com.avery.storage.MainAbstractEntity;

@Entity
@Table(name = "errordescription")
@Path("errorDescription")
public class ErrorDescription extends MainAbstractEntity{
	

	private static final long serialVersionUID = -8487156716364715527L;
	
	@Column(name = "ErrorDescription",length = 100)
    private String errorDescription;  
	
	@Column(name = "ErrorCategory",length = 100)
    private String errorCategory;  

	@Column(name = "ErrorCode")
    private int errorCode; 
	
	public String getErrorDescription() {
		return errorDescription;
	}

	public void setErrorDescription(String errorDescription) {
		this.errorDescription = errorDescription;
	}

	public String getErrorCategory() {
		return errorCategory;
	}

	public void setErrorCategory(String errorCategory) {
		this.errorCategory = errorCategory;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	

}
