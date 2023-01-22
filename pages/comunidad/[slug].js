import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRouter } from 'next/router';

function CommunityPage() {

    const router = useRouter();
    console.log(router.pathname.split('/').pop());
    console.log(router.query.slug)
    const slug = router.query.slug
 
    const [community, setCommunity] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:1337/api/comunidades?filters[idComunidad][$eq]=${slug}&populate=*`)
            .then(response => {
                console.log(response)
                setCommunity(response.data.data[0]);
            })
            .catch(error => {
                console.log("error",error.message);
            });
    }, [slug]);

 

    return (
        <div>
                    <h1>{community.attributes.titulo}</h1>
            <p>{community.attributes.descripcion}</p>  
        </div>
    );
}

export default CommunityPage;
