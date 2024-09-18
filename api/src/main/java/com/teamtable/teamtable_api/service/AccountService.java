package com.teamtable.teamtable_api.service;

import com.teamtable.teamtable_api.config.JWTUtils;
import com.teamtable.teamtable_api.model.Account;
import com.teamtable.teamtable_api.model.OtpToken;
import com.teamtable.teamtable_api.repository.AccountRepository;
import com.teamtable.teamtable_api.repository.OtpTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private OtpTokenRepository otpTokenRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Transactional
    public Account getAccount(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Transactional
    public Account register(String name, String email, String password) {
        if (accountRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        Account newAccount = new Account(name, email, password);
        accountRepository.save(newAccount);
        return newAccount;
    }

    public Account login(String email, String password) {
        Account account = accountRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (!account.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return account;
    }

    public String generateAuthToken(Account account) {
        return jwtUtils.createToken(account, false);
    }

    @Transactional
    public void sendOtp(String email) {
        String otp = generateOtp();
        LocalDateTime otpExpiry = LocalDateTime.now().plusMinutes(5); // OTP hết hạn sau 5 phút

        OtpToken otpToken = otpTokenRepository.findByEmail(email).orElse(new OtpToken(email, otp, otpExpiry));
        otpToken.setOtp(otp);
        otpToken.setOtpExpiry(otpExpiry);
        otpTokenRepository.save(otpToken);

        // Gửi OTP đến email của người dùng (cần tích hợp với dịch vụ email)
    }

    @Transactional
    public boolean verifyOtp(String email, String otp) {
        OtpToken otpToken = otpTokenRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("OTP not found"));
        if (otpToken.getOtp().equals(otp) && otpToken.getOtpExpiry().isAfter(LocalDateTime.now())) {
            otpTokenRepository.delete(otpToken);
            return true;
        }
        return false;
    }

    @Transactional
    public void changePassword(String email, String newPassword) {
        Account account = accountRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Email not found"));
        if (newPassword==null) {
            throw new IllegalArgumentException("New password null");
        }
        account.setPassword(newPassword);
        accountRepository.save(account);
    }

    @Transactional
    public void updateUserInfo(String email, String newName) {
        Account account = accountRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Email not found"));
        account.setName(newName);
        accountRepository.save(account);
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}
