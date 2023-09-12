import { TIngredientsActions } from "../../services/constructor/actions";
import { TActiveIngredientsActions } from "../../services/ingredients/actions";
import { TSelectedIngrActions } from "../../services/modal/actions";
import { TCreateOrders } from "../../services/order/actions";

export type TMyActions =
  | TIngredientsActions
  | TActiveIngredientsActions
  | TSelectedIngrActions
  | TCreateOrders;

export enum IngredientType {
  bun = "bun",
  sauce = "sauce",
  main = "main",
}

export type TIngredient = {
  _id: string;
  name: string;
  type: IngredientType;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  count?: number;
  __v?: number;
  unique_id?: string;
};

export type TIngrForFeedDetails = TIngredient & {
image_large: string;
}

export type TOrderDetails = {
  order: Order;
  message: string;
};

export type State = {
  feed: OrdersResponse;
  orderHistory: OrdersResponse;
};

export interface IUser {
  email: string;
  name: string;
}

export interface IUserResponse {
  user: IUser;
}

export interface IUserResetPass {
  message: string;
}

export type TAuthUserResponse = IUserResponse & {
  accessToken: string;
  refreshToken: string;
};

export enum WebSocketStatus {
  CONNECTING = "CONNECTING...",
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export interface Order {
  ingredients: string[];
  _id: string;
  status: string;
  price: number;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
}

export interface OrdersModal {
  feed: Order;
}

export type SortedIngredients = {
  buns: TIngredient[] & { count?: number };
  sauces: TIngredient[] & { count?: number };
  mains: TIngredient[] & { count?: number };
};