import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { createUser } from "../../services/userService";
import { getAllColleges } from "../../services/collegeService";

import Select from "react-select";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserTag,
    FaUniversity,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import Swal from "sweetalert2";

function CreateUser() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        collegeId: ""

    });

    const [colleges, setColleges] = useState([]);

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    useEffect(() => {

        loadColleges();

    }, []);

    async function loadColleges() {

        try {

            const response = await getAllColleges();

            setColleges(response);

        } catch (error) {

            console.error(error);

        }

    }

    function validateForm() {

        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.email.trim()) {

            newErrors.email = "Email is required";

        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {

            newErrors.email = "Enter a valid email address";

        }

        if (!formData.password) {

            newErrors.password = "Password is required";

        } else if (formData.password.length < 6) {

            newErrors.password = "Password must be at least 6 characters";

        }

        if (!formData.role) {

            newErrors.role = "Please select a role";

        }

        if (!formData.collegeId) {

            newErrors.collegeId = "Please select a college";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    }

    const handleSubmit = async (e) => {

        if (!validateForm()) {

            return;

        }

        try {

            setLoading(true);

            await createUser(formData);

            setLoading(false);

            await Swal.fire({

                icon: "success",

                title: "User Created!",

                text: "The new user has been created successfully.",

                confirmButtonColor: "#4f46e5",

                confirmButtonText: "Continue"

            });

            navigate("/superadmin/users");

        } catch (error) {

            console.error(error);

            setLoading(false);

            Swal.fire({

                icon: "error",

                title: "Creation Failed",

                text: "Unable to create the user. Please try again.",

                confirmButtonColor: "#dc2626"

            });

        }

    };

    const collegeOptions = colleges.map(college => ({
        value: college.id,
        label: college.collegeName
    }));

    const roleOptions = [

        {
            value: "COLLEGE_ADMIN",
            label: "College Administrator"
        },

        {
            value: "FACULTY",
            label: "Faculty"
        },

        {
            value: "STUDENT",
            label: "Student"
        }

    ];

    const [errors, setErrors] = useState({});

    return (

        <DashboardLayout>

            <div className="form-wrapper">
                <div className="create-header">

                    <div className="header-left">

                        <div className="header-icon">

                            👤

                        </div>

                        <div>

                            <h1>Create New User</h1>

                            <p>
                                Add administrators, faculty and students to your CampusGPT platform.
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

                    {/* Personal Information */}

                    <div className="form-section">

                        <div className="form-section-title">

                            👤 Personal Information

                        </div>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>First Name</label>

                                <div className="input-icon">

                                    <FaUser className="left-icon" />

                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter first name"
                                        required
                                    />

                                </div>

                                {errors.firstName && (

                                    <small className="error-text">

                                        {errors.firstName}

                                    </small>

                                )}

                            </div>

                            <div className="form-group">

                                <label>Last Name</label>

                                <div className="input-icon">

                                    <FaUser className="left-icon" />

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter last name"
                                        required
                                    />

                                </div>

                                {errors.lastName && (

                                    <small className="error-text">

                                        {errors.lastName}

                                    </small>

                                )}

                            </div>

                            <div className="form-group full">

                                <label>Email Address</label>

                                <div className="input-icon">

                                    <FaEnvelope className="left-icon" />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="example@college.edu"
                                        required
                                    />

                                </div>

                                {errors.email && (

                                    <small className="error-text">

                                        {errors.email}

                                    </small>

                                )}

                            </div>

                            <div className="form-group full">

                                <label>Password</label>

                                <div className="input-icon">

                                    <FaLock className="left-icon" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a secure password"
                                        required
                                    />

                                    <span
                                        className="right-icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>

                                </div>
                                {errors.password && (

                                    <small className="error-text">

                                        {errors.password}

                                    </small>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* User Assignment */}

                    <div className="form-section">

                        <div className="form-section-title">

                            🎓 User Assignment

                        </div>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>User Role</label>

                                <Select

                                    options={roleOptions}
                                    placeholder="Select User Role"
                                    value={roleOptions.find(
                                        option => option.value === formData.role
                                    )}
                                    onChange={(selected) =>
                                        setFormData({
                                            ...formData,
                                            role: selected.value
                                        })
                                    }
                                />

                                {errors.role && (

                                    <small className="error-text">

                                        {errors.role}

                                    </small>

                                )}
                            </div>

                            <div className="form-group">

                                <label>College</label>

                                <Select
                                    options={collegeOptions}
                                    placeholder="Select College"
                                    value={collegeOptions.find(
                                        option => option.value == formData.collegeId
                                    )}
                                    onChange={(selected) =>
                                        setFormData({
                                            ...formData,
                                            collegeId: selected.value
                                        })
                                    }
                                />

                                {errors.collegeId && (

                                    <small className="error-text">

                                        {errors.collegeId}

                                    </small>

                                )}

                            </div>

                        </div>

                    </div>


                    <div className="form-footer">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate("/superadmin/users")}
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="gradient-btn"
                            disabled={loading}
                        >

                            {loading ? "Creating User..." : "Create User"}

                        </button>

                    </div>

                </form>

            </div>

        </DashboardLayout>

    );
}

export default CreateUser;