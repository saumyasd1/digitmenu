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
	@GenericGenerator(name = "sequence", strategy = "sequence", parameters = {
			@org.hibernate.annotations.Parameter(name = "sequenceName", value = "sequence"),
			@org.hibernate.annotations.Parameter(name = "allocationSize", value = "1"), })
	@GeneratedValue(generator = "sequence", strategy = GenerationType.SEQUENCE)
	@Column(name = "ID")
	private long id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "CREATION_DATE")
	private Date creationDate;

	@Column(name = "LAST_MODIFIED_DATE")
	private Date lastModifiedDate;

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
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
