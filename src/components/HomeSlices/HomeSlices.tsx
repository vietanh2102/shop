import { Button } from "antd";
import { Link } from "react-router-dom";

interface Props {
  img: string;
  description1: string;
  description2: string;
  title: string;
}
function HomeSlices({ img, title, description1, description2 }: Props) {
  return (
    <div className="relative">
      <img src={img} alt="img1" className="w-full" />
      <div className="absolute bottom-6 left-10 md:bottom-16 md:left-16 lg:left-[200px] text-white font-bold ">
        <p className="my-4 md:text-[20px]">{title}</p>
        <h2 className="md:text-[26px] lg:text-[40px]">{description1}</h2>
        <h2 className="mb-4 md:text-[26px] lg:text-[40px]">{description2}</h2>
        <Button size="large" className="font-bold">
          <Link to={"products/all"}> Shop Now</Link>
        </Button>
      </div>
    </div>
  );
}

export default HomeSlices;
