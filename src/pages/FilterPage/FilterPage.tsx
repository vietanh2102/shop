import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Card/ProductCard/ProductCard";
import Loading from "../../components/Loading/Loading";
import { Breadcrumb, Pagination } from "antd";
import IntroProducts from "../../components/IntroProducts/IntroProducts";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import { useEffect, useState } from "react";
import { ProductType } from "../../types";
import instance from "../../axios/api";
import { BREADCRUMB } from "../../constants/breadcrumbArr";

function FilterPage() {
  const { param } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();
  const currenPage = searchParam.get("page") || 1;
  const [totalPage, setTotalPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductType[]>([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await instance.get(`products?${param}`, {
          params: {
            _page: currenPage,
            _limit: 8,
          },
        });
        setResult(response.data);
        setTotalPage(parseInt(response.headers["x-total-count"], 10));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    })();
  }, [currenPage, param]);

  const handlePageChange = (page: number) => {
    searchParam.set("page", String(page));
    setSearchParam(searchParam);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };
  if (loading) {
    return (
      <div className="min-h-[90vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div className="max-w-[1170px] mx-auto px-[32px] lg:p-0 mt-[112px]">
      <Breadcrumb items={BREADCRUMB.FILTER} />
      <h2 className="mt-4 mb-4 font-semibold text-3xl">Result filter:</h2>
      {/* {filter} */}
      <div className="flex mt-9 justify-between">
        <div className="hidden md:block w-[275px]  flex-shrink-0">
          <FilterProducts />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {result.length === 0 && (
            <p className="text-center font-bold">No result match</p>
          )}
          {result.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
      <Pagination
        defaultCurrent={Number(currenPage)}
        total={totalPage}
        align="end"
        pageSize={8}
        onChange={handlePageChange}
        className={`${result.length === 0 && "hidden"}`}
      />
      <IntroProducts
        img="https://zest-fleek.myshopify.com/cdn/shop/files/collection-page_image_card1.jpg?v=1676866484&width=940"
        title="Enjoy free shipping on orders over $75"
        description="Get really close to the music with a pair of headphones. Whatever you are into in-ears, over-ears or when you need the world to go on mute."
      />
    </div>
  );
}

export default FilterPage;
