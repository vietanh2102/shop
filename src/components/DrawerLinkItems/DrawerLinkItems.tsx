import { Link, NavLink } from "react-router-dom";
import {
  ContactsOutlined,
  HomeOutlined,
  IdcardOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

export const linkItems = [
  {
    key: "/",
    label: (
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "text-blue-600" : "")}
      >
        <HomeOutlined />
        <span className="ml-2"> Home</span>
      </NavLink>
    ),
  },
  {
    key: "/products/all",
    label: (
      <>
        <ShoppingOutlined />
        <span className="ml-2">Shop</span>
      </>
    ),
    children: [
      { key: "all", label: <Link to={"/products/all"}>All Products</Link> },
      { key: "hoodie", label: <Link to={"/products/hoodie"}>Hoodie</Link> },
      { key: "tee", label: <Link to={"/products/tee"}>Tee</Link> },
      { key: "polo", label: <Link to={"/products/polo"}>Polo</Link> },
      { key: "pant", label: <Link to={"/products/pant"}>Pant</Link> },
    ],
  },
  {
    key: "/contact",
    label: (
      <NavLink
        to={"/contact"}
        className={({ isActive }) => (isActive ? "text-blue-600" : "")}
      >
        <ContactsOutlined />
        <span className="ml-2">Contact</span>
      </NavLink>
    ),
  },
  {
    key: "/about",
    label: (
      <NavLink
        to={"/about"}
        className={({ isActive }) => (isActive ? "text-blue-600" : "")}
      >
        <IdcardOutlined />
        <span className="ml-2">About us</span>
      </NavLink>
    ),
  },
];
