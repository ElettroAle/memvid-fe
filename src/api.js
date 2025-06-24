import axios from 'axios';
import axios from 'axios';

// 1. Leggiamo la variabile d'ambiente VITE_API_BASE_URL.
// 2. Se non la trova (come quando sei in sviluppo locale), usa l'URL di localhost come fallback.
// IMPORTANTE: In Vite, le variabili d'ambiente esposte al frontend devono iniziare con VITE_
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001/api';


// Il resto del file non cambia
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getMemories = () => {
    return apiClient.get('/memories/');
};

export const createMemoryFromChunks = (memoryName, chunks) => {
    return apiClient.post('/create-from-chunks', {
        memory_name: memoryName,
        chunks: chunks,
    });
};

export const createMemoryFromFiles = (memoryName, files) => {
    const formData = new FormData();
    formData.append('memory_name', memoryName);
    files.forEach(file => {
        formData.append('files', file);
    });

    return apiClient.post('/create-from-files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const queryMemory = (memoryName, query) => {
    return apiClient.post('/query', {
        memory_name: memoryName,
        query: query,
    });
};

export const deleteMemory = (memoryName) => {
    return apiClient.delete(`/memory/${memoryName}`);
};