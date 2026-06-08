package com.example.villageTransport.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.villageTransport.entity.Review;
import com.example.villageTransport.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/{rideId}")
    public Review addReview(
            @PathVariable Long rideId,
            @RequestBody Review review) {

        return reviewService.addReview(rideId, review);
    }

    @GetMapping
    public List<Review> getAllReviews() {

        return reviewService.getAllReviews();
    }
}