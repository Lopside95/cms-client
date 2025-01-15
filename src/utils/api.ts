import axios from "axios";
import { format } from "date-fns";
import { ZodSchema } from "zod";
import { AnimalSchema, FoodSchema, ItemSchema, ShelterSchema } from "./schemas";

export const baseUrl = import.meta.env.VITE_API_URL;
// export interface CreateUpdate {
//   route: "items" | "animals" | "foods" | "shelters";
//   data: ItemSchema | AnimalSchema | FoodSchema | ShelterSchema;
// }

interface CreateUpdate<T> {
  id?: number;
  route: "items" | "animals" | "foods" | "shelters";
  data: T;
}

const create = async <T>({ route, data }: CreateUpdate<T>) => {
  try {
    const res = await axios.post(`${baseUrl}/${route}`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const getAll = async (route: string) => {
  try {
    const res = await axios.get(`${baseUrl}/${route}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const getById = async (route: string, id: number) => {
  try {
    const res = await axios.get(`${baseUrl}/${route}/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// const create = async ({ route, data }: CreateUpdate) => {
//   try {
//     const res = await axios.post(`${baseUrl}/${route}`, data);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }
// };

const update = async <T>({ route, data, id }: CreateUpdate<T>) => {
  try {
    const res = await axios.put(`${baseUrl}/${route}/${id}`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// const update = async ({ route, data }: CreateUpdate) => {
//   try {
//     const res = await axios.put(`${baseUrl}/${route}/${data.id}`, data);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }
// };

const deleteContent = async (route: string, id: number) => {
  try {
    const res = await axios.delete(`${baseUrl}/${route}/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// const create = async <T>({ route, id, resData }: ApiCall<T>) => {
//   try {
//     const res = await axios.post(`${baseUrl}/${route}`, resData);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getById = async <T>(route: string, id?: number): Promise<T | null> => {
//   try {
//     const res = await axios.get(`${baseUrl}/${route}/${id}`);
//     return res
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
// const getById = async (): Promise<ApiCall<T>> => {
//   return;
// };

export { getAll, getById, create, update, deleteContent };
