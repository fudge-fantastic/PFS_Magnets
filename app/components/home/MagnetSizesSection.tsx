import { Link } from "react-router";
import { ArrowRight, Ruler } from "lucide-react";

export function MagnetSizesSection() {
  return (
    <section className="py-20 md:py-28 lg:py-36">
      <div className="container-responsive">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <p className="text-rose-500 font-medium text-sm tracking-wide uppercase">Dimensions</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800">
            Available Magnet Sizes
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Choose from our range of sizes to perfectly fit your needs. All magnets feature strong adhesion and high-quality construction.
          </p>
        </div>

        {/* Featured Size Comparison */}
        <div className="mb-16 animate-scale-in">
          <div className="relative group">
            <div className="aspect-[16/9] bg-gradient-to-br from-beige-100 via-rose-50 to-lavender-100 rounded-[2.5rem] overflow-hidden shadow-soft-lg relative">
              <img
                src="/dummy.jpg"
                alt="All magnet sizes comparison - Small, Medium, and Large"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Complete Size Range</h3>
                <p className="text-white/90 text-base md:text-lg font-light">
                  From compact 2.75×2.75" to large 3.25×4" - choose the perfect size for your design
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Size Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {[
            {
              name: 'Small',
              size: '2.75" × 2.75"',
              image: '/small.jpg',
              badge: 'Compact & Cute',
              description: 'Perfect for delicate designs, logos, or when you need multiple magnets in a small space. Ideal for refrigerator collections.',
              gradient: 'from-rose-100 to-rose-200'
            },
            {
              name: 'Medium',
              size: '2.75" × 3.5"',
              image: '/medium.jpg',
              badge: 'Most Popular',
              description: 'The perfect balance of visibility and space efficiency. Great for photos, artwork, and promotional materials.',
              gradient: 'from-lavender-100 to-lavender-200'
            },
            {
              name: 'Large',
              size: '3.25" × 4"',
              image: '/large.jpg',
              badge: 'Detail Rich',
              description: 'Maximum impact! Perfect for detailed artwork, family photos, or when you want your magnet to be the centerpiece.',
              gradient: 'from-sage-100 to-sage-200'
            }
          ].map((size, index) => (
            <div 
              key={index} 
              className="group card-minimal text-center space-y-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`aspect-square bg-gradient-to-br ${size.gradient} rounded-3xl overflow-hidden shadow-soft relative`}>
                <img
                  src={size.image}
                  alt={`${size.name} size - ${size.size}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-800 shadow-soft">
                    {size.badge}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-br from-beige-100 to-beige-200 px-4 py-2 rounded-2xl">
                  <Ruler className="w-4 h-4 text-neutral-600" />
                  <span className="text-2xl font-bold text-neutral-800">{size.size}</span>
                </div>
                
                <h3 className="text-2xl font-semibold text-neutral-800">{size.name} Size</h3>
                
                <p className="text-neutral-600 leading-relaxed font-light">
                  {size.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Size Info */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-100 via-lavender-100 to-sage-100 p-8 md:p-12 text-center shadow-soft-lg animate-fade-in-up">
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full">
              <Ruler className="w-5 h-5 text-rose-500" />
              <span className="font-semibold text-neutral-800">Custom Options</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800">
              Need a Different Size?
            </h3>
            
            <p className="text-neutral-700 max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed">
              We also offer 4" × 6" rectangles and custom dimensions for bulk orders.
              All magnets feature strong neodymium cores with pull strengths ranging from 2-8 lbs depending on size.
            </p>
            
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-soft-lg transition-all duration-300 hover:scale-105"
            >
              Request Custom Size
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/30 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/30 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
