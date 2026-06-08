package com.example.villageTransport.entity;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "rides")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String source;

    private String destination;

    private String date;

    private String time;
    @Column(

    		columnDefinition = "boolean default false"

    		)

    		private Boolean driverVerified = false;

    public boolean isDriverVerified() {

    return driverVerified;

    }

    public void setDriverVerified(

    boolean driverVerified

    ){

    this.driverVerified = driverVerified;

    }
    private int availableSeats;
    private String status = "UPCOMING";
    private double fare;

    private String driverName;
    /* BOOKINGS */

    @JsonIgnore
    @OneToMany(mappedBy = "ride",
               cascade = CascadeType.ALL)
    private List<Booking> bookings;

    /* REVIEWS */

    @JsonIgnore
    @OneToMany(mappedBy = "ride",
               cascade = CascadeType.ALL)
    private List<Review> reviews;

    public Ride() {
    }

    public Ride(Long id,
            String source,
            String destination,
            String date,
            String time,
            int availableSeats,
            double fare,
            String driverName) {

    this.id = id;
    this.source = source;
    this.destination = destination;
    this.date = date;
    this.time = time;
    this.availableSeats = availableSeats;
    this.fare = fare;
    this.driverName = driverName;
}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}