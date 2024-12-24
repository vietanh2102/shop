interface Props {
  img: string;
  title: string;
}
function CardIntro({ img, title }: Props) {
  return (
    <div className="relative ">
      <img src={img} alt="img" className=" w-full h-auto" />
      <button className="absolute bottom-8 py-2 px-6 bg-white font-bold rounded-[6px] left-[50%] translate-x-[-50%] group whitespace-nowrap">
        <span className="absolute w-0 group-hover:w-full duration-100 bg-red-400 h-full left-0 top-0 z-10 rounded-[6px] overflow-hidden text-white flex items-center justify-center whitespace-nowrap">
          {title}
        </span>
        <span className="z-0 group-hover:w-0 overflow-hidden whitespace-nowrap">
          {title}
        </span>
      </button>
    </div>
  );
}

export default CardIntro;
