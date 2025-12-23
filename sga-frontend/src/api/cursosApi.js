
import { apiCall } from './sgaApi';

export const fetchCursos = () => { 
    return apiCall('get', '/cursos'); 
};

export const fetchCursoById = (id) => { 
    return apiCall('get', `/cursos/${id}`); 
};

export const createCurso = (cursoData) => {
    return apiCall('post', '/cursos', cursoData);
};

export const updateCurso = (id, cursoData) => {
    return apiCall('put', `/cursos/${id}`, cursoData);
};

export const deleteCurso = (id) => {
    return apiCall('delete', `/cursos/${id}`);
};