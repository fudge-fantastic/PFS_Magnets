import { Palette as PaletteIcon, Calendar } from "lucide-react";

interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
  priceAdjustment: number;
}

interface SizeSelectorProps {
  sizeOptions: SizeOption[];
  selectedSize: string;
  onSizeChange: (sizeId: string) => void;
  basePrice: number;
  isSetBased?: boolean;
}

export function SizeSelector({ sizeOptions, selectedSize, onSizeChange, basePrice, isSetBased = false }: SizeSelectorProps) {
  if (sizeOptions.length === 0) return null;

  return (
    <div className="space-y-4">
      <label className="font-semibold text-neutral-800 text-md flex items-center gap-2">
        {isSetBased ? (
          <Calendar className="h-5 w-5 text-rose-500" />
        ) : (
          <PaletteIcon className="h-5 w-5 text-rose-500" />
        )}
        Choose Size{isSetBased ? ' (per set of 12)' : ''}:
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sizeOptions.map((size) => (
          <button
            key={size.id}
            onClick={() => onSizeChange(size.id)}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left hover:shadow-soft ${
              selectedSize === size.id
                ? 'border-rose-400 bg-rose-50 text-neutral-800 shadow-soft'
                : 'border-beige-200 hover:border-rose-300 hover:bg-rose-50/30'
            }`}
          >
            <div className="font-semibold text-md">{size.name}</div>
            <div className="text-sm text-neutral-600 mt-1">{size.dimensions}</div>
            <div className="font-semibold text-md mt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-neutral-400 line-through text-sm">
                  ₹{((basePrice + size.priceAdjustment) * 1.25).toFixed(2)}
                </span>
                <span className="text-neutral-800">
                  ₹{(basePrice + size.priceAdjustment).toFixed(2)}
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  20% OFF
                </span>
              </div>
              {isSetBased && (
                <span className="text-xs text-neutral-600 block mt-1">
                  per set (12 magnets)
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
