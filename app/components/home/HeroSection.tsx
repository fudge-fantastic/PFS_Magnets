import { Link } from "react-router";
import { ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-28">
      {/* Modern gradient background with mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-beige-50 to-lavender-50"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-rose-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-lavender-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-sage-200/20 to-transparent rounded-full blur-3xl"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="container-responsive">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Content - Larger column */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-10">
            <AnimatedSection delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-rose-50 border border-rose-200/50 text-rose-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4 fill-rose-400" />
                <span>Handcrafted with Love</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
                  <span className="block text-neutral-800 mb-2">Memories That</span>
                  <span className="block bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 bg-clip-text text-transparent">
                    Stick Around
                  </span>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 max-w-2xl leading-relaxed font-light">
                  Transform your cherished moments into beautiful custom magnets.
                  Each piece tells a story, crafted to bring warmth to your everyday spaces.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/gallery"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-lg shadow-rose-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/40 hover:scale-[1.02] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Explore Collection</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-neutral-700 px-8 py-4 rounded-2xl font-semibold text-base border-2 border-neutral-200 hover:border-rose-300 hover:bg-white transition-all duration-300 hover:scale-[1.02] shadow-sm"
                >
                  Custom Order
                </Link>
              </div>
            </AnimatedSection>

            {/* Modern stats section */}
            <AnimatedSection delay={0.4}>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-neutral-200/50 hover:border-rose-200 transition-all duration-300 hover:shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-rose-500 to-rose-600 bg-clip-text text-transparent mb-1">500+</div>
                  <p className="text-xs md:text-sm text-neutral-600 font-medium">Happy Customers</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Star className="w-4 h-4 text-rose-400 fill-rose-400" />
                  </div>
                </div>

                <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-neutral-200/50 hover:border-sage-200 transition-all duration-300 hover:shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-sage-500 to-sage-600 bg-clip-text text-transparent mb-1">1000+</div>
                  <p className="text-xs md:text-sm text-neutral-600 font-medium">Magnets Created</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-4 h-4 text-sage-400 fill-sage-400" />
                  </div>
                </div>

                <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-neutral-200/50 hover:border-lavender-200 transition-all duration-300 hover:shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-lavender-500 to-lavender-600 bg-clip-text text-transparent mb-1">4.9</div>
                  <p className="text-xs md:text-sm text-neutral-600 font-medium">Average Rating</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <TrendingUp className="w-4 h-4 text-lavender-400" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Hero Image - Compact column with modern styling */}
          <div className="lg:col-span-5">
            <AnimatedSection delay={0.3} direction="right">
              <div className="relative group">
                {/* Main image container with modern effects */}
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-neutral-900/10 border-8 border-white">
                  <img
                    src="/designer.jpg"
                    alt="Beautiful magnet collection showcasing custom designs"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Floating quality badge - modernized */}
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-white to-cream-50 rounded-2xl p-5 shadow-xl border border-neutral-200/50 backdrop-blur-sm max-w-[200px]">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800 mb-0.5">Premium Quality</p>
                      <p className="text-xs text-neutral-600 leading-snug">Fade-resistant inks & strong magnets</p>
                    </div>
                  </div>
                </div>

                {/* Decorative floating element - top right */}
                <div className="hidden lg:block absolute -top-4 -right-4 bg-gradient-to-br from-lavender-100 to-lavender-200 rounded-2xl p-4 shadow-lg border border-lavender-300/50 backdrop-blur-sm animate-float">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-6 h-6 rounded-full bg-rose-300 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-sage-300 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-lavender-300 border-2 border-white"></div>
                    </div>
                    <p className="text-xs font-semibold text-neutral-700">Popular</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
