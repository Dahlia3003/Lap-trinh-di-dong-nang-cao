package com.teamtable.teamtable_api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserInfoRequest {
    private String email;
    private String newName;
}