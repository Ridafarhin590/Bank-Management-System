package com.bank.bankmanagementsystem.controller;

import com.bank.bankmanagementsystem.entity.Account;
import com.bank.bankmanagementsystem.entity.Customer;
import com.bank.bankmanagementsystem.service.AccountService;
import com.bank.bankmanagementsystem.service.CustomerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final CustomerService customerService;
    private final AccountService accountService;

    public AdminController(
            CustomerService customerService,
            AccountService accountService
    ) {
        this.customerService = customerService;
        this.accountService = accountService;
    }

    
    // GET ALL CUSTOMERS
   

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {

        return ResponseEntity.ok(
                customerService.getAllCustomers()
        );
    }

   
    // GET ALL ACCOUNTS
    

    @GetMapping("/accounts")
    public ResponseEntity<List<Account>> getAllAccounts() {

        return ResponseEntity.ok(
                accountService.getAllAccounts()
        );
    }

    
    // BLOCK ACCOUNT
    
    @PutMapping("/accounts/{accountNumber}/block")
    public ResponseEntity<Account> blockAccount(
            @PathVariable String accountNumber
    ) {

        return ResponseEntity.ok(
                accountService.blockAccount(
                        accountNumber
                )
        );
    }

   
    // UNBLOCK ACCOUNT
    

    @PutMapping("/accounts/{accountNumber}/unblock")
    public ResponseEntity<Account> unblockAccount(
            @PathVariable String accountNumber
    ) {

        return ResponseEntity.ok(
                accountService.unblockAccount(
                        accountNumber
                )
        );
    }
}