import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../utils/useStore';
import { Logo } from '../Logo/Logo';
import './Header.scss';


export const Header: React.FC = () => {
  const { recipes, selectedRecipesId, removeAllRecipes, page } = useStore();
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  const handleClick = async () => {
    removeAllRecipes(recipes, selectedRecipesId, page);
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
          ? (isHome && <button
            className="header__button"
            onClick={handleClick}
          >
            Delete
          </button>)
          : null
        }
      </div>
    </header>
  );
};
