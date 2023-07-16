import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRecipes } from '../../api/recipes';
import { useStore } from '../../utils/useStore';
import { Logo } from '../Logo/Logo';
import './Header.scss';


export const Header: React.FC = () => {
  const { recipes, selectedRecipesId, removeAllRecipes, removeSelectedRecipesId, page, setRecipes, setPage, setStartPage } = useStore();
  const { pathname } = useLocation();
  console.log(pathname)
  const isHome = pathname === '/';
  console.log(isHome)

  const handleClick = async () => {
    setPage();
    const recipesFromServer = await (await getRecipes(page)).slice(-selectedRecipesId.length);

    if (!recipesFromServer.length) {
      setStartPage();
    }
    const filterRecipe = recipes.filter(recipe => !selectedRecipesId.includes(recipe.id))

    removeAllRecipes(selectedRecipesId);
    removeSelectedRecipesId();
    const visibleRecipe = [...filterRecipe, ...recipesFromServer]
    setRecipes(visibleRecipe);
  };

  return (
    <header className="header">
      <div className="header__content">
        <Logo />

        {!isHome && <Link
          to="/"
          className="header__button"
        >
          all recipes
        </Link>}

        {selectedRecipesId.length
          ? <button
            className="header__button"
            onClick={handleClick}
          >
            Delete
          </button>
          : null
        }
      </div>
    </header>
  );
};
