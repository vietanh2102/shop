import { Form, Input, message } from "antd";
import { userApiPrivate } from "../../../axios/userApi";
import { rules } from "../../../rules";
import { UserInfo } from "../../../types/Users.type";
import { FC } from "react";
interface Props {
  setOpenModalChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordForm: FC<Props> = ({ setOpenModalChangePassword }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleClickChange = async (info: UserInfo) => {
    messageApi.open({
      key: "changePass",
      type: "loading",
      content: "Changing...",
    });
    await userApiPrivate
      .put("user", info)
      .then(() => {
        messageApi.open({
          key: "changePass",
          type: "success",
          content: "Change successful",
          duration: 2,
        });
        setOpenModalChangePassword(false);
      })
      .catch((res) => {
        const messageRes = Object.values(res.response.data.data).toString();
        messageApi.open({
          key: "changePass",
          type: "error",
          content: messageRes,
          duration: 2,
        });
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        id="myChangePasswordForm"
        form={form}
        layout="vertical"
        onFinish={handleClickChange}
      >
        <Form.Item
          name={"password"}
          label={"Old Password"}
          rules={rules.password}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Enter your old Password" />
        </Form.Item>
        <Form.Item
          name={"new_password"}
          label={"New password"}
          rules={rules.password}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Enter your new Password" />
        </Form.Item>
      </Form>
    </>
  );
};
export default ChangePasswordForm;
