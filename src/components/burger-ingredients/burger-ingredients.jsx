import React,{useRef, useEffect} from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import IngredientDetails from "../details/ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch,useSelector } from "react-redux";
import { addSelectedIngr,deleteSelectedIngr } from "../../services/modal/reducer";


const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = React.useState("buns");
  const [activeIngredient, setActiveIngredient] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [ingredientCounts, setIngredientCounts] = React.useState({});
  const [elements, setElements] = React.useState([]);
  const [draggedElements, setDraggedElements] = React.useState([]);
  const containerRef = useRef(null);



  const dispatch = useDispatch();
  
  const ingredients = useSelector(state=>state.rootReducer.ingredients?.ingredients)
  const buns = useSelector(state=>state.rootReducer.ingredients?.buns)
  const pickedIngredients = useSelector(state=>state.rootReducer.constr?.constructorIngredients)

  useEffect(() => {
    const counts = pickedIngredients.reduce((counts, ingredient) => {
      counts[ingredient.id] = (counts[ingredient.id] || 0) + 1;
      return counts;
    }, {});
    setIngredientCounts(counts);
  }, [pickedIngredients]);
  
  const modalView = useSelector(state=> state.rootReducer.modal.selectedIngr)

  const addModal = (item) => {
    dispatch(addSelectedIngr({item}))
  }

  const clearModal = () => {
    dispatch(deleteSelectedIngr())
  }

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab)
    if(element){
      const containerElement = containerRef.current;
      containerElement.scrollTo({
        top: element.offsetTop - (containerElement.offsetHeight/1.8),
        behavior: 'smooth',
      });
    }}
  
    const handleScroll = () => {
      const containerElement = containerRef.current;
      const tabs = ["buns", "sauces", "mains"];
      let closestTab = null;
      let closestDistance = Infinity;
      tabs.forEach(tab => {
        const element = document.getElementById(tab);
        if (element) {
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

    const handleDrop = (itemId) => {
      setElements([
          ...ingredients.filter(ingredient => ingredient.id !== itemId.id)
      ]);
      setDraggedElements([
        ...draggedElements,
        ...elements.filter(element => element.id === itemId.id)
    ]);
};

    useEffect(() => {
      const containerElement = containerRef.current;
      containerElement.addEventListener("scroll", handleScroll);
    
      return () => {
        containerElement.removeEventListener("scroll", handleScroll);
      };
    }, [currentTab]);

  
  const handleItemClick = (item) => {
    setActiveIngredient(item);
    setIsVisible(true);
    addModal(item);
  };

  const handleCloseModal = () => {
    setActiveIngredient(null);
    setIsVisible(false);
    clearModal()
  };

  const filteredBuns = buns?.filter((item) => item.type === "bun");
  const filteredSauces = ingredients?.filter((item) => item.type === "sauce");
  const filteredMain = ingredients?.filter((item) => item.type === "main");

  return (
    <div className={`${styles.container}`}>
      <h1 className={`text text_type_main-large  mt-10 ${styles.title}`}>
        Соберите Бургер
      </h1>
      <div className={styles.tabs}>
        <Tab value="buns" active={currentTab === "buns"} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === "sauces"} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === "mains"} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients} ref={containerRef} id="ingredients">
        <h2 className="text text_type_main-medium mb-6"> Булки</h2>
        <div className={styles.puns} id="buns">
          {filteredBuns?.map((item) => (
            <BurgerIngredient
              key={item._id}
              id={item._id}
              name={item.name}
              type={item.type}
              price={item.price}
              image={item.image}
              count={ingredientCounts[item._id]}
              onClick={() => handleItemClick(item)}
              onDropHandler={handleDrop}
            />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-20 mb-6">Соусы</h2>
        <div className={styles.sauses} id="sauces">
          {filteredSauces?.map((item) => (
            <React.Fragment key={item._id}>
              <BurgerIngredient
                key={item._id}
                id={item._id}
                name={item.name}
                type={item.type}
                price={item.price}
                image={item.image}
                count={ingredientCounts[item._id]}
                onClick={() => handleItemClick(item)}
                onDropHandler={handleDrop}
              />
            </React.Fragment>
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-20 mb-6">Начинки</h2>
        <div className={styles.filings} id="mains">
          {filteredMain?.map((item) => (
            <BurgerIngredient
              key={item._id}
              id={item._id}
              name={item.name}
              type={item.type}
              price={item.price}
              image={item.image}
              count={ingredientCounts[item._id]}
              onClick={() => handleItemClick(item)}
              onDropHandler={handleDrop}
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
