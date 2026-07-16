
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {

    getAllDocuments,

    viewDocument,

    downloadDocument,

    deleteDocument

} from "../../services/documentService";

import {

    FaEye,

    FaDownload,

    FaTrash

} from "react-icons/fa";

import Swal from "sweetalert2";

import "../../styles/faculty/my-documents.css";





function MyDocuments() {

    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDocuments();

    }, []);

    async function loadDocuments() {

        try {

            const data = await getAllDocuments();

            console.log("Documents API Response:", data);

            setDocuments(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete(id) {

        const result = await Swal.fire({

            title: "Delete Document?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#ef4444",

            cancelButtonColor: "#6b7280",

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            await deleteDocument(id);

            Swal.fire({

                icon: "success",

                title: "Deleted!",

                text: "Document deleted successfully."

            });

            loadDocuments();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to delete document."

            });

        }

    }



    return (

        <DashboardLayout>

            <div className="documents-page">

                <div className="documents-header">

                    <div>

                        <button
                            className="back-btn"
                            onClick={() => navigate("/faculty/dashboard")}
                        >

                            ← Back to Dashboard

                        </button>

                        <h1>My Documents</h1>

                        <p>

                            Manage all uploaded study materials.

                        </p>

                    </div>

                    <button
                        className="upload-btn"
                        onClick={() => navigate("/faculty/documents/upload")}
                    >

                        + Upload New

                    </button>

                </div>

                {loading ? (

                    <div className="loading">

                        Loading documents...

                    </div>

                ) : documents.length === 0 ? (

                    <div className="empty-state">

                        <h2>No Documents Found</h2>

                        <p>

                            Upload your first PDF to start training CampusGPT.

                        </p>

                    </div>

                ) : (

                    <div className="documents-table-wrapper">

                        <table className="documents-table">

                            <thead>

                                <tr>

                                    <th>Title</th>

                                    <th>Department</th>

                                    <th>Subject</th>

                                    <th>Uploaded By</th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {documents.map((doc) => (

                                    <tr key={doc.id}>

                                        <td>{doc.title}</td>

                                        <td>{doc.department}</td>

                                        <td>{doc.subject}</td>

                                        <td>{doc.uploadedBy}</td>

                                        <td>

                                            {doc.processed ? (

                                                <span className="status ready">

                                                    Ready

                                                </span>

                                            ) : (

                                                <span className="status processing">

                                                    Processing

                                                </span>

                                            )}

                                        </td>
                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="view-btn"
                                                    onClick={() => viewDocument(doc.id)}
                                                    title="View"
                                                    aria-label="View"
                                                >
                                                    <FaEye />
                                                </button>

                                                <button
                                                    className="download-btn"
                                                    onClick={() => downloadDocument(doc.id)}
                                                    title="Download"
                                                    aria-label="Download"
                                                >
                                                    <FaDownload />
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(doc.id)}
                                                    title="Delete"
                                                    aria-label="Delete"
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

}

export default MyDocuments;