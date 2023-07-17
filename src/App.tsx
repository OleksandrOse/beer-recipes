import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from './utils/useStore';
import { Header } from './components/Header/Header';

import './App.scss';

export const App: React.FC = () => {
  const { loadRecipes } = useStore();

  useEffect(() => {
    loadRecipes()
  }, [loadRecipes]);

  return (
    <div className="app">
      <Header />

      <Outlet />
    </div>
  );
}
