// src/api.js

if (!import.meta.env.VITE_API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is missing in environment variables');
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Una funzione helper per gestire le risposte e gli errori di fetch
async function handleResponse(response) {
    if (!response.ok) {
        // Se la risposta non è 2xx, fetch non la considera un errore.
        // Dobbiamo controllarlo noi e lanciare un errore con i dettagli dal backend.
        const errorData = await response.json().catch(() => ({ detail: response.statusText }));
        throw new Error(errorData.detail || 'Si è verificato un errore');
    }
    // Se la risposta non ha contenuto (es. un 204 No Content), restituiamo null.
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    }
    return null;
}


export const getMemories = async () => {
    const response = await fetch(`${API_BASE_URL}/memories/`);
    return handleResponse(response);
};

export const createMemoryFromChunks = async (memoryName, chunks) => {
    const response = await fetch(`${API_BASE_URL}/create-from-chunks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            memory_name: memoryName,
            chunks: chunks,
        }),
    });
    return handleResponse(response);
};

export const createMemoryFromFiles = async (memoryName, files) => {
    const formData = new FormData();
    formData.append('memory_name', memoryName);
    files.forEach(file => {
        formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/create-from-files`, {
        method: 'POST',
        // NOTA: Non impostare 'Content-Type' qui. 
        // Il browser lo farà automaticamente con il boundary corretto per FormData.
        body: formData,
    });
    return handleResponse(response);
};

export const queryMemory = async (memoryName, query) => {
    // --- CORRETTO ---
    const response = await fetch(`${API_BASE_URL}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            memory_name: memoryName,
            query: query,
        }),
    });
    return handleResponse(response);
};

export const deleteMemory = async (memoryName) => {
    // --- CORRETTO ---
    const response = await fetch(`${API_BASE_URL}/memory/${memoryName}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};