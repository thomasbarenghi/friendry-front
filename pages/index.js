import Head from 'next/head';
import { getPosts } from '../pages/api/alumnos';
import React, { useState, useEffect } from 'react';
import Post from '../components/alumnos';
import Header from "../components//masters/header"
import Checkbox from '@/components/checkbox';
import SearchBar from '@/components/SearchBar';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [availableCodes, setAvailableCodes] = useState([]);

  useEffect(() => {
    getPosts()
      .then(data => {
        setPosts(data);
        console.log(data)
        let communities = [];
        data.forEach(post => {
          post.attributes.comunidades.data.forEach(comunity => {
            communities.push(comunity.attributes.titulo);
          });
        });
        setAvailableCodes([...new Set(communities)]);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleChangeCodes = (e) => {
    const selectedCode = e.target.value;
    if (e.target.checked) {
      setSelectedCodes([...selectedCodes, selectedCode]);
    } else {
      setSelectedCodes(selectedCodes.filter((code) => code !== selectedCode));
    }
  };

  const filteredPosts = !searchTerm ? posts : posts.filter(post => post.attributes.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredByCode = !selectedCodes.length ? filteredPosts : filteredPosts.filter(post => post.attributes.comunidades.data.filter(comunity => selectedCodes.includes(comunity.attributes.titulo)).length > 0);

  return (
    <>
      <Head>
        <title>Friendry</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <Checkbox
          codes={availableCodes}
          selectedCodes={selectedCodes}
          handleChange={handleChangeCodes}
        />
        <section
          className="section-padding-t1"
          style={{
            background: "var(--color-neutral150)",
            paddingTop: "40px !important"
          }}
        >
          <div />
          <div id="contenedorComponentes" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {filteredByCode.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;