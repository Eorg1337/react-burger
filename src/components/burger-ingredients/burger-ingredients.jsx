import React from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';


const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one');
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
                        <BurgerIngredient 
                            image={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
                            price={1255}
                            id={"60666c42cc7b410027a1a9b1"}
                            name={"Краторная булка N-200i"}
                            __v={1}
                        />
                        <BurgerIngredient 
                            image={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
                            price={1255}
                            id={"60666c42cc7b410027a1a9b1"}
                            name={"Краторная булка N-200i"}
                        />
                    </div>
                    <h2 className='text text_type_main-medium mt-20 mb-6'>Соусы</h2>
                    <div className={styles.sauses} id='tab_two'>
                        <BurgerIngredient 
                            image={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
                            price={1255}
                            id={"60666c42cc7b410027a1a9b1"}
                            name={"Краторная булка N-200i"}
                        />
                        <BurgerIngredient 
                            image={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
                            price={1255}
                            id={"60666c42cc7b410027a1a9b1"}
                            name={"Краторная булка N-200i"}
                        />
                        <BurgerIngredient 
                            image={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
                            price={1255}
                            id={"60666c42cc7b410027a1a9b1"}
                            name={"Краторная булка N-200i"}
                        />
                        <BurgerIngredient 
                            image={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
                            price={1255}
                            id={"60666c42cc7b410027a1a9b1"}
                            name={"Краторная булка N-200i"}
                        />
                    </div>
                    <h2 className='text text_type_main-medium mt-20 mb-6'>Начинки</h2>
                    <div className={styles.filings} id='tab_three'>
                        <BurgerIngredient 
                            image={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
                            price={1255}
                            id={"60666c42cc7b410027a1a9b1"}
                            name={"Краторная булка N-200i"}
                        />
                        <BurgerIngredient 
                            image={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
                            price={1255}
                            id={"60666c42cc7b410027a1a9b1"}
                            name={"Краторная булка N-200i"}
                        />
                        <BurgerIngredient 
                            image={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
                            price={1255}
                            id={"60666c42cc7b410027a1a9b1"}
                            name={"Краторная булка N-200i"}
                        />
                    </div>
                </div>
            </div>   
        )
    }

export {BurgerIngredients};