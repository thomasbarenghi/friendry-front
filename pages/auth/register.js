import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nombreCompleto: "",
    urlLinkedin: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      // Crea el usuario
      const { data } = await axios.post(
        'http://127.0.0.1:1337/api/auth/local/register',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      // Guarda el token de autenticación en una cookie
      Cookies.set('authToken', data.jwt, { expires: 7 });
      
      // Crea el post "alumnos" relacionado al usuario
      await axios.post(
        'http://localhost:1337/api/alumnos?populate=*',
        {
            "data": {
                "nombreCompleto": formData.nombreCompleto,
                "users_permissions_user": data.user.id
            }
        },
      );

      
      // Redirige al usuario a la página principal
      //Router.push('/');
      console.log(formData)
      console.log("soy data",data)
      console.log("soy data mix",data.user.id)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Nombre de usuario:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(event) =>
            setFormData({ ...formData, username: event.target.value })
          }
        />
      </label>

      <label htmlFor="text">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
      </label>

      <label htmlFor="text">
        Nombre Completo:
        <input
          type="text"
          name="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={(event) =>
            setFormData({ ...formData, nombreCompleto: event.target.value })
          }
        />
      </label>

      <label htmlFor="text">
        urlLinkedin:
        <input
          type="text"
          name="urlLinkedin"
          value={formData.urlLinkedin}
          onChange={(event) =>
            setFormData({ ...formData, urlLinkedin: event.target.value })
          }
        />
      </label>

      <label htmlFor="password">
        Contraseña:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
      </label>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default SignUpPage;
