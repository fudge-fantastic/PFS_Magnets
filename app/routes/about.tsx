// import type { Route } from "./+types/about";
import { Link } from "react-router";
import { Factory, Palette, Ruler, Shield, Zap, Package } from "lucide-react";

// export function meta({ }: Route.MetaArgs) {
//     return [
//         { title: "About Us - Beautiful Magnets" },
//         { name: "description", content: "Learn about our story, mission, and passion for creating beautiful magnets that bring joy to everyday spaces." },
//     ];
// }

export default function About() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20">
                <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full bg-repeat" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                <div className="relative container-responsive py-16 md:py-20 lg:py-24">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground/80 mb-4 md:mb-6">
                            Professional
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent pb-2">
                                Magnet Manufacturing
                            </span>
                        </h1>

                        <p className="text-base md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                            We are a specialized magnet manufacturing company dedicated to creating high-quality,
                            durable magnets for both personal and commercial use. Using premium materials and
                            precision manufacturing techniques, we deliver magnets that exceed industry standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* Specifications & Sizes Section */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="container-responsive">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground/80 mb-3 md:mb-4">
                            Available Sizes & Specifications
                        </h2>
                        <p className="text-base md:text-xl text-foreground/70 max-w-2xl mx-auto">
                            Choose from our standard sizes or request custom dimensions for your specific needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
                        {/* Size Options */}
                        <div className="bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 shadow-sm border border-border/20 text-center">
                            <Ruler className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                            <h3 className="text-base md:text-lg font-semibold text-foreground/80 mb-2">2.75" × 2.75"</h3>
                            <p className="text-foreground/70 text-xs md:text-sm mb-2">Perfect for small spaces</p>
                            <p className="text-primary font-medium text-sm md:text-base">2-3 lbs pull strength</p>
                        </div>

                        <div className="bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 shadow-sm border border-border/20 text-center">
                            <Ruler className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                            <h3 className="text-base md:text-lg font-semibold text-foreground/80 mb-2">2.75" × 3.5"</h3>
                            <p className="text-foreground/70 text-xs md:text-sm mb-2">Most popular size</p>
                            <p className="text-primary font-medium text-sm md:text-base">4-5 lbs pull strength</p>
                        </div>

                        <div className="bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 shadow-sm border border-border/20 text-center">
                            <Ruler className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                            <h3 className="text-base md:text-lg font-semibold text-foreground/80 mb-2">3.25" × 4"</h3>
                            <p className="text-foreground/70 text-xs md:text-sm mb-2">Great for detailed designs</p>
                            <p className="text-primary font-medium text-sm md:text-base">6-8 lbs pull strength</p>
                        </div>

                        <div className="bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 shadow-sm border border-border/20 text-center">
                            <Ruler className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                            <h3 className="text-base md:text-lg font-semibold text-foreground/80 mb-2">Custom Sizes</h3>
                            <p className="text-foreground/70 text-xs md:text-sm mb-2">Made to order</p>
                            <p className="text-primary font-medium text-sm md:text-base">Varies by size</p>
                        </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="bg-secondary/30 rounded-xl lg:rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-4 md:mb-6 text-center">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div>
                                <h4 className="text-base md:text-lg font-semibold text-foreground/80 mb-3 md:mb-4 flex items-center gap-2">
                                    <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                    Magnetic Properties
                                </h4>
                                <ul className="space-y-2 text-foreground/70 text-sm md:text-base">
                                    <li>• <strong>Core Material:</strong> Neodymium (NdFeB) Grade N42</li>
                                    <li>• <strong>Magnetic Field:</strong> 3,200-4,000 Gauss</li>
                                    <li>• <strong>Operating Temperature:</strong> -40°F to 180°F</li>
                                    <li>• <strong>Corrosion Resistance:</strong> Nickel-plated coating</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-base md:text-lg font-semibold text-foreground/80 mb-3 md:mb-4 flex items-center gap-2">
                                    <Package className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                    Construction Details
                                </h4>
                                <ul className="space-y-2 text-foreground/70 text-sm md:text-base">
                                    <li>• <strong>Print Surface:</strong> High-gloss photo paper (260gsm)</li>
                                    <li>• <strong>Adhesive:</strong> Industrial-grade acrylic</li>
                                    <li>• <strong>Thickness:</strong> 3mm total thickness</li>
                                    <li>• <strong>Edge Finish:</strong> Precision-cut with rounded corners</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manufacturing Process & Materials Section */}
            <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-accent/10 to-primary/10">
                <div className="container-responsive">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground/80 mb-3 md:mb-4">
                            Our Manufacturing Process
                        </h2>
                        <p className="text-base md:text-xl text-foreground/70 max-w-2xl mx-auto">
                            Every magnet is crafted using premium materials and precision manufacturing techniques
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Factory className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-foreground/80 mb-2 md:mb-3">
                                Premium Materials
                            </h3>
                            <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                                We use high-grade <strong>neodymium magnetic cores</strong> with pull strength ratings of
                                2-8 lbs depending on size, ensuring reliable adhesion to any magnetic surface.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Palette className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-foreground/80 mb-2 md:mb-3">
                                UV-Resistant Printing
                            </h3>
                            <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                                Our advanced <strong>UV-cured ink printing process</strong> ensures vibrant, fade-resistant colors
                                that maintain their brilliance for 5+ years under normal indoor conditions.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Shield className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-foreground/80 mb-2 md:mb-3">
                                Protective Coating
                            </h3>
                            <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                                Each magnet receives a <strong>scratch-resistant polymer coating</strong> that protects against
                                moisture, fingerprints, and daily wear while maintaining easy cleaning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="container-responsive text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground/80 mb-3 md:mb-4">
                        Ready to Order Professional Magnets?
                    </h2>
                    <p className="text-base md:text-xl text-foreground/70 mb-6 md:mb-8">
                        Browse our catalog of professionally manufactured magnets or contact us for custom orders,
                        bulk pricing, and specialized requirements.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                        <Link
                            to="/gallery"
                            className="bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200"
                        >
                            View Product Catalog
                        </Link>
                        <Link
                            to="/contact"
                            className="border-2 border-primary/20 text-foreground/80 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                        >
                            Request Quote
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
