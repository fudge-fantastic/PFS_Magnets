import { Link } from "react-router";
import { ArrowRight, Sparkles, Heart, Star, Calendar } from "lucide-react";
import type { Category, Product } from "~/lib/api";

interface CategoriesSectionProps {
  categories: Category[];
  loading: boolean;
  categoryProducts: Record<string, Product>;
}

export function CategoriesSection({ categories, loading, categoryProducts }: CategoriesSectionProps) {
  const getCategoryDisplayInfo = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('fridge') || name.includes('kitchen')) {
      return {
        icon: <Sparkles className="h-6 w-6" strokeWidth={1.5} />,
        gradient: "from-rose-100 via-rose-50 to-beige-50",
        badge: "25+ designs",
        accentColor: "rose"
      };
    } else if (name.includes('photo')) {
      return {
        icon: <Heart className="h-6 w-6" strokeWidth={1.5} />,
        gradient: "from-lavender-100 via-lavender-50 to-beige-50",
        badge: "Custom orders",
        accentColor: "lavender"
      };
    } else if (name.includes('retro') || name.includes('vintage')) {
      return {
        icon: <Star className="h-6 w-6" strokeWidth={1.5} />,
        gradient: "from-sage-100 via-sage-50 to-beige-50",
        badge: "15+ designs",
        accentColor: "sage"
      };
    } else if (name.includes('save the date') || name.includes('calendar')) {
      return {
        icon: <Calendar className="h-6 w-6" strokeWidth={1.5} />,
        gradient: "from-cream-100 via-cream-50 to-beige-50",
        badge: "Special events",
        accentColor: "cream"
      };
    } else {
      return {
        icon: <Sparkles className="h-6 w-6" strokeWidth={1.5} />,
        gradient: "from-beige-100 via-beige-50 to-white",
        badge: "Available",
        accentColor: "beige"
      };
    }
  };

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-gradient-to-b from-transparent via-rose-50/30 to-transparent overflow-hidden">
      <div className="container-responsive">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <p className="text-rose-500 font-medium text-sm tracking-wide uppercase">Collections</p>
          <h2 className="text-5xl font-bold text-neutral-800">
            Explore Our Collections
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Discover our unique collections, each designed to serve different needs and styles
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-12 gap-4 auto-rows-[280px]">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`
                  ${index === 0 ? 'col-span-12 md:col-span-7 row-span-2' : ''}
                  ${index === 1 ? 'col-span-12 md:col-span-5 row-span-1' : ''}
                  ${index === 2 ? 'col-span-12 md:col-span-5 row-span-1' : ''}
                  ${index === 3 ? 'col-span-12 md:col-span-7 row-span-2' : ''}
                  bg-beige-200 rounded-2xl animate-pulse
                `}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 auto-rows-[280px]">
            {categories.map((category, index) => {
              const displayInfo = getCategoryDisplayInfo(category.name);
              const sampleProduct = categoryProducts[category.id];
              
              // Create a magazine-style layout with varying sizes
              const layoutClasses = [
                'col-span-12 md:col-span-7 row-span-2', // Large
                'col-span-12 md:col-span-5 row-span-1', // Medium
                'col-span-12 md:col-span-5 row-span-1', // Medium
                'col-span-12 md:col-span-7 row-span-2', // Large
              ];
              
              return (
                <Link
                  key={category.id}
                  to={`/gallery?category=${category.id}`}
                  className={`
                    ${layoutClasses[index % layoutClasses.length]}
                    group relative overflow-hidden rounded-2xl
                    animate-fade-in-up
                    transform hover:scale-[1.02] transition-all duration-500
                    shadow-lg hover:shadow-2xl
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background Image */}
                  {sampleProduct && (
                    <div className="absolute inset-0">
                      <img
                        src={sampleProduct.images[0] || '/dummy.jpg'}
                        alt={sampleProduct.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = '/dummy.jpg';
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${displayInfo.gradient} opacity-40 group-hover:opacity-30 transition-opacity duration-500`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Content Overlay */}
                  <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                    {/* Top Section - Badge & Icon */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="text-neutral-700">{displayInfo.icon}</span>
                        <span className="text-sm font-semibold text-neutral-800">{displayInfo.badge}</span>
                      </div>
                      
                      {sampleProduct && (
                        <div className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          ₹{sampleProduct.price}
                        </div>
                      )}
                    </div>

                    {/* Bottom Section - Category Info */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                          {category.name}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base font-light leading-relaxed line-clamp-2">
                          {category.description}
                        </p>
                      </div>

                      {sampleProduct && (
                        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl space-y-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <p className="text-sm font-semibold text-neutral-800 line-clamp-1">{sampleProduct.title}</p>
                          <p className="text-xs text-neutral-600 line-clamp-1">{sampleProduct.short_description}</p>
                        </div>
                      )}

                      {/* Explore Arrow */}
                      <div className="flex items-center gap-2 text-white font-medium">
                        <span className="text-sm uppercase tracking-wider">Explore</span>
                        <ArrowRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/gallery?category=all"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            View All Designs
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
