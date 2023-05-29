import { client } from './axios-config';
import { Task } from './types/my-type';

export const getAllData = async () => {
  const { data } = await client.get<{ tasks: Task[] }>(
      'http://127.0.0.1:8000/api/tasks',
  );
  return data.tasks
};

export const createTask = async () => {
  try {
    await axios.post(
      'http://127.0.0.1:8000/api/tasks',
      config
    )
  } catch (error) {
    console.log(error)
    throw error
  }
};
