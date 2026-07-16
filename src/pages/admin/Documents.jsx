import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import "../../styles/admin/documents.css";

import {
    FaEye,
    FaDownload,
    FaTrash
} from "react-icons/fa";

import Swal from "sweetalert2";

import {
    getAllDocuments,
    deleteDocument,
    viewDocument,
    downloadDocument
} from "../../services/documentService";

function Documents() {

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [departmentFilter, setDepartmentFilter] = useState("");

    const [semesterFilter, setSemesterFilter] = useState("");

    useEffect(() => {

        loadDocuments();

    }, []);

    async function loadDocuments() {

        try {

            const data = await getAllDocuments();

            setDocuments(data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load documents."
            });

        }

        finally {

            setLoading(false);

        }

    }

    const totalDepartments = [

        ...new Set(documents.map(doc => doc.department))

    ].length;

    const totalSubjects = [

        ...new Set(documents.map(doc => doc.subject))

    ].length;


    const filteredDocuments = useMemo(() => {

        return documents.filter((doc) => {

            const matchesSearch =

                doc.title.toLowerCase().includes(search.toLowerCase())

                ||

                doc.subject.toLowerCase().includes(search.toLowerCase())

                ||

                doc.department.toLowerCase().includes(search.toLowerCase());

            const matchesDepartment =

                departmentFilter === ""

                ||

                doc.department === departmentFilter;

            const matchesSemester =

                semesterFilter === ""

                ||

                doc.semester === semesterFilter;

            return (

                matchesSearch

                &&

                matchesDepartment

                &&

                matchesSemester

            );

        });

    }, [

        documents,

        search,

        departmentFilter,

        semesterFilter

    ]);

    return (
        <DashboardLayout>

            <div className="documents-page">

                <div className="documents-header">

                    <div>
                        <h1>Document Management</h1>

                        <p>
                            Manage all documents uploaded by faculty in your college.
                        </p>
                    </div>

                </div>

                <div className="documents-table-card">

                    {/* Statistics Cards */}

                    <div className="document-stats">

                        <div className="document-stat-card">
                            <h4>Total Documents</h4>
                            <h2>{documents.length}</h2>
                        </div>

                        <div className="document-stat-card">
                            <h4>Departments</h4>
                            <h2>{totalDepartments}</h2>
                        </div>

                        <div className="document-stat-card">
                            <h4>Subjects</h4>
                            <h2>{totalSubjects}</h2>
                        </div>

                    </div>

                    {/* Search & Filters */}

                    <div className="document-filter-bar">

                        <input
                            type="text"
                            placeholder="Search by Title, Subject or Department..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            value={departmentFilter}
                            onChange={(e) =>
                                setDepartmentFilter(e.target.value)
                            }
                        >

                            <option value="">
                                All Departments
                            </option>

                            {[...new Set(documents.map(doc => doc.department))]

                                .map((department) => (

                                    <option
                                        key={department}
                                        value={department}
                                    >
                                        {department}
                                    </option>

                                ))}

                        </select>

                        <select
                            value={semesterFilter}
                            onChange={(e) =>
                                setSemesterFilter(e.target.value)
                            }
                        >

                            <option value="">
                                All Semesters
                            </option>

                            {[...new Set(documents.map(doc => doc.semester))]

                                .map((semester) => (

                                    <option
                                        key={semester}
                                        value={semester}
                                    >
                                        {semester}
                                    </option>

                                ))}

                        </select>

                    </div>

                    {/* Documents Table */}

                    <table className="documents-table">

                        <thead>

                            <tr>

                                <th>Title</th>

                                <th>Subject</th>

                                <th>Department</th>

                                <th>Year</th>

                                <th>Semester</th>

                                <th>Uploaded</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td colSpan="7">

                                        Loading...

                                    </td>

                                </tr>

                            ) : filteredDocuments.length === 0 ? (

                                <tr>

                                    <td colSpan="7">

                                        No Documents Found

                                    </td>

                                </tr>

                            ) : (

                                filteredDocuments.map((doc) => (

                                    <tr key={doc.id}>

                                        <td>{doc.title}</td>

                                        <td>{doc.subject}</td>

                                        <td>{doc.department}</td>

                                        <td>{doc.year}</td>

                                        <td>{doc.semester}</td>

                                        <td>

                                            {new Date(doc.uploadedAt).toLocaleDateString()}

                                        </td>

                                        <td>

                                            <div className="document-actions">

                                                <button
                                                    className="view-btn"
                                                    onClick={() => viewDocument(doc.id)}
                                                >

                                                    <FaEye />

                                                </button>

                                                <button
                                                    className="download-btn"
                                                    onClick={() => downloadDocument(doc.id)}
                                                >

                                                    <FaDownload />

                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(doc.id)}
                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );

}

export default Documents;