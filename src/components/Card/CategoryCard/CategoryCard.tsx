import { Link } from "react-router-dom";

interface Props {
  img: string;
  title: string;
  path: string;
}

function CategoryCard({ img, title, path }: Props) {
  return (
    <Link to={`/products/${path}`}>
      <div className="relative cursor-pointer md:max-w-[250px] mx-auto mb-8 ">
        <img
          src={img}
          alt="img"
          className="w-full h-auto rounded-md md:hover:scale-105 duration-200"
        />
        <span className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] text-white text-[20px] font-bold">
          {title}
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;
