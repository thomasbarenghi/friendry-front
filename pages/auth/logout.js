import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';

const LogoutPage = () => {
  useEffect(() => {
    // Elimina la cookie de autenticación
    Cookies.remove('authToken');
    // Redirige al usuario a la página de inicio de sesión
    Router.push('/auth/login');
  }, []);

  return null;
};

export default LogoutPage;