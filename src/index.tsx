import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './index.scss';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { RecipeDetailsPage } from './pages/RecipeDetailsPage/RecipeDetailsPage';
import { NotFoundPage } from './pages/PageNotFound/PageNotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path=":name" element={<RecipeDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>,
  </React.StrictMode>
);
