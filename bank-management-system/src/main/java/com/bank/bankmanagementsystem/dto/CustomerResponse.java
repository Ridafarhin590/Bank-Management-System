package com.bank.bankmanagementsystem.dto;

import com.bank.bankmanagementsystem.entity.Customer;
import com.bank.bankmanagementsystem.enums.Role;

import java.time.LocalDateTime;

public class CustomerResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private Role role;
    private LocalDateTime createdAt;

    public CustomerResponse() {
    }

    public CustomerResponse(
            Long id,
            String name,
            String email,
            String phone,
            String address,
            Role role,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.createdAt = createdAt;
    }

    public static CustomerResponse fromCustomer(
            Customer customer
    ) {

        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getRole(),
                customer.getCreatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public Role getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}