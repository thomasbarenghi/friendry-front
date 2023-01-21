import Head from 'next/head';
import { getPosts } from '../pages/api/alumnos';
import React, { useState, useEffect } from 'react';
import Post from '../components/alumnos';
import Header from "../components/header"
import Link from 'next/link'

const Home = () => {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data))
  }, []);

  return (
    <>
     
    </>
  );
};

export default Home;