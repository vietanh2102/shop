import { Button, Flex, Form, Input, message } from "antd";
import { allProducts } from "../../assets";

function ContactPage() {
  const [form] = Form.useForm();
  const onFinish = () => {
    form.resetFields();
    return message.success("Thanks you for your contact");
  };
  return (
    <div className="max-w-[1170px] mx-auto p-8 lg:p-0 mt-[112px]">
      <div className={`block md:flex gap-8 e mt-16 bg-[#f6f6f6]`}>
        <img
          src="https://zest-fleek.myshopify.com/cdn/shop/files/Mask_group.jpg?v=1676344561&width=940"
          alt="img"
          className="w-full md:w-1/2"
        />
        <div className="flex flex-col justify-center  mt-4">
          <h2 className="text-[42px] md:text-[36px] lg:text-[48px] font-semibold">
            39 Phu Vinh
          </h2>
          <ul>
            <li>Our Store is open again.</li>
            <li>Come visit us at the 39 Phu Vinh</li>
            <li>We're open 7 days a week, 12:00-18:00.</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-16">
        <h2 className="text-[42px] md:text-[36px] lg:text-[48px] font-semibold">
          Get in touch
        </h2>
        <p>Have a question or comment? Drop us a message! </p>
        <p>Our support hours: Monday - Friday, 7am - 3pm.</p>
      </div>
      <div
        className={`block md:flex gap-8 mt-4 flex-row-reverse  bg-[#f6f6f6]`}
      >
        <img src={allProducts} alt="img" className="w-full md:w-1/2" />
        <div className="w-full p-8 flex flex-col justify-center">
          <Form form={form} id="myForm" onFinish={onFinish} className="w-full">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Enter your name" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Enter your email" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Enter your phone" }]}
            >
              <Input placeholder="Enter your phone" />
            </Form.Item>
            <Form.Item
              name="message"
              rules={[{ required: true, message: "Enter your message" }]}
            >
              <Input.TextArea placeholder="Enter your message" />
            </Form.Item>
          </Form>
          <Flex justify="center">
            <Button
              form="myForm"
              key="submit"
              htmlType="submit"
              className="h-[40px] w-[120px]"
            >
              Submit
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
