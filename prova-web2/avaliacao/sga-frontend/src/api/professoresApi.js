
import { apiCall } from './sgaApi';

export const fetchProfessores = () => { 
    return apiCall('get', '/professores');
};

export const fetchProfessorById = (id) => { 
    return apiCall('get', `/professores/${id}`);
};

export const createProfessor = (professorData) => {
    return apiCall('post', '/professores', professorData);
};

export const updateProfessor = (id, professorData) => { 
    return apiCall('put', `/professores/${id}`, professorData); 
};

export const deleteProfessor = (id) => {
    return apiCall('delete', `/professores/${id}`); 
};