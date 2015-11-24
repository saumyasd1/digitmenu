package com.avery.storage;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.GenericGenerator;
import org.slf4j.Logger;

import com.avery.logging.AppLogger;

@MappedSuperclass
public class MainAbstractEntity extends AbstractEntityImpl {

	private static final long serialVersionUID = 1L;

	public static final transient Logger logger = AppLogger.getSystemLogger();

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	@Column(name = "CreatedDate")
    private Date createdDate;
	
	@Column(name = "CreatedBy")
    private String createdBy;
	
	@Column(name = "LastModifiedDate")
    private Date lastModifiedDate;
	
	public Date getCreatedDate() {
		return createdDate;
	}
	
	@Column(name = "LastModifiedBy")
    private String lastModifiedBy;

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public String getLastModifiedBy() {
		return lastModifiedBy;
	}

	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	

	

	@Override
	public String toString() {
		return this.getClass().getSimpleName() + ":" + getId();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj != null && obj instanceof Entity) {
			Entity e = (Entity) obj;
			if (e.getId() == getId()) {
				return true;
			} else {
				return false;
			}
		} else {
			return super.equals(obj);
		}
	}

	@Override
	public int hashCode() {
		return (int) this.getId();

	}

}
