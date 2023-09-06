import React, { useRef, useEffect, FC } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import IngredientDetails from "../details/ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useSelector, useDispatch } from "../../services/store";
import {
  addSelectedIngr,
  deleteSelectedIngr,
} from "../../services/modal/reducer";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  setActiveIngredient,
  deleteActiveIngredient,
} from "../../services/ingredients/reducer";
import { TIngredient } from "../../utils/types/types";

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = React.useState<string>("buns");
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [ingredientCounts, setIngredientCounts] = React.useState<
    Record<string, number>
  >({});
  const [elements, setElements] = React.useState<TIngredient[]>([]);
  const [draggedElements, setDraggedElements] = React.useState<TIngredient[]>(
    []
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const ingredients = useSelector((state) => state.ingredients?.ingredients);
  const buns = useSelector((state) => state.ingredients?.buns);
  const pickedIngredients = useSelector(
    (state) => state.constr?.constructorIngredients
  );

  useEffect(() => {
    const counts = pickedIngredients.reduce(
      (counts: Record<string, number>, ingredient: TIngredient) => {
        counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
        return counts;
      },
      {}
    );
    setIngredientCounts(counts);
  }, [pickedIngredients]);

  const addModal = (item: TIngredient) => {
    dispatch(addSelectedIngr(item));
  };

  const clearModal = () => {
    dispatch(deleteSelectedIngr());
  };

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      const containerElement = containerRef.current;
      containerElement?.scrollTo({
        top: element.offsetTop - containerElement.offsetHeight / 1.8,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const containerElement = containerRef.current;
    const tabs = ["buns", "sauces", "mains"];
    let closestTab = null;
    let closestDistance = Infinity;
    tabs.forEach((tab) => {
      const element = document.getElementById(tab);
      if (element && containerElement) {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerElement.scrollTop);
        if (distance < closestDistance) {
          closestTab = tab;
          closestDistance = distance;
        }
      }
    });
    if (closestTab && closestTab !== currentTab) {
      setCurrentTab(closestTab);
    }
  };

  const handleDrop = (itemId: TIngredient) => {
    setElements([
      ...ingredients.filter(
        (ingredient: TIngredient) => ingredient._id !== itemId._id
      ),
    ]);
    setDraggedElements([
      ...draggedElements,
      ...elements.filter((element) => element._id === itemId._id),
    ]);
  };

  useEffect(() => {
    const containerElement = containerRef.current;
    containerElement?.addEventListener("scroll", handleScroll);

    return () => {
      containerElement?.removeEventListener("scroll", handleScroll);
    };
  }, [currentTab]);

  const handleItemClick = (item: TIngredient) => {
    dispatch(setActiveIngredient(item._id));
    setIsVisible(true);
    addModal(item);
    return item;
  };

  const handleCloseModal = () => {
    dispatch(deleteActiveIngredient());
    setIsVisible(false);
    clearModal();
    navigate(`${location.pathname}`);
  };

  const filteredBuns = buns?.filter((item: TIngredient) => item.type === "bun");
  const filteredSauces = ingredients?.filter(
    (item: TIngredient) => item.type === "sauce"
  );
  const filteredMain = ingredients?.filter(
    (item: TIngredient) => item.type === "main"
  );

  return (
    <div className={`${styles.container}`}>
      <h1 className={`text text_type_main-large  mt-10 ${styles.title}`}>
        Соберите Бургер
      </h1>
      <div className={styles.tabs}>
        <Tab
          value="buns"
          active={currentTab === "buns"}
          onClick={handleTabClick}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={currentTab === "sauces"}
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={currentTab === "mains"}
          onClick={handleTabClick}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients} ref={containerRef} id="ingredients">
        <h2 className="text text_type_main-medium mb-6"> Булки</h2>
        <div className={styles.puns} id="buns">
          {filteredBuns?.map((item: TIngredient) => (
            <Link
              key={item._id}
              to={`/ingredients/${item._id}`}
              state={{ background: location }}
              className={styles.link}
            >
              <BurgerIngredient
                key={item._id}
                _id={item._id}
                name={item.name}
                type={item.type}
                price={item.price}
                image={item.image}
                count={ingredientCounts[item._id]}
                onClick={() => handleItemClick(item)}
                onDropHandler={() => handleDrop(item)}
              />
            </Link>
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-20 mb-6">Соусы</h2>
        <div className={styles.sauses} id="sauces">
          {filteredSauces?.map((item: TIngredient) => (
            <Link
              key={item._id}
              to={`/ingredients/${item._id}`}
              state={{ background: location }}
              className={styles.link}
            >
              <React.Fragment key={item._id}>
                <BurgerIngredient
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  type={item.type}
                  price={item.price}
                  image={item.image}
                  count={ingredientCounts[item._id]}
                  onClick={() => handleItemClick(item)}
                  onDropHandler={() => handleDrop(item)}
                />
              </React.Fragment>
            </Link>
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-20 mb-6">Начинки</h2>
        <div className={styles.filings} id="mains">
          {filteredMain?.map((item: TIngredient) => (
            <Link
              key={item._id}
              to={`/ingredients/${item._id}`}
              state={{ background: location }}
              className={styles.link}
            >
              <BurgerIngredient
                key={item._id}
                _id={item._id}
                name={item.name}
                type={item.type}
                price={item.price}
                image={item.image}
                count={ingredientCounts[item._id]}
                onClick={() => handleItemClick(item)}
                onDropHandler={() => handleDrop(item)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export { BurgerIngredients };
