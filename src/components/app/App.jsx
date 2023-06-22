import React from 'react';
import style from './app.module.css'
import AppHeader from '../app-header/app-header'
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className = {style.app}>
      <AppHeader/>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </div>
  );
}

export default App;
