package com.example.villageTransport.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import com.example.villageTransport.entity.User;

import com.example.villageTransport.repository.UserRepository;

@Service
public class UserDetailsServiceImpl
        implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(

            String phone

    ) throws UsernameNotFoundException {

        User user = userRepository

                .findByPhone(phone)

                .orElseThrow(() ->

                        new UsernameNotFoundException(

                                "User not found"
                        )
                );

        return new org.springframework.security.core.userdetails.User(

                user.getPhone(),

                user.getPassword(),

                List.of(

                        new SimpleGrantedAuthority(

                                "ROLE_" + user.getRole()
                        )
                )
        );
    }
}