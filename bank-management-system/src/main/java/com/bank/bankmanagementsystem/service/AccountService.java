package com.bank.bankmanagementsystem.service;

import com.bank.bankmanagementsystem.entity.Account;
import com.bank.bankmanagementsystem.entity.Customer;
import com.bank.bankmanagementsystem.enums.AccountStatus;
import com.bank.bankmanagementsystem.enums.AccountType;
import com.bank.bankmanagementsystem.exception.AccountNotFoundException;
import com.bank.bankmanagementsystem.exception.CustomerNotFoundException;
import com.bank.bankmanagementsystem.repository.AccountRepository;
import com.bank.bankmanagementsystem.repository.CustomerRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;

    public AccountService(
            AccountRepository accountRepository,
            CustomerRepository customerRepository
    ) {
        this.accountRepository = accountRepository;
        this.customerRepository = customerRepository;
    }

   
    // CREATE ACCOUNT
    

    public Account createAccount(
            Long customerId,
            AccountType accountType
    ) {

        Customer customer = customerRepository
                .findById(customerId)
                .orElseThrow(() ->
                        new CustomerNotFoundException(
                                "Customer not found with id: " + customerId
                        )
                );

        Account account = new Account();

        account.setAccountNumber(
                generateAccountNumber()
        );

        account.setAccountType(accountType);

        account.setBalance(BigDecimal.ZERO);

        account.setStatus(AccountStatus.ACTIVE);

        account.setCustomer(customer);

        return accountRepository.save(account);
    }

    
    // GET ACCOUNT BY NUMBER
   

    public Account getAccountByNumber(
            String accountNumber
    ) {

        return accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found: " + accountNumber
                        )
                );
    }

    
    // GET BALANCE
    

    public BigDecimal getBalance(
            String accountNumber
    ) {

        Account account =
                getAccountByNumber(accountNumber);

        return account.getBalance();
    }

    
    // GET ALL ACCOUNTS
    
    public List<Account> getAllAccounts() {

        return accountRepository.findAll();
    }
    
    // BLOCK ACCOUNT
    

    public Account blockAccount(
            String accountNumber
    ) {

        Account account =
                getAccountByNumber(accountNumber);

        account.setStatus(AccountStatus.BLOCKED);

        return accountRepository.save(account);
    }

       // UNBLOCK ACCOUNT
    
    public Account unblockAccount(
            String accountNumber
    ) {

        Account account =
                getAccountByNumber(accountNumber);

        account.setStatus(AccountStatus.ACTIVE);

        return accountRepository.save(account);
    }

    // GENERATE ACCOUNT NUMBER

    private String generateAccountNumber() {

        String accountNumber;

        do {

            accountNumber = String.valueOf(
                    1000000000L
                            + new Random().nextInt(900000000)
            );

        } while (
                accountRepository
                        .existsByAccountNumber(accountNumber)
        );

        return accountNumber;
    }
}