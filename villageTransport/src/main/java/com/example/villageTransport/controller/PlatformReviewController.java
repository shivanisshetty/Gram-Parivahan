package com.example.villageTransport.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.villageTransport.entity.PlatformReview;
import com.example.villageTransport.service.PlatformReviewService;

@RestController
@RequestMapping("/api/platform-reviews")
@CrossOrigin(origins="http://localhost:3000")

public class PlatformReviewController {

@Autowired
private PlatformReviewService service;

@PostMapping

public PlatformReview addReview(

@RequestBody PlatformReview review

){
	System.out.println("REVIEW RECEIVED: " + review.getProfilePhoto());

return service.addReview(review);

}

@GetMapping

public List<PlatformReview> getReviews(){
	System.out.println("GET REVIEWS CALLED");
return service.getReviews();

}

}
