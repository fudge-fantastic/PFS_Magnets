import { Link } from "react-router";
import { ArrowRight, Sparkles, Heart, Star, Calendar } from "lucide-react";
import type { Category, Product } from "~/lib/api";
import { AnimatedSection } from "../AnimatedSection";

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
        hoverGradient: "from-rose-500 to-rose-400",
        badge: "25+ designs",
        accentColor: "rose"
      };
    } else if (name.includes('photo')) {
      return {
        icon: <Heart className="h-6 w-6" strokeWidth={1.5} />,
        gradient: "from-lavender-100 via-lavender-50 to-beige-50",
        hoverGradient: "from-lavender-500 to-lavender-400",
        badge: "Custom orders",
        accentColor: "lavender"
      };
    } else if (name.includes('retro') || name.includes('vintage')) {
      return {
        icon: <Star className="h-6 w-6" strokeWidth={1.5} />,
        gradient: "from-sage-100 via-sage-50 to-beige-50",
        hoverGradient: "from-sage-500 to-sage-400",
        badge: "15+ designs",
        accentColor: "sage"
      };
    } else if (name.includes('save the date') || name.includes('calendar')) {
      return {
        icon: <Calendar className="h-6 w-6" strokeWidth={1.5} />,
        gradient: "from-cream-100 via-cream-50 to-beige-50",
        hoverGradient: "from-rose-400 to-rose-500",
        badge: "Special events",
        accentColor: "cream"
      };
    } else {
      return {
        icon: <Sparkles className="h-6 w-6" strokeWidth={1.5} />,
        gradient: "from-beige-100 via-beige-50 to-white",
        hoverGradient: "from-neutral-500 to-neutral-400",
        badge: "Available",
        accentColor: "beige"
      };
    }
  };

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Modern background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-50/40 to-transparent -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,117,131,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(157,142,196,0.05),transparent_50%)] -z-10"></div>

      <div className="container-responsive">
        <AnimatedSection>
          <div className="text-center mb-16 lg:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-rose-50 border border-rose-200/50 text-rose-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <Star className="w-4 h-4" />
              <span className="uppercase tracking-wide">Collections</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800">
              Explore Our Collections
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto font-light leading-relaxed">
              Discover our unique collections, each designed to serve different needs and styles
            </p>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[280px]">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`
                  ${index === 0 ? 'col-span-12 md:col-span-7 row-span-2' : ''}
                  ${index === 1 ? 'col-span-12 md:col-span-5 row-span-1' : ''}
                  ${index === 2 ? 'col-span-12 md:col-span-5 row-span-1' : ''}
                  ${index === 3 ? 'col-span-12 md:col-span-7 row-span-2' : ''}
                  bg-neutral-200 rounded-3xl animate-pulse
                `}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 md:gap-6 auto-rows-[400px]">
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
                <AnimatedSection
                  key={category.id}
                  delay={index * 0.1}
                >
                  <Link
                    to={`/gallery?category=${category.id}`}
                    className={`
                      ${layoutClasses[index % layoutClasses.length]}
                      group relative overflow-hidden rounded-3xl
                      transform hover:scale-[1.02] transition-all duration-500
                      shadow-lg hover:shadow-2xl
                      border-2 border-white/50
                      block h-full
                    `}
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
                        {/* Color overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${displayInfo.gradient} opacity-30 group-hover:opacity-20 transition-opacity duration-500`}></div>
                        {/* Dark gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                      </div>
                    )}

                    {/* Content Overlay */}
                    <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                      {/* Top Section - Badge & Price */}
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/20">
                          <span className="text-neutral-700">{displayInfo.icon}</span>
                          <span className="text-sm font-semibold text-neutral-800">{displayInfo.badge}</span>
                        </div>

                        {sampleProduct && (
                          <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-rose-500/30">
                            ₹{sampleProduct.price}
                          </div>
                        )}
                      </div>

                      {/* Bottom Section - Category Info */}
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                            {category.name}
                          </h3>
                          <p className="text-white/95 text-base md:text-lg font-light leading-relaxed line-clamp-2 drop-shadow-lg">
                            {category.description}
                          </p>
                        </div>

                        {/* Product preview card - appears on hover */}
                        {sampleProduct && (
                          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl space-y-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl border border-white/20">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-neutral-800 line-clamp-1">{sampleProduct.title}</p>
                                <p className="text-xs text-neutral-600 line-clamp-1">{sampleProduct.short_description}</p>
                              </div>
                              {sampleProduct.rating && (
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-semibold text-neutral-700">{sampleProduct.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Explore CTA */}
                        <div className="flex items-center gap-3 text-white font-semibold group/cta">
                          <div className={`w-12 h-12 bg-gradient-to-r ${displayInfo.hoverGradient} rounded-xl flex items-center justify-center shadow-lg group-hover/cta:shadow-xl transition-all duration-300`}>
                            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                          <span className="text-base uppercase tracking-wider">Explore Collection</span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative gradient accent */}
                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${displayInfo.hoverGradient} opacity-0 group-hover:opacity-20 rounded-bl-full blur-2xl transition-opacity duration-500`}></div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        )}

        <AnimatedSection delay={0.5}>
          <div className="text-center mt-16 lg:mt-20">
            <Link
              to="/gallery?category=all"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 transition-all duration-300 hover:scale-105"
            >
              <span>View All Designs</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
