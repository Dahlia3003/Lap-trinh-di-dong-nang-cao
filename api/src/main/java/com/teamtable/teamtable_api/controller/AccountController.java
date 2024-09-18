package com.teamtable.teamtable_api.controller;

import com.teamtable.teamtable_api.dto.ChangePasswordRequest;
import com.teamtable.teamtable_api.dto.UpdateUserInfoRequest;
import com.teamtable.teamtable_api.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

import static com.teamtable.teamtable_api.dto.ListGroupInfoDto.convertListGroupToListGroupInfoDto;

@RestController
@RequestMapping("/v1/user")
public class AccountController {

    @Autowired
    AccountService accountService;

    @PostMapping("/update-info")
    public ResponseEntity<String> updateUserInfo(@RequestBody UpdateUserInfoRequest request) {
        try {
            accountService.updateUserInfo(request.getEmail(), request.getNewName());
            return ResponseEntity.ok("User info updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
