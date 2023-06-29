import React from 'react';
import {useMemo, useState} from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import MyModal from '../modal/my-modal';
import OrderDetails from '../details/order-details/order-details';

const BurgerConstructor = (props) => {
    const items = props.state.data; 
    const [isActive, setIsActive] = React.useState(false);

    const handleBtnClick = () => {
        setIsActive(true)
    }

    const handleCloseModal = () => {
        setIsActive(false)
    }

    const modal = ( <MyModal onClose={handleCloseModal}>
        <OrderDetails />
    </MyModal>
    )



    const totalPrice = useMemo(() => {
        return items && items.reduce((acc,item) => acc + item.price, 0);
    })
    return(
        <div className={styles.container}>
            <div className={styles.constructor__cont}>
                <div className={styles.top_bun} >
                    {items && items.filter(item => item.name === "Краторная булка N-200i").map(item => (
                        <ConstructorElement 
                            key={item._id}
                            type="top"
                            isLocked={true}
                            text={`${item.name} (верх)`}
                            price={item.price}
                            thumbnail={item.image}
                        />))}
                </div>
                <div className={styles.choice}>
                    {items && items.filter(item => item.type !== 'bun').map(item => (
                    <div className={styles.constructor_item} key = {item._id}>
                        <DragIcon type="primary" />
                        <ConstructorElement 
                            type={item.type}
                            isLocked={false}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    </div>))}
                </div>
                <div className={styles.low_bun}>
                    {items && items.filter(item => item.name === "Краторная булка N-200i").map(item => (
                     <ConstructorElement 
                        key={item._id}
                        type="bottom"
                        isLocked={true}
                        text={`${item.name} (низ)`}
                        price={item.price}
                        thumbnail={item.image}
                    />))}
                </div>
            </div>
            <div className = {styles.total}>
                <div className = {styles.cost}>
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                {isActive&&modal}
                <Button htmlType="button" type="primary" size="large" onClick={handleBtnClick}>
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
        _id: '1',
        type: 'bun',
        name: 'Краторная булка N-200i (верх)',
        price: 200,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png'
},
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
  },
  {
    _id: '8',
    type: 'bun',
    name: 'Краторная булка N-200i (низ)',
    price: 200,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png'
},
];

export default BurgerConstructor;