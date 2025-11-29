import { Link } from "react-router";
import { ArrowRight, Ruler, Maximize2, Check } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";

export function MagnetSizesSection() {
  const sizes = [
    {
      name: 'Small',
      size: '2.75" × 2.75"',
      image: '/small.jpg',
      badge: 'Compact & Cute',
      description: 'Perfect for delicate designs, logos, or when you need multiple magnets in a small space. Ideal for refrigerator collections.',
      gradient: 'from-rose-400 to-rose-500',
      bgGradient: 'from-rose-50 to-rose-100',
      features: ['Space efficient', 'Perfect for sets', 'Subtle presence']
    },
    {
      name: 'Medium',
      size: '2.75" × 3.5"',
      image: '/medium.jpg',
      badge: 'Most Popular',
      description: 'The perfect balance of visibility and space efficiency. Great for photos, artwork, and promotional materials.',
      gradient: 'from-lavender-400 to-lavender-500',
      bgGradient: 'from-lavender-50 to-lavender-100',
      features: ['Best value', 'Versatile size', 'High visibility'],
      popular: true
    },
    {
      name: 'Large',
      size: '3.25" × 4"',
      image: '/large.jpg',
      badge: 'Detail Rich',
      description: 'Maximum impact! Perfect for detailed artwork, family photos, or when you want your magnet to be the centerpiece.',
      gradient: 'from-sage-400 to-sage-500',
      bgGradient: 'from-sage-50 to-sage-100',
      features: ['Premium quality', 'Maximum detail', 'Statement piece']
    }
  ];

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-beige-50 to-transparent -z-10"></div>

      <div className="container-responsive">
        <AnimatedSection>
          <div className="text-center mb-16 lg:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-rose-50 border border-rose-200/50 text-rose-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <Ruler className="w-4 h-4" />
              <span className="uppercase tracking-wide">Dimensions</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800">
              Available Magnet Sizes
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto font-light leading-relaxed">
              Choose from our range of sizes to perfectly fit your needs. All magnets feature strong adhesion and high-quality construction.
            </p>
          </div>
        </AnimatedSection>

        {/* Featured Size Comparison - Modernized */}
        <AnimatedSection delay={0.2}>
          <div className="mb-16 lg:mb-20">
            <div className="relative group">
              <div className="aspect-[16/9] bg-gradient-to-br from-beige-100 via-rose-50 to-lavender-100 rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white">
                <img
                  src="/dummy.jpg"
                  alt="All magnet sizes comparison - Small, Medium, and Large"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent"></div>

                {/* Modern overlay content */}
                <div className="absolute inset-0 flex items-end p-8 md:p-12">
                  <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
                      <Maximize2 className="w-4 h-4 text-rose-500" />
                      <span className="text-sm font-semibold text-neutral-800">Size Comparison</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl">
                      Complete Size Range
                    </h3>
                    <p className="text-white/95 text-base md:text-lg lg:text-xl font-light leading-relaxed drop-shadow-lg max-w-2xl">
                      From compact 2.75×2.75" to large 3.25×4" - choose the perfect size for your design
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Individual Size Cards - Modernized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {sizes.map((size, index) => (
            <AnimatedSection key={index} delay={0.1 * (index + 1)}>
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-neutral-100 hover:border-neutral-200 h-full flex flex-col">
                {/* Popular badge */}
                {size.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-rose-500/30">
                    {size.badge}
                  </div>
                )}

                {/* Image */}
                <div className={`aspect-square bg-gradient-to-br ${size.bgGradient} overflow-hidden relative`}>
                  <img
                    src={size.image}
                    alt={`${size.name} size - ${size.size}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Size indicator on image */}
                  {!size.popular && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                      <span className="text-xs font-semibold text-neutral-800">{size.badge}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col">
                  {/* Size tag */}
                  <div className="inline-flex items-center gap-3 self-start">
                    <div className={`w-12 h-12 bg-gradient-to-br ${size.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Ruler className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Dimensions</p>
                      <p className="text-xl font-bold text-neutral-800">{size.size}</p>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-800">
                    {size.name} Size
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 leading-relaxed font-light flex-1">
                    {size.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 pt-4 border-t border-neutral-100">
                    {size.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`w-5 h-5 bg-gradient-to-br ${size.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Custom Size CTA - Modernized */}
        <AnimatedSection delay={0.5}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-50 via-lavender-50 to-sage-50 p-8 md:p-12 lg:p-16 shadow-xl border-2 border-white">
            {/* Decorative elements */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-br from-rose-200/40 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-br from-lavender-200/40 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              {/* Left content */}
              <div className="space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md">
                  <Ruler className="w-5 h-5 text-rose-500" />
                  <span className="font-semibold text-neutral-800">Custom Options Available</span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight">
                  Need a Different Size?
                </h3>

                <p className="text-neutral-700 text-base md:text-lg font-light leading-relaxed">
                  We also offer 4" × 6" rectangles and custom dimensions for bulk orders.
                  All magnets feature strong neodymium cores with pull strengths ranging from 2-8 lbs depending on size.
                </p>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300 hover:scale-105"
                >
                  <span>Request Custom Size</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right - Feature highlights */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Pull Strength', value: '2-8 lbs', gradient: 'from-rose-400 to-rose-500' },
                  { label: 'Custom Sizes', value: 'Available', gradient: 'from-lavender-400 to-lavender-500' },
                  { label: 'Bulk Orders', value: 'Discounts', gradient: 'from-sage-400 to-sage-500' },
                  { label: 'Lead Time', value: '5-7 days', gradient: 'from-rose-400 to-lavender-500' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 hover:scale-105 transition-transform duration-300"
                  >
                    <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent mb-2`}>
                      {item.value}
                    </div>
                    <div className="text-xs md:text-sm text-neutral-600 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
