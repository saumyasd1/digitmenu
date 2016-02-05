package com.avery.storage.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.ws.rs.Path;

import com.avery.storage.MainAbstractEntity;

@Entity
@Table(name = "Size_Chart_Table")
@Path("sizecharttable")
public class SizeChartTable extends MainAbstractEntity {
	
	private static final long serialVersionUID = -8487156716364715527L;
	
	@Column(name = "Size",length = 50)
    private String size;  

	@Column(name = "Size_Page",length = 50)
    private String sizePage;

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getSizePage() {
		return sizePage;
	}

	public void setSizePage(String sizePage) {
		this.sizePage = sizePage;
	} 

}
