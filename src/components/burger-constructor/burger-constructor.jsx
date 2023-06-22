import React from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({img}) => {
    return(
        <div className={styles.container}>
            <div className={styles.constructor} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className={styles.constructor_item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                <div className={styles.constructor_item}>        
                    <DragIcon type="primary" />                
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>    
                <div className={styles.constructor_item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
            </div>
            <div>
                <p className="text text_type_digits-medium">450</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}
export default BurgerConstructor;