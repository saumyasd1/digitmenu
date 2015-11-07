package com.avery.web.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.crypto.spec.SecretKeySpec;

public class JWTUtils {

	private static final String passphrase = "averydennison!@#$%^&*()";

	public static String createJWT(String id, String issuer, String subject,
			long ttlMillis, Map<String, Object> claims) {

		// The JWT signature algorithm we will be using to sign the token
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

		long nowMillis = System.currentTimeMillis();
		Date now = new Date(nowMillis);

		// We will sign our JWT with our ApiKey secret
		// byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary();
		byte[] apiKeySecretBytes = passphrase.getBytes();
		Key signingKey = new SecretKeySpec(apiKeySecretBytes,
				signatureAlgorithm.getJcaName());

		// Let's set the JWT Claims
		JwtBuilder builder = Jwts.builder().setClaims(claims).setId(id)
				.setIssuedAt(now).setSubject(subject).setIssuer(issuer)
				.signWith(signatureAlgorithm, signingKey);

		// if it has been specified, let's add the expiration
		if (ttlMillis >= 0) {
			long expMillis = nowMillis + ttlMillis;
			Date exp = new Date(expMillis);
			builder.setExpiration(exp);
		}

		// Builds the JWT and serializes it to a compact, URL-safe string
		return builder.compact();
	}

	public static Claims parseJWT(String jwt) {
		// This line will throw an exception if it is not a signed JWS (as
		// expected)
		return Jwts.parser().setSigningKey(passphrase.getBytes())
				.parseClaimsJws(jwt).getBody();
	}

	public static void main(String[] args) throws Exception {
		String jwt = null;
		Map<String, Object> claimsMap = new HashMap<String, Object>();
		claimsMap.put("user", "ajain");
		claimsMap.put("role", "admin");
		System.out.println(jwt = createJWT("1234", "aman", "test token",
				1000 * 60 * 60, claimsMap));

		Claims claims = parseJWT(jwt);
		System.out.println("ID: " + claims.getId());
		System.out.println("Subject: " + claims.getSubject());
		System.out.println("Issuer: " + claims.getIssuer());
		System.out.println("Expiration: " + claims.getExpiration());
		Set<Entry<String, Object>> entries = claims.entrySet();
		for (Entry<String, Object> entry : entries) {
			System.out.println("Claim --> key:" + entry.getKey() + ", value:"
					+ entry.getValue());
		}
	}
}
