package com.example.villageTransport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.villageTransport.entity.Booking;
import com.example.villageTransport.entity.Ride;
import com.example.villageTransport.repository.BookingRepository;
import com.example.villageTransport.repository.RideRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RideRepository rideRepository;

//    public String bookRide(Long rideId, Booking booking) {
//
//        Ride ride = rideRepository.findById(rideId)
//                .orElseThrow(() -> new RuntimeException("Ride not found"));
//
//        if (ride.getAvailableSeats() < booking.getSeatsBooked()) {
//            return "Not enough seats available";
//        }
//        
//        booking.setRide(ride);
//
//        booking.setStatus(
//                "PENDING"
//        );
//
//        bookingRepository.save(
//                booking
//        );
//
//        return "Booking Request Sent";
//
//        
//    }
    public String bookRide(Long rideId, Booking booking) {

        Ride ride = rideRepository.findById(rideId)

                .orElseThrow(() ->

                        new RuntimeException(

                                "Ride not found"
                        )
                );

        if (

                ride.getAvailableSeats()

                <

                booking.getSeatsBooked()

        ) {

            return "Not enough seats available";
        }

        booking.setRide(ride);

        booking.setStatus(

                "PENDING"
        );

        /* PAYMENT ALWAYS STARTS PENDING */

        booking.setPaymentStatus(

                "PENDING"
        );

        booking.setAmount(

                ride.getFare()

                *

                booking.getSeatsBooked()
        );

        bookingRepository.save(

                booking
        );

        return "Booking Request Sent";
    }
    public List<Booking> getDriverBookings(

            String driverName

    ) {

        return bookingRepository

                .findByRideDriverName(
                        driverName
                );
    }
    public List<Booking> getPassengerBookings(

            String passengerName

    ) {

        return bookingRepository

                .findByPassengerNameIgnoreCase(

                        passengerName
                );
    }
    public String cancelBooking(Long id) {

        Booking booking = bookingRepository

                .findById(id)

                .orElseThrow(() ->

                        new RuntimeException(
                                "Booking not found"
                        )
                );

        booking.setStatus(

                "CANCELLED"
        );

        bookingRepository.save(

                booking
        );

        return "Booking Cancelled";
    }
    public String approveBooking(Long bookingId) {

        Booking booking = bookingRepository

                .findById(bookingId)

                .orElseThrow(() ->

                        new RuntimeException(
                                "Booking not found"
                        )
                );

        Ride ride = booking.getRide();

        if (

                ride.getAvailableSeats()

                <

                booking.getSeatsBooked()

        ) {

            return "Seats not available";
        }

        ride.setAvailableSeats(

                ride.getAvailableSeats()

                -

                booking.getSeatsBooked()
        );

        rideRepository.save(ride);

        booking.setStatus(

                "APPROVED"
        );

        bookingRepository.save(
                booking
        );

        return "Booking Approved";
    }

    public String rejectBooking(Long bookingId) {

        Booking booking = bookingRepository

                .findById(bookingId)

                .orElseThrow(() ->

                        new RuntimeException(
                                "Booking not found"
                        )
                );

        booking.setStatus(

                "REJECTED"
        );

        bookingRepository.save(
                booking
        );

        return "Booking Rejected";
    }
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }
    public String completeRide(Long bookingId){

    	Booking booking = bookingRepository
    	.findById(bookingId)
    	.orElseThrow(
    	()->new RuntimeException(
    	"Booking not found"
    	)
    	);

    	booking.setStatus(
    	"COMPLETED"
    	);

    	bookingRepository.save(
    	booking
    	);

    	return "Completed";
    	}
    public String makePayment(Long bookingId) {

        Booking booking = bookingRepository
                .findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Booking Not Found"
                        )
                );

        if(
           !booking.getStatus()
           .equals("COMPLETED")
        ){

            return "Ride not completed";
        }

        booking.setPaymentStatus(
                "PAID"
        );

        bookingRepository.save(
                booking
        );

        return "Payment Success";
    }
    public Booking findBooking(Long id){

    	return bookingRepository

    	.findById(id)

    	.orElseThrow();

    	}

    	public Booking save(

    	Booking booking

    	){

    	return bookingRepository

    	.save(booking);

    	}
}