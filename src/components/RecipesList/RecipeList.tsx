import React from 'react';
import { useStore } from '../../utils/useStore';
import { RecipeItem } from '../RecipeItem/RecipeItem';

import './RecipeList.scss';

export const RecipeList: React.FC = () => {
  const {recipes, page} = useStore();
  
  return (
    <ul className="recipes" >
      {recipes.map(recipe => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
        />
      ))}
    </ul>
  );
}
