import axios from 'axios';
import { TASK_BASE_URL } from '../constants/ApiServiceConstants';

export function saveTask(task){
   return axios.post(TASK_BASE_URL , task);
}

export function getTasks(url){
    return axios.get(`${TASK_BASE_URL}/`+url);
}

export function completeTask(id){
    return axios.put(`${TASK_BASE_URL}/${id}/completed`)
}

export function deleteTask(id){
    return axios.delete(`${TASK_BASE_URL}/${id}`)
}

