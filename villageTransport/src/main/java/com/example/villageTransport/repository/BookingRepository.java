package com.example.villageTransport.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.villageTransport.entity.Booking;

public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    List<Booking> findByRideDriverName(

            String driverName
    );

   

	List<Booking> findByPassengerNameIgnoreCase(String passengerName);
}