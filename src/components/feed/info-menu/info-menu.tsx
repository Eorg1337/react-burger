import styles from "./info-menu.module.css";

export const InfoMenu = () => (
  <section className={styles.infoSection}>
    <article className={styles.statusListWrapper}>
      <h3 className={`text text_type_main-medium mb-4`}>Готовы:</h3>
      <ul className={styles.statusList}>
        <li className={`${styles.readyOrder} text_type_digits-default mt-2`}>
          034533
        </li>
        <li className={`${styles.readyOrder} text_type_digits-default mt-2`}>
          034533
        </li>
        <li className={`${styles.readyOrder} text_type_digits-default mt-2`}>
          034533
        </li>
      </ul>
    </article>
    <article className={styles.statusListWrapper}>
      <h2 className={`text text_type_main-medium mb-4`}>В работе:</h2>
      <ul className={styles.statusList}>
        <li className={`text text_type_digits-default mt-2`}>034533</li>
      </ul>
    </article>
    <article className={`${styles.totalWrapper} mt-15`}>
      <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
      <span className={`${styles.textShadow} text text_type_digits-large`}>
        321
      </span>
    </article>
    <article className={`${styles.totalWrapper} mt-15`}>
      <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
      <span className={`${styles.textShadow} text text_type_digits-large`}>
        123
      </span>
    </article>
  </section>
);

export default InfoMenu;