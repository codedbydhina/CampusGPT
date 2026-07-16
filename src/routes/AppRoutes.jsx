import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";

import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import FacultyDashboard from "../pages/faculty/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";

import CollegeDetails from "../pages/superadmin/CollegeDetails";
import Users from "../pages/superadmin/Users";

import ProtectedRoute from "./ProtectedRoute";

import Colleges from "../pages/superadmin/Colleges";

import UserDetails from "../pages/superadmin/UserDetails";

import CreateUser from "../pages/superadmin/CreateUser";

import EditUser from "../pages/superadmin/EditUser";

import CreateCollege from "../pages/superadmin/CreateCollege";

import EditCollege from "../pages/superadmin/EditCollege";



import Faculty from "../pages/admin/Faculty";
import AdminStudents from "../pages/admin/Students";

import CreateFaculty from "../pages/superadmin/CreateFaculty";

import ViewFaculty from "../pages/superadmin/ViewFaculty";

import EditFaculty from "../pages/superadmin/EditFaculty";

import Students from "../pages/superadmin/Students";

import CreateStudent from "../pages/superadmin/CreateStudent";

import ViewStudent from "../pages/superadmin/ViewStudent";

import EditStudent from "../pages/superadmin/EditStudent";

import UploadDocument from "../pages/faculty/UploadDocument";

import MyDocuments from "../pages/faculty/MyDocuments";

import FacultyChat from "../pages/faculty/FacultyChat";

import StudentDocuments from "../pages/student/StudentDocuments";
import StudentHistory from "../pages/student/StudentHistory";

import StudentChat from "../pages/student/StudentChat";

import Documents from "../pages/admin/Documents";
import ProfilePage from "../pages/profile/ProfilePage";
import EditProfilePage from "../pages/profile/EditProfilePage";
import ChangePasswordPage from "../pages/profile/ChangePasswordPage";
import SettingsPage from "../pages/profile/SettingsPage";
import NotificationsPage from "../pages/profile/NotificationsPage";
import HelpPage from "../pages/profile/HelpPage";
import AboutPage from "../pages/profile/AboutPage";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<LoginPage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/superadmin/dashboard"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <SuperAdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/faculty/dashboard"
                element={
                    <ProtectedRoute allowedRole="FACULTY">
                        <FacultyDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/dashboard"
                element={
                    <ProtectedRoute allowedRole="STUDENT">
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/colleges"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <Colleges />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/colleges/:id"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <CollegeDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/users"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <Users />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/users/:id"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <UserDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/users/create"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <CreateUser />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/users/edit/:id"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <EditUser />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/colleges/create"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <CreateCollege />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/colleges/edit/:id"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <EditCollege />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/faculty"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <Faculty />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/faculty/create"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <CreateFaculty />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/faculty/view/:id"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <ViewFaculty />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/faculty/edit/:id"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <EditFaculty />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/students"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <Students />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/students/create"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <CreateStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/students/view/:id"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <ViewStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/superadmin/students/edit/:id"
                element={
                    <ProtectedRoute allowedRole="SUPER_ADMIN">
                        <EditStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/faculty/documents/upload"
                element={
                    <ProtectedRoute allowedRole="FACULTY">
                        <UploadDocument />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/faculty"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <Faculty />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/faculty/create"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <CreateFaculty />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/faculty/view/:id"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <ViewFaculty />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/faculty/edit/:id"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <EditFaculty />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/faculty/documents"
                element={
                    <ProtectedRoute allowedRole="FACULTY">
                        <MyDocuments />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/faculty/chat"
                element={
                    <ProtectedRoute allowedRole="FACULTY">
                        <FacultyChat />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/documents"
                element={
                    <ProtectedRoute allowedRole="STUDENT">
                        <StudentDocuments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/history"
                element={
                    <ProtectedRoute allowedRole="STUDENT">
                        <StudentHistory />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/chat"
                element={
                    <ProtectedRoute allowedRole="STUDENT">
                        <StudentChat />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/students"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <AdminStudents />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/students/create"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <CreateStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/students/view/:id"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <ViewStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/students/edit/:id"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <EditStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/documents"
                element={
                    <ProtectedRoute allowedRole="COLLEGE_ADMIN">
                        <Documents />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute allowedRole={null}>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile/edit"
                element={
                    <ProtectedRoute allowedRole={null}>
                        <EditProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile/password"
                element={
                    <ProtectedRoute allowedRole={null}>
                        <ChangePasswordPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute allowedRole={null}>
                        <SettingsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute allowedRole={null}>
                        <NotificationsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/help"
                element={
                    <ProtectedRoute allowedRole={null}>
                        <HelpPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/about"
                element={
                    <ProtectedRoute allowedRole={null}>
                        <AboutPage />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRoutes;