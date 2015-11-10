package com.avery.storage.entities;

import java.io.StringWriter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.service.PersonService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;

@Entity
@Table(name = "PERSON")
@Path("persons")
public class Person extends MainAbstractEntity {

	private static final long serialVersionUID = -8487156716364715527L;

	private String name;
	private String email;
	private String phone;
	@Column(name = "ADDRESS")
	private String addr;

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Person [id=" + getId() + ", name=" + name + ", email=" + email
				+ "]";
	}

	@Override
	public Response getEntity(UriInfo ui, HttpHeaders hh, String id) {
		Response.ResponseBuilder rb = null;
		try {
			Long entityId = Long.parseLong(id);
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			PersonService personService = (PersonService) SpringConfig
					.getInstance().getBean("personService");
			Person person = personService.read(entityId);
			if (person == null)
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Person entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			mapper.writeValue(writer, person);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching person entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching person entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

	@Override
	public Response updateEntity(UriInfo ui, HttpHeaders hh, String id,
			String data) {
		Response.ResponseBuilder rb = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			StringWriter writer = new StringWriter();
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);
			// toggle this property value based on your input JSON data
			mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, true);
			PersonService personService = (PersonService) SpringConfig
					.getInstance().getBean("personService");
			// read existing entity from database
			Person person = personService.read(Long.parseLong(id));
			if (person == null) {
				throw new WebApplicationException(Response
						.status(Status.BAD_REQUEST)
						.entity("Person entity with id \"" + id
								+ "\" doesn't exist")
						.type(MediaType.TEXT_PLAIN_TYPE).build());
			}
			ObjectReader updater = mapper.readerForUpdating(person);
			// build updated entity object from input data
			person = updater.readValue(data);
			// update entity in database
			personService.update(person);
			// prepare response
			mapper.writeValue(writer, person);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in updating person entity with id " + id, ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in updating person entity with id " + id, e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

}
