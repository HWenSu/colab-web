import Link from "next/link";
import Image from "next/image";

const MobileMenuContent = ({ id, onClick, label, arrow, href, onLinkClick }) => {

  if (id === "women" || id === "men") {
    href = `/home_label/products/garment/filter?sex=${id}&styleType=${label.toLowerCase()}`;
  } 

  const content = (
      <li className={`product-items  duration-500 ease-in-out`}>
        <div className="flex">
          <span className="mr-2">{label}</span>
          {arrow && (
            <Image
              className="invert rotate-270"
              src="/svg/downArrow.svg"
              alt="dropdown-icon"
              width={10}
              height={5}
              priority
            />
          )}
        </div>
      </li>
  )

  return href ? (
    <Link href={href}>
      <button className="flex" onClick={onLinkClick}>{content}</button>
    </Link>
  ) : (
    <div onClick={onClick}> {content} </div>
  );
};

export default MobileMenuContent