package com.teamtable.teamtable_api.controller;

import com.teamtable.teamtable_api.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/otp")
public class OtpController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        try {
            accountService.sendOtp(email);
            return ResponseEntity.ok("OTP sent successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        try {
            boolean isValid = accountService.verifyOtp(email, otp);
            if (isValid) {
                return ResponseEntity.ok("OTP verified successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}