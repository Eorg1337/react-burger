import React from "react";
import { useEffect } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { fetchData } from "../../utils/api";
import IngredientDetails from "../details/ingredient-details/ingredient-details";
import { url } from "../../utils/api";
import { useDispatch,useSelector } from "react-redux";
import { getIngredients } from "../../services/ingredients/reducer";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [state, setState] = React.useState({});

  const dispatch = useDispatch();
  const isLoading = useSelector(store=>store.isLoading)

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={style.app}>
      <AppHeader />
      {isLoading ? (
         <div className={style.loader}>Loading...</div>
      ) : (
      <main className={style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <IngredientDetails />
          <BurgerConstructor />
        </DndProvider>
      </main>
      )}
    </div>
  );
}

export default App;
