import { Link } from "react-router";
import { Gift, Star } from "lucide-react";
import type { Product } from "~/lib/api";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
        <Gift className="h-5 w-5 text-rose-500" />
        You Might Also Like
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="group bg-white rounded-2xl border border-beige-200/50 hover:shadow-soft-lg transition-all duration-300 overflow-hidden hover:scale-105"
          >
            <div className="aspect-square bg-gradient-to-br from-beige-100 via-rose-50 to-lavender-100 relative overflow-hidden">
              <img
                src={item.images?.[0] || '/placeholder.jpg'}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-2 sm:p-3 space-y-1 sm:space-y-2">
              <h4 className="font-semibold text-xs sm:text-sm text-neutral-800 line-clamp-2 group-hover:text-rose-500 transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < Math.floor(item.rating) ? 'fill-amber-400 text-amber-400' : 'text-beige-300'}`} />
                ))}
                <span className="text-xs text-neutral-600 ml-1">({item.rating})</span>
              </div>
              <div className="font-bold text-sm sm:text-base text-neutral-800">₹{item.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
