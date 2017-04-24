package com.avery.storage.entities;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.avery.app.config.SpringConfig;
import com.avery.logging.AppLogger;
import com.avery.storage.MainAbstractEntity;
import com.avery.storage.MixIn.MenuMixIn;
import com.avery.storage.service.MenuService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * @author Saumya
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "menumaster")
@Path("menu")
public class Menu extends MainAbstractEntity {

	@Column(name = "title", length = 45)
	private String title;
	@Column(name = "image", length = 45)
	private String image;
	@Column(name = "xtype", length = 45)
	private String xtype;
	@Column(name = "sel", length = 45)
	private String sel;
	@Column(name = "view", length = 45)
	private String view;

	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "menu", fetch = FetchType.LAZY)
	List<MenuRole> listMenuRoles = new ArrayList<MenuRole>();

	/* Business Logic Starts */

	@Override
	public Response getEntities(UriInfo ui, HttpHeaders hh) {
		Response.ResponseBuilder rb = null;
		Map<?, ?> entitiesMap = null;
		try {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			MultivaluedMap<String, String> queryParamMap = ui
					.getQueryParameters();
			mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
			mapper.addMixIn(Menu.class, MenuMixIn.class);
			MenuService MenuService = (MenuService) SpringConfig.getInstance()
					.getBean("MenuService");
			entitiesMap = MenuService.readWithCriteria(queryParamMap);
			if (entitiesMap == null)
				throw new Exception("Unable to find order configuration");
			mapper.writeValue(writer, entitiesMap);
			rb = Response.ok(writer.toString());
		} catch (WebApplicationException ex) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order configuration ", ex);
			throw ex;
		} catch (Exception e) {
			AppLogger.getSystemLogger().error(
					"Error in fetching order configuration ", e);
			throw new WebApplicationException(Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ExceptionUtils.getRootCauseMessage(e))
					.type(MediaType.TEXT_PLAIN_TYPE).build());
		}
		return rb.build();

	}

	/* Business Logic Ends */

	// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public String getTitle() {
		return title;
	}

	public List<MenuRole> getListMenuRoles() {
		return listMenuRoles;
	}

	public void setListMenuRoles(List<MenuRole> listMenuRoles) {
		this.listMenuRoles = listMenuRoles;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getXtype() {
		return xtype;
	}

	public void setXtype(String xtype) {
		this.xtype = xtype;
	}

	public String getSel() {
		return sel;
	}

	public void setSel(String sel) {
		this.sel = sel;
	}

	public String getView() {
		return view;
	}

	public void setView(String view) {
		this.view = view;
	}

}
