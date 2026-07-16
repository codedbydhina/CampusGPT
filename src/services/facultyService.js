import apiClient from "../api/apiClient";


export const getAllFaculty = async () => {

    const response = await apiClient.get("/admin/faculty");

    return response.data;

};

export const getFacultyById = async (id) => {

    const response = await apiClient.get(`/admin/faculty/${id}`);

    return response.data;

};

export const createFaculty = async (data) => {

    const response = await apiClient.post("/faculty", data);

    return response.data;

};

export const updateFaculty = async (id, data) => {

    const response = await apiClient.put(`/faculty/${id}`, data);

    return response.data;

};

export const deleteFaculty = async (id) => {

    const response = await apiClient.delete(`/faculty/${id}`);

    return response.data;

};



export const getDashboardStats = async () => {

    const response = await apiClient.get("/faculty/dashboard");

    return response.data;

};