package com.bank.bankmanagementsystem.service;

import com.bank.bankmanagementsystem.dto.DepositRequest;
import com.bank.bankmanagementsystem.dto.TransferRequest;
import com.bank.bankmanagementsystem.dto.WithdrawRequest;
import com.bank.bankmanagementsystem.entity.Account;
import com.bank.bankmanagementsystem.entity.Transaction;
import com.bank.bankmanagementsystem.enums.AccountStatus;
import com.bank.bankmanagementsystem.enums.TransactionType;
import com.bank.bankmanagementsystem.repository.AccountRepository;
import com.bank.bankmanagementsystem.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(
            AccountRepository accountRepository,
            TransactionRepository transactionRepository
    ) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    // DEPOSIT

    @Transactional
    public Transaction deposit(
            String accountNumber,
            DepositRequest request
    ) {

        Account account = getAccount(accountNumber);

        validateAccount(account);

        BigDecimal amount = request.getAmount();

        account.setBalance(
                account.getBalance().add(amount)
        );

        accountRepository.save(account);

        Transaction transaction = new Transaction();

        transaction.setTransactionReference(
                generateTransactionReference()
        );

        transaction.setTransactionType(
                TransactionType.DEPOSIT
        );

        transaction.setAmount(amount);

        transaction.setReceiverAccount(account);

        transaction.setDescription("Cash deposit");

        return transactionRepository.save(transaction);
    }

    // WITHDRAW

    @Transactional
    public Transaction withdraw(
            String accountNumber,
            WithdrawRequest request
    ) {

        Account account = getAccount(accountNumber);

        validateAccount(account);

        BigDecimal amount = request.getAmount();

        if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        account.setBalance(
                account.getBalance().subtract(amount)
        );

        accountRepository.save(account);

        Transaction transaction = new Transaction();

        transaction.setTransactionReference(
                generateTransactionReference()
        );

        transaction.setTransactionType(
                TransactionType.WITHDRAW
        );

        transaction.setAmount(amount);

        transaction.setSenderAccount(account);

        transaction.setDescription("Cash withdrawal");

        return transactionRepository.save(transaction);
    }

    // TRANSFER

    @Transactional
    public Transaction transfer(
            String senderAccountNumber,
            TransferRequest request
    ) {

        Account sender = getAccount(senderAccountNumber);

        Account receiver = getAccount(
                request.getReceiverAccountNumber()
        );

        validateAccount(sender);
        validateAccount(receiver);

        if (sender.getAccountNumber()
                .equals(receiver.getAccountNumber())) {

            throw new RuntimeException(
                    "Cannot transfer money to the same account"
            );
        }

        BigDecimal amount = request.getAmount();

        if (sender.getBalance().compareTo(amount) < 0) {

            throw new RuntimeException(
                    "Insufficient balance"
            );
        }

        // Remove money from sender
        sender.setBalance(
                sender.getBalance().subtract(amount)
        );

        // Add money to receiver
        receiver.setBalance(
                receiver.getBalance().add(amount)
        );

        accountRepository.save(sender);
        accountRepository.save(receiver);

        Transaction transaction = new Transaction();

        transaction.setTransactionReference(
                generateTransactionReference()
        );

        transaction.setTransactionType(
                TransactionType.TRANSFER
        );

        transaction.setAmount(amount);

        transaction.setSenderAccount(sender);

        transaction.setReceiverAccount(receiver);

        transaction.setDescription(
                request.getDescription()
        );

        return transactionRepository.save(transaction);
    }

    // TRANSACTION HISTORY

    public List<Transaction> getTransactionHistory(
            String accountNumber
    ) {

        getAccount(accountNumber);

        List<Transaction> sentTransactions =
                transactionRepository
                        .findBySenderAccount_AccountNumberOrderByTransactionDateDesc(
                                accountNumber
                        );

        List<Transaction> receivedTransactions =
                transactionRepository
                        .findByReceiverAccount_AccountNumberOrderByTransactionDateDesc(
                                accountNumber
                        );

        List<Transaction> transactions =
                new ArrayList<>();

        transactions.addAll(sentTransactions);
        transactions.addAll(receivedTransactions);

        transactions.sort(
                Comparator.comparing(
                        Transaction::getTransactionDate
                ).reversed()
        );

        return transactions;
    }

    // GET ACCOUNT

    private Account getAccount(String accountNumber) {

        return accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Account not found"
                        )
                );
    }

    // VALIDATE ACCOUNT

    private void validateAccount(Account account) {

        if (account.getStatus() != AccountStatus.ACTIVE) {

            throw new RuntimeException(
                    "Account is not active"
            );
        }
    }

    // TRANSACTION REFERENCE

    private String generateTransactionReference() {

        return "TXN-" +
                UUID.randomUUID()
                        .toString()
                        .replace("-", "")
                        .substring(0, 20)
                        .toUpperCase();
    }
}