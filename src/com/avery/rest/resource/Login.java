package com.avery.rest.resource;

import static com.avery.utils.ApplicationConstants.INVALID_PASSWORD;
import static com.avery.utils.ApplicationConstants.INVALID_USER;
import static com.avery.utils.ApplicationConstants.INVALID_USER_PORPASSWORD;
import static com.avery.utils.ApplicationConstants.USER_NOT_ACTIVATED;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import com.avery.app.config.SpringConfig;
import com.avery.storage.MixIn.MenuMixIn;
import com.avery.storage.MixIn.UserMixIn;
import com.avery.storage.entities.Menu;
import com.avery.storage.entities.Role;
import com.avery.storage.entities.Site;
import com.avery.storage.entities.User;
import com.avery.storage.service.RoleService;
import com.avery.storage.service.SiteService;
import com.avery.storage.service.UserService;
import com.avery.utils.HashPassword;
import com.avery.web.jwt.JWTUtils;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * This REST enabled class is used to login in application it take username and
 * password and after authentication from database it generate JWT token. This
 * JWT token is used to authenticate user further subsequent REST calls.
 * 
 * @author Amit Trivedi
 */
@Path("login")
public class Login {

	private static final long token_Expiry_time = 1000 * 60 * 60 * 24 * 30;

	@POST
	@Path("/user")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response logIn(@Context UriInfo ui, @Context HttpHeaders hh,
			String data) throws JsonParseException, JsonMappingException,
			IOException {
		try {
			ObjectMapper mapper = new ObjectMapper();
			HashMap map = mapper.readValue(data, HashMap.class);
			String userName = getValueFromMap(map, "username"), passsord = getValueFromMap(
					map, "password");
			return Response.ok(logIn(userName, passsord, true)).build();
		} catch (Exception e) {
			throw new WebApplicationException(Status.UNAUTHORIZED);
		}
	}

	@POST
	@Path("/user")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response logInForm(@Context UriInfo ui, @Context HttpHeaders hh,
			@FormParam("username") String userName,
			@FormParam("password") String password) throws JsonParseException,
			JsonMappingException, IOException {
		String message = null;
		try {
			if (userName != null && password != null) {
				return Response.ok(logIn(userName, password, false)).build();
			} else {
				throw new Exception(INVALID_USER_PORPASSWORD);
			}
		} catch (Exception e) {
			// Show proper message on GUI when user id or password is wrong.
			if (e.getMessage() != null) {
				message = ((e.getMessage().equals(USER_NOT_ACTIVATED)) ? "{success:false,errors:{reason:'yourAccountIsDeactivatedMsg'}}"
						: "{success:false,errors:{reason:'invalidLoginMessage'}}");
			}
			if (message == null) {
				throw new WebApplicationException(Status.UNAUTHORIZED);
			}
		}
		return Response.ok(message).build();
	}

	public static String logIn(String userName, String password,
			boolean isCallFromExternalApp) throws Exception {
		if (!"".equals(userName) && !"".equals(password)) {
			StringWriter writer = new StringWriter();
			ObjectMapper mapper = new ObjectMapper();
			UserService userService = (UserService) SpringConfig.getInstance()
					.getBean("userService");
			User user = userService.findUserByEmail(userName);
			if (user != null) {
				if (!HashPassword.simpleHash(password).equals(
						user.getPassword()))
					throw new Exception(INVALID_PASSWORD);
				else if (user.getStatus() != 100)
					throw new Exception(USER_NOT_ACTIVATED);
				else {
					mapper.addMixIn(User.class, UserMixIn.class);
					Map<String, Object> responseMap = new HashMap<String, Object>();
					Map<String, Object> claimsMap = new HashMap<String, Object>();
					claimsMap.put("user", user.getEmail());
					claimsMap.put("role", user.getRole());
					responseMap.put("tokenExpiresDays", 30);
					String token = JWTUtils.createJWT(
					String.valueOf(user.getId()), "Avery", "token", token_Expiry_time, claimsMap);
					if (!isCallFromExternalApp) {
						responseMap.put("success", true);
					}
					int userSiteId=user.getSiteId();
					String UserRoleId=user.getRole();
					SiteService siteService= (SiteService) SpringConfig.getInstance().getBean("siteService");
					Site site = siteService.read((long)userSiteId);
					user.setSiteName(site.getName());
					RoleService roleService= (RoleService) SpringConfig.getInstance().getBean("roleService");
					Role role = roleService.read(Long.parseLong(UserRoleId));
					user.setRoleName(role.getRoleName());
					
					responseMap.put("userinfo", user);
					String roleId = user.getRole();
					List<Menu> menuData = userService.getMenuRole(roleId);
					List<Menu> menuList = new ArrayList<Menu>();
					responseMap.put("menuList", menuData);
					
					for (Menu menuRole : menuData) {
						if (menuRole != null) {
							Menu menu = new Menu();
							menu.setId(menuRole.getId());
							menu.setTitle(menuRole.getTitle());
							menu.setImage(menuRole.getImage());
							menu.setXtype(menuRole.getXtype());
							menu.setView(menuRole.getView());
							menu.setSel(menuRole.getSel());
							menuList.add(menu);
							} 
					}

					responseMap.put("menuList", menuList);
					responseMap.put("token", token);
					mapper.addMixIn(Menu.class, MenuMixIn.class);
					mapper.writeValue(writer, responseMap);
					return writer.toString();
				}
			} else
				throw new Exception(INVALID_USER);
		} else {
			throw new Exception(INVALID_USER_PORPASSWORD);
		}
	}

	private String getValueFromMap(Map map, String key) {
		return getValueFromMap(map, key, null);
	}

	private String getValueFromMap(Map map, String key, String defaultValue) {
		defaultValue = (defaultValue == null) ? "" : defaultValue;
		String value = (String) map.get(key);
		return (value != null) ? value : defaultValue;
	}

}
