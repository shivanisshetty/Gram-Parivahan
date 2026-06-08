package com.example.villageTransport.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.villageTransport.repository.UserRepository;
import com.example.villageTransport.repository.RideRepository;
import com.example.villageTransport.repository.BookingRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/stats")
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put(
                "totalUsers",
                userRepository.count()
        );

        stats.put(
                "totalRides",
                rideRepository.count()
        );

        stats.put(
                "totalBookings",
                bookingRepository.count()
        );

        return stats;
    }
}