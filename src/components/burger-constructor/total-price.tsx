import { useReducer, useEffect, FC } from "react";
import { TIngredient } from "../../utils/types/types";

type State = number;

type TAction =
  | { type: "ADD_PRICE"; payload: number }
  | { type: "MINUS_PRICE"; payload: number }
  | { type: "UPDATE" };

function reducer(state: State, action: TAction) {
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

export const TotalPrice: FC<{buns: TIngredient[], ingredients: TIngredient[]}> = ({ buns, ingredients }) => {
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

