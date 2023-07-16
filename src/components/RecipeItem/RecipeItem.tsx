import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Recipe } from '../../types/Recipe';
import './RecipeItem.scss';
import { useStore } from '../../utils/useStore';
import cn from 'classnames';

type Props = {
  recipe: Recipe,
};

export const RecipeItem: React.FC<Props> = ({ recipe }) => {
  const { setRecipe, selectedRecipesId, setSelectedRecipesId, removeRecipesId } = useStore();
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const name = recipe.name.replaceAll('#', '').split(' ').join('');
  const isActive = selectedRecipesId.includes(recipe.id);

  const handleRightClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();

    if (isActive) {
      removeRecipesId(recipe.id);
    } else {
      setSelectedRecipesId(recipe.id);
    }
  }

  return (
    <li
      className={cn(
        "recipe",
        { 'recipe--active': isActive }
      )}
      onContextMenu={handleRightClick}>
      <Link
        to={{
          pathname: parentPath + name,
          search: location.search,
        }}
        onClick={() => setRecipe(recipe)}
        className="recipe__link grid grid--tablet grid--dekstop"
      >
        <div
          className="
            grid__item
            grid__item--tablet-2-5
            grid__item--dekstop-1-4
            recipe__photo-container
          "
        >
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="recipe__photo"
          />
        </div>

        <div
          className="
            recipe__content
            grid__item
            grid__item--tablet-2-5
            grid__item--dekstop-5-12
          "
        >
          <h2 className="recipe__name">
            Recipe: {recipe.name}
          </h2>

          <p className="recipe__description">
            {recipe.description}
          </p>
        </div>
      </Link>
    </li>
  );
}

