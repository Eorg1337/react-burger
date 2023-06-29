import React from 'react';
import {useMemo} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';
import IngredientDetails from '../details/ingredient-details/ingredient-details';
import MyModal from '../modal/my-modal'

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('one');
    const [activeIngredient, setActiveIngredient] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const items = props.state.data;

    const handleItemClick = (item) => {
        setActiveIngredient(item);
        setIsVisible(true)
      };
    
    const handleCloseModal = () => {
        setActiveIngredient(null)
        setIsVisible(false)
    }
    
    const modal = (
        <MyModal onClose = {handleCloseModal}>
            <IngredientDetails activeIngredient={activeIngredient}/>
        </MyModal>
    )


        return(
            <div className={`${styles.container}`}>
                <h1 className={`text text_type_main-large  mt-10 ${styles.title}`}>Соберите Бургер</h1>
                <div className={styles.tabs}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div className={styles.ingredients}>
                <h2 className='text text_type_main-medium mb-6'> Булки</h2>
                    <div className={styles.puns} id='tab_one'>
                    {items && items.filter(item => item.type === 'bun').map(item => (
                        <>
                            <BurgerIngredient
                                key={item._id}
                                name={item.name}
                                type={item.type}
                                price={item.price}
                                image={item.image}
                                __v={item.__V}
                                onClick={() => handleItemClick(item)}
                            />
                           
                        </>
                        ))}
                    </div>
                    <h2 className='text text_type_main-medium mt-20 mb-6'>Соусы</h2>
                    <div className={styles.sauses} id='tab_two'>
                    {items && items.filter(item => item.type === 'sauce').map(item => (
                        <>
                            <BurgerIngredient
                                key={item._id}
                                name={item.name}
                                type={item.type}
                                price={item.price}
                                image={item.image}
                                __v={item.__V}
                                onClick={() => handleItemClick(item)}
                            />
                           {isVisible && modal}
                        </>
                        ))}
                    </div>
                    <h2 className='text text_type_main-medium mt-20 mb-6'>Начинки</h2>
                    <div className={styles.filings} id='tab_three'>
                    {items && items.filter(item => item.type === 'main').map(item => (
                        <>
                            <BurgerIngredient
                                key={item._id}
                                name={item.name}
                                type={item.type}
                                price={item.price}
                                image={item.image}
                                __v={item.__V}
                                onClick={() => handleItemClick(item)}
                            />
                            
                        </>
                        ))}
                    </div>
                </div>
            </div>   
        )
    }
    BurgerIngredients.propTypes = {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    };

export {BurgerIngredients};