import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orders-history-details.module.css";
import React,{ FC, useEffect } from "react";
import {
  Order,
  OrdersResponse,
  SortedIngredients,
  State,
  TIngredient,
  WebSocketStatus,
} from "../../../utils/types/types";
import { useDispatch, useSelector } from "../../../services/store";
import {
  checkPathId,
  checkCategory,
  checkTimeStamp,
} from "../../../utils/help-funcs";
import { useLocation, useParams } from "react-router-dom";
import { ORDER_HISTORY_CLOSE_WS, ORDER_HISTORY_CONNECT_WS } from "../../../services/orders-history/actions";
import { orderUrlWs } from "../../../utils/api";

type Props = {
  isModal?: boolean;
};

const OrdersHistoryDetails: FC<Props> = ({ }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const { ingredients: ingredient, buns: buns } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch({
      type: ORDER_HISTORY_CONNECT_WS,
      payload: `${orderUrlWs}?token=${token?.replace(
        "Bearer ",
        ""
      )}`,
    });
    return () => {
      dispatch({
        type: ORDER_HISTORY_CLOSE_WS,
        payload: WebSocketStatus.CLOSE,
      });
    };
  }, [dispatch, token]);
  
/*  const lastIngredientKey = Object.keys(ingredient).length - 1;
  
  const modifiedBuns = buns ? Object.keys(buns).reduce((acc, key: string, index: number) => {
    const newKey = String(index + lastIngredientKey + 1); 
    acc[newKey] = buns[key]; 
    return acc;
  }, {} as Ingredients):{};      пытался изменить ключи получаемых объектов, чтобы булки не вытесняли первые 2 элемента ingredient*/ 


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
  const allIngr = { ...ingredient, ...buns };
  const { id } = useParams();
  const { pathname } = useLocation();
  const pathId = checkPathId(pathname);

  const { orders } : OrdersResponse = useSelector((state) => state?.orderHistory);
  const order = orders?.find((item)=>item._id === pathId);
  console.log('OrdersHistoryModal', orders, order)

  if (!order) {
    return null;
  }
  const { ingredients, status, name, number, updatedAt } = order;
  const time = checkTimeStamp(updatedAt);
  const allIngredients = checkAllIngredients(allIngr);
  const totalPrice = checkTotalPrice(allIngredients, ingredients);
  const categoryIngredients = checkCategory(ingredients);
  const currentStatus =
    status === "done"
      ? "Выполнен"
      : status === "pending"
      ? "Готовится"
      : "Отменен";

  return (
    <React.Fragment>
        <section className={`${styles.main}`}>
        <p
            className={`${styles.number} text text_type_digits-default mb-10`}
        >
            #{number}
        </p>
        <h3 className={`text text_type_main-medium mb-3`}>{name}</h3>
        <p className={`${styles.status} text text_type_main-default mb-15`}>
            {currentStatus}
        </p>
        <h3 className={`text text_type_main-medium mb-6`}>Состав:</h3>
        <ul className={`${styles.ingredients} mb-10 mr-6`}>
            {categoryIngredients?.uniqueIds &&
            categoryIngredients?.uniqueIds.map((id) => {
                const { image, name, price } = allIngredients?.find(
                (item) => item._id === id
                ) as TIngredient;
                return (
                <li className={`${styles.ingredient}`} key={id}>
                    <div className={`${styles.ingredient_image}`}>
                    <img
                        className={`${styles.ingredient_image_img}`}
                        src={image}
                        alt="ingredient"
                    />
                    </div>
                    <span
                    className={`${styles.ingredient_text} text text_type_main-default`}
                    >
                    {name}
                    </span>
                    <div className={styles.price}>
                    <span className={`text text_type_digits-default mr-2`}>
                        1 x {price}
                    </span>
                    <CurrencyIcon type="primary" />
                    </div>
                </li>
                );
            })}
            {categoryIngredients?.repeatsIds &&
            categoryIngredients?.repeatsIds.map(({ id, count }) => {
                const { image, name, price } = allIngredients?.find(
                (item) => item._id === id
                ) as TIngredient;
                return (
                <li className={`${styles.ingredient}`} key={id}>
                    <div className={`${styles.ingredient_image}`}>
                    <img
                        className={`${styles.ingredient_image_img}`}
                        src={image}
                        alt="ingredient"
                    />
                    </div>
                    <span
                    className={`${styles.ingredient_text} text text_type_main-default`}
                    >
                    {name}
                    </span>
                    <div className={styles.price}>
                    <span className={`text text_type_digits-default mr-2`}>
                        {count} x {price}
                    </span>
                    <CurrencyIcon type="primary" />
                    </div>
                </li>
                );
            })}
        </ul>
        <div className={styles.footer}>
            <span className={`text text_type_main-default text_color_inactive`}>
            {time}
            </span>
            <div className={styles.price}>
            <span className={`text text_type_digits-default mr-2`}>
                {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
            </div>
        </div>
        </section>
    </React.Fragment>
  );
};

export default OrdersHistoryDetails;
