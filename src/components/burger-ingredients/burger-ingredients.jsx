import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import IngredientDetails from "../details/ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState("one");
  const [activeIngredient, setActiveIngredient] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const items = props.state.data;
  if (!items) {
    return <div>Loading...</div>;
  }

  const handleItemClick = (item) => {
    setActiveIngredient(item);
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setActiveIngredient(null);
    setIsVisible(false);
  };

  const filteredBuns = items?.filter((item) => item.type === "bun");
  const filteredSauces = items?.filter((item) => item.type === "sauce");
  const filteredMain = items?.filter((item) => item.type === "main");

  return (
    <div className={`${styles.container}`}>
      <h1 className={`text text_type_main-large  mt-10 ${styles.title}`}>
        Соберите Бургер
      </h1>
      <div className={styles.tabs}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        <h2 className="text text_type_main-medium mb-6"> Булки</h2>
        <div className={styles.puns} id="tab_one">
          {filteredBuns.map((item) => (
            <BurgerIngredient
              key={item._id}
              name={item.name}
              type={item.type}
              price={item.price}
              image={item.image}
              __v={item.__V}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-20 mb-6">Соусы</h2>
        <div className={styles.sauses} id="tab_two">
          {filteredSauces.map((item) => (
            <React.Fragment key={item._id}>
              <BurgerIngredient
                key={item._id}
                name={item.name}
                type={item.type}
                price={item.price}
                image={item.image}
                __v={item.__V}
                onClick={() => handleItemClick(item)}
              />
            </React.Fragment>
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-20 mb-6">Начинки</h2>
        <div className={styles.filings} id="tab_three">
          {filteredMain.map((item) => (
            <BurgerIngredient
              key={item._id}
              name={item.name}
              type={item.type}
              price={item.price}
              image={item.image}
              __v={item.__V}
              onClick={() => handleItemClick(item)}
            />
          ))}
          {isVisible && (
            <Modal onClose={handleCloseModal}>
              <IngredientDetails activeIngredient={activeIngredient} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
    state: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          image: PropTypes.string.isRequired,
        })
      )
    })
  };

export { BurgerIngredients };
