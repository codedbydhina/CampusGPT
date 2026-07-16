package com.campusgpt.service;

import com.campusgpt.dto.LoginRequest;
import com.campusgpt.dto.LoginResponse;

public interface AuthenticationService {

    LoginResponse login(LoginRequest request);

}