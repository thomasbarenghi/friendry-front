import React, { useState } from 'react';
import { generateUniqueId } from '../../pages/api/comunidades/crearComunidad';

function CreateCommunity({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        generateUniqueId(formData)
        onClose()
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />
                </label>
                <label>
                    Descripción:
                    <input
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />
                </label>
                <button  type="submit">Crear comunidad</button>
            </form>
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
}

export default CreateCommunity;
