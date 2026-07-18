package com.cognizant.jwthandson.controller;

import com.cognizant.jwthandson.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(
            @RequestHeader("Authorization") String authHeader) {

        LOGGER.info("START");
        LOGGER.debug("Authorization Header: {}", authHeader);

        String user = getUser(authHeader);

        Map<String, String> map = new HashMap<>();
        map.put("token", jwtUtil.generateToken(user));

        LOGGER.info("END");

        return map;
    }

    private String getUser(String authHeader) {

        LOGGER.info("START");

        String encodedCredentials = authHeader.substring("Basic ".length());

        byte[] decodedBytes = Base64.getDecoder().decode(encodedCredentials);

        String credentials = new String(decodedBytes, StandardCharsets.UTF_8);

        LOGGER.debug("Credentials : {}", credentials);

        String user = credentials.substring(0, credentials.indexOf(":"));

        LOGGER.debug("User : {}", user);

        LOGGER.info("END");

        return user;
    }
}