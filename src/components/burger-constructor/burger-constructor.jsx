import React from 'react';
import {useMemo} from 'react';
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

    const filteredBuns = items?.find(item => item.type === "bun");
    const filteredIngr = items?.filter(item => item.type !== "bun");




    const totalPrice = useMemo(() => {
        return items?.reduce((acc,item) => acc + item.price, 0);
    })
    return(
        <div className={styles.container}>
            <div className={styles.constructor__cont}>
                <div className={styles.top_bun} >
                    {filteredBuns && (
                        <ConstructorElement 
                            key={filteredBuns._id}
                            type="top"
                            isLocked={true}
                            text={`${filteredBuns.name} (верх)`}
                            price={filteredBuns.price}
                            thumbnail={filteredBuns.image}
                        />)}
                </div>
                <div className={styles.choice}>
                    {filteredIngr && filteredIngr.map(item=>(
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
                    {filteredBuns && (
                     <ConstructorElement 
                        key={filteredBuns._id}
                        type="bottom"
                        isLocked={true}
                        text={`${filteredBuns.name} (низ)`}
                        price={filteredBuns.price}
                        thumbnail={filteredBuns.image}
                    />)}
                </div>
            </div>
            <div className = {styles.total}>
                <div className = {styles.cost}>
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                {isActive && <MyModal onClose={handleCloseModal}>
        <OrderDetails />
    </MyModal>}
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


export default BurgerConstructor;