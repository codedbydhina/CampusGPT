package com.campusgpt.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.campusgpt.dto.response.CollegeSummaryResponse;
import com.campusgpt.dto.response.DashboardStatsResponse;
import com.campusgpt.repository.ChatMessageRepository;
import com.campusgpt.repository.CollegeRepository;
import com.campusgpt.repository.DocumentRepository;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

	private final CollegeRepository collegeRepository;
	private final UserRepository userRepository;
	private final DocumentRepository documentRepository;
	private final ChatMessageRepository chatMessageRepository;

	public DashboardServiceImpl(CollegeRepository collegeRepository, UserRepository userRepository,
			DocumentRepository documentRepository, ChatMessageRepository chatMessageRepository) {

		this.collegeRepository = collegeRepository;
		this.userRepository = userRepository;
		this.documentRepository = documentRepository;
		this.chatMessageRepository = chatMessageRepository;
	}

	@Override
	public DashboardStatsResponse getDashboardStats() {

		return new DashboardStatsResponse(

				collegeRepository.count(),

				userRepository.count(),

				documentRepository.count(),

				chatMessageRepository.count()

		);
	}

	@Override
	public List<CollegeSummaryResponse> getRecentColleges() {

		return collegeRepository.findTop5ByOrderByCreatedAtDesc().stream().map(college -> new CollegeSummaryResponse(

				college.getId(), college.getCollegeName(), college.getCollegeCode(), college.getCity(),
				college.getActive()

		)).toList();

	}
}