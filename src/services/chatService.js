import apiClient from "../api/apiClient";

export const askQuestion = async (question, sessionId = null) => {

    const response = await apiClient.post("/chat", {

        question,

        sessionId

    });

    return response.data;

};

export const getChatSessions = async () => {

    const response = await apiClient.get("/chat/sessions");

    return response.data;

};

export const getConversation = async (sessionId) => {

    const response = await apiClient.get(

        `/chat/sessions/${sessionId}`

    );

    return response.data;

};

export const renameSession = async (sessionId, title) => {

    const response = await apiClient.put(

        `/chat/sessions/${sessionId}`,

        {

            title

        }

    );

    return response.data;

};

export const deleteSession = async (sessionId) => {

    const response = await apiClient.delete(

        `/chat/sessions/${sessionId}`

    );

    return response.data;

};

export const togglePin = async (sessionId) => {

    const response = await apiClient.put(

        `/chat/sessions/${sessionId}/pin`

    );

    return response.data;

};