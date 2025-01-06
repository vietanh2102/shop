import { Button, Form, Input, message } from "antd";
import { rules } from "../../rules";
import { RegisterType } from "../../types";
import userApi from "../../axios/userApi";

function Register() {
  const [form] = Form.useForm();
  const handleCLickSubmit = async (value: RegisterType) => {
    await userApi
      .post(`register`, value)
      .then((res) => {
        if (res.data) {
          console.log(res);
          message.success("Register successful");
        }
        form.resetFields();
      })
      .catch((res) => {
        message.error(res.response?.data.data.email);
      });
  };
  return (
    <div className="w-full max-w-[900px] mx-auto p-4">
      <p className="text-[18px]  font-bold leading-5 text-center">
        Register new account
      </p>
      <Form
        form={form}
        onFinish={handleCLickSubmit}
        id="myFormRegister"
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            ...rules.email,
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
          hasFeedback
        >
          <Input size="large" placeholder="Enter your Email" />
        </Form.Item>
        <Form.Item name="name" label="Name" hasFeedback>
          <Input size="large" placeholder="Enter your Name" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Enter your Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            ...rules.confirmPassword,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            size="large"
            placeholder="Enter your Confirm Password"
          />
        </Form.Item>
      </Form>
      <Button
        form="myFormRegister"
        key="submit"
        htmlType="submit"
        type="primary"
      >
        Submit
      </Button>
    </div>
  );
}

export default Register;
