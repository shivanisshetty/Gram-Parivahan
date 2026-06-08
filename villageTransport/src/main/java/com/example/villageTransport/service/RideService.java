package com.example.villageTransport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.villageTransport.dto.DriverRideDTO;
import com.example.villageTransport.entity.Ride;
import com.example.villageTransport.entity.User;
import com.example.villageTransport.exception.ResourceNotFoundException;
import com.example.villageTransport.repository.RideRepository;
import com.example.villageTransport.repository.UserRepository;

@Service
public class RideService {

	
	
    @Autowired
    private RideRepository rideRepository;
   
//    public Ride addRide(Ride ride) {
//    	 ride.setStatus("UPCOMING");
//        return rideRepository.save(ride);
//    }
    

    @Autowired

    private UserRepository userRepository;

//    public Ride addRide(Ride ride) {
//
//    User driver = userRepository
//
//    .findByName(
//
//    ride.getDriverName()
//
//    )
//
//    .orElseThrow(
//
//    () -> new RuntimeException(
//
//    "Driver Not Found"
//
//    )
//
//    );
//
//    if (
//
//    driver.getVerified() == null ||
//
//    !driver.getVerified()
//
//    ) {
//
//    throw new RuntimeException(
//
//    "Driver account is not verified by admin"
//
//    );
//
//    }
//
//    ride.setDriverVerified(
//
//    true
//
//    );
//
//    return rideRepository.save(
//
//    ride
//
//    );
//
//    }
    public Ride addRide(Ride ride) {

    	User driver = userRepository

    	.findByName(

    	ride.getDriverName()

    	)

    	.orElseThrow(

    	() -> new RuntimeException(

    	"Driver Not Found"

    	)

    	);

    	System.out.println(

    	"Driver = " + driver.getName()

    	);

    	System.out.println(

    	"Verified = " + driver.getVerified()

    	);

    	if (

    	!"DRIVER".equals(

    	driver.getRole()

    	)

    	) {

    	throw new RuntimeException(

    	"Only drivers can add rides"

    	);

    	}

    	if (

    	driver.getVerified() == null ||

    	Boolean.FALSE.equals(

    	driver.getVerified()

    	)

    	) {

    	throw new RuntimeException(

    	"Driver account is not verified by admin"

    	);

    	}

    	ride.setStatus(

    	"UPCOMING"

    	);

    	ride.setDriverVerified(

    	true

    	);

    	return rideRepository.save(

    	ride

    	);

    	}
    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }
    
    public List<Ride> getMyRides(

            String driverName

    ) {

        return rideRepository.findByDriverName(

                driverName
        );
    }
//    public List<Ride> searchRides(
//            String source,
//            String destination) {
//
//        return rideRepository
//                .findBySourceAndDestination(source, destination);
//    }
    public List<DriverRideDTO> searchRides(

    		String source,

    		String destination

    		){

    		List<Ride> rides = rideRepository

    		.findBySourceAndDestination(

    		source,

    		destination

    		);

    		return rides.stream().map(ride -> {

    		User driver = userRepository

    		.findByName(

    		ride.getDriverName()

    		)

    		.orElse(null);

    		DriverRideDTO dto = new DriverRideDTO();

    		dto.setId(ride.getId());

    		dto.setSource(ride.getSource());

    		dto.setDestination(ride.getDestination());

    		dto.setDate(ride.getDate());

    		dto.setTime(ride.getTime());

    		dto.setAvailableSeats(

    		ride.getAvailableSeats()

    		);

    		dto.setFare(

    		ride.getFare()

    		);

    		dto.setDriverName(

    		ride.getDriverName()

    		);

    		if(driver != null){

    		dto.setDriverContact(

    		driver.getPhone()

    		);

    		dto.setVehicleName(

    		driver.getVehicleName()

    		);

    		dto.setVehicleNumber(

    		driver.getVehicleNumber()

    		);

    		dto.setProfilePhoto(

    		driver.getProfilePhoto()

    		);

    		dto.setDriverVerified(

    		driver.getVerified()

    		);

    		}

    		return dto;

    		}).toList();

    		}
    public Ride updateRide(Long id, Ride updatedRide) {

        Ride ride = rideRepository.findById(id)
                .orElseThrow(() ->     new ResourceNotFoundException("Ride not found"));

        ride.setSource(updatedRide.getSource());
        ride.setDestination(updatedRide.getDestination());
        ride.setDate(updatedRide.getDate());
        ride.setTime(updatedRide.getTime());
        ride.setAvailableSeats(updatedRide.getAvailableSeats());
        ride.setFare(updatedRide.getFare());

        return rideRepository.save(ride);
    }
//    public String deleteRide(Long id) {
//
//        Ride ride = rideRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Ride not found"));
//
//        rideRepository.delete(ride);
//
//        return "Ride deleted successfully";
//    }
    public String deleteRide(Long id) {

        if (!rideRepository.existsById(id)) {
            return "Ride not found";
        }

        rideRepository.deleteById(id);

        return "Ride deleted successfully";
    }
    public Ride updateRideStatus(

            Long id,

            String status
    ) {

        Ride ride = rideRepository

                .findById(id)

                .orElseThrow(() ->

                        new RuntimeException(
                                "Ride not found"
                        )
                );

        ride.setStatus(status);

        return rideRepository.save(ride);
    }
}