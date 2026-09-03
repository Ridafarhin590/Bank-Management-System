package com.bank.bankmanagementsystem.service;

import com.bank.bankmanagementsystem.dto.RegisterRequest;
import com.bank.bankmanagementsystem.entity.Customer;
import com.bank.bankmanagementsystem.repository.CustomerRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISTER CUSTOMER

    public Customer registerCustomer(
            RegisterRequest request
    ) {

        if (customerRepository.existsByEmail(
                request.getEmail()
        )) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        Customer customer = new Customer();

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());

        // Never store the password as plain text
        customer.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        return customerRepository.save(customer);
    }

    // GET CUSTOMER BY ID

    public Customer getCustomerById(Long id) {

        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found"
                        )
                );
    }

    
    // GET ALL CUSTOMERS

    public List<Customer> getAllCustomers() {

        return customerRepository.findAll();
    }

    // GET CUSTOMER BY EMAIL

    public Customer getCustomerByEmail(String email) {

        return customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found"
                        )
                );
    }
}