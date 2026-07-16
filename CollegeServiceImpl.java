package com.campusgpt.service.impl;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.CollegeRegisterRequest;
import com.campusgpt.dto.request.UpdateCollegeRequest;
import com.campusgpt.entity.College;
import com.campusgpt.entity.Role;
import com.campusgpt.entity.User;
import com.campusgpt.repository.CollegeRepository;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.service.CollegeService;
import com.campusgpt.service.EmailService;
@Service
@Transactional
public class CollegeServiceImpl implements CollegeService {

    private final CollegeRepository collegeRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public CollegeServiceImpl(
            CollegeRepository collegeRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {

        this.collegeRepository = collegeRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public ApiResponse registerCollege(CollegeRegisterRequest request) {

        if (collegeRepository.existsByCollegeCode(request.getCollegeCode())) {
            return new ApiResponse(false, "College code already exists.");
        }

        if (collegeRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse(false, "College email already exists.");
        }

        if (userRepository.existsByEmail(request.getAdminEmail())) {
            return new ApiResponse(false, "College admin email already exists.");
        }

        // Create College
        College college = new College();
        college.setCollegeName(request.getCollegeName());
        college.setCollegeCode(request.getCollegeCode());
        college.setEmail(request.getEmail());
        college.setPhone(request.getPhone());
        college.setAddress(request.getAddress());
        college.setCity(request.getCity());
        college.setState(request.getState());
        college.setCountry(request.getCountry());
        college.setActive(true);

        College savedCollege = collegeRepository.save(college);
        System.out.println("College Saved Successfully");

        // Create College Admin
        User admin = new User();
        admin.setFirstName(request.getAdminFirstName());
        admin.setLastName(request.getAdminLastName());
        admin.setEmail(request.getAdminEmail());
        admin.setPassword(passwordEncoder.encode(request.getAdminPassword()));
        admin.setRole(Role.COLLEGE_ADMIN);
        admin.setCollege(savedCollege);
        admin.setActive(true);
        admin.setVerified(true);

        userRepository.save(admin);
        
        String subject = "Welcome to CampusGPT";

        String body = """
        Dear %s %s,

        Welcome to CampusGPT!

        Your college has been successfully registered.

        College:
        %s

        Login URL:
        http://localhost:5173/login

        Email:
        %s

        Temporary Password:
        %s

        Please log in and change your password after your first login.

        Regards,
        CampusGPT Team
        """.formatted(
                admin.getFirstName(),
                admin.getLastName(),
                savedCollege.getCollegeName(),
                admin.getEmail(),
                request.getAdminPassword()
        );

        try {

            emailService.sendEmail(
                    admin.getEmail(),
                    subject,
                    body
            );

            System.out.println("Welcome email sent successfully.");

        } catch (Exception e) {

            System.out.println("Email sending failed: " + e.getMessage());

        }
        
        System.out.println("College Admin Saved Successfully");

        return new ApiResponse(true, "College and College Admin created successfully.");
    }

    @Override
    public void updateCollege(Long id, UpdateCollegeRequest request) {

        College college = collegeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("College not found"));

        college.setCollegeName(request.getCollegeName());
        college.setCollegeCode(request.getCollegeCode());
        college.setEmail(request.getEmail());
        college.setPhone(request.getPhone());
        college.setAddress(request.getAddress());
        college.setCity(request.getCity());
        college.setState(request.getState());
        college.setCountry(request.getCountry());
        college.setActive(request.getActive());

        collegeRepository.save(college);

    }

    @Override
    public void deleteCollege(Long id) {

        College college = collegeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("College not found"));

        try {

            collegeRepository.delete(college);

            // Execute DELETE immediately
            collegeRepository.flush();

        } catch (DataIntegrityViolationException ex) {

            throw new RuntimeException(
                    "Cannot delete this college because users are still assigned to it."
            );

        }
    }

}