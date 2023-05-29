import axios from 'axios';
import { config } from './axios-config';
import { Task } from './types/my-type';

export const getAllData = async () => {
  const { data } = await axios.get<{ tasks: Task }>(
    'http://127.0.0.1:8000/api/tasks',
    config
  )
  return data;
};
