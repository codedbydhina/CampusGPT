import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import Swal from "sweetalert2";

import {
    FaUniversity,
    FaUserTie,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaUserShield,
    FaIdBadge,
    FaBuilding,
    FaLock,
    FaCircle
} from "react-icons/fa";

import {
    getCollegeById,
    updateCollege
} from "../../services/collegeService";

function EditCollege() {

    const navigate = useNavigate();

    const { id } = useParams();

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

        active: true,

        adminFirstName: "",
        adminLastName: "",
        adminEmail: "",
        adminPhone: "",
        adminUsername: "",
        adminEmployeeId: "",
        adminDepartment: "",
        adminActive: null,
        adminPassword: ""

    });

    useEffect(() => {

        loadCollege();

    }, []);

    async function loadCollege() {

        try {

            const response = await getCollegeById(id);

            setFormData({

                collegeName: response.collegeName,

                collegeCode: response.collegeCode,

                email: response.email,

                phone: response.phone,

                address: response.address,

                city: response.city,

                state: response.state,

                country: response.country,

                        active: response.active ?? true,

                adminFirstName: response.adminFirstName || "",

                adminLastName: response.adminLastName || "",

                adminEmail: response.adminEmail || "",

                        adminPhone: response.adminPhone || response.adminMobile || "",

                        adminUsername: response.adminUsername || response.adminUserName || "",

                        adminEmployeeId: response.adminEmployeeId || response.adminId || "",

                        adminDepartment: response.adminDepartment || response.adminDept || "",

                        adminActive: typeof response.adminActive !== "undefined" ? response.adminActive : null,

                        adminPassword: ""

                    });
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

        if (!formData.collegeName.trim()) return false;

        if (!formData.collegeCode.trim()) return false;

        if (!formData.email.trim()) return false;

        if (!formData.phone.trim()) return false;

        if (!formData.address.trim()) return false;

        if (!formData.city.trim()) return false;

        if (!formData.state.trim()) return false;

        if (!formData.country.trim()) return false;

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

            const updateData = {

                collegeName: formData.collegeName,

                collegeCode: formData.collegeCode,

                email: formData.email,

                phone: formData.phone,

                address: formData.address,

                city: formData.city,

                state: formData.state,

                country: formData.country,

                active: formData.active

            };

            console.log("UPDATE DATA:", updateData);

            await updateCollege(id, updateData);

            setLoading(false);

            await Swal.fire({

                icon: "success",

                title: "College Updated",

                text: "College updated successfully.",

                confirmButtonColor: "#2563eb"

            });

            navigate("/superadmin/colleges");

        } catch (error) {

            console.error(error);

            setLoading(false);

            Swal.fire({

                icon: "error",

                title: "Update Failed",

                text: "Unable to update the college."

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

                            <h1>Edit College</h1>

                            <p>

                                Update college information and save the latest changes.

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
                            />

                        </div>

                        <div className="form-group">

                            <label>College Code</label>

                            <input
                                type="text"
                                name="collegeCode"
                                value={formData.collegeCode}
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

                            <label>Phone</label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Address</label>

                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>City</label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>State</label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Country</label>

                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="admin-section">
                        <div className="admin-section-heading">
                            <FaUserTie />
                            <h2>College Administrator</h2>
                        </div>

                        <div className="admin-fields-grid">
                            {formData.adminFirstName || formData.adminLastName ? (
                                <div className="admin-field">
                                    <label>Full Name</label>
                                    <div className="admin-field-value">{`${formData.adminFirstName} ${formData.adminLastName}`.trim()}</div>
                                </div>
                            ) : null}

                            {formData.adminEmail ? (
                                <div className="admin-field">
                                    <label>Email</label>
                                    <div className="admin-field-value">{formData.adminEmail}</div>
                                </div>
                            ) : null}

                            {formData.adminUsername ? (
                                <div className="admin-field admin-field--full">
                                    <label>Username</label>
                                    <div className="admin-field-value">{formData.adminUsername}</div>
                                </div>
                            ) : null}

                            {formData.adminEmployeeId ? (
                                <div className="admin-field">
                                    <label>Employee ID</label>
                                    <div className="admin-field-value">{formData.adminEmployeeId}</div>
                                </div>
                            ) : null}

                            {formData.adminDepartment ? (
                                <div className="admin-field">
                                    <label>Department</label>
                                    <div className="admin-field-value">{formData.adminDepartment}</div>
                                </div>
                            ) : null}

                            {(formData.adminEmail || formData.adminFirstName || formData.adminLastName || formData.adminUsername) ? (
                                <div className="admin-field">
                                    <label>Role</label>
                                    <div className="admin-field-value">College Administrator</div>
                                </div>
                            ) : null}

                            {typeof formData.adminActive === "boolean" ? (
                                <div className="admin-field admin-field--full">
                                    <label>Account Status</label>
                                    <div className="admin-field-value">{formData.adminActive ? "Active" : "Inactive"}</div>
                                </div>
                            ) : null}
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
                                ? "Updating College..."
                                : "Update College"}

                        </button>

                    </div>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default EditCollege;