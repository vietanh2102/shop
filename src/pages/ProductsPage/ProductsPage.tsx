import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetProductsDetailQuery } from "../../redux/service/product.service";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loading from "../../components/Loading/Loading";
import { Breadcrumb, Pagination } from "antd";
import IntroProducts from "../../components/IntroProducts/IntroProducts";
import FilterProducts from "../../components/FilterProducts/FilterProducts";

function ProductsPage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const currenPage = searchParam.get("page") || 1;
  const { param } = useParams();
  const { data, isFetching } = useGetProductsDetailQuery({
    detail: String(param),
    page: Number(currenPage),
  });
  const handlePageChange = (page: number) => {
    searchParam.set("page", String(page));
    setSearchParam(searchParam);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };
  if (isFetching) {
    return (
      <div className="min-h-[90vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div className="max-w-[1170px] mx-auto px-[32px] lg:p-0 mt-[112px]">
      <Breadcrumb
        items={[
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
        ]}
      />
      <h2 className="mt-4 mb-4 font-semibold text-3xl">Products for you</h2>
      {/* {filter} */}
      <div className="flex mt-9 justify-between">
        <div className="hidden md:block w-[275px]  flex-shrink-0">
          <FilterProducts />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.products.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
      <Pagination
        defaultCurrent={Number(currenPage)}
        total={data?.totalPage}
        align="end"
        pageSize={8}
        onChange={handlePageChange}
      />
      <IntroProducts
        img="https://zest-fleek.myshopify.com/cdn/shop/files/collection-page_image_card1.jpg?v=1676866484&width=940"
        title="Enjoy free shipping on orders over $75"
        description="Get really close to the music with a pair of headphones. Whatever you are into in-ears, over-ears or when you need the world to go on mute."
      />
    </div>
  );
}

export default ProductsPage;
