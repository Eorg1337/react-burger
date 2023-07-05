import React from "react";
import { useEffect } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { fetchData } from "../../utils/api";
import IngredientDetails from "../details/ingredient-details/ingredient-details";
import { url } from "../../utils/api";
import { ConstructorContext, IngredientsContext } from "../../services/consctructor-context";

function App() {
  const [state, setState] = React.useState({});
  useEffect(() => {
    fetchData(url)
      .then((data) => {
        setState(data);
      })
      .catch((err) => {
        console.log("Ошибка получения данных");
      });
  }, []);

  return (
    <div className={style.app}>
      <AppHeader />
      <main className={style.main}>
        <IngredientsContext.Provider value={state} >
          <BurgerIngredients/>
        </IngredientsContext.Provider>
        <IngredientDetails />
        <ConstructorContext.Provider value={state}>
          <BurgerConstructor />
        </ConstructorContext.Provider>
      </main>
    </div>
  );
}

export default App;
