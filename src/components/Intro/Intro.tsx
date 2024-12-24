import { Link } from "react-router-dom";
import { intro1, intro2, intro3 } from "../../assets";
import CardIntro from "../Card/CardIntro/CardIntro";

function Intro() {
  return (
    <div className="max-w-[1170px] mx-auto my-16 px-8 lg:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="max-w-[280px] min-w-[250px] flex flex-col justify-center">
        <h2 className="text-[26px] font-semibold">
          What style awaits you next season?
        </h2>
        <p className="mt-4 underline">
          <Link to={"/products/all"}>Explore now</Link>
        </p>
      </div>
      <CardIntro img={intro1} title="New" />
      <CardIntro img={intro2} title="On sale" />
      <CardIntro img={intro3} title="Best sellers" />
    </div>
  );
}

export default Intro;
