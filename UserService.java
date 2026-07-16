package com.campusgpt.service;

import com.campusgpt.dto.request.CreateUserRequest;
import com.campusgpt.dto.request.UpdateUserRequest;
import com.campusgpt.dto.response.UserResponse;

public interface UserService {

    UserResponse createUser(CreateUserRequest request);
    
    void updateUser(Long userId, UpdateUserRequest request);
    
    void deleteUser(Long userId);

}