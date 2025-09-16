import type { Route } from "./+types/product";
import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { api, type Product } from "~/lib/api";
import {
  ArrowLeft,
  Share2,
  Star,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Camera,
  Palette as PaletteIcon,
  Gift,
  Home,
  Baby,
  Calendar,
  GraduationCap,
  Users,
  MapPin,
  ZoomIn,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  Award,
  Clock,
  CheckCircle,
  Minus,
  Plus,
  X,
  TrendingUp,
  Sparkles
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('small');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
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
        const productId = params.id;
        const response = await api.getProduct(productId);

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
        const response = await api.getProducts(0, 8); // Get 8 products to have variety
        if (response.success && response.data) {
          // Filter out current product and get random 4 products
          const filteredProducts = response.data.filter(p => p.id !== params.id);
          const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
          setRelatedProducts(shuffled.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to fetch related products:', err);
        // Fallback to mock data if API fails
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

  // Size options with updated pricing structure - small is base price, medium +8, large +12
  const getSizeOptions = () => {
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
  };

  const sizeOptions = getSizeOptions();
  
  // Update selected size if current selection is not available for this product
  useEffect(() => {
    if (product && sizeOptions.length > 0) {
      const isCurrentSizeAvailable = sizeOptions.some(option => option.id === selectedSize);
      if (!isCurrentSizeAvailable) {
        setSelectedSize(sizeOptions[0].id);
      }
    }
  }, [product?.category_name, selectedSize]); // Remove sizeOptions from deps to avoid infinite loop
  
  const currentSize = sizeOptions.find(size => size.id === selectedSize) || sizeOptions[0];
  const basePrice = product?.price || 699; // Default base price if product price not available
  const currentPrice = currentSize ? basePrice + currentSize.priceAdjustment : basePrice;
  const totalValue = currentPrice * quantity;

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const nextImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleShareClick = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.title,
        text: `Check out this amazing ${product.title} magnet!`,
        url: window.location.href
      }).catch(console.error);
    } else if (product) {
      // Fallback: copy to clipboard
      const shareText = `Check out this amazing ${product.title} magnet! ${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        alert('Share feature not available');
      });
    }
  };

  const handleWhatsAppClick = () => {
    if (!product || !currentSize) return;
    const message = `Hi! I'm interested in the ${product.title} magnet (${currentSize.name} - ${currentSize.dimensions}, ${quantity} piece${quantity > 1 ? 's' : ''}) - ₹${totalValue.toFixed(2)}`;
    const phoneNumber = "917219846935"; // Updated with Indian WhatsApp business number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const toggleImageZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const openFullImage = () => {
    setShowFullImage(true);
  };

  const closeFullImage = () => {
    setShowFullImage(false);
  };

  // Product badge logic
  const getProductBadges = () => {
    const badges = [];
    if (product?.rating && product.rating >= 4.5) badges.push({ text: 'Bestseller', color: 'bg-orange-500', icon: TrendingUp });
    if (product?.id && parseInt(product.id) > 90) badges.push({ text: 'New', color: 'bg-green-500', icon: Sparkles });
    if (product?.rating && product.rating >= 4.7) badges.push({ text: 'Premium', color: 'bg-purple-500', icon: Award });
    return badges;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-responsive py-6">
          <div className="animate-pulse">
            <div className="h-4 bg-primary/20 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-4">
                <div className="aspect-square bg-primary/20 rounded-lg"></div>
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-primary/20 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-4 bg-primary/20 rounded w-24"></div>
                  <div className="h-8 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-6 bg-primary/20 rounded w-32"></div>
                  <div className="h-4 bg-primary/10 rounded w-full"></div>
                  <div className="h-4 bg-primary/10 rounded w-3/4"></div>
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
      <div className="min-h-screen bg-background">
        <div className="container-responsive py-6">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-3xl font-bold text-foreground/80 mb-4">
              {error || 'Product not found'}
            </h1>
            <p className="text-foreground/70 mb-8">
              The product you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link
              to="/gallery"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Product Detail */}
      <section className="pb-16 pt-6">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image Carousel */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              <div className="flex gap-3 sm:gap-4">
                {/* Thumbnail Column - Desktop/Tablet */}
                {product.images && product.images.length > 1 && (
                  <div className="hidden sm:flex flex-col gap-2 sm:gap-3 w-16 sm:w-20 md:w-24">
                    <div className="flex flex-col gap-2 sm:gap-3 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                      {product.images.map((image, i) => (
                        <button
                          key={i}
                          onClick={() => goToImage(i)}
                          className={`flex-shrink-0 aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden border ${i === currentImageIndex
                            ? 'border-primary shadow-lg'
                            : 'border-transparent opacity-60 hover:opacity-80 hover:border-primary/30'
                            }`}
                        >
                          <img
                            src={`${image}`}
                            alt={`${product.title} view ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Image Display */}
                <div className="flex-1">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center relative overflow-hidden group shadow-lg max-w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10"></div>

                    {/* Product Badges */}
                    <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                      {getProductBadges().map((badge, index) => (
                        <div key={index} className={`flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium ${badge.color} shadow-lg`}>
                          <badge.icon className="h-3 w-3" />
                          {badge.text}
                        </div>
                      ))}
                    </div>

                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`${product.images[currentImageIndex]}`}
                        alt={product.title}
                        className={`w-full h-full object-cover relative z-10 transition-all duration-500 cursor-zoom-in ${isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'}`}
                        onClick={openFullImage}
                        onError={(e) => console.log('Image failed to load:', e)}
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                      />
                    ) : (
                      <span className="text-6xl sm:text-8xl lg:text-9xl relative z-10 transition-transform duration-300 group-hover:scale-110">
                        🖼️
                      </span>
                    )}

                    {/* Zoom Overlay on Hover */}
                    <div
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-zoom-in"
                      onClick={openFullImage}
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 pointer-events-none">
                        <ZoomIn className="h-4 w-4" />
                        Click to enlarge
                      </div>
                    </div>

                    {/* Carousel Navigation */}
                    {product.images && product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg z-20"
                        >
                          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg z-20"
                        >
                          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                      </>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-2 sm:gap-3 z-30">
                      <button
                        onClick={toggleWishlist}
                        className={`w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 ${isWishlisted
                          ? 'bg-red-500 text-white'
                          : 'bg-white/95 text-foreground hover:bg-white'
                          }`}
                      >
                        <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={handleShareClick}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                      >
                        <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>

                    {/* Image Counter */}
                    {product.images && product.images.length > 1 && (
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/70 backdrop-blur-md rounded-full px-3 py-1 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-medium z-20">
                        {currentImageIndex + 1} / {product.images.length}
                      </div>
                    )}
                  </div>

                  {/* Mobile Thumbnail Row (shown only on mobile) */}
                  {product.images && product.images.length > 1 && (
                    <div className="sm:hidden mt-3">
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                        {product.images.map((image, i) => (
                          <button
                            key={i}
                            onClick={() => goToImage(i)}
                            className={`flex-shrink-0 aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden border w-16 h-16 ${i === currentImageIndex
                              ? 'border-primary shadow-lg'
                              : 'border-transparent opacity-60 hover:opacity-80 hover:border-primary/30'
                              }`}
                          >
                            <img
                              src={`${image}`}
                              alt={`${product.title} view ${i + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Product Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-primary/80 uppercase tracking-wide bg-primary/10 px-3 py-1 rounded-full">
                    {product.category_name}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm text-foreground/70 ml-2 font-medium">({product.rating.toFixed(1)})</span>
                  </div>
                  <div className="flex-1"></div>
                  <Link
                    to="/gallery"
                    className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors duration-200 font-semibold group ml-auto"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Gallery
                  </Link>
                </div>

                <h1 className="text-2xl font-bold text-foreground/90 leading-tight">
                  {product.title}
                </h1>

                <div className="flex items-baseline gap-4">
                  <p className="text-xl font-bold text-primary">
                    ₹{currentPrice.toFixed(2)}
                  </p>
                  {currentSize && currentSize.priceAdjustment > 0 && (
                    <p className="text-lg text-foreground/60 line-through">
                      ₹{basePrice.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Product Description */}
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {sizeOptions.length > 0 && (
                <div className="space-y-4">
                  <label className="font-semibold text-foreground/90 text-md flex items-center gap-2">
                    <PaletteIcon className="h-5 w-5 text-primary" />
                    Choose Size:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {sizeOptions.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`p-3 rounded-xl border transition-all duration-200 text-left hover:shadow-sm ${selectedSize === size.id
                          ? 'border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                          }`}
                      >
                        <div className="font-semibold text-md">{size.name}</div>
                        <div className="text-sm text-foreground/70 mt-1">{size.dimensions}</div>
                        <div className="font-semibold text-md mt-2 text-primary">
                          ₹{(basePrice + size.priceAdjustment).toFixed(2)}
                          {size.priceAdjustment > 0 && (
                            <span className="text-sm text-primary/70 ml-1">
                              (+₹{size.priceAdjustment})
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="flex items-center gap-4">
                <label className="font-semibold text-foreground/90 text-md flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Quantity:
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-xl overflow-hidden bg-background">
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityInput}
                      min="1"
                      className="p-2 min-w-[4rem] text-center font-semibold border-none outline-none focus:bg-primary/5 transition-colors duration-200 bg-transparent"
                    />
                  </div>
                  <div className="text-sm text-foreground/70">
                    {quantity > 10 && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                        Bulk Order Discount Available!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="space-y-6">
                {/* Total Value Display */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-foreground/80 font-semibold text-lg">Total Value:</span>
                    <span className="text-3xl font-bold text-primary">₹{totalValue.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-foreground/60 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {quantity} × {currentSize?.name || 'Size'} (₹{currentPrice.toFixed(2)} each)
                  </div>
                  {quantity > 1 && (
                    <div className="text-sm text-green-600 font-medium mt-2">
                      You're saving ₹{(quantity * 50).toFixed(2)} on bulk order!
                    </div>
                  )}
                </div>

                {/* Action Buttons - Hidden on mobile, shown on larger screens */}
                <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl p-2 font-bold text-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                    <ShoppingCart className="h-6 w-6" />
                    Buy Now
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="group bg-green-500 hover:bg-green-600 text-white rounded-xl p-3 font-bold text-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="h-6 w-6" />
                    WhatsApp Order
                  </button>
                </div>
              </div>

              {/* Related Products */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground/90 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  You Might Also Like
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {relatedProducts.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="group bg-background rounded-lg border hover:shadow-md transition-all duration-300 overflow-hidden hover:scale-105"
                    >
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                        <img
                          src={item.images?.[0] || '/placeholder.jpg'}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-2 sm:p-3 space-y-1 sm:space-y-2">
                        <h4 className="font-semibold text-xs sm:text-sm text-foreground/90 line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-xs text-foreground/60 ml-1">({item.rating})</span>
                        </div>
                        <div className="font-bold text-sm sm:text-base text-primary">₹{item.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Detailed Product Information Accordion */}
              <div className="pt-2">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem value="moments" className="bg-card rounded-lg px-6 border border-border/20">
                    <AccordionTrigger className="text-lg font-semibold text-foreground/80 hover:text-primary">
                      <div className="flex items-center gap-3">
                        <Camera className="h-5 w-5 text-primary" />
                        Capture Your Cherished Moments Forever
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 leading-relaxed">
                      <p className="mb-4">
                        Turn your favorite photos into stunning custom photo magnets, perfectly designed to showcase the moments you hold dear. From family vacations to baby milestones and unforgettable graduations, our personalized photo magnets make it easy to transform digital memories into physical keepsakes that you can see every day.
                      </p>
                      <p>
                        Our high-quality magnets are crafted to be vibrant and durable, ensuring your special moments stay vivid for years.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="features" className="bg-card rounded-lg px-6 border border-border/20">
                    <AccordionTrigger className="text-lg font-semibold text-foreground/80 hover:text-primary">
                      <div className="flex items-center gap-3">
                        <PaletteIcon className="h-5 w-5 text-primary" />
                        Why You'll Love Them
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70">
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span>Custom-made from your photos</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span>Vibrant colors and sharp details</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span>Long-lasting, high-quality finish</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="gifts" className="bg-card rounded-lg px-6 border border-border/20">
                    <AccordionTrigger className="text-lg font-semibold text-foreground/80 hover:text-primary">
                      <div className="flex items-center gap-3">
                        <Gift className="h-5 w-5 text-primary" />
                        Gifts for Any Occasion
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 leading-relaxed">
                      <p className="mb-4">
                        Looking for a unique gift that shows how much you care? Our custom photo magnets are the perfect choice for birthdays, anniversaries, weddings, or any special occasion. Surprise your loved ones with a heartfelt gift that brings a smile every time they see it.
                      </p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground/80 mb-2">Great Gift Ideas:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Baby className="h-4 w-4 text-primary" />
                            <span>Baby announcements</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>Save the date for weddings</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Holiday and family photo gifts</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            <span>Graduation and milestone keepsakes</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="decor" className="bg-card rounded-lg px-6 border border-border/20">
                    <AccordionTrigger className="text-lg font-semibold text-foreground/80 hover:text-primary">
                      <div className="flex items-center gap-3">
                        <Home className="h-5 w-5 text-primary" />
                        Stylish Home Decor with a Personal Touch
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 leading-relaxed">
                      <p className="mb-4">
                        Enhance your home decor with personalized photo magnets that add a unique and sentimental touch to any space. Whether it's your kitchen fridge, a magnetic board, or any metal surface.
                      </p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground/80 mb-2">Perfect for Decorating:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                            <span>Fridge photo displays</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                            <span>Magnetic office boards</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                            <span>Family memory walls</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                            <span>Holiday decorations</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="shipping" className="bg-card rounded-lg px-6 border border-border/20">
                    <AccordionTrigger className="text-lg font-semibold text-foreground/80 hover:text-primary">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        Made and Shipped from India!
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 leading-relaxed">
                      <p className="mb-4">
                        Crafted in India by Pixel Forge Studio, your magnets start production the same day you order.
                      </p>
                      <p>
                        With swift processing and reliable tracked shipping across India, your purchase will be at your door in 3-7 business days. Express delivery available for major cities.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 z-40">
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <div className="text-sm text-foreground/70">Total:</div>
            <div className="text-xl font-bold text-primary">₹{totalValue.toFixed(2)}</div>
          </div>
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-6 py-3 font-bold flex items-center gap-2 transition-all duration-300"
          >
            <MessageCircle className="h-5 w-5" />
            Order Now
          </button>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3 font-bold transition-all duration-300">
            Buy Now
          </button>
        </div>
      </div>

      {/* Mobile padding to avoid sticky footer overlap */}
      <div className="lg:hidden h-20"></div>

      {/* Full Screen Image Modal */}
      {showFullImage && product.images && product.images.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            <button
              onClick={closeFullImage}
              className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
            <img
              src={`${product.images[currentImageIndex]}`}
              alt={product.title}
              className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-lg mx-auto"
              loading="eager"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 touch-manipulation"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 touch-manipulation"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-medium">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
