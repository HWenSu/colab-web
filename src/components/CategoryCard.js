import Image from "next/image";
import Link from "next/link";


const CategoryCard = ({cursorActive}) => {
const categoryList = [
  {
    name: "MEN'S",
    imgUrl: "/image/OtherPages/Category/category-men.png",
    linkUrl: "/home_label/products/garment/men",
  },
  {
    name: "WOMEN'S",
    imgUrl: "/image/OtherPages/Category/category-woman.png",
    linkUrl: "/home_label/products/garment/women",
  },
  {
    name: "PRINT & EMB",
    imgUrl: "/image/OtherPages/Category/category-print.png",
    linkUrl: "/home_label/products/print&emb",
  },
];

  return (
    <ul className="category-cards-container">
      {categoryList.map((item) => (
        <Link href={item.linkUrl} key={item.name} className={`${cursorActive&& 'cursor-none'}`}>
          <li className="category-card">
            <Image
              src={item.imgUrl}
              alt={item.name}
              width={300}
              height={400}
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 70vw, 80vw"
              priority
            />
            <h2 className="category-title">{item.name}</h2>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default CategoryCard