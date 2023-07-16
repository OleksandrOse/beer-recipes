import { create } from "zustand";
import { Recipe } from "../types/Recipe";

interface RecipeState {
  recipes: Recipe[];
  setRecipes: (value: Recipe[]) => void;
  addRecipe: (recipe: Recipe) => void;
  removeRecipes: (id: number) => void;
  removeAllRecipes: (arr: number[]) => void;
  recipe: Recipe | null;
  setRecipe: (recipe: Recipe) => void;
  selectedRecipesId: number[];
  setSelectedRecipesId: (id: number) => void;
  removeRecipesId: (id: number) => void;
  removeSelectedRecipesId: () => void;
  page: number;
  setPage: () => void;
  setStartPage: () => void;
}

export const useStore = create<RecipeState>((set) => ({
  recipes: [],
  setRecipes: (value: Recipe[]) => {
    set((state) => ({ ...state, recipes: value }));
  },
  addRecipe: (recipe: Recipe) => {
    set((state) => ({
      ...state,
      recipes: [...state.recipes, recipe],
    }));
  },
  removeRecipes: (id: number) => {
    set((state) => ({
      ...state,
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    }));
  },
  removeAllRecipes: (arr: number[]) => {
    set((state) => ({
      ...state,
      recipes: state.recipes.filter((recipe) => !arr.includes(recipe.id)),
    }));
  },
  recipe: null,
  setRecipe: (value: Recipe) => {
    set((state) => ({ ...state, recipe: value }));
  },
  selectedRecipesId: [],
  setSelectedRecipesId: (id: number) => {
    set((state) => ({
      ...state,
      selectedRecipesId: [...state.selectedRecipesId, id],
    }));
  },
  removeRecipesId: (id: number) => {
    set((state) => ({
      ...state,
      selectedRecipesId: state.selectedRecipesId.filter((val) => val !== id),
    }));
  },
  removeSelectedRecipesId: () => {
    set((state) => ({
      ...state,
      selectedRecipesId: [],
    }));
  },
  page: 4,
  setPage: () => set((state) => ({ page: state.page + 1 })),
  setStartPage: () => set((state) => ({ page: 1 })),
}));
