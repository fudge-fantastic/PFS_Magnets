import type { Route } from "./+types/contact";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
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
import { api, type Inquiry } from "~/lib/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - Beautiful Magnets" },
    { name: "description", content: "Get in touch with us for custom magnet orders, questions, or support. We're here to help bring your ideas to life." },
  ];
}

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    subject: '',
    message: '',
    subscribe_newsletter: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate message length
    if (formData.message.length < 10) {
      setError('Message must be at least 10 characters long');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const inquiry: Inquiry = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number || undefined,
        subject: formData.subject,
        message: formData.message,
        subscribe_newsletter: formData.subscribe_newsletter
      };

      const response = await api.submitInquiry(inquiry);

      if (response.success) {
        // Inquiry saved to database successfully
        const referenceId = response.data.reference_id;

        // Send emails via SMTP (don't fail if emails fail)
        try {
          const emailResponse = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...inquiry,
              reference_id: referenceId
            })
          });

          if (!emailResponse.ok) {
            console.warn('Email sending failed, but inquiry was saved');
          }
        } catch (emailError) {
          console.warn('Email sending error:', emailError);
          // Don't fail the whole process if email fails
        }

        setSuccess(true);
        setReferenceId(referenceId);
        // Reset form
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          subject: '',
          message: '',
          subscribe_newsletter: false
        });
      } else {
        setError(response.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact form error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
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

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-green-800 font-semibold">Message sent successfully!</p>
                      <p className="text-green-700 text-sm mt-1">
                        Your inquiry has been submitted. Reference ID: <span className="font-mono font-bold">{referenceId}</span>
                      </p>
                      <p className="text-green-600 text-sm mt-1">
                        We'll get back to you within 2-4 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-rose-600 mt-0.5" />
                    <div>
                      <p className="text-rose-800 font-semibold">Error</p>
                      <p className="text-rose-700 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="Rahul"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                      disabled={loading}
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
                      value={formData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                      disabled={loading}
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
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-2">
                    Subject *
                  </label>
                  <Select
                    required
                    value={formData.subject}
                    onValueChange={(value) => handleInputChange('subject', value)}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-full border-beige-200 focus:border-rose-300 focus:ring-rose-300/50">
                      <SelectValue placeholder="Choose a subject..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Custom Order Request">Custom Order Request</SelectItem>
                      <SelectItem value="Product Inquiry">Product Inquiry</SelectItem>
                      <SelectItem value="Bulk Order">Bulk Order</SelectItem>
                      <SelectItem value="Customer Support">Customer Support</SelectItem>
                      <SelectItem value="Partnership Inquiry">Partnership Inquiry</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
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
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="border-beige-200 focus:border-rose-300 focus:ring-rose-300/50"
                    disabled={loading}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="newsletter"
                    checked={formData.subscribe_newsletter}
                    onCheckedChange={(checked) => handleInputChange('subscribe_newsletter', checked as boolean)}
                    disabled={loading}
                  />
                  <label htmlFor="newsletter" className="text-sm text-neutral-700 cursor-pointer">
                    Subscribe to our newsletter for updates on new products and special offers
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-soft-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
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
