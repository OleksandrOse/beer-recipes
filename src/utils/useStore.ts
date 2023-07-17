import { create } from "zustand";
import { getRecipes } from "../api/recipes";
import { Recipe } from "../types/Recipe";

interface RecipeState {
  recipes: Recipe[];
  recipe: Recipe | null;
  page: number;
  selectedRecipesId: number[];
  setRecipes: (value: Recipe[]) => void;
  loadRecipes: () => void;
  loadMoreRecipes: (page: number, recipes: Recipe[]) => void;
  removeAllRecipes: (recipes: Recipe[], arr: number[], page: number) => void;
  setRecipe: (recipe: Recipe) => void;
  setSelectedRecipesId: (id: number) => void;
  removeRecipesId: (id: number) => void;
  setPage: () => void;
}

export const useStore = create<RecipeState>((set) => ({
  recipes: [],
  recipe: null,
  page: 4,
  selectedRecipesId: [],
  setRecipes: (value: Recipe[]) => {
    set((state) => ({ ...state, recipes: value }));
  },
  loadRecipes: async () => {
    const recipeFromServer = await getRecipes(1, 15)

    set((state) => ({ ...state, recipes: recipeFromServer }));
  },
  loadMoreRecipes: async (page: number, recipes: Recipe[]) => {
    set((state) => ({ page: state.page + 1 }));

    const recipeFromServer = await getRecipes(page, 5);

    const partRecipes = recipes.slice(5);

    set((state) => ({ ...state, recipes: [...partRecipes, ...recipeFromServer] }));
  },
  removeAllRecipes: async (recipes: Recipe[], arr: number[], page: number) => {
    set((state) => ({ ...state, page: state.page + 1 }));

    set((state) => ({
      ...state,
      recipes: state.recipes.filter((recipe) => !arr.includes(recipe.id)),
    }));

    let recipeFromServer = await getRecipes(page, arr.length);
    
    let isRecipes = () => recipes.some((recipe) => recipeFromServer.some((beer) => recipe.id === beer.id));

    while (isRecipes()) {
      recipeFromServer = await getRecipes(page, arr.length);

      page++;
    }

    set((state) => ({ ...state, recipes: [...state.recipes, ...recipeFromServer] }));

    set((state) => ({
      ...state,
      selectedRecipesId: [],
    }));
  },
  setRecipe: (value: Recipe) => {
    set((state) => ({ ...state, recipe: value }));
  },
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
  setPage: () => set((state) => ({ page: state.page + 1 })),
}));
