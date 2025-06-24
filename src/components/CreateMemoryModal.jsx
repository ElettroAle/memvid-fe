import React, { useState } from 'react';
import { createMemoryFromChunks, createMemoryFromFiles } from '../api';

export function CreateMemoryModal({ onClose, onMemoryCreated }) {
    const [activeTab, setActiveTab] = useState('text');
    const [memoryName, setMemoryName] = useState('');
    const [chunks, setChunks] = useState('');
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!memoryName) {
            setError('Il nome della memoria è obbligatorio.');
            return;
        }
        
        setIsLoading(true);
        setError('');

        try {
            if (activeTab === 'text') {
                if (!chunks) {
                    setError('Inserisci almeno un chunk di testo.');
                    setIsLoading(false);
                    return;
                }
                const chunkList = chunks.split('\n').filter(c => c.trim() !== '');
                await createMemoryFromChunks(memoryName, chunkList);
            } else {
                if (files.length === 0) {
                    setError('Seleziona almeno un file.');
                    setIsLoading(false);
                    return;
                }
                await createMemoryFromFiles(memoryName, Array.from(files));
            }
            onMemoryCreated(); // Comunica al genitore di aggiornare la lista
            onClose(); // Chiude il modale
        } catch (err) {
            setError(err.response?.data?.detail || 'Si è verificato un errore.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button">&times;</button>
                <h2>Crea Nuova Memoria</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={memoryName}
                        onChange={(e) => setMemoryName(e.target.value)}
                        placeholder="Nome della memoria (es. 'documenti_progetto_x')"
                        required
                    />
                    <div className="tabs">
                        <button type="button" onClick={() => setActiveTab('text')} className={activeTab === 'text' ? 'active' : ''}>Da Testo</button>
                        <button type="button" onClick={() => setActiveTab('files')} className={activeTab === 'files' ? 'active' : ''}>Da File</button>
                    </div>

                    {activeTab === 'text' ? (
                        <textarea
                            value={chunks}
                            onChange={(e) => setChunks(e.target.value)}
                            placeholder="Incolla il testo qui. Ogni riga sarà un chunk."
                            rows="10"
                        />
                    ) : (
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFiles(e.target.files)}
                        />
                    )}
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Creazione in corso...' : 'Crea Memoria'}
                    </button>
                </form>
            </div>
        </div>
    );
}