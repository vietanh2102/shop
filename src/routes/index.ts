import { lazy } from "react";

interface RouteType {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
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

const publicRoutes: RouteType[] = [
  { path: "/", component: Home },
  { path: `/products/:param`, component: ProductsPage },
  { path: `/filter/:param`, component: Filter },
  { path: `/product/:id`, component: DetailProduct },
  { path: "/contact", component: ContactPage },
  { path: "/about", component: AboutUs },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];
const privateRoutes: RouteType[] = [
  { path: "/pay", component: PayPage },
  { path: "/profile", component: Profile },
];
export { publicRoutes, privateRoutes };
