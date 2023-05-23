import axios from 'axios';
import { config } from './axios-config';

export const getAllData = async () => {
  const { data } = await axios.get(
    'http://127.0.0.1:8000/api/tasks',
    config
  )
  return data;
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

export const updateTask = async (
  {id, newTitle, finishedAt}: {id: string, newTitle: string, finishedAt: string}
) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    "title": newTitle,
    "finishedAt": finishedAt
  }
  console.log(`http://127.0.0.1:8000/api/tasks/${id}`)
  console.log(headers)
  try {
    await axios.patch(
      `http://127.0.0.1:8000/api/tasks/${id}`,
      headers
    )
  } catch (error) {
    console.log(error)
    throw error
  }
};
