package com.campusgpt.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.response.DocumentResponse;
import com.campusgpt.service.DocumentService;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

	private final DocumentService documentService;

	public DocumentController(DocumentService documentService) {
		this.documentService = documentService;
	}

	@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ApiResponse> uploadDocument(

			@RequestParam("file") MultipartFile file,

			@RequestParam(value = "title", required = false) String title,

			@RequestParam(value = "subject", required = false) String subject,

			@RequestParam(value = "department", required = false) String department,

			@RequestParam(value = "year", required = false) String year,

			@RequestParam(value = "semester", required = false) String semester,

			@RequestParam("collegeId") Long collegeId,

			@RequestParam("uploadedBy") Long uploadedBy

	) {

		return ResponseEntity.ok(

				documentService.uploadDocument(

						file, title, subject, department, year, semester, collegeId, uploadedBy

				)

		);

	}

	@GetMapping
	public ResponseEntity<List<DocumentResponse>> getAllDocuments() {

		return ResponseEntity.ok(

				documentService.getAllDocuments()

		);

	}

	@GetMapping("/{id}")
	public ResponseEntity<DocumentResponse> getDocument(

			@PathVariable Long id

	) {

		return ResponseEntity.ok(

				documentService.getDocumentById(id)

		);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteDocument(

			@PathVariable Long id

	) {

		return ResponseEntity.ok(

				documentService.deleteDocument(id)

		);

	}

	@GetMapping("/view/{id}")
	public ResponseEntity<Resource> viewDocument(@PathVariable Long id) throws IOException {

		return documentService.viewDocument(id);

	}
	
	@GetMapping("/download/{id}")
	public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) throws IOException {

	    return documentService.downloadDocument(id);

	}

}