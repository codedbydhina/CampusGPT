package com.campusgpt.service;

import java.util.List;

import com.campusgpt.dto.request.CreateFacultyRequest;
import com.campusgpt.dto.request.UpdateFacultyRequest;
import com.campusgpt.dto.response.FacultyResponse;

public interface FacultyService {

    void createFaculty(CreateFacultyRequest request);

    void updateFaculty(Long id, UpdateFacultyRequest request);

    void deleteFaculty(Long id);

    FacultyResponse getFacultyById(Long id);

    List<FacultyResponse> getAllFaculty();

}