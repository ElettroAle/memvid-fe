import React from 'react';

export function MemorySidebar({ memories, selectedMemory, onSelect, onDelete, onCreate }) {
    return (
        <aside className="sidebar">
            <button className="new-memory-button" onClick={onCreate}>
                + Nuova Memoria
            </button>
            <nav>
                <ul>
                    {memories.map(name => (
                        <li key={name} className={name === selectedMemory ? 'active' : ''}>
                           <span className="memory-name" onClick={() => onSelect(name)}>{name}</span>
                           <button className="delete-memory-button" onClick={() => onDelete(name)}>
                               🗑️
                           </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}