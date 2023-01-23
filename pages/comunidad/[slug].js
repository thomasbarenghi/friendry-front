import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getPosts from '../api/comunidades/getPosts';
import getCommunity from "../api/comunidades/getComunidad"
import ShowPosts from "../../components/comunidad/showPosts"
import ShowMiembros from "../../components/comunidad/showMiembros"
import InfoComunidad from "../../components/comunidad/infoComunidad"
import Header from "../../components/masters/header"
import CreateCommunity from '../../components/comunidad/crearComunidad';
import ModalAsignarComunidad from "../../components/comunidad/unirComunidad"
import axios from 'axios';
import { Tabs, Tab, TabList } from 'react-tabs';

import { serverUrl } from '../api/config';

function CommunityPage() {
    const router = useRouter();
    const slug = router.query.slug
    const [community, setCommunity] = useState({});
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalCrearOpen, setisModalCrearOpen] = useState(false);
    const [isModalUnirOpen, setisModalUnirOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const [isOpen, setIsOpen] = useState(false);


    function handleClick(index) {
        setActiveIndex(index);
    }

    useEffect(() => {
        axios.all([getCommunity(slug), getPosts(slug)])
            .then(axios.spread((communityRes, postsRes) => {
                setCommunity(communityRes);
                setPosts(postsRes);
                setIsLoading(false);
            }))
            .catch(error => {
                console.log(error.message);
            });
    }, [slug]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(community)
    return (
        <div>
            <Header />
            <div>
                {community && community.attributes &&
                    <>
                        <h1>{community.attributes.titulo}</h1>
                        <p>{community.attributes.descripcion}</p>
                        <img src={serverUrl + community.attributes.portada.data.attributes.url} alt="Girl in a jacket" width={200} height={200} />
                    </>
                }
            </div>
            <div>

                <div>
                    <button onClick={() => setisModalCrearOpen(true)}>Crear comunidad</button>
                    <CreateCommunity isOpen={isModalCrearOpen} onClose={() => setisModalCrearOpen(false)} />
                </div>
                <button onClick={() => setisModalUnirOpen(true)}>Asignar Comunidad</button>
              <ModalAsignarComunidad isOpen={isModalUnirOpen} onClose={() => setisModalUnirOpen(false)} />

                <div>
                    <button onClick={() => handleClick(0)}>Posts</button>
                    <button onClick={() => handleClick(1)}>Miembros</button>
                    <button onClick={() => handleClick(2)}>Informacion</button>
                    {activeIndex === 0 && <ShowPosts posts={posts} slugMadre={slug} />}
                    {activeIndex === 1 && <ShowMiembros community={community} />}
                    {activeIndex === 2 && <InfoComunidad community={community} />}
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;
