// generateId.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { serverUrl } from '../config';

export async function generateUniqueId(formData) {
    // Generar un ID aleatorio (puedes usar cualquier algoritmo de generación de ID)

    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < 8; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    // Hacer una solicitud GET a la API para buscar un objeto con ese ID
    return axios.get(`${serverUrl}/api/comunidades?filters[idComunidad][$eq]=${id}`)
        .then(response => {
            // Si no se encuentra un objeto con ese ID, devolver el ID generado
            if (response.data.data.length === 0) {

                axios.post(`${serverUrl}/api/comunidades?populate=*`, {
                    "data": {
                        "titulo": formData.titulo,
                        "descripcion": formData.descripcion,
                        "idComunidad": id,
                        "adminComunidad": Cookies.get("User-AlumnoId")
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("authToken")}`,
                    }
                }
                
                )
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error.message);
                    });
            } else {
                // Si se encuentra un objeto con ese ID, volver a generar otro ID y verificar de nuevo
                return generateUniqueId();
            }
        });
}
