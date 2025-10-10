import { Search, ChevronDown } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface FilterSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: Category[];
  selectedCategories: Set<string>;
  onCategoryToggle: (categoryId: string) => void;
  onClearCategories: () => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  loading: boolean;
  resultsCount: number;
  productsLoading: boolean;
}

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name: A to Z" }
];

export function FilterSidebar({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearCategories,
  sortBy,
  onSortChange,
  loading,
  resultsCount,
  productsLoading
}: FilterSidebarProps) {
  return (
    <aside className="lg:w-80 xl:w-96 flex-shrink-0">
      <div className="card-minimal lg:sticky lg:top-24 space-y-6 md:space-y-8 p-5 md:p-6">
        {/* Search Filter */}
        <div>
          <h4 className="text-base font-semibold text-neutral-800 mb-4">Search Products</h4>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 group-focus-within:text-rose-500 transition-colors duration-200" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-beige-50 border border-beige-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-200 text-sm placeholder:text-neutral-400 font-light"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-neutral-800">Categories</h4>
            {selectedCategories.size > 0 && (
              <button
                onClick={onClearCategories}
                className="text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors duration-200"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="space-y-2">
            {loading || categories.length === 0 ? (
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-12 bg-beige-100 rounded-2xl animate-pulse"
                />
              ))
            ) : (
              categories.map(category => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-rose-50/50 cursor-pointer transition-colors duration-200 group border border-transparent hover:border-rose-200"
                >
                  <Checkbox
                    checked={selectedCategories.has(category.id)}
                    onCheckedChange={() => onCategoryToggle(category.id)}
                    className="border-neutral-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                  />
                  <span className="flex-1 text-sm text-neutral-700 group-hover:text-neutral-800 transition-colors font-light">
                    {category.name}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-beige-100 text-neutral-700 font-medium min-w-[32px] text-center">
                    {category.count}
                  </span>
                </label>
              ))
            )}
          </div>
          {selectedCategories.size > 0 && (
            <div className="mt-4 pt-4 border-t border-beige-200">
              <p className="text-xs text-neutral-600 font-light">
                {selectedCategories.size} categor{selectedCategories.size === 1 ? 'y' : 'ies'} selected
              </p>
            </div>
          )}
        </div>

        {/* Sort Options */}
        <div>
          <h4 className="text-base font-semibold text-neutral-800 mb-4">Sort By</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between bg-beige-50 border border-beige-200 rounded-2xl px-4 py-3 text-sm hover:bg-rose-50/50 hover:border-rose-200 transition-all duration-200 font-medium text-neutral-700">
                {sortOptions.find(option => option.value === sortBy)?.label}
                <ChevronDown className="h-5 w-5 text-neutral-500" strokeWidth={1.5} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border-beige-200 rounded-2xl shadow-soft-lg">
              {sortOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`cursor-pointer rounded-xl font-light ${sortBy === option.value ? "bg-rose-50 text-rose-600 font-medium" : "text-neutral-700"}`}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Results Count */}
        <div className="pt-6 border-t border-beige-200">
          <p className="text-sm text-neutral-600 font-light">
            {productsLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1">Loading...</span>
              </span>
            ) : (
              <span>
                <span className="font-semibold text-neutral-800">{resultsCount}</span> product{resultsCount !== 1 ? 's' : ''} found
              </span>
            )}
          </p>
        </div>
      </div>
    </aside>
  );
}
