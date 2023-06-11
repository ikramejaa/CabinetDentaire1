package com.example.Login.controller;

import com.example.Login.config.MessageStrings;
import com.example.Login.dto.SignInDto;
import com.example.Login.dto.SignupDto;
import com.example.Login.dto.SignUpResponseDto;
import com.example.Login.exceptions.AuthenticationFailException;
import com.example.Login.exceptions.CustomException;
import com.example.Login.model.User;
import com.example.Login.repository.UserRepository;
import com.example.Login.service.UserService;
import jakarta.xml.bind.DatatypeConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;


@RequestMapping("user")
@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;
    @PostMapping("/signup")
    public SignUpResponseDto Signup(@RequestBody SignupDto signupDto) throws CustomException {
        return userService.signUp(signupDto);
    }

    @PostMapping("/signin")
    public String Signin(@RequestBody SignInDto signInDto) throws CustomException, AuthenticationFailException {
        return userService.signIn(signInDto);
    }

    @PostMapping("/mail")
    public boolean findEmail(String email) throws CustomException {
        System.out.println("@@@ ligne1" + email);

        boolean emailExists = userRepository.existsByEmail(email);
        if (emailExists) {
            System.out.println("j'ai été là");
            return true;
        } else {
            System.out.println("aussi ici");
            return false;
        }
    }

}
