import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import Swal from "sweetalert2";

import {
    FaUniversity,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCity,
    FaGlobe,
    FaUserTie,
    FaLock
} from "react-icons/fa";

import { createCollege } from "../../services/collegeService";

function CreateCollege() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        collegeName: "",
        collegeCode: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",

        adminFirstName: "",
        adminLastName: "",
        adminEmail: "",
        adminPassword: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    function validateForm() {

        if (!formData.collegeName.trim()) return false;

        if (!formData.collegeCode.trim()) return false;

        if (!formData.email.trim()) return false;

        if (!formData.phone.trim()) return false;

        if (!formData.address.trim()) return false;

        if (!formData.city.trim()) return false;

        if (!formData.state.trim()) return false;

        if (!formData.country.trim()) return false;

        if (!formData.adminFirstName.trim()) return false;

        if (!formData.adminLastName.trim()) return false;

        if (!formData.adminEmail.trim()) return false;

        if (!formData.adminPassword.trim()) return false;

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

            await createCollege(formData);

            setLoading(false);

            await Swal.fire({

                icon: "success",

                title: "College Registered",

                text: "College and Administrator created successfully.",

                confirmButtonColor: "#2563eb"

            });

            navigate("/superadmin/colleges");

        } catch (error) {

            console.error(error);

            setLoading(false);

            Swal.fire({

                icon: "error",

                title: "Registration Failed",

                text: "Unable to create the college."

            });

        }

    }

    return (

        <DashboardLayout>

            <div className="form-wrapper">

                <div className="create-header">

                    <div className="header-left">

                        <div className="header-icon">

                            🏫

                        </div>

                        <div>

                            <h1>Create College</h1>

                            <p>
                                Register a new college and its administrator.
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

                        <FaUniversity />

                        <span>College Information</span>

                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>College Name</label>

                            <input
                                type="text"
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleChange}
                                placeholder="Kongu Engineering College"
                            />

                        </div>

                        <div className="form-group">

                            <label>College Code</label>

                            <input
                                type="text"
                                name="collegeCode"
                                value={formData.collegeCode}
                                onChange={handleChange}
                                placeholder="KEC001"
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="info@college.edu"
                            />

                        </div>

                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 9876543210"
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Address</label>

                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="College Address"
                            />

                        </div>

                        <div className="form-group">

                            <label>City</label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Erode"
                            />

                        </div>

                        <div className="form-group">

                            <label>State</label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Tamil Nadu"
                            />

                        </div>

                        <div className="form-group">

                            <label>Country</label>

                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="India"
                            />

                        </div>

                    </div>

                    <div className="section-title">

                        <FaUserTie />

                        <span>College Administrator</span>

                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>First Name</label>

                            <input
                                type="text"
                                name="adminFirstName"
                                value={formData.adminFirstName}
                                onChange={handleChange}
                                placeholder="John"
                            />

                        </div>

                        <div className="form-group">

                            <label>Last Name</label>

                            <input
                                type="text"
                                name="adminLastName"
                                value={formData.adminLastName}
                                onChange={handleChange}
                                placeholder="Doe"
                            />

                        </div>

                        <div className="form-group">

                            <label>Admin Email</label>

                            <input
                                type="email"
                                name="adminEmail"
                                value={formData.adminEmail}
                                onChange={handleChange}
                                placeholder="admin@college.edu"
                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                name="adminPassword"
                                value={formData.adminPassword}
                                onChange={handleChange}
                                placeholder="Create a secure password"
                            />

                        </div>

                    </div>

                    <div className="form-footer">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate("/superadmin/colleges")}
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="gradient-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Registering College..."
                                : "Register College"}

                        </button>

                    </div>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default CreateCollege;