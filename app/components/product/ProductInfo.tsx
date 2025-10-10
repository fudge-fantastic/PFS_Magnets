import { Link } from "react-router";
import { ArrowLeft, Star, Palette as PaletteIcon, ShoppingCart } from "lucide-react";

interface ProductInfoProps {
  product: {
    category_name: string;
    title: string;
    description: string;
    rating: number;
    price: number;
  };
  currentPrice: number;
  basePrice: number;
  currentSize: any;
}

export function ProductInfo({ product, currentPrice, basePrice, currentSize }: ProductInfoProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wide bg-beige-100 px-3 py-1.5 rounded-full">
          {product.category_name}
        </span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-beige-300'}`} />
          ))}
          <span className="text-sm text-neutral-700 ml-2 font-medium">({product.rating.toFixed(1)})</span>
        </div>
        <div className="flex-1"></div>
        <Link
          to="/gallery"
          className="inline-flex items-center text-sm text-neutral-700 hover:text-rose-500 transition-colors duration-200 font-semibold group ml-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Gallery
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-neutral-800 leading-tight">
        {product.title}
      </h1>

      <div className="flex items-baseline gap-4">
        <p className="text-xl font-bold text-neutral-800">
          ₹{currentPrice.toFixed(2)}
        </p>
        {currentSize && currentSize.priceAdjustment > 0 && (
          <p className="text-lg text-neutral-600 line-through">
            ₹{basePrice.toFixed(2)}
          </p>
        )}
      </div>

      <p className="text-neutral-700 leading-relaxed text-sm">
        {product.description}
      </p>
    </div>
  );
}
