import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import { useAppDispatch } from "../../hooks/reduxHook";
import { rules } from "../../rules";
import userApi from "../../axios/userApi";
import { loginUser } from "../../redux/slice/user.slice";

function Login() {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = async (value: User) => {
    await userApi
      .post(`login`, value)
      .then((res) => {
        if (res.data) {
          const user = {
            id: res.data.data.user._id,
            email: res.data.data.user.email,
            token: res.data.data.access_token,
          };
          dispatch(loginUser(user));
          nav("/");
        }
        message.success("Login successful");
      })
      .catch((res) => {
        message.error(res.response.data.data.password);
      });
  };
  return (
    <div className="w-full max-w-[900px] mx-auto p-4 pt-[112px] min-h-[100vh]">
      <p className="text-[18px]  font-bold leading-5 text-center">Login</p>
      <Form form={form} onFinish={handleLogin} id="myForm" layout="vertical">
        <Form.Item name="email" label="Email" rules={rules.email} hasFeedback>
          <Input size="large" placeholder="Enter your Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Enter your Password" />
        </Form.Item>
      </Form>
      <Button form="myForm" key="submit" htmlType="submit" type="primary">
        Login
      </Button>
    </div>
  );
}

export default Login;
