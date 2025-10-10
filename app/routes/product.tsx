import type { Route } from "./+types/product";
import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { api, type Product } from "~/lib/api";
import { Sparkles } from "lucide-react";
import {
  ProductImageGallery,
  ProductInfo,
  SizeSelector,
  PurchaseSection,
  MobileStickyFooter,
  ProductAccordion,
  RelatedProducts
} from "~/components/product";
import { getSizeOptions } from "~/utils/productUtils";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Product ${params.id} - Beautiful Magnets` },
    { name: "description", content: "View detailed information about this beautiful magnet design." },
  ];
}

export default function Product() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('small');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) {
        setError('Product ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.getProduct(params.id);

        if (response.success && response.data) {
          setProduct(response.data);
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await api.getProducts(0, 8);
        if (response.success && response.data) {
          const filteredProducts = response.data.filter(p => p.id !== params.id);
          const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
          setRelatedProducts(shuffled.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to fetch related products:', err);
        setRelatedProducts([
          { id: '1', title: 'Family Portrait Magnet', price: 699, images: ['/medium.jpg'], rating: 4.8, description: '', short_description: '', category_id: '', category_name: '', is_locked: false, created_at: '', updated_at: '' },
          { id: '2', title: 'Pet Love Magnet', price: 649, images: ['/large.jpg'], rating: 4.6, description: '', short_description: '', category_id: '', category_name: '', is_locked: false, created_at: '', updated_at: '' },
          { id: '3', title: 'Travel Memory Magnet', price: 749, images: ['/small.jpg'], rating: 4.9, description: '', short_description: '', category_id: '', category_name: '', is_locked: false, created_at: '', updated_at: '' },
          { id: '4', title: 'Custom Quote Magnet', price: 599, images: ['/designer.jpg'], rating: 4.5, description: '', short_description: '', category_id: '', category_name: '', is_locked: false, created_at: '', updated_at: '' }
        ]);
      }
    };

    if (params.id) {
      fetchRelatedProducts();
    }
  }, [params.id]);

  const sizeOptions = getSizeOptions(product);
  
  // Update selected size if current selection is not available
  useEffect(() => {
    if (product && sizeOptions.length > 0) {
      const isCurrentSizeAvailable = sizeOptions.some(option => option.id === selectedSize);
      if (!isCurrentSizeAvailable) {
        setSelectedSize(sizeOptions[0].id);
      }
    }
  }, [product?.category_name, selectedSize]);
  
  const currentSize = sizeOptions.find(size => size.id === selectedSize) || sizeOptions[0];
  const basePrice = product?.price || 699;
  const currentPrice = currentSize ? basePrice + currentSize.priceAdjustment : basePrice;
  const totalValue = currentPrice * quantity;

  const handleWhatsAppClick = () => {
    if (!product || !currentSize) return;
    const message = `Hi! I'm interested in the ${product.title} magnet (${currentSize.name} - ${currentSize.dimensions}, ${quantity} piece${quantity > 1 ? 's' : ''}) - ₹${totalValue.toFixed(2)}`;
    const phoneNumber = "917219846935";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareClick = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.title,
        text: `Check out this amazing ${product.title} magnet!`,
        url: window.location.href
      }).catch(console.error);
    } else if (product) {
      const shareText = `Check out this amazing ${product.title} magnet! ${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        alert('Share feature not available');
      });
    }
  };

  const getProductBadges = () => {
    const badges = [];
    if (product?.id && parseInt(product.id) > 90) {
      badges.push({ text: 'New', color: 'bg-green-500', icon: Sparkles });
    }
    return badges;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-beige-50">
        <div className="container-responsive py-6">
          <div className="animate-pulse">
            <div className="h-4 bg-beige-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-4">
                <div className="aspect-square bg-beige-200 rounded-3xl"></div>
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-beige-200 rounded-2xl"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-4 bg-beige-200 rounded w-24"></div>
                  <div className="h-8 bg-beige-200 rounded w-3/4"></div>
                  <div className="h-6 bg-beige-200 rounded w-32"></div>
                  <div className="h-4 bg-beige-100 rounded w-full"></div>
                  <div className="h-4 bg-beige-100 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-beige-50">
        <div className="container-responsive py-6">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-4">
              {error || 'Product not found'}
            </h1>
            <p className="text-neutral-700 mb-8">
              The product you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link
              to="/gallery"
              className="bg-gradient-to-r from-rose-400 to-rose-500 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-soft-lg transition-all duration-300 inline-block"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-50">
      <section className="pb-16 pt-6">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image Gallery */}
            <ProductImageGallery
              images={product.images || []}
              title={product.title}
              onShare={handleShareClick}
              badges={getProductBadges()}
            />

            {/* Product Info */}
            <div className="space-y-8">
              <ProductInfo
                product={product}
                currentPrice={currentPrice}
                basePrice={basePrice}
                currentSize={currentSize}
              />

              <SizeSelector
                sizeOptions={sizeOptions}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                basePrice={basePrice}
              />

              <PurchaseSection
                quantity={quantity}
                onQuantityChange={setQuantity}
                totalValue={totalValue}
                currentPrice={currentPrice}
                currentSize={currentSize}
                onWhatsAppClick={handleWhatsAppClick}
              />

              <RelatedProducts products={relatedProducts} />

              <ProductAccordion />
            </div>
          </div>
        </div>
      </section>

      <MobileStickyFooter
        totalValue={totalValue}
        onWhatsAppClick={handleWhatsAppClick}
      />
    </div>
  );
}
