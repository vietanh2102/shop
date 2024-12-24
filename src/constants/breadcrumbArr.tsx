import { Link } from "react-router-dom";

export const BREADCRUMB = {
  FILTER: [
    {
      title: <Link to={"/"}>Home</Link>,
    },
    {
      title: <Link to={"/products/all"}>All Products</Link>,
    },
    {
      title: <span>Filter</span>,
    },
  ],
  detailProduct: (title?: string) => [
    {
      title: <Link to={"/"}>Home</Link>,
    },
    {
      title: <Link to={"/products/all"}>All Products</Link>,
    },
    {
      title: title,
    },
  ],
  productsPage: (param?: string) => [
    {
      title: <Link to={"/"}>Home</Link>,
    },
    {
      title: <Link to={"/products/all"}>All Products</Link>,
    },
    {
      title: (
        <span className="uppercase">
          {param === "all" ? "" : param === "long" ? "Denim" : param}
        </span>
      ),
    },
  ],
};
