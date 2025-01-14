import axios from "axios";
import { ItemSchema } from "./schemas";
import { Item } from "./types";

export const baseUrl = import.meta.env.VITE_API_URL;

const fetchItems = async () => {
  try {
    const res = await axios.get(`${baseUrl}/items`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const fetchItemById = async (id: number) => {
  try {
    const res = await axios.get(`${baseUrl}/items/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const createItem = async (data: ItemSchema) => {
  try {
    const res = await axios.post(`${baseUrl}/items`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const updateItem = async (data: ItemSchema) => {
  try {
    const res = await axios.put(`${baseUrl}/items/${data.id}`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const deleteItem = async (id: number) => {
  try {
    const res = await axios.delete(`${baseUrl}/items/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export { fetchItems, createItem, updateItem, fetchItemById, deleteItem };
