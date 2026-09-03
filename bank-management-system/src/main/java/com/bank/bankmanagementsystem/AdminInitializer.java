package com.bank.bankmanagementsystem;

import com.bank.bankmanagementsystem.entity.Customer;
import com.bank.bankmanagementsystem.enums.Role;
import com.bank.bankmanagementsystem.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    public CommandLineRunner createAdmin(
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {

            if (!customerRepository.existsByEmail(adminEmail)) {

                Customer admin = new Customer();

                admin.setName("Bank Administrator");
                admin.setEmail(adminEmail);
                admin.setPhone("9999999999");
                admin.setAddress("Bank Head Office");

                admin.setPassword(
                        passwordEncoder.encode(adminPassword)
                );

                admin.setRole(Role.ADMIN);

                customerRepository.save(admin);

                System.out.println(
                        "================================="
                );

                System.out.println(
                        "ADMIN ACCOUNT CREATED"
                );

                System.out.println(
                        "Admin email: " + adminEmail
                );

                System.out.println(
                        "================================="
                );

            } else {

                System.out.println(
                        "Admin account already exists."
                );
            }
        };
    }
}