import React from 'react';
import {useMemo} from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
    const totalPrice = useMemo(() => {
        return ingredients_test.reduce((acc,item) => acc + item.price, 400);
    },[])
    return(
        <div className={styles.container}>
            <div className={styles.constructor__cont}>
                <div className={styles.top_bun}>
                    <ConstructorElement 
                        type={'bun'}
                        isLocked={true}
                        text={'Краторная булка N-200i (верх)'}
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                <div className={styles.choice}>
                {ingredients_test.map(item=>(
                <div className={styles.constructor_item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        type={item.type}
                        isLocked={item.type === 'bun'}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                </div> 
                ))}
                </div>
                <div className={styles.low_bun}>
                    <ConstructorElement 
                        type={'bun'}
                        isLocked={true}
                        text={'Краторная булка N-200i (низ)'}
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
            </div>
            <div className = {styles.total}>
                <div className = {styles.cost}>
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}



BurgerConstructor.propTypes = {
    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['top','bottom',undefined]),
    isLocked: PropTypes.bool,
    extraClass: PropTypes.string,
    handleClose: PropTypes.func,
    htmlType: PropTypes.oneOf(["button" ,"submit","reset"])
};

const ingredients_test = [
  {
    _id: '2',
    type: 'filling',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 100,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png'
  },
  {
    _id: '3',
    type: 'filling',
    name: 'Соус Spicy-X',
    price: 30,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png'
  },
  {
    _id: '4',
    type: 'filling',
    name: 'Сыр с астероидной плесенью',
    price: 50,
    image: 'https://code.s3.yandex.net/react/code/cheese.png'
  },
  {
    _id: '5',
    type: 'filling',
    name: 'Соус Spicy-X',
    price: 30,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png'
  },
  {
    _id: '6',
    type: 'filling',
    name: 'Сыр с астероидной плесенью',
    price: 50,
    image: 'https://code.s3.yandex.net/react/code/cheese.png'
  },
  {
    _id: '7',
    type: 'filling',
    name: 'Сыр с астероидной плесенью',
    price: 50,
    image: 'https://code.s3.yandex.net/react/code/cheese.png'
  }
];

export default BurgerConstructor;