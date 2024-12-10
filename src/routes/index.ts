import { lazy } from "react";

export interface RouteType {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  isAuthRoute?: boolean;
  isPrivateRoute?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout?: any;
}
const Home = lazy(() => import("../pages/Home/Home"));
const ProductsPage = lazy(() => import("../pages/ProductsPage/ProductsPage"));
const Filter = lazy(() => import("../pages/FilterPage/FilterPage"));
const ContactPage = lazy(() => import("../pages/ContactPage/ContactPage"));
const AboutUs = lazy(() => import("../pages/AboutUsPage/AboutUsPage"));
const DetailProduct = lazy(
  () => import("../pages/DetailProduct/DetailProduct")
);
const Profile = lazy(() => import("../pages/Profile/Profile"));
const PayPage = lazy(() => import("../pages/PayPage/PayPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));

const routes: RouteType[] = [
  { path: "/", component: Home },
  { path: `/products/:param`, component: ProductsPage },
  { path: `/filter/:param`, component: Filter },
  { path: `/product/:id`, component: DetailProduct },
  { path: "/contact", component: ContactPage },
  { path: "/about", component: AboutUs },
  { path: "/login", component: Login, isAuthRoute: true },
  { path: "/register", component: Register, isAuthRoute: true },
  { path: "/pay", component: PayPage, isPrivateRoute: true },
  { path: "/profile", component: Profile, isPrivateRoute: true },
];
export { routes };
