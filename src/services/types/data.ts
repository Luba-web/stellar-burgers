export type TUser = {
  readonly name: string;
  readonly email: string;
};

export type TIngredient = {
  readonly _id: string
  readonly id: number
  readonly name: string
  readonly type: "bun" | "main" | "sauce"
  readonly fat: number
  readonly carbohydrates: number
  readonly calories: number
  readonly price: number
  readonly image: string
  readonly image_mobile: string
  readonly image_large: string
  readonly proteins: number
  readonly __v: number
  count: number
  
 }
export type TOrder = {
  createdAt: string
  ingredients: Array<TIngredient>
  name: string
  number: number
  owner: TOwner
  price: number
  status: string
  updatedAt: string
  _id: string
}

type TOwner = {
  createdAt: string
  email: string
  name: string
  updatedAt: string
}
type TAuth= {
  readonly createdAt: string
  readonly email: string
  readonly name: string
  readonly updatedAt: string
}

export type TOrders = {
  createdAt: string
  ingredients: Array<string>
  name: string
  number: number
  status: string
  updatedAt: string
  _id: string
}

export type TIngredientUniqueId = TIngredient & { id: string };

export type TIngredientsRes= {
  data: TIngredientUniqueId[];
  success: boolean;
}

export type TOrderRes = {
  success: boolean
  name: string
  order: TOrder
}

export type TDefaultRes = {
  success: boolean;
  message: string;
};

export type TUserRes = {
  success: boolean
  accessToken: string
  refreshToken: string
  user: TUser
}

export type TGetUser = {
  success: boolean
  user: TUser
}

export type TRefreshTokenRes = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLocation = {
  from: string;
  state?: object;
}

export type ParamTypes = {
  id: string;
};

export interface ILocationState {
  background: {
    pathname: string;
    search: string;
    hash: string;
    state: null;
    key: string;
  }
  from: string;
  state?: object; 
}
