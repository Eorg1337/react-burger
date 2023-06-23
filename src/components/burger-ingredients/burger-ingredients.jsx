import React from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import data from '../../utils/data';
import PropTypes from 'prop-types';

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('one');
    const ingredients = data.ingredients
    console.log(ingredients)
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
                <div className={styles.ingredients} id='tab_one'>
                <h2 className='text text_type_main-medium mb-6'> Булки</h2>
                    <div className={styles.puns}>
                        {ingredients.filter(item => item.type === 'bun').map(item => (
                            <BurgerIngredient
                                key={item._id}
                                name={item.name}
                                type={item.type}
                                proteins={item.proteins}
                                fat={item.fat}
                                carbohydrates={item.carbohydrates}
                                calories={item.calories}
                                price={item.price}
                                image={item.image}
                                __v={item.__V}
                            />
                        ))}
                    </div>
                    <h2 className='text text_type_main-medium mt-20 mb-6'>Соусы</h2>
                    <div className={styles.sauses} id='tab_two'>
                    {ingredients.filter(item => item.type === 'sauce').map(item => (
                            <BurgerIngredient
                                key={item._id}
                                name={item.name}
                                type={item.type}
                                proteins={item.proteins}
                                fat={item.fat}
                                carbohydrates={item.carbohydrates}
                                calories={item.calories}
                                price={item.price}
                                image={item.image}
                            />
                        ))}
                    </div>
                    <h2 className='text text_type_main-medium mt-20 mb-6'>Начинки</h2>
                    <div className={styles.filings} id='tab_three'>
                    {ingredients.filter(item => item.type === 'main').map(item => (
                            <BurgerIngredient
                                key={item._id}
                                name={item.name}
                                type={item.type}
                                proteins={item.proteins}
                                fat={item.fat}
                                carbohydrates={item.carbohydrates}
                                calories={item.calories}
                                price={item.price}
                                image={item.image}
                            />
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