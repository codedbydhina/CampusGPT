package com.campusgpt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.campusgpt.entity.College;
import com.campusgpt.entity.Role;
import com.campusgpt.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);

	List<User> findByCollegeId(Long collegeId);

	List<User> findByCollegeIdAndRole(Long collegeId, Role role);

	Optional<User> findByCollegeAndRole(College college, Role role);

	long countByRole(Role role);
	
	@Query("""
		    SELECT u
		    FROM User u
		    LEFT JOIN FETCH u.college
		""")
		List<User> findAllWithCollege();
	
	@Query("""
		    SELECT u
		    FROM User u
		    LEFT JOIN FETCH u.college
		    WHERE u.id = :id
		""")
		Optional<User> findByIdWithCollege(Long id);
	
	long countByCollegeIdAndRole(Long collegeId, Role role);
	
}