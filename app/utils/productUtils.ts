import type { Product } from "~/lib/api";

export interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
  priceAdjustment: number;
}

export function getSizeOptions(product: Product | null): SizeOption[] {
  if (!product) return [];

  const categoryName = product.category_name.toLowerCase();
  
  // Retro Prints - only one size
  if (categoryName.includes('retro') || categoryName.includes('print')) {
    return [
      { id: 'medium', name: 'Standard', dimensions: '2.75" × 3.5"', priceAdjustment: 8 }
    ];
  }
  
  // Photo Magnets - all three sizes
  if (categoryName.includes('photo') || categoryName.includes('custom')) {
    return [
      { id: 'small', name: 'Small', dimensions: '2.75" × 2.75"', priceAdjustment: 0 },
      { id: 'medium', name: 'Medium', dimensions: '2.75" × 3.5"', priceAdjustment: 8 },
      { id: 'large', name: 'Large', dimensions: '3.25" × 4"', priceAdjustment: 12 }
    ];
  }
  
  // Save the Date - three specific sizes
  if (categoryName.includes('save') || categoryName.includes('date') || categoryName.includes('wedding')) {
    return [
      { id: 'medium', name: 'Medium', dimensions: '2.75" × 3.5"', priceAdjustment: 8 },
      { id: 'large', name: 'Large', dimensions: '3.25" × 4"', priceAdjustment: 12 },
      { id: 'xlarge', name: 'Extra Large', dimensions: '4" × 5"', priceAdjustment: 20 }
    ];
  }
  
  // Default fallback for other categories
  return [
    { id: 'small', name: 'Small', dimensions: '2.75" × 2.75"', priceAdjustment: 0 },
    { id: 'medium', name: 'Medium', dimensions: '2.75" × 3.5"', priceAdjustment: 8 },
    { id: 'large', name: 'Large', dimensions: '3.25" × 4"', priceAdjustment: 12 }
  ];
}

export function getProductBadges(product: Product | null) {
  const badges = [];
  if (product?.id && parseInt(product.id) > 90) {
    badges.push({ text: 'New', color: 'bg-green-500', icon: require('lucide-react').Sparkles });
  }
  return badges;
}
