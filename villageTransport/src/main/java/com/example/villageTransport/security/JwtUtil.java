package com.example.villageTransport.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
import java.util.Date;

@Component
public class JwtUtil {

	private final String SECRET_KEY =
	        "village_transport_secret_key_12345678901234567890";
    /* GENERATE TOKEN */

	public String generateToken(
	        String phone,
	        String role
	) {

	    return Jwts.builder()

	            .setSubject(phone)

	            .claim("role", role)

	            .setIssuedAt(new Date())

	            .setExpiration(

	                    new Date(
	                            System.currentTimeMillis()
	                                    + 1000 * 60 * 60 * 10
	                    )
	            )

	            .signWith(

	                    Keys.hmacShaKeyFor(
	                            SECRET_KEY.getBytes()
	                    ),

	                    SignatureAlgorithm.HS256
	            )

	            .compact();
	}

    /* EXTRACT USERNAME */

    public String extractPhone(String token) {

        return extractClaims(token)
                .getSubject();
    }

    /* VALIDATE TOKEN */

    public boolean validateToken(
            String token,
            String phone
    ) {

        final String extractedPhone =
                extractPhone(token);

        return extractedPhone.equals(phone)
                && !isTokenExpired(token);
    }

    /* CHECK EXPIRATION */

    private boolean isTokenExpired(String token) {

        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

    /* EXTRACT CLAIMS */

    private Claims extractClaims(String token) {

    	return Jwts.parserBuilder()

    	        .setSigningKey(SECRET_KEY.getBytes())

    	        .build()

    	        .parseClaimsJws(token)

    	        .getBody();
    }
    public String getSecretKey() {

        return SECRET_KEY;
    }
}