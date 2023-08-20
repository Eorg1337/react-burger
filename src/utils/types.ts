
export enum IngredientType {
    bun = 'bun',
    sauce = 'sauce',
    main = 'main',
  }

export type TIngredient = {
  _id: string,
  name: string,
  type: IngredientType,
  proteins?: number,
  fat?: number,
  carbohydrates?: number,
  calories?: number,
  price: number,
  image: string,
  image_mobile?: string,
  image_large?: string,
  __v?: number,
  unique_id?: string
}

export type TOrderDetails = {
  order: number,
  message: string
}

export interface IUser  {
  email: string,
  name: string
}

export interface IUserResponse {
  user: IUser;
}

export type TAuthUserResponse =  IUserResponse & {
  accessToken: string,
  refreshToken: string
};