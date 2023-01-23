import Link from 'next/link';
import React from 'react';

const Post = ({ communities }) => {
    return (
        <div>
            <h1>Comunidades</h1>
            {communities.map(community => (

                <div key={community.id}>

                    <Link href={`/comunidad/${community.attributes.idComunidad}`}>
                        <div style={{ color: "black" }}>
                        <h2>{community.attributes.titulo}</h2>
                        <p>{community.attributes.descripcion}</p>
                        <p>Miembros {community.attributes.alumnos.data.length}</p>
                        </div>
                    </Link>
                </div>

            ))}

        </div>
    );
};

export default Post;
