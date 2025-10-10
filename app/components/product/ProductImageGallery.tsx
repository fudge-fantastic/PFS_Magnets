import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Share2, X } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  onShare?: () => void;
  badges?: Array<{ text: string; color: string; icon: any }>;
}

export function ProductImageGallery({ 
  images, 
  title, 
  onShare,
  badges = []
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <>
      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="flex gap-3 sm:gap-4">
          {/* Thumbnail Column - Desktop/Tablet */}
          {images.length > 1 && (
            <div className="hidden sm:flex flex-col gap-2 sm:gap-3 w-16 sm:w-20 md:w-24">
              <div className="flex flex-col gap-2 sm:gap-3 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                {images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => goToImage(i)}
                    className={`flex-shrink-0 aspect-square bg-beige-100 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden border-2 ${
                      i === currentImageIndex
                        ? 'border-rose-400 shadow-soft'
                        : 'border-transparent opacity-60 hover:opacity-80 hover:border-rose-200'
                    }`}
                  >
                    <img
                      src={`${image}`}
                      alt={`${title} view ${i + 1}`}
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
            <div className="aspect-square bg-gradient-to-br from-beige-100 via-rose-50 to-lavender-100 rounded-3xl flex items-center justify-center relative overflow-hidden group max-w-full">

              {/* Product Badges */}
              <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                {badges.map((badge, index) => (
                  <div key={index} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-sm font-medium shadow-soft ${badge.color}`}>
                    <badge.icon className="h-3 w-3" />
                    {badge.text}
                  </div>
                ))}
              </div>

              {images.length > 0 ? (
                <img
                  src={`${images[currentImageIndex]}`}
                  alt={title}
                  className="w-full h-full object-cover relative z-10 transition-all duration-500 cursor-zoom-in scale-100 group-hover:scale-105"
                  onClick={() => setShowFullImage(true)}
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
                onClick={() => setShowFullImage(true)}
              />

              {/* Carousel Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 rounded-full flex items-center justify-center text-neutral-800 hover:bg-white hover:scale-110 transition-all duration-200 shadow-soft z-20"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 rounded-full flex items-center justify-center text-neutral-800 hover:bg-white hover:scale-110 transition-all duration-200 shadow-soft z-20"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}

              {/* Action Buttons */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-2 sm:gap-3 z-30">
                <button
                  onClick={toggleWishlist}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-soft ${
                    isWishlisted
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/95 text-neutral-800 hover:bg-white'
                  }`}
                >
                  <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                {onShare && (
                  <button
                    onClick={onShare}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/95 rounded-full flex items-center justify-center text-neutral-800 hover:bg-white hover:scale-110 transition-all duration-200 shadow-soft"
                  >
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/70 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-medium z-20">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Mobile Thumbnail Row */}
            {images.length > 1 && (
              <div className="sm:hidden mt-3">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                  {images.map((image, i) => (
                    <button
                      key={i}
                      onClick={() => goToImage(i)}
                      className={`flex-shrink-0 aspect-square bg-beige-100 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden border-2 w-16 h-16 ${
                        i === currentImageIndex
                          ? 'border-rose-400 shadow-soft'
                          : 'border-transparent opacity-60 hover:opacity-80 hover:border-rose-200'
                      }`}
                    >
                      <img
                        src={`${image}`}
                        alt={`${title} view ${i + 1}`}
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

      {/* Full Screen Image Modal */}
      {showFullImage && images.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
            <img
              src={`${images[currentImageIndex]}`}
              alt={title}
              className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-lg mx-auto"
              loading="eager"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 touch-manipulation"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 touch-manipulation"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
