package com.avery.storage;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 * 29-June-2015
 * 
 * @author aman
 */
public interface RESTResourceProcessor {

	@GET
	@Path("/{id: [0-9]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEntity(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("id") String id);

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEntities(@Context UriInfo ui, @Context HttpHeaders hh);

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createEntity(@Context UriInfo ui, @Context HttpHeaders hh,
			String data);

	@PUT
	@Path("/{id: [0-9]+}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateEntity(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("id") String id, String data);

	@POST
	@Path("/{id: [0-9]+}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response saveOrUpdateEntity(@Context UriInfo ui,
			@Context HttpHeaders hh, @PathParam("id") String id, String data);

	@DELETE
	@Path("/{id: [0-9]+}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteEntity(@Context UriInfo ui, @Context HttpHeaders hh,
			@PathParam("id") String id);

	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteEntities(@Context UriInfo ui, @Context HttpHeaders hh);
}
