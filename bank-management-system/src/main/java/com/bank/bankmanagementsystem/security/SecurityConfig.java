package com.bank.bankmanagementsystem.security;

import com.bank.bankmanagementsystem.entity.Customer;
import com.bank.bankmanagementsystem.repository.CustomerRepository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomerRepository customerRepository;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            CustomerRepository customerRepository,
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.customerRepository = customerRepository;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

   
    // PASSWORD ENCODER
    

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    
    // USER DETAILS SERVICE
    

    @Bean
    public UserDetailsService userDetailsService() {

        return email -> {

            Customer customer = customerRepository
                    .findByEmail(email)
                    .orElseThrow(() ->
                            new UsernameNotFoundException(
                                    "Customer not found"
                            )
                    );

            return User.builder()
                    .username(customer.getEmail())
                    .password(customer.getPassword())
                    .roles(customer.getRole().name())
                    .build();
        };
    }


    
    // AUTHENTICATION PROVIDER
    

    @Bean
    public AuthenticationProvider authenticationProvider(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder
    ) {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(
                        userDetailsService
                );

        provider.setPasswordEncoder(passwordEncoder);

        return provider;
    }


    
    // AUTHENTICATION MANAGER
    
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationProvider authenticationProvider
    ) {

        return authenticationProvider::authenticate;
    }


    
    // SECURITY FILTER CHAIN
    

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            AuthenticationProvider authenticationProvider
    ) throws Exception {

        http

                
                // CORS
                
                .cors(cors -> {})

               
                // CSRF
                

                .csrf(csrf -> csrf.disable())

               
                // SESSION MANAGEMENT
                

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // AUTHENTICATION PROVIDER
               

                .authenticationProvider(
                        authenticationProvider
                )

                
                // AUTHORIZATION
               

                .authorizeHttpRequests(auth -> auth

                        // Public authentication APIs
                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        // Admin APIs
                        .requestMatchers(
                                "/api/admin/**"
                        ).hasRole("ADMIN")

                        // All other APIs require authentication
                        .anyRequest().authenticated()
                )


                // JWT FILTER
        
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}