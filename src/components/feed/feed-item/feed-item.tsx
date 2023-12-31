import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React,{useMemo} from "react";
import styles from "./feed-item.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { Order, Order as OrderResponse, TIngredient } from "../../../utils/types/types";
import { useDispatch, useSelector } from "../../../services/store";
import { v4 as uuid } from "uuid";
import {
  checkCategory,
  checkTimeStamp,
} from "../../../utils/help-funcs";
import { CREATE_ORDER_DETAILS_MODAL } from "../../../services/order-details/actions";
import Modal from "../../modal/modal";
import FeedItemDetails from "../feed-item-details/feed-item-details";
interface Props extends OrderResponse {
  withStatus?: boolean;
}

const FeedItem: FC<Props> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allIngr = useSelector(
    (state) => state.ingredients.ingredients
  );

  const allBns = useSelector(
    (state) => state.ingredients.buns
  );
  const createOrderHandler = () => {
    dispatch({ type: CREATE_ORDER_DETAILS_MODAL, payload: { ...props } });
  };

  const checkAllIngredients = (
    sortedIngredients: TIngredient[]
  ): TIngredient[] => {
    return Object.values(sortedIngredients)
      .flatMap((category) =>
        category?.count ? Array(category.count).fill(category) : category
      )
      .flat();
  };
  

  const checkTotalPrice = (
    ingredients: TIngredient[],
    ingredientIds: string[]
  ): number => {
    return ingredients
      .filter((ingredient) => ingredientIds?.includes(ingredient._id))
      .reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0);
  };
  const { number, name, status, ingredients, updatedAt, _id, withStatus } =
    props;

  const allIngredients = checkAllIngredients(allIngr);
  const allBuns = checkAllIngredients(allBns);
  const categoryIngredients = checkCategory(ingredients);
  const totalIngrPrice = checkTotalPrice(allIngredients, ingredients);
  const totalBunsPrice = checkTotalPrice(allBuns,ingredients)
  const totalPrice = totalBunsPrice + totalIngrPrice;
  const time = checkTimeStamp(updatedAt);
  const { repeatsIds, uniqueIds } = categoryIngredients;

  const currentStatus =
    status === "done"
      ? "Выполнен"
      : status === "pending"
      ? "Готовится"
      : "Отменен";
  return (
  <React.Fragment>
    <li className={styles.item}>
        <div className={styles.header}>
          <span
            className={`${styles.number} text text_type_digits-default mr-4`}
          >
            #{number}
          </span>
          <span className={`text text_type_main-default text_color_inactive`}>
            {time}
          </span>
        </div>
        <h3
          className={`${styles.name} text text_type_main-medium mt-6 mb-2`}
        >
          {name}
        </h3>
        {withStatus && (
          <span className={`text text_type_main-small`}>{currentStatus}</span>
        )}
        <div className={`${styles.footer}  mt-6`}>
          <ul className={styles.ingredients_icon}>
            {uniqueIds?.map((id) => {
                const imgUrl = (allIngredients.find((item) => item._id === id)?.image) ?? 
                (allBuns.find((item) => item._id === id)?.image);
              return (
                <li className={`${styles.ingredient_item}`} key={id}>
                  <img
                    className={styles.ingredient_icon}
                    src={imgUrl}
                    alt="item"
                  />
                </li>
              )
            })}
            {repeatsIds?.map((item) => {
              const imgUrl = (allIngredients.find(
                ({ _id }) => _id === item.id
              )?.image) ?? (allBuns.find(
                ({ _id }) => _id === item.id
              )?.image)
              return (
                <li className={`${styles.ingredient_item}`} key={item.id}>
                  <img
                    className={`${styles.ingredient_icon} ${styles.contrast}`}
                    src={imgUrl}
                    alt="item"
                  />
                  <span
                    className={`${styles.ingredient_count} text text_type_digits-default`}
                  >{`${item.count}`}</span>
                </li>
              )
            })}
          </ul>

          <div className={styles.price}>
            <span className={`text text_type_digits-default mr-2`}>
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
    </li>
  </React.Fragment>
  )
}

export default FeedItem;
