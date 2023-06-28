import React from 'react';
import { useEffect } from 'react';
import style from './app.module.css'
import AppHeader from '../app-header/app-header'
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = React.useState({});
  useEffect(() => {
    fetch(url)
    .then(res => res.ok ? res.json(): res.json().then((err) => Promise.reject(err)))
    .then(data => {
      if(data.success){
        setState(data)
      } else{
        console.error('Ошибка получения данных');
      }})
    .catch(err => {console.error('Error:',err)})
  },[])
  return (
    <div className = {style.app}>
      <AppHeader/>
      <main className = {style.main}>
        <BurgerIngredients state = {state}/>
          <BurgerConstructor state = {state}/>
      </main>
    </div>
  );
}

export default App;
