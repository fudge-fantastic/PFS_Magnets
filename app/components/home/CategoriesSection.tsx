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
    <section className="py-20 md:py-28 lg:py-36 bg-gradient-to-b from-transparent via-rose-50/30 to-transparent">
      <div className="container-responsive">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <p className="text-rose-500 font-medium text-sm tracking-wide uppercase">Collections</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800">
            Explore Our Collections
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Discover our unique collections, each designed to serve different needs and styles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {loading ? (
            [...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white/60 rounded-3xl shadow-soft border border-beige-200/50 animate-pulse overflow-hidden"
              >
                <div className="aspect-square bg-beige-200"></div>
                <div className="p-6 md:p-8">
                  <div className="space-y-3">
                    <div className="h-6 bg-beige-200 rounded-xl"></div>
                    <div className="h-4 bg-beige-100 rounded-lg"></div>
                    <div className="h-4 w-20 bg-beige-200 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            categories.map((category, index) => {
              const displayInfo = getCategoryDisplayInfo(category.name);
              const sampleProduct = categoryProducts[category.id];
              return (
                <Link
                  key={category.id}
                  to={`/gallery?category=${category.id}`}
                  className="group card-minimal overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {sampleProduct && (
                    <div className={`aspect-square bg-gradient-to-br ${displayInfo.gradient} relative overflow-hidden rounded-2xl mb-4`}>
                      <img
                        src={sampleProduct.images[0] || '/dummy.jpg'}
                        alt={sampleProduct.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = '/dummy.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-3 right-3 bg-white/90 px-3 py-1.5 rounded-full text-sm font-semibold text-neutral-800 shadow-soft">
                        ₹{sampleProduct.price}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center space-y-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${displayInfo.gradient} rounded-2xl flex items-center justify-center mx-auto text-neutral-700 group-hover:scale-110 transition-transform duration-300`}>
                      {displayInfo.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-800 group-hover:text-rose-600 transition-colors duration-300">
                      {category.name}
                    </h3>

                    <p className="text-neutral-600 leading-relaxed text-sm font-light">
                      {category.description}
                    </p>

                    {sampleProduct && (
                      <div className="p-3 bg-gradient-to-br from-beige-50 to-rose-50/30 rounded-2xl">
                        <p className="text-sm font-medium text-neutral-800">{sampleProduct.title}</p>
                        <p className="text-xs text-neutral-500 mt-1">{sampleProduct.short_description}</p>
                      </div>
                    )}

                    <div className="inline-flex items-center bg-white border border-beige-200 text-neutral-700 px-3 py-1.5 rounded-full text-xs font-medium">
                      {displayInfo.badge}
                    </div>

                    <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ArrowRight className="h-5 w-5 text-rose-500 mx-auto" />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/gallery?category=all"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-soft-lg transition-all duration-300 hover:scale-105"
          >
            View All Designs
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
