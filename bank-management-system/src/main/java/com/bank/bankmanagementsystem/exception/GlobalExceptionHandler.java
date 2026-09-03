package com.bank.bankmanagementsystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

   
    // CUSTOMER NOT FOUND
   

    @ExceptionHandler(CustomerNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleCustomerNotFound(
            CustomerNotFoundException exception
    ) {

        return createErrorResponse(
                HttpStatus.NOT_FOUND,
                exception.getMessage()
        );
    }

    
    // ACCOUNT NOT FOUND
    

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleAccountNotFound(
            AccountNotFoundException exception
    ) {

        return createErrorResponse(
                HttpStatus.NOT_FOUND,
                exception.getMessage()
        );
    }

    
    // INSUFFICIENT BALANCE
    

    @ExceptionHandler(InsufficientBalanceException.class)
    public ResponseEntity<Map<String, Object>> handleInsufficientBalance(
            InsufficientBalanceException exception
    ) {

        return createErrorResponse(
                HttpStatus.BAD_REQUEST,
                exception.getMessage()
        );
    }

    
    // ILLEGAL ARGUMENT
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(
            IllegalArgumentException exception
    ) {

        return createErrorResponse(
                HttpStatus.BAD_REQUEST,
                exception.getMessage()
        );
    }

    
    // GENERIC EXCEPTION
    

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(
            Exception exception
    ) {

        return createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred"
        );
    }

   
    // ERROR RESPONSE
    
    private ResponseEntity<Map<String, Object>> createErrorResponse(
            HttpStatus status,
            String message
    ) {

        Map<String, Object> error = new HashMap<>();

        error.put("timestamp", LocalDateTime.now());
        error.put("status", status.value());
        error.put("error", status.getReasonPhrase());
        error.put("message", message);

        return ResponseEntity
                .status(status)
                .body(error);
    }
}