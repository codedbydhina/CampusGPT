package com.campusgpt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.campusgpt.entity.ChatSession;
import com.campusgpt.entity.User;

public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {

	Optional<ChatSession> findBySessionId(String sessionId);

	Optional<ChatSession> findBySessionIdAndUser(String sessionId, User user);

	List<ChatSession> findByUserOrderByUpdatedAtDesc(User user);

	void deleteBySessionId(String sessionId);
	
	@Query("""
			SELECT COUNT(cs)
			FROM ChatSession cs
			WHERE cs.user.college.id = :collegeId
			""")
			long countByCollegeId(@Param("collegeId") Long collegeId);
	
	

}