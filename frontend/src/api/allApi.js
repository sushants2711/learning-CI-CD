
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const createTodoApi = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const result = await response.json();

        return result;

    } catch (error) {
        throw new Error('Error creating todo:', error.message);
    };
};


export const getAllTodoApi = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        });

        const result = await response.json();

        return result;

    } catch (error) {
        throw new Error('Error fetching todos:', error.message);
    };
};
