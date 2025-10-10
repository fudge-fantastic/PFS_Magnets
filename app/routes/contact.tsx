import type { Route } from "./+types/contact";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - Beautiful Magnets" },
    { name: "description", content: "Get in touch with us for custom magnet orders, questions, or support. We're here to help bring your ideas to life." },
  ];
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-beige-50">
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info & Hours */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-800 mb-8">
                Let's Create Something Amazing Together
              </h2>
              
              <div className="space-y-8">
                <div>
                  <p className="text-neutral-700 leading-relaxed text-lg mb-6">
                    Whether you're looking for custom magnets, have questions about our products, 
                    or want to discuss a bulk order, we're here to help. Our team is passionate 
                    about creating beautiful, high-quality magnets that exceed your expectations.
                  </p>
                </div>

                {/* Response Time */}
                <div className="bg-gradient-to-br from-rose-50 to-lavender-50 rounded-3xl p-6 border border-rose-200/50 shadow-soft">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">Quick Response Guarantee</h3>
                  <p className="text-neutral-700">
                    We typically respond to all inquiries within 2-4 hours during business hours. 
                    For urgent requests, please call us directly at +91 7219846935.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 border border-beige-200/50 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <Send className="h-6 w-6 text-rose-500" />
                <h3 className="text-2xl font-semibold text-neutral-800">
                  Send us a message
                </h3>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="Rahul"
                      className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="Sharma"
                      className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="rahul.sharma@gmail.com"
                    className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-2">
                    Subject *
                  </label>
                  <Select required>
                    <SelectTrigger className="w-full border-beige-200 focus:border-rose-300 focus:ring-rose-300/50">
                      <SelectValue placeholder="Choose a subject..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom-order">Custom Order Request</SelectItem>
                      <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                      <SelectItem value="bulk-order">Bulk Order</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-2">
                    Message *
                  </label>
                  <Textarea
                    rows={5}
                    required
                    placeholder="I am looking for custom wedding invitation magnets for 50 guests. Can you help me design something beautiful with our photo and wedding details? Please let me know the pricing and timeline."
                    className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-soft-lg flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>

                <p className="text-xs text-neutral-600 text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-beige-50 to-rose-50/30">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Get answers to common questions about our custom magnets and services
            </p>
          </div>

          <Accordion type="single" className="space-y-4" collapsible>
            <AccordionItem value="materials" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
              <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
                What materials are your magnets made from?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                Our magnets are made from high-quality materials including durable magnetic backing, 
                weather-resistant coating, and high-quality printing surfaces. They're designed to last 
                for years while maintaining their vibrant colors and strong magnetic hold.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="customization" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
              <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
                Can I create custom magnets with my own photos?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                Absolutely! Our photo magnets are our specialty. Simply upload your favorite photos, 
                and we'll print them on high-quality magnetic material. We accept various file formats 
                including JPG, PNG, and PDF. For best results, we recommend high-resolution images.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sizes" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
              <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
                What sizes are available for magnets?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                We offer multiple sizes to fit your needs: 2"x2", 3"x3", 4"x4", and 4"x6" rectangles. 
                Our fridge magnets come in standard sizes, while photo magnets can be customized to 
                various dimensions. Contact us for special size requests.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
              <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
                How long does shipping take?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                Standard shipping takes 5-7 business days within the US. We also offer express 
                shipping (2-3 days) and next-day delivery for urgent orders. International 
                shipping is available and typically takes 10-14 business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bulk-orders" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
              <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
                Do you offer discounts for bulk orders?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                Yes! We offer attractive discounts for bulk orders: 10% off for 25+ magnets, 
                15% off for 50+ magnets, and 20% off for 100+ magnets. Perfect for businesses, 
                events, or large family gatherings. Contact us for custom quotes on larger orders.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
              <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
                What's your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                We offer a 30-day satisfaction guarantee. If you're not completely happy with your 
                magnets, you can return them for a full refund or exchange. Custom photo magnets 
                can be returned if there's a quality issue or printing error on our end.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
