import React,{ useState } from 'react';
import MyModal from '../../modal/my-modal';


const OrderDetails = () => {

const [isActive, setIsActive] = React.useState(false)
    const handleCloseModal = () => {
        setActiveIngredient(null)
        setIsActive(false)
    }
const handleClickOrder = () => {

}
    return(
        <MyModal>
            <div>

            </div>
        </MyModal>
        
    )
}

