
import axios from 'axios';

// Em produção (Vercel), REACT_APP_API_URL deve ser configurada no painel do Vercel
// apontando para a URL do backend no Render (ex: https://sga-api.onrender.com/api).
// Em desenvolvimento, usa localhost:3001 como fallback automático.
const sgaApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    withCredentials: true, // necessário para enviar cookies de sessão cross-origin
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