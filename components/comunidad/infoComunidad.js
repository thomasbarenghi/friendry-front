import React from 'react';

const CommunityInfo = ({ community }) => {
    if (!community || !community.attributes) {
        return null;
    }console.log(community)
    return (
        <div>
            <div>
                <h1>Info de la comunidad</h1>
                <p>Id de la comunidad: {community.attributes.idComunidad}</p>
                <p>Título: {community.attributes.titulo}</p>
                <p>Descripción: {community.attributes.descripcion}</p>
                <p>Fecha de creación: {community.attributes.createdAt}</p>
                <p>Autor: {community.attributes.adminComunidad.data.attributes.nombreCompleto}</p>
            </div>
        </div>
    );
}

export default CommunityInfo;