import apiClient from "../api/apiClient";


export const getAllStudents = async () => {

    const response = await apiClient.get("/admin/students");

    return response.data;

};

export const getStudentById = async (id) => {

    const response = await apiClient.get(`/admin/students/${id}`);

    return response.data;

};

export const createStudent = async (data) => {

    const response = await apiClient.post("/students", data);

    return response.data;

};

export const updateStudent = async (id, data) => {

    const response = await apiClient.put(`/students/${id}`, data);

    return response.data;

};

export const deleteStudent = async (id) => {

    const response = await apiClient.delete(`/students/${id}`);

    return response.data;

};

export const getStudentDashboard = async () => {

    const response = await apiClient.get("/student/dashboard");

    return response.data;

};

export const getStudentDocuments = async () => {

    const response = await apiClient.get("/student/documents");

    return response.data;

};


export const viewStudentDocument = (id) => {

    window.open(

        `http://localhost:8081/api/documents/view/${id}`,

        "_blank"

    );

};

export const downloadStudentDocument = (id) => {

    window.open(

        `http://localhost:8081/api/documents/download/${id}`,

        "_blank"

    );

};