import { aboutProduct, aboutUs, allProducts } from "../../assets";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import IntroProducts from "../../components/IntroProducts/IntroProducts";
import { CATEGORYPRODUCTS } from "../../constants/products.constant";

function AboutUsPage() {
  return (
    <>
      <img src={aboutUs} alt="aboutUs" className="mt-[80px]" />
      <div className="max-w-[1170px] mx-auto px-8 lg:px-0 ">
        <div className="text-center mt-4 px-8 lg:px-32">
          <h2 className="font-semibold text-[22px]">
            Our purpose is to Inspire a Better way of Living
          </h2>
          <p className="mt-4 text-left">
            We believe in considering the impact of the choices we make every
            day and view those choices as an opportunity to better ourselves.
            Our purpose is to Inspire a Better way of Living by creating
            conscious products that last through time. By marrying innovation
            with eco-friendly processes, we strive to help shape a cleaner,
            healthier, and more mindful world where human progress is in harmony
            with the planet's.
          </p>
        </div>
        <IntroProducts
          img={aboutProduct}
          title="How it all started"
          description="We were founded in Montreal in 2012, with a mission to create an apparel brand that would speak to a new generation of creatives and entrepreneurs."
        />
        <IntroProducts
          img={allProducts}
          reverse
          title="Our community & partners"
          description="It only takes a tiny spark to turn a meaningful idea into an impactful pursuit. Today, we are a group of 300 people from over 20 different countries. Sharing our optimism and embodying our values is our job, but it is also a reflection of our true selves. We stand together on what’s important. Here are a few throwbacks to some of our achievements"
        />
        <div className="max-w-[1170px] mx-auto mt-16 px-8 lg:px-0">
          <h2 className="mt-16 mb-4 font-semibold text-3xl">Explore</h2>
          <div className="block mx-auto md:flex justify-between flex-wrap">
            {CATEGORYPRODUCTS.map((item) => (
              <CategoryCard
                img={item.img}
                title={item.title}
                key={item.title}
                path={item.path}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
