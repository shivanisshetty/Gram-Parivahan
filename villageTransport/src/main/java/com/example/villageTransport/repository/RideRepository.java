package com.example.villageTransport.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.villageTransport.entity.Ride;

public interface RideRepository
        extends JpaRepository<Ride, Long> {

    Optional<Ride> findById(Long id);
    List<Ride> findBySourceAndDestination(
            String source,
            String destination);
    List<Ride> findByDriverName(

            String driverName
    );
}