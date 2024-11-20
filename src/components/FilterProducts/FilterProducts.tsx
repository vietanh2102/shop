import { GetProps } from "react-redux";
import { FilterType } from "../../types";
import { Button, Form, Input, message, Select, Slider } from "antd";
import { useNavigate } from "react-router-dom";
import { COLOR, DETAIL } from "../../constants/filter.constant";
type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
function FilterProducts() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const price: number[] = Form.useWatch("price", form);
  const handleFilter = (filter: FilterType) => {
    let filterPath = "/filter/";
    for (const [key, value] of Object.entries(filter)) {
      if (value !== undefined && typeof value !== "object") {
        filterPath = filterPath + `&${key}=${value}`;
      }
    }

    if (filter.price !== undefined) {
      filterPath =
        filterPath +
        `&price_gte=${filter.price[0]}&price_lte=${filter.price[1]}`;
    }

    if (filterPath === "/filter/") {
      return message.error("Enter your filter");
    }
    navigate(filterPath);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    navigate(`/filter/q=${value}`);
  };
  return (
    <div className="w-full pr-6 ">
      <p className="text-xl font-bold  mb-2">Search</p>
      <Search placeholder="Product" onSearch={onSearch} />
      <p className="text-xl font-bold mt-9 mb-2">Filter</p>
      <Form form={form} onFinish={handleFilter} id="myForm" layout="vertical">
        <p className="text-base  mb-2">Color</p>
        <Form.Item name="color">
          <Select placeholder="Color" options={COLOR} />
        </Form.Item>
        <p className="text-base  mt-9 mb-2">Category</p>
        <Form.Item name="detail">
          <Select placeholder="Category" options={DETAIL} />
        </Form.Item>
        <div className="flex justify-between items-center mt-9 mb-2">
          <p className="text-base ">Price</p>
          {price !== undefined && (
            <p className="text-cyan-700 px-2 py-1 border">
              {price[0].toLocaleString()} đ - {price[1].toLocaleString()} đ
            </p>
          )}
        </div>
        <Form.Item name="price">
          <Slider range min={0} max={2000000} />
        </Form.Item>
      </Form>

      <Button
        form="myForm"
        key="submit"
        htmlType="submit"
        type="primary"
        className="mr-2"
      >
        Filter
      </Button>
      <Button onClick={() => form.resetFields()}>Reset</Button>
    </div>
  );
}

export default FilterProducts;
