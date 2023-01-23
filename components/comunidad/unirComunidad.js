import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ingresarComunidad } from '../../pages/api/comunidades/ingresarComunidad';

function ModalAsignarComunidad({ isOpen, onClose }) {
    
    const [idComunidad, setIdComunidad] = useState('');
    const [alumnoId, setAlumnoId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        ingresarComunidad(idComunidad);
        onClose()
    }

    if (!isOpen) {
        return null;
    }


    return (
        
            
          <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
         }}
          
          
          
          
          
          >
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
                        <button onClick={onClose}>Cerrar</button>
                    </form>
                </div>
                </div>
        
    )
}

export default ModalAsignarComunidad;