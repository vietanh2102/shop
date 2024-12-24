import { Input } from "antd";
import { box, dola, headphone } from "../../../assets";
import FooterCard from "../../../components/Card/FooterCard/FooterCard";
import { ArrowRightOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <footer>
      <div className="max-w-[1170px] mx-auto block md:flex justify-between md:flex-wrap lg:flex-nowrap my-16 px-8 lg:p-0">
        <FooterCard
          img={box}
          title="Free Shipping"
          detail="Exclusive deal on orders $50+"
        />
        <FooterCard
          img={dola}
          title="Easy Refund"
          detail="Within 30 days of purchase"
        />
        <FooterCard
          img={headphone}
          title="Online Support"
          detail="24 hours a day, 7 days a week"
        />
        <FooterCard
          img={box}
          title="Flexible payment"
          detail="Visa, Master, ApplePay, & more"
        />
      </div>
      <div className="bg-[#f6f6f6] py-10">
        <div className="max-w-[1170px] mx-auto block px-8 lg:p-0 md:flex justify-between flex-wrap">
          <div className="min-w-[320px]">
            <h2 className="text-[18px] font-bold">20% off + free shipping</h2>
            <p className="my-2">Exclusive deals for all new subscribers.</p>
            <Input
              placeholder="Enter your email"
              suffix={<ArrowRightOutlined />}
              size="large"
            />
            <p className="my-2">
              By subscribing you agree to the{" "}
              <span className="underline">Terms of Use</span> &{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-[18px] font-bold mb-2">Information</h2>
            <ul>
              <li className="py-1">Contact</li>
              <li className="py-1">Blog</li>
              <li className="py-1">About</li>
              <li className="py-1">FAQs</li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-[18px] font-bold mb-2">Services</h2>
            <ul>
              <li className="py-1">Refund Policy</li>
              <li className="py-1">Privacy Policy</li>
              <li className="py-1">Terms of Service</li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-[18px] font-bold mb-2">Quick links</h2>
            <ul>
              <li className="py-1">My account</li>
              <li className="py-1">Cart</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
