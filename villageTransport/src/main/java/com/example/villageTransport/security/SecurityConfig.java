package com.example.villageTransport.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;

import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

//    @Bean
//    public SecurityFilterChain securityFilterChain(
//
//            HttpSecurity http
//
//    ) throws Exception {
//
//        http
//
//                .cors(cors -> {})
//
//                .csrf(csrf -> csrf.disable())
//
//                .formLogin(form -> form.disable())
//
//                .httpBasic(basic -> basic.disable())
//
//                .authorizeHttpRequests(auth -> auth
//
//                        /* PUBLIC */
//
//                        .requestMatchers(
//                                "/api/users/**"
//                        ).permitAll()
//
//                        /* RIDES */
//
//                        .requestMatchers(
//                                HttpMethod.GET,
//                                "/api/rides/**"
//                        ).authenticated()
//
//                        .requestMatchers(
//                                HttpMethod.POST,
//                                "/api/rides/**"
//                        ).hasRole("DRIVER")
//
//                        .requestMatchers(
//                                HttpMethod.PUT,
//                                "/api/rides/**"
//                        ).hasRole("DRIVER")
//
//                        .requestMatchers(
//                                HttpMethod.DELETE,
//                                "/api/rides/**"
//                        ).hasRole("DRIVER")
//
//                        /* BOOKINGS */
//
//                        .requestMatchers(
//                                "/api/bookings/**"
//                        ).hasRole("PASSENGER")
//
//                        /* REVIEWS */
//
//                        .requestMatchers(
//                                "/api/reviews/**"
//                        ).authenticated()
//
//                        .anyRequest()
//
//                        .authenticated()
//                )
//
//                .sessionManagement(session ->
//
//                        session.sessionCreationPolicy(
//
//                                SessionCreationPolicy.STATELESS
//                        )
//                );
//
//        http.addFilterBefore(
//
//                jwtFilter,
//
//                UsernamePasswordAuthenticationFilter.class
//        );
//
//        return http.build();
//    }
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/users/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/rides/**"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/rides/**"
                        ).hasRole("DRIVER")

                        .requestMatchers(

                                HttpMethod.POST,

                                "/api/bookings/**"

                        ).hasRole("PASSENGER")

                        .requestMatchers(

                                HttpMethod.GET,

                                "/api/bookings/**"

                        ).hasAnyRole(

                                "DRIVER",

                                "PASSENGER"
                        )
                        .requestMatchers(
                                "/api/reviews/**"
                        ).authenticated()

                        .anyRequest()

                        .authenticated()
                )

                .sessionManagement(session -> session

                        .sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                );

        http.addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//
//        CorsConfiguration configuration =
//
//                new CorsConfiguration();
//
//        configuration.setAllowedOrigins(
//
//                List.of(
//                        "http://localhost:3000"
//                )
//        );
//
//        configuration.setAllowedMethods(
//
//                List.of(
//
//                        "GET",
//
//                        "POST",
//
//                        "PUT",
//
//                        "DELETE",
//
//                        "OPTIONS"
//                )
//        );
//
//        configuration.setAllowedHeaders(
//
//                List.of(
//
//                        "Authorization",
//
//                        "Content-Type",
//
//                        "*"
//                )
//        );
//
//        configuration.setAllowCredentials(
//                true
//        );
//
//        UrlBasedCorsConfigurationSource source =
//
//                new UrlBasedCorsConfigurationSource();
//
//        source.registerCorsConfiguration(
//
//                "/**",
//
//                configuration
//        );
//
//        return source;
//    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =

                new CorsConfiguration();

        configuration.setAllowedOriginPatterns(

                List.of("*")
        );

        configuration.setAllowedMethods(

                List.of(

                        "GET",

                        "POST",

                        "PUT",

                        "DELETE",

                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(

                List.of("*")
        );

        configuration.setExposedHeaders(

                List.of("*")
        );

        configuration.setAllowCredentials(

                true
        );

        UrlBasedCorsConfigurationSource source =

                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(

                "/**",

                configuration
        );

        return source;
    }
}

