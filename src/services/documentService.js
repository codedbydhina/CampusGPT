import apiClient from "../api/apiClient";

import axios from "axios";

let controller = null;

export const uploadDocument = async (

    formData,

    onUploadProgress

) => {

    controller = new AbortController();

    const response = await apiClient.post(

        "/documents/upload",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            },

            signal: controller.signal,

            onUploadProgress

        }

    );

    return response.data;

};

export const cancelUpload = () => {

    if (controller) {

        controller.abort();

        controller = null;

    }

};

export const getAllDocuments = async () => {

    const response = await apiClient.get("/documents");

    return response.data;

};

export const getDocumentById = async (id) => {

    const response = await apiClient.get(`/documents/${id}`);

    return response.data;

};



export const viewDocument = (id) => {

    window.open(

        `http://localhost:8081/api/documents/view/${id}`,

        "_blank"

    );

};


export const downloadDocument = (id) => {

    window.open(

        `http://localhost:8081/api/documents/download/${id}`,

        "_blank"

    );

};

export const deleteDocument = async (id) => {

    const response = await apiClient.delete(`/documents/${id}`);

    return response.data;

};





