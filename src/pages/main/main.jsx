import React from 'react';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {useSelector} from 'react-redux'
import style from '../../components/app/app.module.css'


const MainPage = () => {
    const isLoading = useSelector((state) => state.ingredients?.isLoading);
    return(
    <React.Fragment>
        {isLoading ? (
            <div className={style.loader}>Loading...</div>
          ) : (
            <main className={style.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          )}
    </React.Fragment>
    )
}

export default MainPage
