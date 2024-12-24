import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { slice1, slice3 } from "../../assets";

import HomeSlices from "../../components/HomeSlices/HomeSlices";
import { useGetProductsQuery } from "../../redux/service/product.service";
import ProductCard from "../../components/Card/ProductCard/ProductCard";
import Intro from "../../components/Intro/Intro";
import CategoryCard from "../../components/Card/CategoryCard/CategoryCard";
import {
  CATEGORYPRODUCTS,
  HOTPRODUCTS,
} from "../../constants/products.constant";
import { CarouselRef } from "antd/es/carousel";
import { createRef, RefObject } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { data } = useGetProductsQuery({ page: 1 });
  const carouselRef: RefObject<CarouselRef> = createRef<CarouselRef>();
  return (
    <>
      <Carousel arrows autoplay>
        <HomeSlices
          img={slice1}
          title="Stay classic"
          description1="Get Ready. Get Ahead."
          description2="In your Elements."
        />
        <HomeSlices
          img={slice3}
          title="Be timeless"
          description1="Own your Energy."
          description2="Wear your Pride."
        />
      </Carousel>

      <Intro />

      <div className="max-w-[1170px] mx-auto px-[32px] lg:p-0">
        <div className="flex mt-16 mb-4 justify-between">
          <h2 className=" font-semibold text-3xl">New Arrivals</h2>
          <p className=" text-[16px] underline cursor-pointer text-red-500">
            <Link to={"/products/all"}> See all</Link>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.products.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="max-w-[1170px] mx-auto px-[32px] lg:p-0 my-16 relative">
        <h2 className="mt-16 mb-4 font-semibold text-3xl">Discover Products</h2>
        <Carousel dots={false} ref={carouselRef} autoplay>
          {HOTPRODUCTS.map((item) => (
            <div className="relative" key={item.id}>
              <div className="block md:flex gap-8">
                <div className="relative w-full md:w-[60%]">
                  <img src={item.image[0]} alt="img" className="w-[70%]" />
                  <img
                    src={item.image[1]}
                    alt="img"
                    className="absolute w-[50%] top-2/4 left-2/4  translate-y-[-50%]"
                  />
                </div>
                <div className="w-full md:w-[calc(40%-32px)] flex flex-col justify-center mt-4">
                  <h2 className="text-[28px] font-semibold">{item.title}</h2>
                  <p className="text-[14px] font-semibold my-4">
                    {item.price.toLocaleString()}đ
                  </p>
                  <p>{item.description}</p>
                  <Link to={`/product/${item.id}`}>
                    <button className="py-3 px-6 bg-red-400 text-white font-bold rounded-[8px] mt-4">
                      Shop now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <button
          className="absolute top-2/4  py-4 px-2 bg-[#666666] opacity-50 text-white"
          onClick={() => carouselRef.current?.prev()}
        >
          <LeftOutlined />
        </button>

        <button
          onClick={() => carouselRef.current?.next()}
          className="absolute top-2/4 right-8 md:right-0 py-4 px-2 bg-[#666666] opacity-50 text-white"
        >
          <RightOutlined />
        </button>
      </div>

      <div className="max-w-[1170px] mx-auto mt-16 px-8 lg:px-0">
        <h2 className="mt-16 mb-4 font-semibold text-3xl">Explore</h2>
        <div className="block mx-auto md:flex justify-between flex-wrap">
          {CATEGORYPRODUCTS.map((item) => (
            <CategoryCard
              img={item.img}
              title={item.title}
              key={item.title}
              path={item.path}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
