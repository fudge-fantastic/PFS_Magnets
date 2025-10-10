import { Link } from "react-router";

interface EmptyStateProps {
  type: 'no-products' | 'no-results';
  searchQuery?: string;
  onClearSearch?: () => void;
  onClearFilters?: () => void;
}

export function EmptyState({ type, searchQuery, onClearSearch, onClearFilters }: EmptyStateProps) {
  if (type === 'no-products') {
    return (
      <div className="text-center py-20 md:py-32 px-4">
        <div className="text-7xl md:text-9xl mb-8 opacity-80">📦</div>
        <h3 className="text-2xl md:text-3xl font-bold text-zinc-900/90 mb-4">
          No products available
        </h3>
        <p className="text-zinc-600 mb-10 max-w-md mx-auto text-base leading-relaxed">
          We're working hard to bring you amazing magnet designs. Check back later for new arrivals!
        </p>
        <Link
          to="/"
          className="inline-block bg-zinc-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-all duration-200 hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-20 md:py-32 px-4">
      <div className="text-7xl md:text-9xl mb-8 opacity-80">🔍</div>
      <h3 className="text-2xl md:text-3xl font-bold text-zinc-900/90 mb-4">
        No products found
      </h3>
      <p className="text-zinc-600 mb-10 max-w-lg mx-auto text-base leading-relaxed">
        {searchQuery
          ? `No products match your search for "${searchQuery}". Try different keywords or browse all products.`
          : `No products found with the selected filters. Try adjusting your selection to see more designs.`
        }
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {searchQuery && onClearSearch && (
          <button
            onClick={onClearSearch}
            className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-all duration-200 hover:scale-105"
          >
            Clear Search
          </button>
        )}
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="bg-zinc-50 border border-zinc-200 text-zinc-900 px-6 py-3 rounded-xl font-semibold hover:bg-zinc-900/5 hover:border-zinc-900/50 transition-all duration-200"
          >
            View All Products
          </button>
        )}
      </div>
    </div>
  );
}
