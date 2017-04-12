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
@Table(name = "wi_files")
@Path("wifiles")
public class WiFiles extends MainAbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WiFiles() {

	}

	@Column(name = "filePath", length = 500)
	private String filePath;

	@Column(name = "fileName", length = 100)
	private String fileName;
	
	@Column(name = "fileType", length = 100)
	private String fileType;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wi_id")
	Wi varWi;

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Wi getVarWi() {
		return varWi;
	}

	public void setVarWi(Wi varWi) {
		this.varWi = varWi;
	}
	
	
	
}
