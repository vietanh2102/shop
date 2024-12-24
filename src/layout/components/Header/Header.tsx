import {
  DownOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Drawer,
  Dropdown,
  Menu,
  MenuProps,
  message,
  Popover,
} from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CATEGORYPRODUCTS } from "../../../constants/products.constant";
import CategoryCard from "../../../components/Card/CategoryCard/CategoryCard";
import SearchDrawer from "../../../components/SearchDrawer/SearchDrawer";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { logoutUser } from "../../../redux/slice/user.slice";
import CartItem from "../../../components/Card/CartItem/CartItem";
import { linkItems } from "../../../components/DrawerLinkItems/DrawerLinkItems";

function Header() {
  const nav = useNavigate();
  const [bar, setBar] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.carts.cart);
  const user = useAppSelector((state) => state.user);
  const contentShop = (
    <div className="p-6 flex gap-x-4">
      {CATEGORYPRODUCTS.map((item) => (
        <CategoryCard
          img={item.img}
          title={item.title}
          key={item.title}
          path={item.path}
        />
      ))}
    </div>
  );

  const userItems: MenuProps["items"] = [
    {
      label: <Link to={"/profile"}> Profile</Link>,
      key: "profile",
    },
    {
      label: <Link to={"/pay"}>Your order</Link>,
      key: "order",
    },

    {
      label: <Link to={"/"}>Logout</Link>,
      key: "logout",
    },
  ];
  const handleCLickPay = () => {
    setOpenDrawer(false);
    nav("/pay");
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      dispatch(
        logoutUser({
          id: NaN,
          email: "",
          token: "",
        })
      );
      nav("/");
      message.success("Logout successful");
    }
  };
  const totalItem = carts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
  const totalPrice = carts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.price;
  }, 0);
  return (
    <header className="w-full  fixed top-0 left-0 right-0 bg-white  h-20 p-8 lg:p-0 z-20 shadow-lg">
      <div className="max-w-[1170px] h-full mx-auto flex justify-between items-center">
        <div className="text-[22px] font-bold">SHOP</div>
        <ul className=" gap-8 text-lg font-semibold hidden md:flex">
          <li>
            <NavLink
              to={"/home"}
              className={({ isActive }) => (isActive ? "text-blue-600" : "")}
            >
              Home
            </NavLink>
          </li>
          <li className="group">
            <Popover content={contentShop} placement="bottom">
              <NavLink
                to={"/products/all"}
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
              >
                Shop
                <DownOutlined className="text-[14px] ml-1 group-hover:rotate-180 duration-300" />
              </NavLink>
            </Popover>
          </li>
          <li>
            <NavLink
              to={"/contact"}
              className={({ isActive }) => (isActive ? "text-blue-600" : "")}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) => (isActive ? "text-blue-600" : "")}
            >
              About us
            </NavLink>
          </li>
        </ul>

        <div className=" flex gap-3 text-[22px]">
          {user.user.email ? (
            <Dropdown menu={{ items: userItems, onClick }}>
              <Button onClick={(e) => e.preventDefault()}>
                <UserOutlined />
              </Button>
            </Dropdown>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button>
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button type="primary">
                <Link to={"/register"}>Register</Link>
              </Button>
            </div>
          )}
          <SearchDrawer />
          <Badge count={totalItem}>
            <ShoppingCartOutlined
              className="cursor-pointer text-[22px]"
              onClick={() => setOpenDrawer(true)}
            />
          </Badge>
          <Drawer
            title="Cart"
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
            className="cart-drawer"
            footer={
              <div className="flex justify-between py-4">
                <p className="text-[20px] font-bold ">
                  <span className="text-red-400">Total: </span>
                  {totalPrice.toLocaleString()}đ
                </p>
                <Button onClick={handleCLickPay}>Pay now</Button>
              </div>
            }
          >
            {carts.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </Drawer>
          <MenuOutlined className="md:hidden" onClick={() => setBar(true)} />
          <Drawer
            onClose={() => setBar(false)}
            open={bar}
            title={<div className="font-bold text-[20px]">Shop</div>}
          >
            <Menu
              items={linkItems}
              mode="inline"
              onClick={() => setBar(false)}
            />
            <div className="flex justify-center gap-3">
              <Button>
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button type="primary">
                <Link to={"/register"}>Register</Link>
              </Button>
            </div>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

export default Header;
