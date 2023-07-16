import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PRICE":
      return state + action.payload;
    case "MINUS_PRICE":
      return state - action.payload;
    case "UPDATE":
      return (state = 0);
    default:
      return state;
  }
}

export const TotalPrice = ({ buns, ingredients }) => {
  const AllIngr = buns && ingredients ? ingredients.concat(buns, buns) : [];
  const [total, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    dispatch({ type: "UPDATE" });
  }, [total]);

  useEffect(() => {
    if (AllIngr) {
      const sum = AllIngr.reduce((acc, item) => acc + item.price, 0);
      dispatch({ type: "ADD_PRICE", payload: sum });
    }
  }, [AllIngr]);

  return <>{total}</>;
};

TotalPrice.propTypes = {
  buns: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
};
