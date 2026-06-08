package com.example.villageTransport.controller;
import org.springframework.http.ResponseEntity;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.villageTransport.dto.DriverRideDTO;
import com.example.villageTransport.entity.Ride;
import com.example.villageTransport.service.RideService;

@RestController
@RequestMapping("/api/rides")
@CrossOrigin(origins = "http://localhost:3000")
public class RideController {

    @Autowired
    private RideService rideService;

//    @PostMapping
//    public Ride addRide(@RequestBody Ride ride) {
//        return rideService.addRide(ride);
//    }
    @PostMapping

    public ResponseEntity<?> addRide(

    @RequestBody Ride ride

    ){

    try {

    Ride savedRide = rideService.addRide(

    ride

    );

    return ResponseEntity

    .status(201)

    .body(

    savedRide

    );

    }

    catch(Exception e){

    return ResponseEntity

    .badRequest()

    .body(

    e.getMessage()

    );

    }

    }
    @GetMapping
    public List<Ride> getAllRides() {

        return rideService.getAllRides();
    }
    @GetMapping("/my-rides/{driverName}")

    public List<Ride> getMyRides(

            @PathVariable String driverName

    ) {

        return rideService.getMyRides(

                driverName
        );
    }
//    @GetMapping("/search")
//    public List<Ride> searchRides(
//            @RequestParam String source,
//            @RequestParam String destination) {
//
//        return rideService.searchRides(source, destination);
//    }
    
    @GetMapping("/search")

    public List<DriverRideDTO> searchRide(

    @RequestParam String source,

    @RequestParam String destination

    ){

    return rideService.searchRides(

    source,

    destination

    );

    }
    
    @PutMapping("/{id}")
    public Ride updateRide(
            @PathVariable Long id,
            @RequestBody Ride updatedRide) {

        return rideService.updateRide(id, updatedRide);
    }
    @DeleteMapping("/{id}")
    public String deleteRide(@PathVariable Long id) {

        return rideService.deleteRide(id);
    }
    @PutMapping("/{id}/status")

    public Ride updateRideStatus(

            @PathVariable Long id,

            @RequestParam String status
    ) {

        return rideService.updateRideStatus(

                id,

                status
        );
    }
}