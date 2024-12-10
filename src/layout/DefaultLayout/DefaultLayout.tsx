import { FC, ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

type Props = {
  children: ReactNode;
};
const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mt-[80px]">{children}</div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
