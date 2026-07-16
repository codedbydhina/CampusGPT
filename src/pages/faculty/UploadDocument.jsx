import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import "../../styles/faculty/upload-document.css";

import Swal from "sweetalert2";

import {
    FaCloudUploadAlt,
    FaArrowLeft,
    FaFilePdf
} from "react-icons/fa";


import {

    uploadDocument,

    cancelUpload

} from "../../services/documentService";

import { FaTimesCircle } from "react-icons/fa";

function UploadDocument() {

    const navigate = useNavigate();

    const [dragActive, setDragActive] = useState(false);

    const [user, setUser] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [uploadProgress, setUploadProgress] = useState(0);

    const fileSize = selectedFile
        ? (selectedFile.size / (1024 * 1024)).toFixed(2)
        : 0;

    useEffect(() => {

        setUser({

            id: Number(localStorage.getItem("userId")),

            collegeId: Number(localStorage.getItem("collegeId"))

        });

    }, []);
    async function loadProfile() {

        try {

            const profile = await getProfile();

            console.log("PROFILE:", profile);

            setUser(profile);

        } catch (error) {

            console.error(error);

        }

    }

    function handleFileChange(e) {

        if (e.target.files.length > 0) {

            setSelectedFile(e.target.files[0]);

        }

    }

    function handleDragOver(e) {

        e.preventDefault();

        setDragActive(true);

    }

    function handleDragLeave(e) {

        e.preventDefault();

        setDragActive(false);

    }

    function handleDrop(e) {

        e.preventDefault();

        setDragActive(false);

        const files = e.dataTransfer.files;

        if (!files.length) {

            return;

        }

        if (files[0].type !== "application/pdf") {

            Swal.fire({

                icon: "warning",

                title: "Invalid File",

                text: "Only PDF files are allowed."

            });

            return;

        }

        setSelectedFile(files[0]);

    }



    async function handleUpload() {


        console.log("Upload clicked");

        console.log("User:", user);

        console.log("Selected File:", selectedFile);

        console.log("UserId:", localStorage.getItem("userId"));

        console.log("CollegeId:", localStorage.getItem("collegeId"));

        if (!selectedFile) {

            Swal.fire({

                icon: "warning",

                title: "No File Selected",

                text: "Please choose a PDF file."

            });

            return;

        }

        if (!user) {

            Swal.fire({

                icon: "error",

                title: "User Not Loaded"

            });

            return;

        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("file", selectedFile);

            formData.append("collegeId", user.collegeId);

            formData.append("uploadedBy", user.id);

            const response = await uploadDocument(

                formData,

                (progressEvent) => {

                    const percent = Math.round(

                        (progressEvent.loaded * 100) /

                        progressEvent.total

                    );

                    setUploadProgress(percent);

                }

            );

            setLoading(false);

            setUploadProgress(0);

            Swal.fire({

                icon: "success",

                title: "Upload Successful",

                text: response.message || "Document uploaded successfully."



            });

            setSelectedFile(null);

        } catch (error) {

            setLoading(false);

            setUploadProgress(0);

            if (error.name === "CanceledError") {

                Swal.fire({

                    icon: "info",

                    title: "Upload Cancelled"

                });

            } else {

                Swal.fire({

                    icon: "error",

                    title: "Upload Failed",

                    text:

                        error.response?.data?.message ||

                        "Unable to upload document."

                });

            }
        }

    }
    return (

        <DashboardLayout>

            <div className="upload-page">

                <div className="upload-header">

                    <div className="back-btn-container">

                        <button
                            className="back-btn"
                            onClick={() => navigate("/faculty/dashboard")}
                        >
                            <FaArrowLeft />
                            <span>Back to Dashboard</span>
                        </button>

                    </div>

                    <h1>Upload Study Material</h1>

                    <p>
                        Upload PDF documents to build the CampusGPT AI Knowledge Base.
                    </p>

                </div>

                <div
                    className={`upload-box ${dragActive ? "drag-active" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >

                    <FaCloudUploadAlt className="upload-cloud" />

                    <h2>Drag & Drop PDF Here</h2>

                    <p>or</p>

                    <input
                        id="pdfUpload"
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={handleFileChange}
                    />

                    <label
                        htmlFor="pdfUpload"
                        className="browse-btn"
                    >
                        Browse PDF
                    </label>

                </div>

                {selectedFile && (

                    <div className="file-preview">

                        <div className="file-left">

                            <FaFilePdf className="pdf-icon" />

                            <div>

                                <h3>{selectedFile.name}</h3>

                                <span>{fileSize} MB</span>

                            </div>

                        </div>

                    </div>

                )}

                <div className="upload-footer">

                    {loading && (

                        <button
                            className="cancel-upload-btn"
                            onClick={() => {
                                cancelUpload();
                                setLoading(false);
                                setUploadProgress(0);
                            }}
                        >
                            <FaTimesCircle />
                            <span>Cancel Upload</span>
                        </button>

                    )}

                    <button

                        className="secondary-btn"

                        onClick={() => navigate("/faculty/dashboard")}

                    >

                        Cancel

                    </button>

                    {loading && (

                        <div className="upload-progress">

                            <div className="progress-track">

                                <div

                                    className="progress-fill"

                                    style={{

                                        width: `${uploadProgress}%`

                                    }}

                                />

                            </div>

                            <p>

                                Uploading...

                                {uploadProgress}%

                            </p>

                        </div>

                    )}

                    <button

                        className="primary-btn"

                        onClick={handleUpload}

                        disabled={!selectedFile || loading}

                    >

                        {loading ? "Uploading..." : "Upload Document"}

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default UploadDocument;