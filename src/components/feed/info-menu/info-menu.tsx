import styles from "./info-menu.module.css";
import { useSelector } from "../../../services/store";
import { OrdersResponse } from "../../../utils/types/types";

export const InfoMenu = () => {
  const { orders, total, totalToday } = useSelector(
    (state) => state.feed
  );
  return (
    <section className={styles.info}>
      <article>
        <h3 className={`text text_type_main-medium mb-4`}>Готовы:</h3>
        <ul className={styles.status_list}>
          {orders?.map(
            (order, index) =>
              index < 30 &&
              order.status === "done" && (
                <li
                  key={order._id + index}
                  className={`${styles.ready} text_type_digits-default mt-2`}
                >
                  {order.number}
                </li>
              )
          )}
        </ul>
      </article>
      <article>
        <h2 className={`text text_type_main-medium mb-4`}>В работе:</h2>
        <ul className={styles.status_list}>
          {orders.map(
            (order, index) =>
              index < 50 &&
              order.status !== "done" && (
                <li
                  key={order._id + index}
                  className={`${styles.ready} text_type_digits-default mt-2`}
                >
                  {order.number}
                </li>
              )
          )}
        </ul>
      </article>
      <article className={`${styles.total} mt-15`}>
        <h2 className={`text text_type_main-medium`}>
          Выполнено за все время:
        </h2>
        <span className={`${styles.text_shadow} text text_type_digits-large`}>
          {total}
        </span>
      </article>
      <article className={`${styles.total} mt-15`}>
        <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
        <span className={`${styles.text_shadow} text text_type_digits-large`}>
          {totalToday}
        </span>
      </article>
    </section>
  );
};

export default InfoMenu;
