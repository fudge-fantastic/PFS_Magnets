import type { Route } from "./+types/product";
import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { api, type Product } from "~/lib/api";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight,
  Camera,
  Palette as PaletteIcon,
  Clock,
  Gift,
  Home,
  Baby,
  Calendar,
  GraduationCap,
  Users,
  MapPin
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
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('small');

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

  // Size options with updated dimensions
  const sizeOptions = [
    { id: 'small', name: 'Small', dimensions: '2.75" × 2.75"', price: 8.99 },
    { id: 'medium', name: 'Medium', dimensions: '2.75" × 3.5"', price: 9.99 },
    { id: 'large', name: 'Large', dimensions: '3.25" × 4"', price: 11.99 },
  ];
  const currentSize = sizeOptions.find(size => size.id === selectedSize) || sizeOptions[0];
  const currentPrice = product?.price || currentSize.price;

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
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

  const handleWhatsAppClick = () => {
    if (!product) return;
    const message = `Hi! I'm interested in the ${product.title} magnet (${currentSize.name} - ${currentSize.dimensions}, ${quantity} piece${quantity > 1 ? 's' : ''}) - $${(currentPrice * quantity).toFixed(2)}`;
    const phoneNumber = "1234567890"; // Replace with actual WhatsApp business number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-4 bg-primary/20 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-4">
                <div className="aspect-square bg-primary/20 rounded-2xl"></div>
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-primary/20 rounded-xl"></div>
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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <Link
            to="/gallery"
            className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors duration-200 group mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Gallery
          </Link>
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
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200"
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
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <Link
          to="/gallery"
          className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Gallery
        </Link>
      </div>

      {/* Product Detail */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image Carousel */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10"></div>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={`${product.images[currentImageIndex]}`}
                    alt={product.title}
                    className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-9xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                    🖼️
                  </span>
                )}
                
                {/* Carousel Navigation */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:bg-white hover:scale-105 transition-all duration-200"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:bg-white hover:scale-105 transition-all duration-200"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
                      isLiked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-foreground hover:bg-white hover:scale-105'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:bg-white hover:scale-105 transition-all duration-200">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Image Indicators */}
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, i) => (
                    <button
                      key={i}
                      onClick={() => goToImage(i)}
                      className={`aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden ${
                        i === currentImageIndex ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={`${image}`}
                        alt={`${product.title} view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-primary/70 uppercase tracking-wide">
                    {product.category_name}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm text-foreground/70 ml-1">({product.rating.toFixed(1)})</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-foreground/80 mb-2">
                  {product.title}
                </h1>
                
                <p className="text-2xl font-bold text-primary mb-4">
                  ${currentPrice.toFixed(2)}
                </p>
                
                <p className="text-foreground/70 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <label className="font-medium text-foreground/80 text-lg">Choose Size:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {sizeOptions.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedSize === size.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      <div className="font-semibold text-sm">{size.name}</div>
                      <div className="text-xs opacity-80">{size.dimensions}</div>
                      <div className="font-bold text-sm mt-1">${size.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-foreground/80">Quantity:</label>
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(-1)}
                      className="p-2 hover:bg-secondary transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 bg-secondary/20 min-w-[3rem] text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(1)}
                      className="p-2 hover:bg-secondary transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp - ${(currentPrice * quantity).toFixed(2)}
                  </button>
                  <button className="px-6 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Detailed Product Information Accordion */}
              <div className="pt-8">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem value="moments" className="bg-card rounded-xl px-6 border border-border/20">
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

                  <AccordionItem value="features" className="bg-card rounded-xl px-6 border border-border/20">
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

                  <AccordionItem value="gifts" className="bg-card rounded-xl px-6 border border-border/20">
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

                  <AccordionItem value="decor" className="bg-card rounded-xl px-6 border border-border/20">
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

                  <AccordionItem value="shipping" className="bg-card rounded-xl px-6 border border-border/20">
                    <AccordionTrigger className="text-lg font-semibold text-foreground/80 hover:text-primary">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        Made and Shipped from the USA!
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 leading-relaxed">
                      <p className="mb-4">
                        Crafted in the USA, your magnets start production the same day you order.
                      </p>
                      <p>
                        With swift processing and reliable tracked shipping, your purchase will be at your door in 4-6 business days.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
