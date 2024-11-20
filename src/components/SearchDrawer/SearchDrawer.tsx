import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Drawer, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";

const { Search } = Input;
function SearchDrawer() {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const { loading, searchResult, debounced } = useSearch(searchValue);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
  };

  return (
    <>
      <SearchOutlined
        className="cursor-pointer text-[22px]"
        onClick={() => setOpenSearch(true)}
      />
      <Drawer
        title="Search products"
        onClose={() => setOpenSearch(false)}
        open={openSearch}
      >
        <Search
          placeholder="Search products"
          size="large"
          onChange={handleChangeSearch}
        />
        {loading && (
          <div className="flex justify-center font-bold mt-4">
            <span>
              Loading
              <LoadingOutlined />
            </span>
          </div>
        )}
        {searchResult?.length === 0 && !loading && debounced !== "" && (
          <p className="text-[16px] text-center font-bold mt-4">
            No result match, try again
          </p>
        )}
        {!loading &&
          searchResult?.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              onClick={() => setOpenSearch(false)}
            >
              <div className="mt-4">
                <div className="flex mb-4">
                  <img
                    src={item.image[0]}
                    alt="img"
                    className="max-w-[100px]"
                  />
                  <div className="ml-2">
                    <p className="text-base font-semibold line-clamp-1 mb-2">
                      {item.title}
                    </p>
                    <p className=" my-2">
                      Price: {item.price.toLocaleString()}đ
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </Drawer>
    </>
  );
}

export default SearchDrawer;
