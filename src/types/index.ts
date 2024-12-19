export interface ProductType {
  title: string;
  price: number;
  color: string;
  category: string;
  detail: string;
  image: string[];
  id: number;
  size: string[];
}

export interface OrderInfo {
  id: number;
  userId: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  orderAt: string;
  status: string;
  carts: CartType[];
}
export interface CartType extends Omit<ProductType, "size"> {
  quantity: number;
  size: string;
  total: number | string;
}
export interface RegisterType {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
export interface ProfileUser extends RegisterType {
  id: number;
  cart: CartType[];
}
export interface User {
  id: number | string;
  email: string;
  token: string;
}

export interface UpdateCartItemType {
  id: number;
  size: string;
}
export interface FilterType {
  color: string;
  detail: string;
  price: number[];
}
