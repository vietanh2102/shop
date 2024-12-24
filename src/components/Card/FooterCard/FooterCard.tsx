interface Props {
  img: string;
  title: string;
  detail: string;
}
function FooterCard({ img, title, detail }: Props) {
  return (
    <div className="min-w-[250px]    flex mt-4">
      <img src={img} alt="box" className="w-16 h-16" />
      <div className="ml-4">
        <h2 className="font-semibold text-[18px]">{title}</h2>
        <p className="text-[15px]">{detail}</p>
      </div>
    </div>
  );
}

export default FooterCard;
