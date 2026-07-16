import apiClient from "../api/apiClient";

export const createCollege = async (data) => {

    const response = await apiClient.post("/colleges", data);

    return response.data;

};

export const getAllColleges = async () => {

    const response = await apiClient.get("/admin/colleges");

    return response.data;

};

export const getCollegeById = async (id) => {

    const response = await apiClient.get(`/admin/colleges/${id}`);

    return response.data;

};

export const updateCollege = async (id, data) => {

    const response = await apiClient.put(`/colleges/${id}`, data);

    return response.data;

};

export const deleteCollege = async (id) => {

    const response = await apiClient.delete(`/colleges/${id}`);

    return response.data;

};

