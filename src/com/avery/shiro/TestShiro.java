package com.avery.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

public class TestShiro {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		IniSecurityManagerFactory factory = new IniSecurityManagerFactory(
				"classpath:shiro.ini");
		SecurityUtils.setSecurityManager(factory.createInstance());
		Subject currentUser = SecurityUtils.getSubject();
		try {
			if (!currentUser.isAuthenticated()) {
				UsernamePasswordToken token = new UsernamePasswordToken(
						"admin", "actualp@ssw0rd");
				currentUser.login(token);
			}
		} catch (UnknownAccountException uae) {
			uae.printStackTrace();
		} catch (AuthenticationException ae) {
			ae.printStackTrace();
		}

		System.out.println("Authenticated :: " + currentUser.isAuthenticated());
		System.out.println("Admin Role :: " + currentUser.hasRole("admin"));
		Session session = currentUser.getSession();
		System.out.println(session.getId().toString());
	}

}
