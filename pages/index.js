import Head from 'next/head';
import { getPosts } from '../pages/api/alumnos';
import React, { useState, useEffect } from 'react';
import Post from '../components/alumnos';
import Header from "../components/header"
import Link from 'next/link'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data))
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />

        <>

          <section
            className="padding-l-136 padding-r-136 padding-b-80"
            style={{ paddingTop: 20 }}
          >
            <div>
              <h1 className="titulo2-regular color-neutral900 margin-b-0">
                Sigue a tus compañeros de <strong>soyHenry </strong>en Linkedin
                <br />
              </h1>
              <p className="color-body body-regular margin-b-24">
                Friendry es una web para compartir tu linkedin con tus compañeros de
                cohorte
                <br />
              </p>
              <Link href="/cuenta"><button className="btn btn-primary boton btn-t1" type="button">Ver mi perfil</button></Link>
            </div>
          </section>

          <form onChange={handleSearch}>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
            />
          </form>

          <section
            className="section-padding-t1"
            style={{
              background: "var(--color-neutral150)",
              paddingTop: "40px !important"
            }}
          >
            <div />
            <div id="contenedorComponentes" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {!searchTerm ? posts.map(post => (
                <Post key={post.id} post={post} />
              )) : posts.filter(post => post.attributes.Nombre_completo.toLowerCase().includes(searchTerm.toLowerCase())).map(post => (
                <Post key={post.id} post={post} />
              ))}





            </div>
          </section>
        </>




      </main>
    </>
  );
};

export default Home;