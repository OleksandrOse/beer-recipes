import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useStore } from '../../utils/useStore';

import './RecipeDetailsPage.scss';

export const RecipeDetailsPage: React.FC = () => {
  const { recipe } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipe) {
      navigate('/', { replace: true });
    }
  }, [recipe, navigate])

  return (
    <main className="app__main">
      <div className="recipe-details__container">
      <div className="grid grid--tablet grid--dekstop recipe-details__content">
        <div className="grid__item grid__item--tablet-1-3 grid__item--dekstop-1-6">
          <h1 className="recipe-details__name">Recipe name: {recipe?.name}</h1>
        </div>

        <div className="grid__item grid__item--tablet-4-6 grid__item--dekstop-7-12">
          <p className="tagline-recipes">Tagline: {recipe?.tagline}</p>
        </div>

        <div className="grid__item grid__item--tablet-1-2 grid__item--dekstop-1-3 recipe-details__photo-container">
          <img
            src={recipe?.image_url}
            alt={recipe?.name} className="recipe-details__photo"
          />
        </div>
        <div className="
              grid__item
              grid__item--tablet-3-4
              grid__item--dekstop-4-8
            ">


          <article className="description-recipes">
            <h2>Description</h2>
            <p>{recipe?.description}</p>
          </article>
        </div>

        <div className="food-pairing-recipes grid__item
              grid__item--tablet-5-6
              grid__item--dekstop-10-12">
          <h2>It goes great with:</h2>
          {
            recipe?.food_pairing.map((food, id) => {
              return (
                <p key={id}>{food}</p>
              );
            })
          }
        </div>
      </div>

      <div className="grid grid--tablet grid--dekstop recipe-details__preparation">
        <h2 className="grid__item
              grid__item--tablet-2-4
              grid__item--dekstop-1-12 recipe-details__preparation-title">PREPARATION RECIPE</h2>
        <div className="grid__item
              grid__item--tablet-1-3
              grid__item--dekstop-1-6">
          {recipe?.ingredients?.malt.map((malt, id) => {
            return (
              <p key={id}>
                <i className="fa fa-caret-right"></i>
                <span> Add {malt.amount.value} </span>
                <span>{malt.amount.unit}</span>
                <span> of the {malt.name}</span>
              </p>
            );
          })}
        </div>
        <div className="grid__item
              grid__item--tablet-4-6
              grid__item--dekstop-7-12">
          <p>
            Boil Volume:
            <span> {recipe?.boil_volume?.value} </span>
            <span>{recipe?.boil_volume?.unit}</span>
          </p>
          <p>
            <i className="fa fa-caret-right"></i> Fermentation Temperature
            <span> {recipe?.method?.fermentation?.temp?.value} </span>
            <span>{recipe?.method?.fermentation?.temp?.unit}</span>
          </p>
          <p>
            <i className="fa fa-caret-right"></i> Add yeast: {recipe?.ingredients?.yeast}
          </p>
          {recipe?.method?.mash_temp?.map((mash, id) => {
            const { temp, duration } = mash
            return (
              <p key={id}>
                <i className="fa fa-caret-right"></i>
                <span> Liquid mash temperature on {temp.value}</span>
                <span> {temp.unit}</span>
                <span> for {duration === 0 ? 15 : duration} minutes</span>
              </p>
            );
          })}
        </div>
      </div>
      </div>
    </main >
  );
};
