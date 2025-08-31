import type { Route } from "./+types/product";
import { Link, useParams } from "react-router";
import { useState } from "react";
import { ArrowLeft, Heart, Share2, Star, Plus, Minus, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

export function meta({ params }: Route.MetaArgs) {
  // In a real app, you'd fetch the product data here
  return [
    { title: `Magnet Product - Beautiful Magnets` },
    { name: "description", content: "View detailed information about this beautiful magnet design." },
  ];
}

export default function Product() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock product data - in a real app, you'd fetch this based on params.id
  const magnets = [
    { 
      id: 1, 
      name: "Sunset Gradient", 
      category: "minimalist", 
      price: 8.99, 
      images: ["🌅", "🌇", "🌆", "🌄"], 
      description: "Warm sunset colors in a minimalist design", 
      longDescription: "This beautiful sunset gradient magnet captures the serene beauty of a perfect evening sky. The warm oranges and pinks blend seamlessly into deeper purples, creating a calming and sophisticated piece that complements any space. Perfect for adding a touch of natural beauty to your kitchen, office, or anywhere you need a gentle reminder of nature's daily masterpiece." 
    },
    { 
      id: 2, 
      name: "Botanical Leaves", 
      category: "nature", 
      price: 9.99, 
      images: ["🍃", "🌿", "🍀", "🌱"], 
      description: "Hand-drawn botanical illustration", 
      longDescription: "Featuring delicate hand-drawn botanical illustrations, this magnet brings the beauty of nature indoors. Each leaf is carefully crafted with intricate details that showcase the natural elegance of plant life. Made with premium materials and fade-resistant inks to ensure your botanical beauty stays vibrant for years to come." 
    },
    { 
      id: 3, 
      name: "Geometric Lines", 
      category: "geometric", 
      price: 7.99, 
      images: ["📐", "🔶", "⬡", "◼️"], 
      description: "Modern geometric pattern in gold", 
      longDescription: "Clean lines and modern geometry come together in this sophisticated design. The subtle gold accents add a touch of luxury while maintaining the minimalist aesthetic that works perfectly in contemporary spaces. This magnet is ideal for those who appreciate modern design and want to add a touch of elegance to their magnetic surfaces." 
    },
  ];

  const product = magnets.find(m => m.id === parseInt(params.id || "1")) || magnets[0];

  const relatedProducts = magnets.filter(m => m.id !== product.id && m.category === product.category).slice(0, 3);

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in the ${product.name} magnet (${quantity} piece${quantity > 1 ? 's' : ''}) - $${(product.price * quantity).toFixed(2)}`;
    const phoneNumber = "1234567890"; // Replace with actual WhatsApp business number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
                <span className="text-9xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {product.images[currentImageIndex]}
                </span>
                
                {/* Carousel Navigation */}
                {product.images.length > 1 && (
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
                {product.images.length > 1 && (
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
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => goToImage(i)}
                    className={`aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-2xl cursor-pointer hover:scale-105 transition-transform duration-200 ${
                      i === currentImageIndex ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    {image}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-primary/70 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-foreground/70 ml-1">(24 reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-foreground/80 mb-2">
                  {product.name}
                </h1>
                
                <p className="text-2xl font-bold text-primary mb-4">
                  ${product.price}
                </p>
                
                <p className="text-foreground/70 leading-relaxed">
                  {product.longDescription}
                </p>
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

                <div className="flex gap-4">
                  <button 
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </button>
                  <button className="px-6 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                <div className="text-center p-4 bg-secondary/20 rounded-xl">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="font-medium text-foreground/80 text-sm">Premium Quality</div>
                  <div className="text-foreground/70 text-xs">Fade-resistant inks</div>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-xl">
                  <div className="text-2xl mb-2">🚚</div>
                  <div className="font-medium text-foreground/80 text-sm">Fast Shipping</div>
                  <div className="text-foreground/70 text-xs">2-3 business days</div>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-xl">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="font-medium text-foreground/80 text-sm">Secure Payment</div>
                  <div className="text-foreground/70 text-xs">SSL encrypted</div>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-xl">
                  <div className="text-2xl mb-2">↩️</div>
                  <div className="font-medium text-foreground/80 text-sm">Easy Returns</div>
                  <div className="text-foreground/70 text-xs">30-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <h2 className="text-3xl font-bold text-foreground/80 mb-8 text-center">
              You Might Also Like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl relative overflow-hidden">
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {relatedProduct.images[0]}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-200">
                        {relatedProduct.name}
                      </h3>
                      <span className="font-bold text-primary">
                        ${relatedProduct.price}
                      </span>
                    </div>
                    
                    <p className="text-foreground/70 text-sm">
                      {relatedProduct.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
