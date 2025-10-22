import { Heart, Sparkles, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Heart,
      title: "Beauty in Details",
      description: "We believe that the smallest touches can make the biggest impact. Every magnet is designed to bring a moment of beauty to your everyday life.",
      color: "bg-rose-200"
    },
    {
      icon: Sparkles,
      title: "Quality First",
      description: "High-quality materials, fade-resistant inks, and strong magnets ensure that your purchase will bring joy for years to come.",
      color: "bg-lavender-200"
    },
    {
      icon: Users,
      title: "Customer Joy",
      description: "Your happiness is our success. We're not satisfied until you're absolutely delighted with your magnets and the experience of shopping with us.",
      color: "bg-sage-200"
    }
  ];

  return (
    <section className="py-20 md:py-28 lg:py-36">
      <div className="container-responsive">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <p className="text-rose-500 font-medium text-sm tracking-wide uppercase">Our Values</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800">
            What We Believe In
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Our values guide everything we do, from design to customer service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6">
                <div className={`w-20 h-20 md:w-24 md:h-24 ${feature.color} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500`}>
                  <feature.icon className="h-10 w-10 md:h-12 md:w-12 text-neutral-700" strokeWidth={1.5} />
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-neutral-600 leading-relaxed text-base md:text-lg font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
