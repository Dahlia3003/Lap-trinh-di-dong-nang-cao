package com.teamtable.teamtable_api.dto;

import com.teamtable.teamtable_api.model.Account;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountInfoDto {

    private String firstName;
    private String lastName;
    private String email;
    private String picture;
}