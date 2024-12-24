import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Table } from "antd";
import { CartType, OrderForm, OrderInfo } from "../../types";
import { rules } from "../../rules";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { removeAllItems } from "../../redux/slice/carts.slice";
import { useOrdersMutation } from "../../redux/service/product.service";
import { columns } from "../../components/ColumnsTable/ColumnsTable";
import { useMemo } from "react";

function PayPage() {
  const cart = useAppSelector((state) => state.carts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [Order] = useOrdersMutation();
  const totalPrice = useMemo(() => {
    const totalPrice = cart.cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity * currentValue.price;
    }, 0);
    return totalPrice;
  }, [cart.cart]);
  const [form] = Form.useForm();

  const handleClickOrder = async (value: OrderForm) => {
    const orderInfo: OrderInfo = {
      userId: String(user.user.id),
      ...value,
      orderAt: new Date().toLocaleDateString("pt-PT"),
      status: "processing",
      carts: cart.cart,
    };
    try {
      await Order(orderInfo).unwrap();
      message.success("Order successful");
      form.resetFields();
      dispatch(removeAllItems());
    } catch (err) {
      message.error("Try again");
      console.error("Failed to save the post: ", err);
    }
  };

  return (
    <div className="max-w-[1170px] mx-auto px-8 lg:px-0">
      <div className="flex text-[38px] my-6">
        <ShoppingCartOutlined />
        <p className=" font-light ml-2">Your Order</p>
      </div>
      <Table<CartType>
        columns={columns}
        dataSource={cart.cart}
        pagination={false}
        rowKey={(columns) => columns.id}
      />
      <div className="flex justify-end my-8">
        <p className="text-[22px] font-bold">
          Total:{" "}
          <span className="text-red-400">{totalPrice.toLocaleString()}đ</span>
        </p>
      </div>
      <div className="my-8">
        <p className="text-[22px] font-bold my-8">Information:</p>
        <Form
          form={form}
          onFinish={handleClickOrder}
          id="myForm"
          layout="vertical"
        >
          <Form.Item name="email" label="Email" rules={rules.email} hasFeedback>
            <Input size="large" placeholder="Enter your Email" />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={rules.name} hasFeedback>
            <Input size="large" placeholder="Enter your Name" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={rules.phone} hasFeedback>
            <Input size="large" placeholder="Enter your Phone" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={rules.address}
            hasFeedback
          >
            <Input size="large" placeholder="Enter your Address" />
          </Form.Item>
        </Form>
        <Flex justify="end">
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            Order
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default PayPage;
