package com.teamtable.teamtable_api.repository;

import com.teamtable.teamtable_api.model.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {
    Optional<OtpToken> findByEmail(String email);
}