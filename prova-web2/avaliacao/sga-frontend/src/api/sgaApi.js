

import axios from 'axios';


const sgaApi = axios.create({
    baseURL: 'http://localhost:3001/api', 
    withCredentials: true, 
});

export const apiCall = async (method, url, data = null) => {
    try {
        const response = await sgaApi.request({ method, url, data });
        return response.data; 
    } catch (error) {
        
        const errorMessage = error.response 
            ? error.response.data.erro || 'Erro do servidor.' 
            : 'Erro de conexão de rede.'; 

        
        throw new Error(errorMessage); 
    }
}


export default sgaApi;