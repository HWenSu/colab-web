import Image from "next/image";
import Link from "next/link";

const CategoryCard = () => {
const categoryList = [
  {
    name: "MEN'S",
    imgUrl: "/image/category-men.png",
    linkUrl: "/products/man",
  },
  {
    name: "WOMAN'S",
    imgUrl: "/image/category-woman.png",
    linkUrl: "/products/woman",
  },
  {
    name: "PRINT & EMB",
    imgUrl: "/image/category-print.png",
    linkUrl: "/products/print&emb",
  },
];

  return (
    <ul className="category-cards-container">
      {categoryList.map((item) => (
        <Link href={item.linkUrl} key={item.name}>
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