import { Button } from "antd";
import { CartType } from "../../types";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../hooks/reduxHook";
import {
  deIncreaseItem,
  increaseItem,
  removeItem,
} from "../../redux/slice/carts.slice";

function CartItem({ item }: { item: CartType }) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex mb-4 cursor-pointer">
      <img src={item.image[0]} alt="img" className="max-w-[150px]" />
      <div className="ml-2">
        <p className="text-base font-semibold line-clamp-1 mb-2">
          {item.title}
        </p>
        <p className=" my-2">Size: {item.size}</p>
        <div className="flex items-center my-2">
          <p className="mr-2">Quantity:</p>

          <Button
            size="small"
            onClick={() =>
              dispatch(deIncreaseItem({ id: item.id, size: item.size }))
            }
          >
            <MinusOutlined />
          </Button>
          <p className="mx-2"> {item.quantity}</p>
          <Button
            size="small"
            onClick={() =>
              dispatch(increaseItem({ id: item.id, size: item.size }))
            }
          >
            <PlusOutlined />
          </Button>
        </div>
        <p className=" my-2">
          Price:{item.quantity}x{item.price.toLocaleString()}đ
        </p>
        <Button
          size="small"
          onClick={() => dispatch(removeItem({ id: item.id, size: item.size }))}
        >
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
