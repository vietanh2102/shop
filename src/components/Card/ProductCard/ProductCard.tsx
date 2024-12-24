import { Link } from "react-router-dom";
import { ProductType } from "../../../types";

interface Props {
  product: ProductType;
}
function ProductCard({ product }: Props) {
  const { id, image, title, price } = product;

  return (
    <div className=" overflow-hidden  relative group">
      <div className="w-full flex justify-center items-center  h-auto">
        <div className=" flex justify-center items-center ">
          <Link to={`/product/${id}`}>
            <div className="w-full relative h-[280px] z-10">
              <img
                className=" max-h-[280px] group-hover:opacity-0 transition duration-500 "
                src={image[0]}
                alt="img"
              />
              <img
                className=" max-h-[280px] group-hover:scale-105 group-hover:opacity-100 group-hover:z-30 transition duration-500 absolute top-0  opacity-0 "
                src={image[1]}
                alt="img"
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="text-center my-[10px]  ">
        <Link
          className="group-hover:underline  group-hover:text-red-500 line-clamp-1 max-w-[212px] mx-auto"
          to={`/product/${id}`}
        >
          {title}
        </Link>
        <div className=" font-semibold">
          {price.toLocaleString()}
          <span className=" underline decoration-slice">đ</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
