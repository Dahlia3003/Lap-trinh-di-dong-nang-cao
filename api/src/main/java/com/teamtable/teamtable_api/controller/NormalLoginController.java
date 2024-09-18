package com.teamtable.teamtable_api.controller;

import com.teamtable.teamtable_api.dto.ChangePasswordRequest;
import com.teamtable.teamtable_api.dto.loginRequest;
import com.teamtable.teamtable_api.dto.registerRequest;
import com.teamtable.teamtable_api.model.Account;
import com.teamtable.teamtable_api.service.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/")
public class NormalLoginController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/host")
    public String getHost(HttpServletRequest request) {
        return request.getLocalAddr();
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            accountService.changePassword(request.getEmail(), request.getNewPassword());
            return ResponseEntity.ok("Password changed successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody loginRequest requestBody, HttpServletResponse response) {
        try {
            Account account = accountService.login(requestBody.getEmail(), requestBody.getPassword());
            String authToken = accountService.generateAuthToken(account);

            // Tạo cookie chứa authToken
            ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken)
                    .httpOnly(false) // có thể truy cập từ frontend
                    .maxAge(28 * 24 * 3600)
                    .path("/")
                    .secure(false)
                    .build();

            // Thêm cookie vào phản hồi
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            // Trả về thông tin người dùng và token trong phản hồi JSON
            return ResponseEntity.ok().body(Map.of("user", account, "token", authToken));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody registerRequest requestBody, HttpServletResponse response) {
        try {
            Account account = accountService.register(requestBody.getName(), requestBody.getEmail(), requestBody.getPassword());
            String authToken = accountService.generateAuthToken(account);

            // Tạo cookie chứa authToken
            ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken)
                    .httpOnly(false) // có thể truy cập từ frontend
                    .maxAge(28 * 24 * 3600)
                    .path("/")
                    .secure(false)
                    .build();

            // Thêm cookie vào phản hồi
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            // Trả về thông tin người dùng và token trong phản hồi JSON
            return ResponseEntity.ok().body(Map.of("user", account, "token", authToken));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
//        final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", "")
//                .httpOnly(true)
//                .maxAge(0)
//                .path("/")
//                .secure(false)
//                .build();
//        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }
}
