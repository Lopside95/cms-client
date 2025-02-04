import axios from "axios";
import { Create, Route, Update } from "./types";

export const baseUrl = import.meta.env.VITE_API_URL;

const getAll = async (route: string) => {
  try {
    const res = await axios.get(`${baseUrl}/${route}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const getById = async (route: Route, id: number) => {
  try {
    const res = await axios.get(`${baseUrl}/${route}/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const create = async <T>({ route, data }: Create<T>) => {
  try {
    const res = await axios.post(`${baseUrl}/${route}`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const update = async <T>({ route, data, id }: Update<T>) => {
  try {
    const res = await axios.put(`${baseUrl}/${route}/${id}`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const deleteContent = async (route: Route, id: number) => {
  try {
    const res = await axios.delete(`${baseUrl}/${route}/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export { getAll, getById, create, update, deleteContent };
