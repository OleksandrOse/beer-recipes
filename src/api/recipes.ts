import { Recipe } from "../types/Recipe";
import { client } from "../utils/fetchClients";

//export const getRecipes = () => client.get<Recipe[]>('?page=1&per_page=15');

export const getRecipes = (page: number, per_page: number = 5) => client.get<Recipe[]>(`?page=${page}&per_page=${per_page}`);
