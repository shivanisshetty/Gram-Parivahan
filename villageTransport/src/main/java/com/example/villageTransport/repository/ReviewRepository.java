package com.example.villageTransport.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.villageTransport.entity.Review;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

}