package com.example.villageTransport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.stereotype.Service;

import com.example.villageTransport.entity.User;

import com.example.villageTransport.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /* REGISTER USER */

    public User registerUser(User user) {

        /* ENCRYPT PASSWORD */

        user.setPassword(

                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return userRepository.save(user);
    }

    /* GET ALL USERS */

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    /* LOGIN USER */

//   
    public User loginUser(
            String phone,
            String password
    ) {

        System.out.println("PHONE: " + phone);

        User user = userRepository

                .findByPhone(phone)

                .orElseThrow(() ->

                        new RuntimeException(
                                "User not found"
                        )
                );

        System.out.println(
                "DB PASSWORD = "
                        + user.getPassword()
        );

        System.out.println(
                "ENTERED PASSWORD = "
                        + password
        );

        boolean matches =
                passwordEncoder.matches(

                        password,

                        user.getPassword()
                );

        System.out.println(
                "PASSWORD MATCH = "
                        + matches
        );

        if (!matches) {

            throw new RuntimeException(
                    "Invalid Password"
            );
        }

        return user;
    }
    public User getProfile(

    		String name

    		) {

    		return userRepository

    		.findByName(

    		name
    		)

    		.orElseThrow(

    		() -> new RuntimeException(

    		"User Not Found"
    		)

    		);

    		}
    public User updateProfile(

    		Long id,

    		User updatedUser

    		){

    		User user = userRepository

    		.findById(id)

    		.orElseThrow(

    		()-> new RuntimeException(

    		"User Not Found"

    		));

    		user.setName(

    		updatedUser.getName()

    		);

    		user.setPhone(

    		updatedUser.getPhone()

    		);

    		user.setVehicleName(

    		updatedUser.getVehicleName()

    		);

    		user.setVehicleNumber(

    		updatedUser.getVehicleNumber()

    		);

    		user.setDrivingLicense(

    		updatedUser.getDrivingLicense()

    		);

    		/* IMPORTANT */

    		user.setProfilePhoto(

    		updatedUser.getProfilePhoto()

    		);

    		return userRepository.save(

    		user

    		);

    		}
    public User verifyDriver(

    		Long id

    		){

    		User driver = userRepository

    		.findById(id)

    		.orElseThrow(

    		()-> new RuntimeException(

    		"Driver Not Found"

    		));

    		driver.setVerified(

    		true

    		);

    		return userRepository.save(

    		driver

    		);

    		}
}