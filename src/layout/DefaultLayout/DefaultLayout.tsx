import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function DefaultLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      <div className="mt-[80px]">{children}</div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
