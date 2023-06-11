package com.example.Login.service;

import com.example.Login.config.MessageStrings;
import com.example.Login.dto.SignInDto;
import com.example.Login.dto.SignUpResponseDto;
import com.example.Login.dto.SignupDto;
import com.example.Login.exceptions.AuthenticationFailException;
import com.example.Login.exceptions.CustomException;
import com.example.Login.model.User;
import com.example.Login.repository.UserRepository;
import jakarta.xml.bind.DatatypeConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;



    Logger logger = LoggerFactory.getLogger(UserService.class);

    public SignUpResponseDto signUp(SignupDto signupDto)  throws CustomException {

        if (Objects.nonNull(userRepository.findByEmail(signupDto.getEmail()))) {
            throw new CustomException("User already exists");
        }

        String encryptedPassword = signupDto.getPassword();
        try {
            encryptedPassword = hashPassword(signupDto.getPassword());

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            logger.error("hashing password failed {}", e.getMessage());
        }

        User user = new User(signupDto.getFirstName(), signupDto.getLastName(), signupDto.getEmail(), encryptedPassword );
        try {
            // save the User
            userRepository.save(user);
            return new SignUpResponseDto("success", "user created successfully");
        } catch (Exception e) {
            // handle signup error
            throw new CustomException(e.getMessage());
        }
    }

    String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());
        byte[] digest = md.digest();
        String myHash = DatatypeConverter
                .printHexBinary(digest).toUpperCase();
        return myHash;
    }

    public String signIn(SignInDto signInDto) throws AuthenticationFailException, CustomException {
        // first find User by email
        User user = userRepository.findByEmail(signInDto.getEmail());
        if(!Objects.nonNull(user)){
            throw new AuthenticationFailException("user not present");
        }
        try {
            // check if password is right
            if (!user.getPassword().equals(hashPassword(signInDto.getPassword()))){
                // passwords do not match
                throw  new AuthenticationFailException(MessageStrings.WRONG_PASSWORD);
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            logger.error("hashing password failed {}", e.getMessage());
            throw new CustomException(e.getMessage());
        }

        return user.getRole();

    }

}
