package com.avery.shiro;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.apache.shiro.crypto.hash.Sha256Hash;

public class CustomCredentialsMatcher extends SimpleCredentialsMatcher {

	@Override
	public boolean doCredentialsMatch(AuthenticationToken tok,
			AuthenticationInfo info) {
		String tokenCredentials = charArrayToString(tok.getCredentials());
		String encryptedToken = new Sha256Hash(tokenCredentials).toString();

		String accountCredentials = charArrayToString(info.getCredentials());
		return accountCredentials.equals(encryptedToken);
	}

	private String charArrayToString(Object credentials) {
		return new String((char[]) credentials);
	}
}
