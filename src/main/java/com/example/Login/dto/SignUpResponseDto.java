package com.example.Login.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SignUpResponseDto {
    private String status;
    private String message;
}
