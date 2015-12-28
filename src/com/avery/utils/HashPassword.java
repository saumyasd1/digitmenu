package com.avery.utils;

import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.util.SimpleByteSource;

/**
 * DEC 25, 2015
 * 
 * @author Amit
 */

public class HashPassword {

	private static final String RANDOM_SALT_VALUE = "Avery";

	public static String simpleSaltedHash(String username, String password) {
		Sha256Hash sha256Hash = new Sha256Hash(password, (new SimpleByteSource(
				RANDOM_SALT_VALUE + username)).getBytes());
		return sha256Hash.toHex();
	}

	public static String simpleHash(String password) {
		Sha256Hash sha256Hash = new Sha256Hash(password);
		return sha256Hash.toHex();
	}

}
