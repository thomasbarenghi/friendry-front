import axios from 'axios';
import React, { useState } from 'react';
import { generateUniqueId } from '../pages/api/comunidades/crearComunidad';

function CreateCommunity() {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        generateUniqueId(formData)
    }

    return (
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
            <button type="submit">Crear comunidad</button>
        </form>
    );
}

export default CreateCommunity;
