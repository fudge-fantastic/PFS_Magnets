import { Heart, Sparkles, Users, Award, Shield, Zap, Star, TrendingUp } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";

export function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lavender-50/30 to-transparent -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(138,168,138,0.05),transparent_50%)] -z-10"></div>

      <div className="container-responsive">
        <AnimatedSection>
          <div className="text-center mb-12 lg:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-rose-50 border border-rose-200/50 text-rose-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm">
              <Heart className="w-4 h-4 fill-rose-700" />
              <span className="uppercase tracking-wider">Our Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight">
              What We Believe In
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Our values guide everything we do, from design to customer service
            </p>
          </div>
        </AnimatedSection>

        {/* Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Beauty in Details */}
          <AnimatedSection delay={0.1}>
            <div className="group relative bg-gradient-to-br from-white via-white to-rose-50/30 rounded-3xl p-8 md:p-10 overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-rose-100/50 backdrop-blur-sm h-full min-h-[380px] flex flex-col">
              {/* Decorative background */}
              <div className="absolute -top-20 -left-20 w-56 h-56 bg-rose-200/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-rose-300/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-6">
                  <Heart className="w-8 h-8 text-white fill-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 group-hover:text-rose-600 transition-colors duration-300">
                    Beauty in<br />Details
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Every magnet is thoughtfully designed to bring a moment of beauty to your everyday life.
                  </p>
                </div>

                {/* Badge */}
                <div className="mt-6">
                  <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-200/50 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-rose-700 uppercase tracking-wide">Handcrafted</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Quality First */}
          <AnimatedSection delay={0.2}>
            <div className="group relative bg-gradient-to-br from-white via-white to-lavender-50/30 rounded-3xl p-8 md:p-10 overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-lavender-100/50 backdrop-blur-sm h-full min-h-[380px] flex flex-col">
              {/* Decorative background */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-lavender-200/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-lavender-300/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-lavender-400 to-lavender-500 rounded-2xl flex items-center justify-center shadow-lg shadow-lavender-500/20 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 mb-6">
                  <Sparkles className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 group-hover:text-lavender-600 transition-colors duration-300">
                    Quality First
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    High-quality materials, fade-resistant inks, and strong magnets ensure lasting joy.
                  </p>
                </div>

                {/* Badge */}
                <div className="mt-6">
                  <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-lavender-200/50 shadow-sm">
                    <Award className="w-4 h-4 text-lavender-600" />
                    <span className="text-xs font-semibold text-lavender-700 uppercase tracking-wide">Premium Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Customer Joy */}
          <AnimatedSection delay={0.3}>
            <div className="group relative bg-gradient-to-br from-white via-white to-sage-50/30 rounded-3xl p-8 md:p-10 overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-sage-100/50 backdrop-blur-sm h-full min-h-[380px] flex flex-col">
              {/* Decorative background */}
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-sage-200/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-sage-300/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-sage-400 to-sage-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sage-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-6">
                  <Users className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 group-hover:text-sage-600 transition-colors duration-300">
                    Customer<br />Joy
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Your happiness is our success. We're not satisfied until you're delighted.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Trust Indicators - Modernized */}
        <AnimatedSection delay={0.6}>
          <div className="mt-12 lg:mt-16">
            <div className="bg-gradient-to-br from-neutral-50/50 via-white to-neutral-50/50 rounded-3xl p-8 md:p-10 shadow-sm border border-neutral-100/50 backdrop-blur-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center">
                {[
                  { value: '500+', label: 'Happy Customers', icon: Users, color: 'from-rose-400 to-rose-500', textColor: 'from-rose-600 to-rose-700' },
                  { value: '1000+', label: 'Magnets Created', icon: Sparkles, color: 'from-rose-400 to-rose-500', textColor: 'from-rose-600 to-rose-700' },
                  { value: '4.9/5', label: 'Average Rating', icon: Star, color: 'from-rose-400 to-rose-500', textColor: 'from-rose-600 to-rose-700' },
                  { value: '100%', label: 'Quality Guaranteed', icon: Award, color: 'from-rose-400 to-rose-500', textColor: 'from-rose-600 to-rose-700' }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-3 group">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-br ${stat.textColor} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                      <p className="text-sm text-neutral-600 font-medium mt-1">{stat.label}</p>
                    </div>
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
