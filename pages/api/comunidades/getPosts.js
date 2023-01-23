import axios from 'axios';
import { serverUrl } from '../config';
export async function getPosts(slug) {
try {
const response = await axios.get(`${serverUrl}/api/posts-comunidades?filters[comunidad][idComunidad][$eq]=${slug}&populate=*`);
return response.data.data;
} catch (error) {
console.log(error.message);
}
}

export default getPosts;