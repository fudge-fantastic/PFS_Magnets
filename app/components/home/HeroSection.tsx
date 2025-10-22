import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lavender-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sage-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-responsive">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white text-rose-600 px-4 py-2 rounded-full text-sm font-medium border border-rose-100">
              <Sparkles className="w-4 h-4" />
              <span>Handcrafted with Love</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight">
                <span className="block text-neutral-800 mb-2">Memories That</span>
                <span className="block text-rose-500">Stick Around</span>
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Transform your cherished moments into beautiful custom magnets. 
                Each piece tells a story, crafted to bring warmth to your everyday spaces.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/gallery"
                className="group inline-flex items-center justify-center gap-2 bg-rose-500 text-white px-6 py-4 rounded-full font-medium text-base transition-all duration-300 hover:scale-105"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-neutral-700 px-8 py-4 rounded-full font-medium text-base border border-beige-200 hover:border-rose-200 transition-all duration-300"
              >
                Custom Order
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-rose-500">500+</p>
                <p className="text-sm text-neutral-500">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-beige-200"></div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-sage-500">1000+</p>
                <p className="text-sm text-neutral-500">Magnets Created</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src="/designer.jpg"
                  alt="Beautiful magnet collection showcasing custom designs"
                  className="w-full h-full object-cover rounded-3xl"
                  loading="eager"
                />
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 animate-float border border-beige-200/50">
              <p className="text-sm font-medium text-neutral-700">✨ Premium Quality</p>
              <p className="text-xs text-neutral-500">Fade-resistant inks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
