import { Link } from "react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "~/lib/api";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  wishlistedItems: Set<string>;
  onToggleWishlist: (productId: string) => void;
}

export function ProductGrid({ products, loading, wishlistedItems, onToggleWishlist }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="card-minimal overflow-hidden flex flex-col animate-pulse"
          >
            <div className="bg-beige-200 aspect-square"></div>
            <div className="p-5 md:p-6 flex flex-col flex-grow space-y-3">
              <div className="flex justify-between items-start">
                <div className="h-5 bg-beige-200 rounded-xl w-2/3"></div>
                <div className="h-6 bg-beige-200 rounded-full w-16"></div>
              </div>
              <div className="h-4 bg-beige-100 rounded-lg w-20"></div>
              <div className="h-4 bg-beige-100 rounded-lg w-full"></div>
              <div className="h-4 bg-beige-100 rounded-lg w-3/4"></div>
              <div className="flex justify-between items-center mt-auto pt-3">
                <div className="h-4 bg-beige-100 rounded-lg w-24"></div>
                <div className="h-10 bg-beige-200 rounded-full w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product, index) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="group card-minimal overflow-hidden flex flex-col animate-fade-in-up"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {/* Image Container - No padding on image itself */}
          <div className="bg-gradient-to-br from-beige-100 via-rose-50 to-lavender-100 flex items-center justify-center relative overflow-hidden aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-rose-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Discount Badge */}
            <div className="absolute top-3 left-3 z-20">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-soft">
                20% OFF
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleWishlist(product.id);
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-soft ${
                  wishlistedItems.has(product.id)
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/90 text-neutral-700 hover:bg-white'
                }`}
              >
                <Heart className={`h-4 w-4 ${wishlistedItems.has(product.id) ? 'fill-current' : ''}`} strokeWidth={1.5} />
              </button>
            </div>

            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover relative z-10"
                loading={index < 6 ? "eager" : "lazy"}
              />
            ) : (
              <span className="relative z-10 text-4xl transition-transform duration-300 group-hover:scale-110">
                🖼️
              </span>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15"></div>
          </div>

          {/* Content - Padding applied here to content only */}
          <div className="flex flex-col flex-grow space-y-3 p-5 md:p-6">
            <div>
              <h3 className="font-semibold text-neutral-800 group-hover:text-rose-600 transition-colors duration-300 line-clamp-2 text-base mb-2">
                {product.title}
              </h3>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider bg-beige-100 inline-block px-3 py-1 rounded-full">
                {product.category_name}
              </p>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed flex-grow line-clamp-2 font-light">
              {product.short_description || product.description}
            </p>

            <div className="flex justify-between items-center mt-auto pt-3 border-t border-beige-200/50">
              <div>
                <p className="text-sm text-neutral-400 line-through">
                  ₹{(product.price * 1.25).toFixed(2)}
                </p>
                <p className="text-xl font-bold text-neutral-800">
                  ₹{product.price}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="bg-beige-100 text-neutral-700 p-2.5 rounded-full hover:bg-rose-100 hover:text-rose-600 transition-all duration-200 hover:scale-110 shadow-soft"
                >
                  <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <span className="bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full font-medium transition-all duration-200 hover:shadow-soft-lg flex items-center justify-center px-5 py-2 text-sm">
                  View
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
