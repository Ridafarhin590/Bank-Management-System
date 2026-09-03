package com.bank.bankmanagementsystem.controller;

import com.bank.bankmanagementsystem.entity.Account;
import com.bank.bankmanagementsystem.enums.AccountType;
import com.bank.bankmanagementsystem.service.AccountService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // CREATE ACCOUNT
   
    @PostMapping
    public ResponseEntity<Account> createAccount(
            @RequestParam Long customerId,
            @RequestParam AccountType accountType
    ) {

        Account account =
                accountService.createAccount(
                        customerId,
                        accountType
                );

        return ResponseEntity.ok(account);
    }

        // GET ACCOUNT
    
    @GetMapping("/{accountNumber}")
    public ResponseEntity<Account> getAccount(
            @PathVariable String accountNumber
    ) {

        Account account =
                accountService.getAccountByNumber(
                        accountNumber
                );

        return ResponseEntity.ok(account);
    }

   
    // GET BALANCE
   

    @GetMapping("/{accountNumber}/balance")
    public ResponseEntity<BigDecimal> getBalance(
            @PathVariable String accountNumber
    ) {

        BigDecimal balance =
                accountService.getBalance(
                        accountNumber
                );

        return ResponseEntity.ok(balance);
    }

    // GET ALL ACCOUNTS
    

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {

        return ResponseEntity.ok(
                accountService.getAllAccounts()
        );
    }

    
    // BLOCK ACCOUNT
    
    @PutMapping("/{accountNumber}/block")
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
    

    @PutMapping("/{accountNumber}/unblock")
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