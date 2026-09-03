package com.bank.bankmanagementsystem.controller;

import com.bank.bankmanagementsystem.dto.CustomerResponse;
import com.bank.bankmanagementsystem.entity.Customer;
import com.bank.bankmanagementsystem.service.CustomerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(
            CustomerService customerService
    ) {
        this.customerService = customerService;
    }

    
    // GET CUSTOMER BY ID
    

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomer(
            @PathVariable Long id
    ) {

        Customer customer =
                customerService.getCustomerById(id);

        return ResponseEntity.ok(
                CustomerResponse.fromCustomer(customer)
        );
    }

    
    // GET ALL CUSTOMERS
    

    @GetMapping
    public ResponseEntity<List<CustomerResponse>>
    getAllCustomers() {

        List<CustomerResponse> customers =
                customerService.getAllCustomers()
                        .stream()
                        .map(CustomerResponse::fromCustomer)
                        .toList();

        return ResponseEntity.ok(customers);
    }
}