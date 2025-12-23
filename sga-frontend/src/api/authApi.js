
import { apiCall } from './sgaApi';

export const register = (nome, email, senha) => {
    return apiCall('post', '/auth/register', { nome, email, senha });
};

export const login = (email, senha) => {
    return apiCall('post', '/auth/login', { email, senha });
};

export const logout = () => {
    return apiCall('post', '/auth/logout');
};

export const checkAuthStatus = () => { 
    return apiCall('get', '/auth/me'); // Mapeado do getLoggedInUser (Backend)
};