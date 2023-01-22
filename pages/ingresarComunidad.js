import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ingresarComunidad } from '../pages/api/comunidades/ingresarComunidad';

function AsignarComunidad() {
    const [idComunidad, setIdComunidad] = useState('');
    const [alumnoId, setAlumnoId] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("enviamos", idComunidad);
        ingresarComunidad(idComunidad);
    }
       
    return (
        <form onSubmit={handleSubmit}>
            <label>
                ID de Comunidad:
                <input
                    type="text"
                    value={idComunidad}
                    onChange={e => setIdComunidad(e.target.value)}
                />
            </label>
            <br />
            <label>
                ID de Alumno:
                <input
                    type="text"
                    value={alumnoId}
                    onChange={e => setAlumnoId(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Asignar Comunidad</button>
        </form>
    );
}

export default AsignarComunidad;
