import apiClient from "../api/apiClient";

export const getAdminDashboard = async () => {

    const response = await apiClient.get("/admin/dashboard");

    return response.data;

};