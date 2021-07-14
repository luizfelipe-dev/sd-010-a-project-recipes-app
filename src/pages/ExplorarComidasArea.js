import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodContext from '../contexts/FoodContext';
import RecipeCard from '../components/Main/RecipeCard';
import { fetchFoodArea, fetchFoodAreaGeneral, fetchFoods } from '../services/mealAPI';
import '../style/ExplorarComidasArea.css';

export default function ExplorarComidasArea() {
  const { foods, setFoods } = useContext(FoodContext);
  const [areaNameToOptions, setAreaNameToOptions] = useState([]);
  const NUMBER_OF_RECIPES = 12;

  useEffect(() => {
    fetchFoodAreaGeneral().then((res) => setAreaNameToOptions(res.meals));
  }, []);

  function filterFoodByArea(area) {
    if (area === 'All') {
      fetchFoods().then(({ meals }) => {
        setFoods(meals);
      });
    } else {
      fetchFoodArea(area).then(({ meals }) => {
        setFoods(meals);
      });
    }
  }

  return (
    <div className="main-area">
      <Header
        title="Explorar Origem"
      />
      <div className="control">
        <label htmlFor="explore-by-area-dropdown">
          Selecione:
          {' '}
          <select
            className="select select-align"
            name="explore-by-area-dropdown"
            data-testid="explore-by-area-dropdown"
            onClick={ (event) => filterFoodByArea(event.target.value) }
          >
            { areaNameToOptions && areaNameToOptions.map(({ idMeal, strArea }) => (
              <option
                value={ strArea }
                key={ idMeal }
                data-testid={ `${strArea}-option` }
              >
                { strArea }
              </option>
            ))}
            <option data-testid="All-option"> All </option>
          </select>
        </label>
      </div>

      <main className="main-food-list">
        <ul>
          { foods && foods.slice(0, NUMBER_OF_RECIPES)
            .map((recipe, index) => (
              <RecipeCard
                key={ index }
                recipe={ recipe }
                index={ index }
                type="/comidas"
              />
            ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
