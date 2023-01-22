import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { serverUrl } from '../api/config';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      axios.post(`${serverUrl}/api/auth/local`, {
        identifier: formData.email,
        password: formData.password,
      })
        .then(response => {
          Cookies.set('authToken', response.data.jwt, { expires: 7 });
          Cookies.set('userId', response.data.user.id, { expires: 7 });
          return axios.get(`${serverUrl}/api/alumnos?filters[users_permissions_user][id][$eq]=${response.data.user.id}&populate=*`)
            .then(response => {

              Cookies.set('User-AlumnoId', response.data.data[0].id, { expires: 7 })
              console.log(Cookies.get("User-AlumnoId"));
            })
            .catch(error => {
              console.log(error.message);
            });

        })
        .catch(error => {
          console.log("error", error.message);
        });

      // Router.push('/cuenta');
      console.log(Cookies.get("userId"))
      console.log(Cookies.get("authToken"))
      // console.log(data)
    } catch (err) {
      console.error(err);
    }
  };

  return (


    <section
      className="d-flex flex-column justify-content-center align-items-center section-padding-t1"
      style={{
        minHeight: "100vh",
        background: "var(--color-primary100)",
        paddingLeft: "var(--padding-l-t3)",
        paddingRight: "var(--padding-r-t3)",
        paddingTop: "var(--padding-t-t3)",
        paddingBottom: "var(--padding-b-t3)"
      }}
    >
      <div
        className="text-center"
        style={{
          width: "45%",
          padding: "var(--padding-l-t1)",
          background: "#ffffff",
          borderRadius: 20
        }}
      >
        <div className="gap32">
          <h1 className="titulo1-regular color-neutral900 gap0">
            Bienvenido a <span className="titulo1-bold color-primary">Space.</span>
          </h1>
          <span className="body-regular color-body">
            Ingresa a tu cuenta Space.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="text-start d-flex flex-column gap32">
          <div className="gap32">
            <label className="form-label label" style={{ marginBottom: 24 }}>
              Email
              <input
                type="email"
                className="form-input"
                placeholder="tunombre@ejemplo.com"
                name="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
            </label>

            <label className="form-label label">
              Contraseña
              <input type="password" className="form-input" placeholder="********" name="password"
                value={formData.password}
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                } />
            </label>
          </div>
          <div>
            <button
              className="btn btn-primary boton btn-t1"
              type="submit"
              style={{ width: "100%" }}
            >
              Iniciar sesion
            </button>
          </div>



        </form>

      </div>
      <h1 className="body-regular color-primary" style={{ paddingTop: 20 }}>
        Forgot your password?
      </h1>
    </section >


  );
};

export default LoginPage;