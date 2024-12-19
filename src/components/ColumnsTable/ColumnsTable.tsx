import { TableProps, Tag } from "antd";
import { CartType, OrderInfo } from "../../types";

export const statusOrder = {
  success: "success",
  processing: "processing",
  cancel: "error",
};
export const columns: TableProps<CartType>["columns"] = [
  {
    title: "Product",
    dataIndex: "image",
    key: "image",
    render: (src: string[]) => <img src={src[0]} alt="img" />,
    width: 150,
  },
  {
    title: "",
    dataIndex: "title",
    key: "title",
    render: (text: string[]) => <p className="text-left">{text}</p>,
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (text: number) => <p>{text.toLocaleString()}đ</p>,
  },
];
export const columnsOrders: TableProps<OrderInfo>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 150,
  },
  {
    title: "Order At",
    dataIndex: "orderAt",
    key: "orderAt",
    width: 150,
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (_, { status }) => {
      const color = statusOrder[status as keyof typeof statusOrder];
      return (
        <>
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        </>
      );
    },
  },
];
