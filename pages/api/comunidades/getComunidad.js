import axios from 'axios';
import { serverUrl } from '../config';
export async function getCommunity(slug) {
try {
const response = await axios.get(`${serverUrl}/api/comunidades?filters[idComunidad][$eq]=${slug}&populate=*`);
return response.data.data[0];
} catch (error) {
console.log(error.message);
}
}

export default getCommunity;