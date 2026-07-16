import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FaEye, FaDownload } from "react-icons/fa";
import {

    getStudentDocuments,

    viewStudentDocument,

    downloadStudentDocument

} from "../../services/studentService";
import "../../styles/student/student-documents.css";

function StudentDocuments() {

    const [documents, setDocuments] = useState([]);

    const [search, setSearch] = useState("");

    const [departmentFilter, setDepartmentFilter] = useState("");

    const [subjectFilter, setSubjectFilter] = useState("");

    const [yearFilter, setYearFilter] = useState("");

    const [semesterFilter, setSemesterFilter] = useState("");

    const departments = [...new Set(documents.map(doc => doc.department))];

    const subjects = [...new Set(documents.map(doc => doc.subject))];

    const years = [...new Set(documents.map(doc => doc.year))];

    const semesters = [...new Set(documents.map(doc => doc.semester))];

    useEffect(() => {
        loadDocuments();
    }, []);

    async function loadDocuments() {
        try {
            const data = await getStudentDocuments();
            setDocuments(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const filteredDocuments = documents.filter((doc) => {

        return (

            doc.title.toLowerCase().includes(search.toLowerCase())

            &&

            (departmentFilter === "" ||

                doc.department === departmentFilter)

            &&

            (subjectFilter === "" ||

                doc.subject === subjectFilter)

            &&

            (yearFilter === "" ||

                doc.year === yearFilter)

            &&

            (semesterFilter === "" ||

                doc.semester === semesterFilter)

        );

    });

    return (
        <DashboardLayout>

            <div className="student-documents-page">

                <div className="page-header">

                    <h1>
                        Student Documents
                    </h1>

                    <p>
                        Browse and access documents uploaded by your faculty.
                    </p>

                </div>

                <div className="document-toolbar">

                    <input

                        type="text"

                        placeholder="Search documents..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    <select

                        value={departmentFilter}

                        onChange={(e) => setDepartmentFilter(e.target.value)}

                    >

                        <option value="">All Departments</option>

                        {departments.map((department) => (

                            <option

                                key={department}

                                value={department}

                            >

                                {department}

                            </option>

                        ))}

                    </select>

                    <select

                        value={subjectFilter}

                        onChange={(e) => setSubjectFilter(e.target.value)}

                    >

                        <option value="">All Subjects</option>

                        {subjects.map((subject) => (

                            <option

                                key={subject}

                                value={subject}

                            >

                                {subject}

                            </option>

                        ))}

                    </select>

                    <select

                        value={yearFilter}

                        onChange={(e) => setYearFilter(e.target.value)}

                    >

                        <option value="">All Years</option>

                        {years.map((year) => (

                            <option

                                key={year}

                                value={year}

                            >

                                {year}

                            </option>

                        ))}

                    </select>

                    <select

                        value={semesterFilter}

                        onChange={(e) => setSemesterFilter(e.target.value)}

                    >

                        <option value="">All Semesters</option>

                        {semesters.map((semester) => (

                            <option

                                key={semester}

                                value={semester}

                            >

                                {semester}

                            </option>

                        ))}

                    </select>

                </div>

                <table className="documents-table">

                    <thead>

                        <tr>

                            <th>Title</th>

                            <th>Subject</th>

                            <th>Department</th>

                            <th>Year</th>

                            <th>Semester</th>

                            <th>Actions</th>

                        </tr>

                    </thead>
                    <tbody>

                        {filteredDocuments.length === 0 ? (

                            <tr>

                                <td

                                    colSpan="6"

                                    className="empty-documents"

                                >

                                    No documents found.

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

                                        <div className="action-buttons">

                                            <button
                                                className="view-btn"
                                                onClick={() => viewStudentDocument(doc.id)}
                                                title="View Document"
                                                aria-label="View Document"
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                className="download-btn"
                                                onClick={() => downloadStudentDocument(doc.id)}
                                                title="Download Document"
                                                aria-label="Download Document"
                                            >
                                                <FaDownload />
                                            </button>

                                        </div>

                                    </td>
                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </DashboardLayout>
    );
}

export default StudentDocuments;