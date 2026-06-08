package com.example.villageTransport.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public Map<String, String> handleResourceNotFound(
            ResourceNotFoundException ex) {

        Map<String, String> error = new HashMap<>();

        error.put("message", ex.getMessage());

        return error;
    }

    @ExceptionHandler(Exception.class)
    public Map<String, String> handleGeneralException(
            Exception ex) {

        Map<String, String> error = new HashMap<>();

        error.put("message", "Something went wrong");

        return error;
    }
}