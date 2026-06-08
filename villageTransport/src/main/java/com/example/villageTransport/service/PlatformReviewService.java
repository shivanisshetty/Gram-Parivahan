package com.example.villageTransport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.villageTransport.entity.PlatformReview;
import com.example.villageTransport.repository.PlatformReviewRepository;

@Service
	public class PlatformReviewService {

	@Autowired
	private PlatformReviewRepository repo;

	public PlatformReview addReview(
	PlatformReview review
	){
		System.out.println("Saving review");

	return repo.save(review);

	}

	public List<PlatformReview> getReviews(){
		System.out.println(repo.findAll());

	return repo.findAll();

	}

	}

