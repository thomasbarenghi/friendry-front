import Link from 'next/link';

import React, { useState } from 'react';
const ShowMiembros = ({ community }) => {
    if (!community || !community.attributes || !community.attributes.alumnos) {
        return null;
    }

    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const miembros = community.attributes.alumnos.data;
    let filteredCommunity = miembros.filter(post => {
        return post.attributes.nombreCompleto.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    
    return (
        <div>
            <h1>Miembros</h1>
            <div>
                <input type="text" placeholder="Search" onChange={handleSearch} value={search} />
            </div>

            {filteredCommunity.map(member => (
                <div key={member.id}>
                    <p>{member.attributes.nombreCompleto}</p>
                    <p>{member.attributes.urlLinkedin}</p>
                </div>
            ))}
        </div>
    );
};


export default ShowMiembros;
