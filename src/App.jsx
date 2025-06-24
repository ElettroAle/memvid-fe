import React, { useState, useEffect } from 'react';
import { MemorySidebar } from './components/MemorySidebar';
import { ChatWindow } from './components/ChatWindow';
import { CreateMemoryModal } from './components/CreateMemoryModal';
import { getMemories, deleteMemory } from './api';
import './App.css';

function App() {
    const [memories, setMemories] = useState([]);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchMemories = async () => {
        try {
            const response = await getMemories();
            setMemories(response.data.memories);
        } catch (error) {
            console.error("Errore nel caricamento delle memorie:", error);
        }
    };

    useEffect(() => {
        fetchMemories();
    }, []);

    const handleDeleteMemory = async (name) => {
        if (window.confirm(`Sei sicuro di voler cancellare la memoria "${name}"? L'azione è irreversibile.`)) {
            try {
                await deleteMemory(name);
                if (selectedMemory === name) {
                    setSelectedMemory(null);
                }
                fetchMemories(); // Aggiorna la lista
            } catch (error) {
                console.error("Errore nella cancellazione:", error);
            }
        }
    };

    return (
        <div className="app-container">
            <MemorySidebar
                memories={memories}
                selectedMemory={selectedMemory}
                onSelect={setSelectedMemory}
                onDelete={handleDeleteMemory}
                onCreate={() => setIsModalOpen(true)}
            />
            
            <div className="main-content">
                {selectedMemory ? (
                    <ChatWindow memoryName={selectedMemory} />
                ) : (
                    <div className="welcome-screen">
                        <h1>Benvenuto in Memvid</h1>
                        <p>Seleziona una memoria dalla lista a sinistra per iniziare a chattare, oppure creane una nuova.</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <CreateMemoryModal 
                    onClose={() => setIsModalOpen(false)} 
                    onMemoryCreated={fetchMemories}
                />
            )}
        </div>
    );
}

export default App;