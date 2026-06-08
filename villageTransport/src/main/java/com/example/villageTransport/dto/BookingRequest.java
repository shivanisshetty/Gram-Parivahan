package com.example.villageTransport.dto;

public class BookingRequest {

private String passengerName;

private Integer seatsBooked;

private String paymentMethod;

private Double amount;

public String getPassengerName() {
return passengerName;
}

public void setPassengerName(String passengerName) {
this.passengerName = passengerName;
}

public Integer getSeatsBooked() {
return seatsBooked;
}

public void setSeatsBooked(Integer seatsBooked) {
this.seatsBooked = seatsBooked;
}

public String getPaymentMethod() {
return paymentMethod;
}

public void setPaymentMethod(String paymentMethod) {
this.paymentMethod = paymentMethod;
}

public Double getAmount() {
return amount;
}

public void setAmount(Double amount) {
this.amount = amount;
}
}