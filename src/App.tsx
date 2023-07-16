import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from './utils/useStore';
import { Header } from './components/Header/Header';

import { getRecipes } from './api/recipes';

import './App.scss';

export const App: React.FC = () => {
  const {setRecipes} = useStore();

  useEffect(() => {
    (async () => {
      try {
        const recipesFromServer = await getRecipes(1, 15);

        setRecipes(recipesFromServer)
      } catch (error) {
        console.log(error)
      } finally {
      }
    })();
  }, [setRecipes]);

  return (
    <div className="app">
      <Header />

      <Outlet />
    </div>
  );
}
