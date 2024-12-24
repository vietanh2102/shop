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
  const handleClickChange = async (info: UserInfo) => {
    await userApiPrivate
      .put("user", info)
      .then(() => {
        message.success("Change successful");
        setOpenModalChangePassword(false);
      })
      .catch((res) => {
        const messageRes = Object.values(res.response.data.data).toString();
        message.error(messageRes);
      });
  };

  return (
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
  );
};
export default ChangePasswordForm;
