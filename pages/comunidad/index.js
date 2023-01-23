import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../api/config';
import Cookies from 'js-cookie';
import Link from 'next/link';
import ShowComunidades from "../../components/comunidad/showComunidades"

function MyCommunitiesPage() {
    const [communities, setCommunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Obtener el ID del usuario actual a partir de una cookie o de algún otro método
        const userId = Cookies.get("User-AlumnoId");

        // Hacer una solicitud GET a la API para obtener las comunidades asociadas al usuario
        axios.get(`${serverUrl}/api/comunidades?filters[alumnos][id][$eq]=${userId}&populate=*`,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("authToken")}`,
                }
            })
            .then(response => {
                console.log(response.data.data);
                let newCommunities = []
                for (let i = 0; i < response.data.data.length; i++) {
                    newCommunities.push({
                        id: response.data.data[i].id,
                        attributes: response.data.data[i].attributes
                    });
                }
                setCommunities(newCommunities);
                console.log("gola", communities)
                setIsLoading(false);
            })
            
            .catch(error => {
                console.log(error.message);
              //  setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {isLoading ? (
                <div>Cargando...</div>
            ) : (
                <div>
                    <h1>Mis comunidades</h1>
    <ShowComunidades communities={communities}/>
                </div>
            )}
        </div>
    );
}

export default MyCommunitiesPage;
