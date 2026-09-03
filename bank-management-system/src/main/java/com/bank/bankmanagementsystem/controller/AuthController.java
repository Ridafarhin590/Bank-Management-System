package com.bank.bankmanagementsystem.controller;

import com.bank.bankmanagementsystem.dto.LoginRequest;
import com.bank.bankmanagementsystem.dto.RegisterRequest;
import com.bank.bankmanagementsystem.entity.Customer;
import com.bank.bankmanagementsystem.security.JwtService;
import com.bank.bankmanagementsystem.service.CustomerService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CustomerService customerService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(
            CustomerService customerService,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.customerService = customerService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    
    // REGISTER
    

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        Customer customer =
                customerService.registerCustomer(request);

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Customer registered successfully"
        );

        response.put(
                "customerId",
                customer.getId()
        );

        response.put(
                "name",
                customer.getName()
        );

        response.put(
                "email",
                customer.getEmail()
        );

        response.put(
                "role",
                customer.getRole()
        );

        return ResponseEntity.ok(response);
    }

    
    // LOGIN
   

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @Valid @RequestBody LoginRequest request
    ) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Customer customer =
                customerService.getCustomerByEmail(
                        request.getEmail()
                );

        String token =
                jwtService.generateToken(
                        customer.getEmail(),
                        customer.getRole().name()
                );

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Login successful"
        );

        response.put(
                "token",
                token
        );

        response.put(
                "customerId",
                customer.getId()
        );

        response.put(
                "name",
                customer.getName()
        );

        response.put(
                "email",
                customer.getEmail()
        );

        response.put(
                "role",
                customer.getRole()
        );

        return ResponseEntity.ok(response);
    }
}