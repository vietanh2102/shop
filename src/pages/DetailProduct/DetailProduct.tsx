import {
  Breadcrumb,
  Button,
  Carousel,
  InputNumber,
  InputNumberProps,
  message,
  Radio,
  RadioChangeEvent,
} from "antd";
import { ClockCircleOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { createRef, RefObject, useEffect, useState } from "react";
import sizeImg from "../../assets/imgs/size.webp";
import detailPage from "../../assets/imgs/detai-page_image_card.webp";
import { CartType, ProductType } from "../../types";
import Loading from "../../components/Loading/Loading";
import { valueType } from "antd/es/statistic/utils";
import { CarouselRef } from "antd/es/carousel";
import { useGetProductQuery } from "../../redux/service/product.service";
import instance from "../../axios/api";
import { addCart } from "../../redux/slice/carts.slice";
import { useAppDispatch } from "../../hooks/reduxHook";
import ProductCard from "../../components/Card/ProductCard/ProductCard";
import IntroProducts from "../../components/IntroProducts/IntroProducts";
import { BREADCRUMB } from "../../constants/breadcrumbArr";
function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useGetProductQuery(Number(id));
  const [similarProduct, setSimilarProduct] = useState<ProductType[]>([]);
  const carouselRef: RefObject<CarouselRef> = createRef<CarouselRef>();
  useEffect(() => {
    const getSimilarProduct = async () => {
      const res = await instance.get(
        `products?detail=${data?.detail}&_limit=4&id_ne=${data?.id}`
      );
      if (res.data) {
        setSimilarProduct(res.data);
      }
    };
    getSimilarProduct();
  }, [data, id]);
  const [size, setSize] = useState("");
  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };
  const [quantity, setQuantity] = useState<valueType | null>(1);
  const handleQuantityChange: InputNumberProps["onChange"] = (value) => {
    setQuantity(value);
  };
  const dispatch = useAppDispatch();
  const handleClickAddCart = () => {
    if (size === "") {
      return message.error("Please select size");
    }
    if (data) {
      const item: CartType = {
        ...data,
        size: size,
        quantity: Number(quantity),
        total: Number(quantity) * Number(data.price),
      };
      dispatch(addCart(item));
      message.success("Add successful");
    }
  };
  const handleClickBuy = () => {
    if (size === "") {
      return message.error("Please select size");
    }
    handleClickAddCart();
    navigate("/pay");
  };
  if (isFetching) {
    return (
      <div className="min-h-[90vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-8 max-w-[1170px] mx-auto  lg:px-0">
      <Breadcrumb
        className="mb-6 mt-[104px]"
        items={BREADCRUMB.detailProduct(data?.title)}
      />
      <div className="block lg:flex  ">
        <div className="w-full mx-auto md:w-3/5">
          <Carousel arrows infinite={true} ref={carouselRef}>
            {data?.image.map((item, index) => (
              <div key={index} className="relative">
                <img
                  className="mx-auto max-w-[90%] relative z-20"
                  src={item}
                  alt="img"
                />
              </div>
            ))}
          </Carousel>
          <div className="flex gap-2 mt-2">
            {data?.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt="img"
                className="max-w-[100px] border cursor-pointer"
                onClick={() => carouselRef.current?.goTo(index)}
              />
            ))}
          </div>
        </div>

        <div className=" mt-8  lg:flex-1 lg:mt-0 ml-8">
          <div className=" text-[36px] font-bold ">{data?.title}</div>
          <div>{data?.price.toLocaleString()}đ</div>
          <div className="w-full mt-4 text-left">
            <h1 className=" font-bold  mb-[5px]">Size:</h1>
            <Radio.Group value={size} onChange={handleSizeChange}>
              {data?.size.map((item) => (
                <Radio.Button value={item} key={item}>
                  {item}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <div className="w-full mt-4 text-left">
            <h1 className=" font-bold  mb-[5px]">Quantity:</h1>
            <InputNumber
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="mt-4">
            <Button
              size="large"
              type="primary"
              block
              className="mb-2"
              onClick={handleClickAddCart}
            >
              Add to cart
            </Button>
            <Button
              size="large"
              block
              className="bg-red"
              onClick={handleClickBuy}
            >
              Buy Now
            </Button>
          </div>

          <div className="text-[18px]">
            <p className="mt-4">
              <ClockCircleOutlined className="mr-2" />
              Estimated delivery: 03 - 05 day
            </p>
            <p>
              <FormOutlined className="mr-2" />
              <strong>Free shipping</strong> on all orders over 1.000.000d
            </p>
          </div>

          <p className="font-bold  mt-4">Table Size:</p>
          <img
            className="max-w-[300px]  mx-auto"
            src={sizeImg}
            alt="size img"
          />
        </div>
      </div>
      <IntroProducts
        img={detailPage}
        title="The chunky sweater of your dreams."
        description="You will be hugely impressed with this shower resistant jacket. In
            eye-catching autumn shades, it comes in a cute quilted design with
            button fastenings and two hand pockets. It's great for layering up
            on chilly days - just pop it over your jumper!"
      />

      <div className="mt-8">
        <p className="text-[24px] font-medium leading-5 text-center my-12">
          You may be interested in
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 ">
          {similarProduct.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
