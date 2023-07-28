import React from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const IngredientDetails = () => {
  const dig_font = "text text_type_digits-default text_color_inactive";
  const text_font = "text text_type_main-default text_color_inactive";
  let location = useLocation();
  const currentUrl = location.pathname;
  const { id } = useParams();
  const activeIngredient = useSelector((state) => {
    return state.rootReducer.ingredients.ingredients?.find((item) => item._id === id)||state.rootReducer.ingredients.buns?.find((item) => item._id === id);
  });
  

  return (
    <>
      {activeIngredient && (
        <div className={styles.modal_container}>
          <header className={`text text_type_main-large ${styles.header}`}>
            Детали ингредиента
          </header>
          <img
            src={activeIngredient.image_large}
            className={styles.image}
          ></img>
          <h2 className={`text text_type_main-medium ${styles.name}`}>
            {activeIngredient.name}
          </h2>
          <ul className={styles.ul_content}>
            <div className={styles.item}>
              <p className={`${text_font} ${styles.p}`}>Калории, ккал</p>
              <li className={`${dig_font} ${styles.li}`}>
                {activeIngredient.calories}
              </li>
            </div>
            <div className={styles.item}>
              <p className={`${text_font} ${styles.p}`}>Белки, г</p>
              <li className={`${dig_font} ${styles.li}`}>
                {activeIngredient.proteins}
              </li>
            </div>
            <div className={styles.item}>
              <p className={`${text_font} ${styles.p}`}>Жиры, г</p>
              <li className={`${dig_font} ${styles.li}`}>
                {activeIngredient.fat}
              </li>
            </div>
            <div className={styles.item}>
              <p className={`${text_font} ${styles.p}`}>Углеводы, г</p>
              <li className={`${dig_font} ${styles.li}`}>
                {activeIngredient.carbohydrates}
              </li>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

IngredientDetails.propTypes = {
  activeIngredient: PropTypes.shape({
    image_large: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
  }),
};

export default IngredientDetails;
