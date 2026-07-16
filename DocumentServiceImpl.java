package com.campusgpt.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.campusgpt.ai.EmbeddingService;
import com.campusgpt.ai.PdfTextExtractor;
import com.campusgpt.ai.TextChunker;
import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.response.DocumentResponse;
import com.campusgpt.entity.College;
import com.campusgpt.entity.Document;
import com.campusgpt.entity.DocumentChunk;
import com.campusgpt.entity.User;
import com.campusgpt.repository.CollegeRepository;
import com.campusgpt.repository.DocumentChunkRepository;
import com.campusgpt.repository.DocumentRepository;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.service.DocumentService;
import com.campusgpt.util.JsonUtil;

@Service
public class DocumentServiceImpl implements DocumentService {

	private static final String UPLOAD_DIR = "uploads";

	private final DocumentRepository documentRepository;
	private final DocumentChunkRepository documentChunkRepository;
	private final EmbeddingService embeddingService;
	private final CollegeRepository collegeRepository;
	private final UserRepository userRepository;
	private final PdfTextExtractor pdfTextExtractor;
	private final TextChunker textChunker;

	public DocumentServiceImpl(DocumentRepository documentRepository, DocumentChunkRepository documentChunkRepository,
			CollegeRepository collegeRepository, UserRepository userRepository, PdfTextExtractor pdfTextExtractor,
			TextChunker textChunker, EmbeddingService embeddingService) {

		this.documentRepository = documentRepository;
		this.documentChunkRepository = documentChunkRepository;
		this.collegeRepository = collegeRepository;
		this.userRepository = userRepository;
		this.pdfTextExtractor = pdfTextExtractor;
		this.textChunker = textChunker;
		this.embeddingService = embeddingService;
	}

	@Override
	public ApiResponse uploadDocument(MultipartFile file, String title, String subject, String department, String year,
			String semester, Long collegeId, Long uploadedBy) {
		try {

			if (file == null || file.isEmpty()) {
				return new ApiResponse(false, "Please select a file.");
			}

			College college = collegeRepository.findById(collegeId)
					.orElseThrow(() -> new RuntimeException("College not found"));

			User user = userRepository.findById(uploadedBy).orElseThrow(() -> new RuntimeException("User not found"));

			Path uploadPath = Paths.get(UPLOAD_DIR);

			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}

			String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

			Path filePath = uploadPath.resolve(uniqueFileName);

			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

			Document document = new Document();

			// Metadata
			document.setTitle(title != null ? title : file.getOriginalFilename());
			document.setSubject(subject != null ? subject : "General");
			document.setDepartment(department != null ? department : "General");
			document.setYear(year != null ? year : "N/A");
			document.setSemester(semester != null ? semester : "N/A");

			// File Details
			document.setFileName(uniqueFileName);
			document.setOriginalFileName(file.getOriginalFilename());
			document.setFileType(file.getContentType());
			document.setFileSize(file.getSize());
			document.setFilePath(filePath.toString());

			// Relations
			document.setCollege(college);
			document.setUploadedBy(user);

			// Status
			document.setProcessed(false);

			documentRepository.save(document);

			String extractedText = pdfTextExtractor.extractText(filePath.toString());

			System.out.println("Extracted Text Length = " + extractedText.length());

			System.out.println("======================================");
			System.out.println("PDF TEXT EXTRACTED");
			System.out.println("======================================");

			List<String> chunks = textChunker.chunkText(extractedText);

			int chunkIndex = 0;

			for (String chunk : chunks) {

				DocumentChunk documentChunk = new DocumentChunk();

				documentChunk.setDocument(document);

				documentChunk.setChunkIndex(chunkIndex);

				documentChunk.setChunkText(chunk);

				documentChunk.setTokenCount(chunk.length());

				List<Double> embedding = embeddingService.generateEmbedding(chunk);

				documentChunk.setEmbedding(JsonUtil.toJson(embedding));

				documentChunk.setEmbedded(true);

				documentChunkRepository.save(documentChunk);

				chunkIndex++;
			}

			// Document processing completed successfully
			document.setProcessed(true);

			documentRepository.save(document);

			return new ApiResponse(true, "Document uploaded successfully.");

		} catch (IOException e) {

			return new ApiResponse(false, "File upload failed: " + e.getMessage());

		} catch (Exception e) {

			e.printStackTrace();

			return new ApiResponse(false, "Error: " + e.getMessage());

		}
	}

	@Override
	public List<DocumentResponse> getAllDocuments() {

		return documentRepository.findAll()

				.stream()

				.map(document ->

				new DocumentResponse(

						document.getId(),

						document.getTitle(),

						document.getSubject(),

						document.getDepartment(),

						document.getYear(),

						document.getSemester(),

						document.getOriginalFileName(),

						document.getFileType(),

						document.getFileSize(),

						document.getProcessed(),

						document.getUploadedAt(),

						document.getCollege().getCollegeName(),

						document.getUploadedBy().getFirstName()

								+ " "

								+ document.getUploadedBy().getLastName()

				)

				)

				.toList();

	}

	@Override
	public List<DocumentResponse> getDocumentsByCollege(Long collegeId) {

		return documentRepository.findByCollegeId(collegeId)

				.stream()

				.map(document ->

				new DocumentResponse(

						document.getId(),

						document.getTitle(),

						document.getSubject(),

						document.getDepartment(),

						document.getYear(),

						document.getSemester(),

						document.getOriginalFileName(),

						document.getFileType(),

						document.getFileSize(),

						document.getProcessed(),

						document.getUploadedAt(),

						document.getCollege().getCollegeName(),

						document.getUploadedBy().getFirstName()

				)

				)

				.toList();

	}

	@Override
	public DocumentResponse getDocumentById(Long id) {

		Document document = documentRepository.findById(id)

				.orElseThrow(() ->

				new RuntimeException("Document not found."));

		return new DocumentResponse(

				document.getId(),

				document.getTitle(),

				document.getSubject(),

				document.getDepartment(),

				document.getYear(),

				document.getSemester(),

				document.getOriginalFileName(),

				document.getFileType(),

				document.getFileSize(),

				document.getProcessed(),

				document.getUploadedAt(),

				document.getCollege().getCollegeName(),

				document.getUploadedBy().getFirstName()

						+ " "

						+ document.getUploadedBy().getLastName()

		);

	}

	@Override
	public ApiResponse deleteDocument(Long id) {

	    Document document = documentRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Document not found"));

	    try {

	        Files.deleteIfExists(Paths.get(document.getFilePath()));

	    } catch (IOException e) {

	        e.printStackTrace();

	    }

	    documentChunkRepository.deleteAll(

	            documentChunkRepository.findByDocument(document)

	    );

	    documentRepository.delete(document);

	    return new ApiResponse(

	            true,

	            "Document deleted successfully."

	    );

	}

	@Override
	public ResponseEntity<Resource> viewDocument(Long id) throws IOException {

		Document document = documentRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Document not found"));

		Path path = Paths.get(document.getFilePath());

		Resource resource = new UrlResource(path.toUri());

		if (!resource.exists()) {

			throw new RuntimeException("File not found");

		}

		return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF)
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + document.getOriginalFileName() + "\"")
				.body(resource);

	}

	@Override
	public ResponseEntity<Resource> downloadDocument(Long id) throws IOException {

	    Document document = documentRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Document not found"));

	    Path path = Paths.get(document.getFilePath());

	    Resource resource = new UrlResource(path.toUri());

	    if (!resource.exists()) {

	        throw new RuntimeException("File not found");

	    }

	    return ResponseEntity.ok()

	            .contentType(MediaType.APPLICATION_PDF)

	            .header(
	                    HttpHeaders.CONTENT_DISPOSITION,
	                    "attachment; filename=\"" + document.getOriginalFileName() + "\""
	            )

	            .body(resource);

	}
}