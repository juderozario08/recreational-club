import axios from 'axios';
import uri from '../config/apiConfig';

export const fetchClasses = () => axios.get(`${uri}/classes`);
export const createClass = (newClass) => axios.post(`${uri}/classes`, newClass);
export const updateClass = (id, updatedClass) => axios.put(`${uri}/classes/${id}`, updatedClass);
export const deleteClass = (id) => axios.delete(`${uri}/classes/${id}`);
export const fetchUserbyID = (id) => axios.get(`${uri}/users/${id}`);