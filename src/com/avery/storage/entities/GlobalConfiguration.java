package com.avery.storage.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "globalconfiguration")
public class GlobalConfiguration {

	/**
	 * 
	 */
	private static final long serialVersionUID = 322002883506576261L;

	public GlobalConfiguration() {

	}

	public GlobalConfiguration(String orderDuration, String unidentifiedOrderMailCSRMailID) {
		this.unidentifiedOrderMailCSRMailID = unidentifiedOrderMailCSRMailID;
		this.orderDuration = orderDuration;

	}

	int id;

	String unidentifiedOrderMailCSRMailID;
	String prevOrderQueueId;
	String orderDuration;
	String duplicateOrderField;
	String duplicateOrderDuration;
	String defaultTimeZone;
	String maxSOLine;
	String TimeZoneOffset;

	@Id
	@GeneratedValue
	@Column(name = "id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "unidentifiedOrderMailCSRMailID", length = 100)
	public String getUnidentifiedOrderMailCSRMailID() {
		return unidentifiedOrderMailCSRMailID;
	}

	public void setUnidentifiedOrderMailCSRMailID(String unidentifiedOrderMailCSRMailID) {
		this.unidentifiedOrderMailCSRMailID = unidentifiedOrderMailCSRMailID;
	}

	@Column(name = "prevOrderQueueId", length = 100)
	public String getPrevOrderQueueId() {
		return prevOrderQueueId;
	}

	public void setPrevOrderQueueId(String prevOrderQueueId) {
		this.prevOrderQueueId = prevOrderQueueId;
	}

	@Column(name = "orderDuration", length = 100)
	public String getOrderDuration() {
		return orderDuration;
	}

	public void setOrderDuration(String orderDuration) {
		this.orderDuration = orderDuration;
	}

	@Column(name = "duplicateOrderField", length = 100)
	public String getDuplicateOrderField() {
		return duplicateOrderField;
	}

	public void setDuplicateOrderField(String duplicateOrderField) {
		this.duplicateOrderField = duplicateOrderField;
	}

	@Column(name = "duplicateOrderDuration", length = 100)
	public String getDuplicateOrderDuration() {
		return duplicateOrderDuration;
	}

	public void setDuplicateOrderDuration(String duplicateOrderDuration) {
		this.duplicateOrderDuration = duplicateOrderDuration;
	}

	@Column(name = "defaultTimeZone", length = 100)
	public String getDefaultTimeZone() {
		return defaultTimeZone;
	}

	public void setDefaultTimeZone(String defaultTimeZone) {
		this.defaultTimeZone = defaultTimeZone;
	}

	@Column(name = "maxSOLine", length = 100)
	public String getMaxSOLine() {
		return maxSOLine;
	}

	public void setMaxSOLine(String maxSOLine) {
		this.maxSOLine = maxSOLine;
	}

	@Column(name = "TimeZoneOffset", length = 100)
	public String getTimeZoneOffset() {
		return TimeZoneOffset;
	}

	public void setTimeZoneOffset(String timeZoneOffset) {
		TimeZoneOffset = timeZoneOffset;
	}

}
