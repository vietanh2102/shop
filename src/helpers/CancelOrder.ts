import { message } from "antd";
import instance from "../axios/api";
import { OrderInfo } from "../types";
import { AxiosError } from "axios";
import { ProductApi } from "../redux/service/product.service";
import { store } from "../redux/stores/store";

export const CancelOrders = (order: OrderInfo): void => {
  const newOrder: OrderInfo = {
    ...order,
    status: "cancel",
  };
  (async () => {
    await instance
      .patch(`orders/${order.id}`, newOrder)
      .then((res) => {
        if (res.data) {
          store.dispatch(ProductApi.util.invalidateTags(["Cart"]));
          message.success("Cancel successful");
        }
      })
      .catch((err: AxiosError) => {
        message.error(err.message);
      });
  })();
};
