package com.avery.storage.MixIn;

import java.sql.Date;
import java.util.List;
import java.util.Set;

import com.avery.storage.entities.ProductLine;
import com.avery.storage.entities.SalesOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Vishal
 *
 */
public abstract class RboMixIn {

	@JsonIgnore
	public abstract List<ProductLine> getListProductLine();

	@JsonIgnore
	public abstract List<SalesOrder> getListSalesOrderLine();

	@JsonIgnore
	public abstract String getComment();

	@JsonIgnore
	public abstract String getCreatedBy();

	@JsonIgnore
	public abstract Date getCreatedDate();

	@JsonIgnore
	public abstract String getLastModifiedBy();

	@JsonIgnore
	public abstract Date getLastModifiedDate();

	@JsonIgnore
	public abstract Set<ProductLine> getProductLine();

}
