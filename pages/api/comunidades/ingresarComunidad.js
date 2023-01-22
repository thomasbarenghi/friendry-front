import axios from 'axios';
import Cookies from 'js-cookie';
import { serverUrl } from '../config';

export async function ingresarComunidad(idComunidad) {
    const alumnId = Cookies.get("User-AlumnoId")
    let idComunidadSeleccionada;
    let arrComunidades = []
    try {
        // Busca la comunidad seleccionada
        const comunidadResponse = await axios.get(`${serverUrl}/api/comunidades?filters[idComunidad][$eq]=${idComunidad}&populate=*`);
        if (comunidadResponse.data.data.length === 1) {
            idComunidadSeleccionada = (comunidadResponse.data.data[0].id)
            // Verifica si el alumno ya esta en la comunidad
            for (let i = 0; i < comunidadResponse.data.data[0].attributes.alumnos.data.length; i++) {
                if ((comunidadResponse.data.data[0].attributes.alumnos.data[i].id).toString() === alumnId) {
                    return (alert("Ya sos parte de esa comunidad"))
                }
            }
            // Obtiene las comunidades a las que el alumno ya pertenece
            const alumnoResponse = await axios.get(`${serverUrl}/api/alumnos?filters[id][$eq]=${alumnId}&populate=*`);
            for (let i = 0; i < alumnoResponse.data.data[0].attributes.comunidades.data.length; i++) {
                arrComunidades.push(alumnoResponse.data.data[0].attributes.comunidades.data[i].id)
            }
            arrComunidades.push(idComunidadSeleccionada)
            // Agrega la nueva comunidad al array de comunidades del alumno
            const putResponse = await axios.put(`${serverUrl}/api/alumnos/${alumnId}?populate=*`, {
                "data": {
                    "comunidades": arrComunidades,
                }
            },
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("authToken")}`,
                    }
                }
            );
            console.log(putResponse);
            alert('Comunidad asignada exitosamente!');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

export default ingresarComunidad;
