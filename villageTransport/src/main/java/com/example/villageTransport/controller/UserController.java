package com.example.villageTransport.controller;

import java.util.List;
//import com.example.villageTransport.dto.LoginRequest;
import java.util.HashMap;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import com.example.villageTransport.dto.AuthResponse;
import com.example.villageTransport.security.JwtUtil;
import com.example.villageTransport.entity.User;
import com.example.villageTransport.service.UserService;
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/register")
    public User registerUser(

            @RequestBody User user

    ) {

        return userService.registerUser(
                user
        );
    }
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody User loginUser
    ) {

        try {

            User user = userService.loginUser(

                    loginUser.getPhone(),

                    loginUser.getPassword()
            );
            System.out.println(
                    "LOGIN SUCCESS FOR: "
                            + user.getPhone()
            );

            System.out.println(
                    "ROLE: "
                            + user.getRole()
            );
            String token = jwtUtil.generateToken(

                    user.getPhone(),

                    user.getRole()
            );

            Map<String, Object> response =
                    new HashMap<>();

            response.put("token", token);

            response.put(

            		"name",

            		user.getName()

            		);

            		response.put(

            		"role",

            		user.getRole()

            		);

            		response.put(

            		"profilePhoto",

            		user.getProfilePhoto()

            		);

            		response.put(

            		"verified",

            		user.getVerified()

            		);

            return ResponseEntity.ok(response);

        }  catch (Exception e) {

            e.printStackTrace();

            Map<String, String> error =
                    new HashMap<>();

            error.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .status(401)
                    .body(error);
        }
    }
    @PostMapping("/create-admin")

    public User createAdmin() {

        User admin = new User();

        admin.setName(

                "Admin"
        );

        admin.setPhone(

                "9999999999"
        );

        admin.setPassword(

                "admin123"
        );

        admin.setRole(

                "ADMIN"
        );

        return userService.registerUser(
                admin
        );
    }
    @GetMapping("/profile/{name}")

    public User getProfile(

    @PathVariable String name

    ) {

    return userService.getProfile(

    name
    );

    }
    @PutMapping("/profile/{id}")

    public User updateProfile(

    @PathVariable Long id,

    @RequestBody User updatedUser

    ){

    return userService.updateProfile(

    id,

    updatedUser
    );

    }
    
    @PutMapping("/verify-driver/{id}")

    public User verifyDriver(

    @PathVariable Long id

    ){

    return userService.verifyDriver(

    id

    );

    }
}