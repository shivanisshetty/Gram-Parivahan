package com.example.villageTransport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.villageTransport.entity.Review;
import com.example.villageTransport.entity.Ride;
import com.example.villageTransport.repository.ReviewRepository;
import com.example.villageTransport.repository.RideRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private RideRepository rideRepository;

    public Review addReview(Long rideId,
                            Review review) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() ->
                        new RuntimeException("Ride not found"));

        review.setRide(ride);

        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {

        return reviewRepository.findAll();
    }
}