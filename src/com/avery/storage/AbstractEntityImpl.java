package com.avery.storage;

import javax.persistence.MappedSuperclass;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

/**
 * 29-June-2015
 * 
 * @author aman
 */

@MappedSuperclass
public abstract class AbstractEntityImpl implements Entity {

	private static final long serialVersionUID = -6903153946039055954L;

	@Override
	public Response createEntity(UriInfo ui, HttpHeaders hh, String data) {
		// override in implementor entity class to perform any operation
		throw new WebApplicationException(Status.NOT_FOUND);
	}

	@Override
	public Response deleteEntity(UriInfo ui, HttpHeaders hh, String id) {
		// override in implementor entity class to perform any operation
		throw new WebApplicationException(Status.NOT_FOUND);
	}

	@Override
	public Response deleteEntities(UriInfo ui, HttpHeaders hh) {
		// override in implementor entity class to perform any operation
		throw new WebApplicationException(Status.NOT_FOUND);
	}

	@Override
	public Response getEntity(UriInfo ui, HttpHeaders hh, String id) {
		// override in implementor entity class to perform any operation
		throw new WebApplicationException(Status.NOT_FOUND);
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		// override in implementor entity class to perform any operation
		throw new WebApplicationException(Status.NOT_FOUND);
	}

	@Override
	public Response updateEntity(UriInfo ui, HttpHeaders hh, String id,
			String data) {
		// override in implementor entity class to perform any operation
		throw new WebApplicationException(Status.NOT_FOUND);
	}

	@Override
	public Response saveOrUpdateEntity(UriInfo ui, HttpHeaders hh, String id,
			String data) {
		// override in implementor entity class to perform any operation
		throw new WebApplicationException(Status.NOT_FOUND);
	}

	@Override
	public void preCreateOp() {
		// override in implementor entity class to perform any operation before
		// creating this entity
	}

	@Override
	public void preUpdateOp() {
		// override in implementor entity class to perform any operation before
		// updating this entity
	}

	@Override
	public void preDeleteOp() {
		// override in implementor entity class to perform any operation before
		// deleting this entity
	}

	@Override
	public void postCreateOp() {
		// override in implementor entity class to perform any operation after
		// creating this entity
	}

	@Override
	public void postUpdateOp() {
		// override in implementor entity class to perform any operation after
		// updating this entity
	}

	@Override
	public void postDeleteOp() {
		// override in implementor entity class to perform any operation after
		// deleting this entity
	}

	@Override
	public long getId() {
		return 0;
	}

	@Override
	public void setId(long id) {

	}

}
