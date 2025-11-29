import { Link } from "react-router";
import { Button } from "~/components/Button";

interface EmptyStateProps {
  type: 'no-products' | 'no-results';
  searchQuery?: string;
  onClearSearch?: () => void;
  onClearFilters?: () => void;
}

export function EmptyState({ type, searchQuery, onClearSearch, onClearFilters }: EmptyStateProps) {
  if (type === 'no-products') {
    return (
      <div className="text-center py-20 md:py-32 px-4 animate-fade-in-up">
        <div className="text-7xl md:text-9xl mb-8 opacity-80 animate-float">📦</div>
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
          No products available yet
        </h3>
        <p className="text-neutral-600 mb-10 max-w-md mx-auto text-base leading-relaxed font-light">
          We're working hard to bring you amazing magnet designs. Check back soon for beautiful new arrivals!
        </p>
        <Link to="/">
          <Button size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-20 md:py-32 px-4 animate-fade-in-up">
      <div className="text-7xl md:text-9xl mb-8 opacity-80 animate-float">🔍</div>
      <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
        No products found
      </h3>
      <p className="text-neutral-600 mb-10 max-w-lg mx-auto text-base leading-relaxed font-light">
        {searchQuery
          ? `We couldn't find any products matching "${searchQuery}". Try different keywords or browse all products to discover our collection.`
          : `No products match your current filters. Try adjusting your selection or view all products to see our full range.`
        }
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {searchQuery && onClearSearch && (
          <Button onClick={onClearSearch} size="lg">
            Clear Search
          </Button>
        )}
        {onClearFilters && (
          <Button onClick={onClearFilters} variant="secondary" size="lg">
            View All Products
          </Button>
        )}
      </div>
    </div>
  );
}
