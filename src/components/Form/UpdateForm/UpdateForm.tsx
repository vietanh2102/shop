import { DatePicker, Form, Input, message } from "antd";
import { userApiPrivate } from "../../../axios/userApi";
import { rules } from "../../../rules";
import { UserInfo } from "../../../types/Users.type";
import { FC } from "react";
interface Props {
  profile?: UserInfo;
  getUser: () => Promise<void>;
  setOpenModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateForm: FC<Props> = ({ profile, getUser, setOpenModalUpdate }) => {
  const [form] = Form.useForm();
  const handleClickUpdate = async (info: UserInfo) => {
    await userApiPrivate
      .put("user", info)
      .then(() => {
        message.success("Update successful");
        setOpenModalUpdate(false);
        getUser();
      })
      .catch((res) => {
        const messageRes = Object.values(res.response.data.data).toString();
        message.error(messageRes);
      });
  };

  return (
    <Form
      id="myForm"
      form={form}
      layout="vertical"
      onFinish={handleClickUpdate}
    >
      <Form.Item
        name={"email"}
        label={"Email"}
        rules={rules.email}
        initialValue={profile?.email}
      >
        <Input size="large" value={profile?.email} disabled={true} />
      </Form.Item>
      <Form.Item name={"name"} label="Name" rules={rules.name} hasFeedback>
        <Input size="large" placeholder="Enter your name" />
      </Form.Item>
      <Form.Item
        name={"date_of_birth"}
        label="Date of birth"
        rules={rules.name}
      >
        <DatePicker
          format={{
            format: "YYYY-MM-DD",
            type: "mask",
          }}
        />
      </Form.Item>
      <Form.Item
        name={"address"}
        label="Address"
        rules={rules.name}
        hasFeedback
      >
        <Input size="large" placeholder="Enter your address" />
      </Form.Item>
      <Form.Item name={"phone"} label="Phone" rules={rules.phone} hasFeedback>
        <Input size="large" placeholder="Enter your phone" />
      </Form.Item>
      <Form.Item
        name={"password"}
        label={"Old Password"}
        rules={rules.password}
        hasFeedback
      >
        <Input.Password size="large" placeholder="Enter your Password" />
      </Form.Item>
      <Form.Item
        name={"new_password"}
        label={"New password"}
        rules={rules.password}
        hasFeedback
      >
        <Input.Password size="large" placeholder="Enter your Password" />
      </Form.Item>
    </Form>
  );
};
export default UpdateForm;
