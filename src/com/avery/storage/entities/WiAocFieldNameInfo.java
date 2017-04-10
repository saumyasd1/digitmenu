package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
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
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.WiAocFieldNameInfoMixIn;
import com.avery.storage.service.WiAocFieldNameInfoService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Entity
@Table(name = "wi_aocfieldinfo")
@Path("wiaocfieldinfo")
public class WiAocFieldNameInfo extends MainAbstractEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "aocFieldName", length = 250)
	private String aocFieldName;

	@OneToMany(mappedBy = "varWiAocFieldNameInfo", fetch = FetchType.LAZY)
	private List<WiAocField> listWiAocField;

	public String getAocFieldName() {
		return aocFieldName;
	}

	public void setAocFieldName(String aocFieldName) {
		this.aocFieldName = aocFieldName;
	}

	public List<WiAocField> getListWiAocField() {
		return listWiAocField;
	}

	public void setListWiAocField(List<WiAocField> listWiAocField) {
		this.listWiAocField = listWiAocField;
	}

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		List<WiAocFieldNameInfo> wiAocFieldNameInfo = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.addMixIn(WiAocFieldNameInfo.class, WiAocFieldNameInfoMixIn.class);
			WiAocFieldNameInfoService wiAocFieldNameInfoService = (WiAocFieldNameInfoService) SpringConfig.getInstance()
					.getBean("wiAocFieldNameInfoService");
			wiAocFieldNameInfo = wiAocFieldNameInfoService.readAll();
			mapper.writeValue(writer, wiAocFieldNameInfo);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			throw ex;
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e)).type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();
	}

}
