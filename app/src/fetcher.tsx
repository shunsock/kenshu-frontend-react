import { client } from './axios-config';
import { Task } from './types/my-type';

export const getAllData = async () => {
  const { data } = await client.get<{ tasks: Task[] }>(
      '/api/tasks',
  );
  return data.tasks
};

export const createTask = async () => {
    await client.post(
      '/api/tasks',
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    )
};
