import { FC, useRef } from 'react';

import { RecipeList } from '../../components/RecipesList/RecipeList';
import { useStore } from '../../utils/useStore';

export const HomePage: FC = () => {
  const { page, recipes, loadMoreRecipes } = useStore();

  const listContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = async(e: React.UIEvent<HTMLDivElement>) => {
    const container = listContainerRef.current;
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container;

      if (scrollTop + clientHeight >= scrollHeight) {
       loadMoreRecipes(page, recipes);
      }
    }
  };

  return (
    <main
      className="app__main"
      ref={listContainerRef}
      onScroll={handleScroll}>
      <div className='app__container'>
        <h1 className='app__title'>Choose your favourite recipe</h1>
        <RecipeList />
      </div>
    </main>
  );
};
