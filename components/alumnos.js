// en el archivo post.js
import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="d-flex item-t1-inner" id="componente" style={{ gap: 16 }}>
    <img
      className="imagen-redonda"
      src="../assets/img/11062b_d603be77b66b4a91bccb9d62892b4a7a_mv2.jpg"
      style={{ width: 60, height: 60 }}
    />
    <div className="d-flex flex-column justify-content-center">
      <h1
        style={{ fontWeight: 400 }}
        className="subtitulo-regular color-neutral900 margin-b-0"
      >
        <span style={{ fontWeight: 600 }}>{post.attributes.Nombre_completo}</span> FT35A
      </h1>
      <p className="body-regular color-body margin-b-0">{post.attributes.urlLinkedin}</p>
      
    </div>
  </div>
  );
};

export default Post;
