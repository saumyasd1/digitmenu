package com.avery.shiro;

import java.util.HashSet;
import java.util.Set;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class CustomJDBCRealm extends AuthorizingRealm {

	String actualPassword = "actualp@ssw0rd";
	Set<String> actualRoles = new HashSet<String>();

	{
		actualRoles.add("admin");
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {
		UsernamePasswordToken upToken = (UsernamePasswordToken) token;

		String username = upToken.getUsername();
		checkNotNull(username, "Null usernames are not allowed by this realm.");

		// TODO:: fetch it from database
		String password = new Sha256Hash(actualPassword).toString();
		checkNotNull(password, "No account found for user [" + username + "]");

		return new SimpleAuthenticationInfo(username, password.toCharArray(),
				getName());
	}

	private void checkNotNull(Object reference, String message) {
		if (reference == null) {
			throw new AuthenticationException(message);
		}
	}

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection prins) {
		checkNotNull(prins,
				"PrincipalCollection method argument cannot be null.");

		String username = (String) prins.getPrimaryPrincipal();
		// TODO:: fetch it from database
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(actualRoles);
		// info.setStringPermissions();
		return info;
	}
}
