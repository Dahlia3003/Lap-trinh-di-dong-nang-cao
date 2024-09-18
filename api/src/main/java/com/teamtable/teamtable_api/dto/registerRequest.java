package com.teamtable.teamtable_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class registerRequest {
    private String name;
    private String email;
    private String password;
}
