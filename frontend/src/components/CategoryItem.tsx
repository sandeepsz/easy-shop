import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface CategoryProps {
  name: string;
  href: string;
  imageUrl: string;
}

const CategoryItem = ({ name, href, imageUrl }: CategoryProps) => {
  return (
    <Link
      to={`/category${href}`}
      className="relative overflow-hidden h-80 w-full rounded-lg group"
    >
      <div className="w-full h-full cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
        <img
          src={imageUrl}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          )}
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-white text-2xl font-bold mb-2">{name}</h3>
          <p className="text-gray-200 text-sm">Explore {name}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
