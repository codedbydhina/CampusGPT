package com.campusgpt.service;

import java.util.List;

import com.campusgpt.dto.response.UserDetailsResponse;
import com.campusgpt.dto.response.UserListResponse;

public interface UserManagementService {

    List<UserListResponse> getAllUsers();

	UserDetailsResponse getUserById(Long id);

}