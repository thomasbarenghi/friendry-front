
import Link from 'next/link';
import React, { useState } from 'react';
const Post = ({ posts, slugMadre }) => {

    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    
    let filteredPosts = posts.filter(post => {
        return post.attributes.titulo.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });


    return (
        <div>

            <h1>Post de la comunidad</h1>
            <div>
                <input type="text" placeholder="Search" onChange={handleSearch} value={search} />
            </div>
            {filteredPosts && filteredPosts.length > 0 && filteredPosts.map(post => (

                <div key={post.id}>
                    <Link href={`/comunidad/${slugMadre}/${post.attributes.slug}`}>
                        <div style={{ color: "black" }}>
                            <h2>{post.attributes.titulo}</h2>
                            <p>{post.attributes.descripcion}</p>
                            <p>{post.attributes.contenido}</p>
                        </div>
                    </Link>
                </div>
            ))
            }

        </div >
    );
};

export default Post;
