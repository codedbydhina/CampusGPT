import apiClient from "../api/apiClient";

export const getAllUsers = async () => {

    const response = await apiClient.get("/admin/users");

    return response.data;

};

export const getUserById = async (id) => {

    const response = await apiClient.get(`/admin/users/${id}`);

    return response.data;

};

export const createUser = async (userData) => {

    const response = await apiClient.post(
        "/users",
        userData
    );

    return response.data;

};

export const updateUser = async (id, data) => {

    const response = await apiClient.put(`/users/${id}`, data);

    return response.data;

};

export const deleteUser = async (id) => {

    const response = await apiClient.delete(`/users/${id}`);

    return response.data;

};
