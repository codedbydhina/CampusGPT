import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import Swal from "sweetalert2";

import {
    FaUniversity,
    FaUserGraduate
} from "react-icons/fa";

import { createStudent } from "../../services/studentService";
import { getAllColleges } from "../../services/collegeService";

function CreateStudent() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const studentListRoute =
        user?.role === "SUPER_ADMIN"
            ? "/superadmin/students"
            : "/admin/students";

    const [loading, setLoading] = useState(false);

    const [colleges, setColleges] = useState([]);

    const [formData, setFormData] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        registerNumber: "",

        department: "",

        year: "",

        collegeId: ""

    });

    useEffect(() => {

        loadColleges();

    }, []);

    async function loadColleges() {

        try {

            const data = await getAllColleges();

            setColleges(data);

        } catch (error) {

            console.error(error);

        }

    }

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    function validateForm() {

        if (!formData.firstName.trim()) return false;

        if (!formData.lastName.trim()) return false;

        if (!formData.email.trim()) return false;

        if (!formData.phone.trim()) return false;

        if (!formData.registerNumber.trim()) return false;

        if (!formData.department.trim()) return false;

        if (!formData.year) return false;

        if (!formData.collegeId) return false;

        return true;

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!validateForm()) {

            Swal.fire({

                icon: "warning",

                title: "Missing Information",

                text: "Please fill all required fields."

            });

            return;

        }

        try {

            setLoading(true);

            await createStudent(formData);

            setLoading(false);

            await Swal.fire({

                icon: "success",

                title: "Student Created",

                text: "Student created successfully.",

                confirmButtonColor: "#2563eb"

            });

            navigate(studentListRoute);

        } catch (error) {

            console.error(error);

            setLoading(false);

            Swal.fire({

                icon: "error",

                title: "Creation Failed",

                text: error.response?.data?.message ||

                    "Unable to create student."

            });

        }

    }

    return (

        <DashboardLayout>

            <div className="form-wrapper">

                <div className="create-header">

                    <div className="header-left">

                        <div className="header-icon">

                            🎓

                        </div>

                        <div>

                            <h1>Create Student</h1>

                            <p>

                                Register a new student into the CampusGPT platform.

                            </p>

                        </div>

                    </div>

                    <div className="header-badge">

                        CampusGPT

                    </div>

                </div>

                <form
                    className="form-card"
                    onSubmit={handleSubmit}
                >

                    <div className="section-title">

                        <FaUserGraduate />

                        <span>Student Information</span>

                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>First Name</label>

                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                            />

                        </div>

                        <div className="form-group">

                            <label>Last Name</label>

                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                            />

                        </div>

                        <div className="form-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />

                        </div>

                        <div className="form-group">

                            <label>Phone Number</label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />

                        </div>

                        <div className="form-group">

                            <label>Register Number</label>

                            <input
                                type="text"
                                name="registerNumber"
                                value={formData.registerNumber}
                                onChange={handleChange}
                                placeholder="Enter register number"
                            />

                        </div>

                        <div className="form-group">

                            <label>Department</label>

                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="Enter department"
                            />

                        </div>

                        <div className="form-group">

                            <label>Academic Year</label>

                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                            >

                                <option value="">

                                    Select Year

                                </option>

                                <option value="I">I Year</option>

                                <option value="II">II Year</option>

                                <option value="III">III Year</option>

                                <option value="IV">IV Year</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>College</label>

                            <select
                                name="collegeId"
                                value={formData.collegeId}
                                onChange={handleChange}
                            >

                                <option value="">

                                    Select College

                                </option>

                                {colleges.map((college) => (

                                    <option
                                        key={college.id}
                                        value={college.id}
                                    >

                                        {college.collegeName}

                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>

                    <div className="form-footer">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate(studentListRoute)}
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="gradient-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating Student..."
                                : "Create Student"}

                        </button>

                    </div>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default CreateStudent;