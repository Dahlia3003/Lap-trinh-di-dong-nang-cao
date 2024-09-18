package com.teamtable.teamtable_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "otp_token")
public class OtpToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String email;

    private String otp;

    private LocalDateTime otpExpiry;

    public OtpToken(String email, String otp, LocalDateTime otpExpiry) {
        this.email = email;
        this.otp = otp;
        this.otpExpiry = otpExpiry;
    }

    public OtpToken() {
    }
}