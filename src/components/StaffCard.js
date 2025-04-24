import Image from "next/image"

const StaffCard = ({name, lastName,jobPosition, imgUrl, yPosition }) => {
  return (
    <div className="bg-white w-[12rem]" style={{ transform:`translateY(${yPosition}rem)` }}>
      <div className="text-black px-2">
        <h2 className="text-[1.8rem] font-bold">{name}</h2>
        <p className="text-xs">{lastName}</p>
        <p className="pt-4 text-xs">{jobPosition}</p>
      </div>
      <Image
        className="w-[12rem] -translate-x-1 translate-y-1"
        src={imgUrl}
        alt={name}
        width={300}
        height={400}
      />
    </div>
  );
}

export default StaffCard