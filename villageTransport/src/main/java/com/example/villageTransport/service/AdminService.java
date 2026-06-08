package com.example.villageTransport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.villageTransport.entity.Booking;
import com.example.villageTransport.entity.Ride;
import com.example.villageTransport.entity.User;

import com.example.villageTransport.repository.BookingRepository;
import com.example.villageTransport.repository.RideRepository;
import com.example.villageTransport.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<User> getUsers() {

        return userRepository.findAll();
    }

    public List<Ride> getRides() {

        return rideRepository.findAll();
    }

    public List<Booking> getBookings() {

        return bookingRepository.findAll();
    }

    public String deleteUser(Long id) {

        userRepository.deleteById(id);

        return "User Deleted";
    }

    public String deleteRide(Long id) {

        rideRepository.deleteById(id);

        return "Ride Deleted";
    }
}