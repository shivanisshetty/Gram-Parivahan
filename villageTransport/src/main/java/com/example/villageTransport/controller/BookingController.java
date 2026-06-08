package com.example.villageTransport.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.villageTransport.entity.Booking;
import com.example.villageTransport.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/{rideId}")
    public String bookRide(
            @PathVariable Long rideId,
            @RequestBody Booking booking) {

        return bookingService.bookRide(rideId, booking);
    }
    @GetMapping("/driver/{driverName}")

    public List<Booking> getDriverBookings(

            @PathVariable String driverName
    ) {

        return bookingService

                .getDriverBookings(
                        driverName
                );
    }
    @GetMapping("/passenger/{passengerName}")

    public List<Booking> getPassengerBookings(

            @PathVariable String passengerName
    ) {

        return bookingService

                .getPassengerBookings(

                        passengerName
                );
    }
    
    @DeleteMapping("/{id}")

    public String cancelBooking(

            @PathVariable Long id
    ) {

        return bookingService

                .cancelBooking(id);
    }
    @PutMapping("/approve/{id}")

    public String approveBooking(

            @PathVariable Long id
    ) {

        return bookingService

                .approveBooking(id);
    }

    @PutMapping("/reject/{id}")

    public String rejectBooking(

            @PathVariable Long id
    ) {

        return bookingService

                .rejectBooking(id);
    }
    @GetMapping

    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();
    }
    @PutMapping("/complete/{id}")
    public String completeRide(
            @PathVariable Long id
    ){

        return bookingService
                .completeRide(id);
    }

    @PutMapping("/pay/{id}")
    public String makePayment(
            @PathVariable Long id
    ){

        return bookingService
                .makePayment(id);
    }
    
   
}