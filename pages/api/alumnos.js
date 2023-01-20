import axios from 'axios';

export const getPosts = () => {
  return axios.get('http://192.168.100.4:1337/api/alumnos?populate=*')
    .then(response => response.data.data)
    .catch(error => {
      console.log(error);
      return error;
    });
};
