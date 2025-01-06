import { DatePicker, Form, Input, message } from "antd";
import { userApiPrivate } from "../../../axios/userApi";
import { rules } from "../../../rules";
import { UserInfo } from "../../../types/Users.type";
import { FC } from "react";
import moment from "moment";
interface Props {
  profile?: UserInfo;
  getUser: () => Promise<void>;
  setOpenModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateForm: FC<Props> = ({ profile, getUser, setOpenModalUpdate }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleClickUpdate = async (info: UserInfo) => {
    messageApi.open({
      key: "updateProfile",
      type: "loading",
      content: "Loading...",
      duration: 2,
    });
    await userApiPrivate
      .put("user", info)
      .then(() => {
        messageApi.open({
          key: "updateProfile",
          type: "success",
          content: "Update successful",
        });
        message.success("Update successful");
        setOpenModalUpdate(false);
        getUser();
      })
      .catch((res) => {
        const messageRes = Object.values(res.response.data.data).toString();
        messageApi.open({
          key: "updateProfile",
          type: "error",
          content: messageRes,
        });
        message.error(messageRes);
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        id="updateForm"
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
        <Form.Item
          name={"name"}
          label="Name"
          rules={rules.name}
          hasFeedback
          initialValue={profile?.name}
        >
          <Input size="large" placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name={"date_of_birth"}
          label="Date of birth"
          initialValue={moment(profile?.date_of_birth)}
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
          initialValue={profile?.address}
          hasFeedback
        >
          <Input size="large" placeholder="Enter your address" />
        </Form.Item>
        <Form.Item
          name={"phone"}
          label="Phone"
          rules={rules.phone}
          hasFeedback
          initialValue={profile?.phone}
        >
          <Input size="large" placeholder="Enter your phone" />
        </Form.Item>
      </Form>
    </>
  );
};
export default UpdateForm;
