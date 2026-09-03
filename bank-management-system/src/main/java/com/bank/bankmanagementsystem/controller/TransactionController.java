package com.bank.bankmanagementsystem.controller;

import com.bank.bankmanagementsystem.dto.DepositRequest;
import com.bank.bankmanagementsystem.dto.TransferRequest;
import com.bank.bankmanagementsystem.dto.WithdrawRequest;
import com.bank.bankmanagementsystem.entity.Transaction;
import com.bank.bankmanagementsystem.service.TransactionService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(
            TransactionService transactionService
    ) {
        this.transactionService = transactionService;
    }

    
    // DEPOSIT
    
    @PostMapping("/{accountNumber}/deposit")
    public ResponseEntity<Transaction> deposit(
            @PathVariable String accountNumber,
            @Valid @RequestBody DepositRequest request
    ) {

        Transaction transaction =
                transactionService.deposit(
                        accountNumber,
                        request
                );

        return ResponseEntity.ok(transaction);
    }

    
    // WITHDRAW
    

    @PostMapping("/{accountNumber}/withdraw")
    public ResponseEntity<Transaction> withdraw(
            @PathVariable String accountNumber,
            @Valid @RequestBody WithdrawRequest request
    ) {

        Transaction transaction =
                transactionService.withdraw(
                        accountNumber,
                        request
                );

        return ResponseEntity.ok(transaction);
    }

    
    // TRANSFER
    
    @PostMapping("/{accountNumber}/transfer")
    public ResponseEntity<Transaction> transfer(
            @PathVariable String accountNumber,
            @Valid @RequestBody TransferRequest request
    ) {

        Transaction transaction =
                transactionService.transfer(
                        accountNumber,
                        request
                );

        return ResponseEntity.ok(transaction);
    }

    
    // TRANSACTION HISTORY
    

    @GetMapping("/{accountNumber}")
    public ResponseEntity<List<Transaction>> getTransactionHistory(
            @PathVariable String accountNumber
    ) {

        List<Transaction> transactions =
                transactionService.getTransactionHistory(
                        accountNumber
                );

        return ResponseEntity.ok(transactions);
    }
}