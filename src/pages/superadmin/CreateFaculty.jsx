import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import Swal from "sweetalert2";

import {
    FaUniversity,
    FaUserTie
} from "react-icons/fa";

import { createFaculty } from "../../services/facultyService";
import { getAllColleges } from "../../services/collegeService";

function CreateFaculty() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const facultyListRoute =
        user.role === "SUPER_ADMIN"
            ? "/superadmin/faculty"
            : "/admin/faculty";

    const [loading, setLoading] = useState(false);

    const [colleges, setColleges] = useState([]);

    const [formData, setFormData] = useState({

        firstName: "",

        lastName: "",

        email: "",

        password: "",

        phone: "",

        department: "",

        collegeId: "",

        active: true

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

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    function validateForm() {

        if (!formData.firstName.trim()) return false;

        if (!formData.lastName.trim()) return false;

        if (!formData.email.trim()) return false;

        if (!formData.password.trim()) return false;

        if (!formData.phone.trim()) return false;

        if (!formData.department.trim()) return false;

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

            await createFaculty(formData);

            setLoading(false);

            await Swal.fire({

                icon: "success",

                title: "Faculty Created",

                text: "Faculty created successfully.",

                confirmButtonColor: "#2563eb"

            });

            navigate(facultyListRoute);

        } catch (error) {

            console.error(error);

            setLoading(false);

            Swal.fire({

                icon: "error",

                title: "Creation Failed",

                text: error.response?.data?.message || "Unable to create faculty."

            });



        }


    }

    return (

        <DashboardLayout>

            <div className="form-wrapper">

                <div className="create-header">

                    <div className="header-left">

                        <div className="header-icon">

                            👨‍🏫

                        </div>

                        <div>

                            <h1>Create Faculty</h1>

                            <p>

                                Register a faculty member for a college.

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

                        <FaUserTie />

                        <span>Faculty Information</span>

                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>First Name</label>

                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Last Name</label>

                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter login password"
                            />

                        </div>

                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Department</label>

                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            />

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

                        <div className="form-group">

                            <label>Status</label>

                            <select
                                name="active"
                                value={formData.active}
                                onChange={handleChange}
                            >

                                <option value={true}>

                                    Active

                                </option>

                                <option value={false}>

                                    Inactive

                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="form-footer">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate(facultyListRoute)}
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="gradient-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating Faculty..."
                                : "Create Faculty"}

                        </button>

                    </div>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default CreateFaculty;


