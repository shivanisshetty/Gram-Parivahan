
package com.example.villageTransport.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.villageTransport.entity.Booking;
import com.example.villageTransport.entity.Ride;
import com.example.villageTransport.entity.User;
import com.example.villageTransport.service.AdminService;

@RestController
@RequestMapping("/api/admin")

@CrossOrigin(origins = "http://localhost:3000")

public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")

    public List<User> getUsers() {

        return adminService.getUsers();
    }

    @GetMapping("/rides")

    public List<Ride> getRides() {

        return adminService.getRides();
    }

    @GetMapping("/bookings")

    public List<Booking> getBookings() {

        return adminService.getBookings();
    }

    @DeleteMapping("/users/{id}")

    public String deleteUser(

            @PathVariable Long id
    ) {

        return adminService.deleteUser(id);
    }

    @DeleteMapping("/rides/{id}")

    public String deleteRide(

            @PathVariable Long id
    ) {

        return adminService.deleteRide(id);
    }
}