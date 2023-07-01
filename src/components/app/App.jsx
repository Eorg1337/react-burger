import React from 'react';
import { useEffect } from 'react';
import style from './app.module.css'
import AppHeader from '../app-header/app-header'
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { fetchData } from '../../utils/api';
import IngredientDetails from '../details/ingredient-details/ingredient-details';

const DOMAIN_NAME = 'https://norma.nomoreparties.space/api';
const url = `${DOMAIN_NAME}/ingredients`;

function App() {
  const [state, setState] = React.useState({});
  useEffect(() => {
    fetchData(url)
    .then(data=>{
      setState(data);
    })
    .catch(err=>{
      console.log('Ошибка получения данных')
    })
  },[]);

  
  return (
    <div className = {style.app}>
      <AppHeader/>
      <main className = {style.main}>
      <BurgerIngredients state = {state}/>
      <IngredientDetails/>
      <BurgerConstructor state = {state}/>
        
      </main>
    </div>
  );
}

export default App;
