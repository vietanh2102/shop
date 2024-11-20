interface Props {
  img: string;
  title: string;
  description: string;
  reverse?: boolean;
}

function IntroProducts({ description, img, title, reverse }: Props) {
  return (
    <div
      className={`block md:flex gap-8 ${
        reverse && "flex-row-revers"
      }e mt-16 bg-[#f6f6f6]`}
    >
      <img src={img} alt="img" className="w-full md:w-1/2" />
      <div className="flex flex-col justify-center  mt-4">
        <h2 className="text-[42px] md:text-[36px] lg:text-[48px] font-semibold">
          {title}
        </h2>
        <p className="text-[15px]">{description}</p>
      </div>
    </div>
  );
}

export default IntroProducts;
