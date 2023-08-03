import React from "react";
import styles from "./not-found.module.css"
import notFound from "../../images/notfound.png"
const NotFoundPage = () => {

    return(
        <div>
            <img src={notFound} alt="" className={styles.img}/>
        </div>
    )
}

export default NotFoundPage;