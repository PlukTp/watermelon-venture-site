
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Leaf } from 'lucide-react';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  popular?: boolean;
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden",
        "transition-custom duration-500 shadow-sm hover:shadow-md",
        "border border-border hover:border-trima-200",
        "hover-scale"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with zoom effect */}
      <div className="relative h-60 overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category tag */}
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1 rounded-full bg-white/90 text-trima-800 text-xs font-medium flex items-center">
            <Leaf className="h-3 w-3 mr-1 text-trima-600" />
            {product.category}
          </div>
        </div>
        
        {/* Popular tag */}
        {product.popular && (
          <div className="absolute top-4 right-4 z-10">
            <div className="px-3 py-1 rounded-full bg-soil-500 text-white text-xs font-medium">
              ยอดนิยม
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-trima-700">
          {product.name}
        </h3>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        <Link 
          to={`/products/${product.id}`}
          className={cn(
            "inline-flex items-center text-sm font-medium",
            "text-trima-600 hover:text-trima-800 transition-colors"
          )}
        >
          ดูรายละเอียด
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
