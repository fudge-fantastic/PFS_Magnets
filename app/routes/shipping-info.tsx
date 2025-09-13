export function meta() {
  return [
    { title: "Shipping Information - PFS Magnets | Pixel Forge Studio" },
    { name: "description", content: "Shipping information for PFS Magnets by Pixel Forge Studio. Learn about our delivery options, timelines, and shipping policies across India." },
  ];
}

export default function ShippingInfo() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-responsive py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground/80 mb-4">
              Shipping Information
            </h1>
            <p className="text-lg text-foreground/70">
              Fast, reliable delivery of your custom magnets across India
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Quick Info Cards */}
            <div className="bg-card rounded-lg p-6 border border-border/20">
              <h3 className="text-xl font-semibold mb-4 text-primary">📦 Standard Delivery</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• 3-7 business days within India</li>
                <li>• Free shipping on orders above ₹999</li>
                <li>• Tracking provided for all orders</li>
                <li>• Secure packaging guaranteed</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border/20">
              <h3 className="text-xl font-semibold mb-4 text-primary">⚡ Express Delivery</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• 1-3 business days (major cities)</li>
                <li>• Available for urgent orders</li>
                <li>• Additional charges apply</li>
                <li>• Same-day delivery in Pune*</li>
              </ul>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-foreground/80">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Shipping Areas and Timeline</h2>
              
              <h3 className="text-xl font-medium mb-3">Local Delivery (Maharashtra)</h3>
              <div className="bg-card rounded-lg p-6 border border-border/20 mb-4">
                <ul className="space-y-2">
                  <li><strong>Pune, Pimpri-Chinchwad:</strong> 1-2 business days (Same-day available)</li>
                  <li><strong>Mumbai, Nashik, Aurangabad:</strong> 2-3 business days</li>
                  <li><strong>Other Maharashtra cities:</strong> 3-4 business days</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium mb-3">Metro Cities</h3>
              <div className="bg-card rounded-lg p-6 border border-border/20 mb-4">
                <ul className="space-y-2">
                  <li><strong>Delhi NCR, Bangalore, Chennai, Hyderabad:</strong> 3-5 business days</li>
                  <li><strong>Kolkata, Ahmedabad, Jaipur, Lucknow:</strong> 4-6 business days</li>
                  <li><strong>Express delivery available</strong> for all metro cities</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium mb-3">Tier 2 & Tier 3 Cities</h3>
              <div className="bg-card rounded-lg p-6 border border-border/20 mb-4">
                <ul className="space-y-2">
                  <li><strong>Major tier 2 cities:</strong> 5-7 business days</li>
                  <li><strong>Smaller cities and towns:</strong> 6-10 business days</li>
                  <li><strong>Remote areas:</strong> 8-12 business days</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Shipping Costs</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border/20 rounded-lg">
                  <thead className="bg-secondary/20">
                    <tr>
                      <th className="border border-border/20 p-4 text-left">Order Value</th>
                      <th className="border border-border/20 p-4 text-left">Standard Shipping</th>
                      <th className="border border-border/20 p-4 text-left">Express Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border/20 p-4">Below ₹999</td>
                      <td className="border border-border/20 p-4">₹99 - ₹149</td>
                      <td className="border border-border/20 p-4">₹199 - ₹299</td>
                    </tr>
                    <tr className="bg-secondary/10">
                      <td className="border border-border/20 p-4">₹999 and above</td>
                      <td className="border border-border/20 p-4 text-green-600 font-semibold">FREE</td>
                      <td className="border border-border/20 p-4">₹149 - ₹199</td>
                    </tr>
                    <tr>
                      <td className="border border-border/20 p-4">Bulk orders (25+ pieces)</td>
                      <td className="border border-border/20 p-4 text-green-600 font-semibold">FREE</td>
                      <td className="border border-border/20 p-4">₹99 - ₹149</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="mt-4 text-sm text-foreground/60">
                *Shipping costs may vary based on weight, dimensions, and delivery location. 
                Final shipping charges will be calculated at checkout.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Shipping Partners</h2>
              <p className="mb-4">
                We work with trusted courier partners to ensure safe and timely delivery:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Blue Dart:</strong> Express delivery and metro cities</li>
                <li><strong>DTDC:</strong> Standard delivery across India</li>
                <li><strong>Delhivery:</strong> Comprehensive coverage including remote areas</li>
                <li><strong>India Post:</strong> Government postal service for remote locations</li>
                <li><strong>Local couriers:</strong> Same-day delivery in Pune area</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Packaging and Handling</h2>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>All magnets are individually wrapped in protective material</li>
                <li>Sturdy packaging to prevent damage during transit</li>
                <li>Eco-friendly packaging materials whenever possible</li>
                <li>Fragile stickers and handling instructions for couriers</li>
                <li>Custom packaging available for bulk orders</li>
                <li>Gift wrapping services available upon request</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Tracking number provided via SMS and email</li>
                <li>Real-time tracking updates on courier websites</li>
                <li>WhatsApp notifications for delivery updates</li>
                <li>Expected delivery date communicated at dispatch</li>
                <li>Customer support for tracking assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
              <div className="bg-card rounded-lg p-6 border border-border/20">
                <h3 className="text-lg font-medium mb-3">Available Countries</h3>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><strong>USA, UK, Canada, Australia:</strong> 10-15 business days</li>
                  <li><strong>UAE, Saudi Arabia, Singapore:</strong> 7-12 business days</li>
                  <li><strong>Other countries:</strong> 15-21 business days</li>
                </ul>
                
                <h3 className="text-lg font-medium mb-3">International Shipping Costs</h3>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Starting from ₹899 for small orders</li>
                  <li>Calculated based on weight and destination</li>
                  <li>Customs duties and taxes not included</li>
                  <li>Express international shipping available</li>
                </ul>
                
                <p className="text-sm text-foreground/60">
                  Note: International shipping may require additional documentation and 
                  is subject to customs regulations of the destination country.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Special Delivery Services</h2>
              
              <h3 className="text-xl font-medium mb-3">Same-Day Delivery (Pune Area)</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Available within 15 km radius of our studio</li>
                <li>Orders placed before 2 PM for same-day delivery</li>
                <li>Additional charges: ₹199 - ₹299</li>
                <li>Perfect for urgent gifts or events</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Scheduled Delivery</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Choose specific delivery dates for gifts</li>
                <li>Available for major cities</li>
                <li>Perfect for birthdays, anniversaries, events</li>
                <li>Additional charges may apply</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Bulk Order Delivery</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Special handling for orders above 100 pieces</li>
                <li>Multiple delivery addresses supported</li>
                <li>Corporate delivery scheduling</li>
                <li>Dedicated customer support</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Delivery Issues and Solutions</h2>
              
              <h3 className="text-xl font-medium mb-3">Failed Delivery Attempts</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>3 delivery attempts made by courier partners</li>
                <li>SMS/call notifications before each attempt</li>
                <li>Package held at local courier office after failed attempts</li>
                <li>7-day holding period before return to sender</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Damaged or Lost Packages</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Full insurance coverage on all shipments</li>
                <li>Immediate replacement for damaged items</li>
                <li>Investigation process for lost packages</li>
                <li>Refund or replacement within 7 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>No shipping to PO Box addresses</li>
                <li>Remote areas may have extended delivery times</li>
                <li>Some areas may not be serviceable by express delivery</li>
                <li>International shipping subject to customs regulations</li>
                <li>Magnets may be restricted in certain countries due to magnetic materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact for Shipping Support</h2>
              <div className="bg-card rounded-lg p-6 border border-border/20">
                <h3 className="text-lg font-medium mb-3">Pixel Forge Studio - Shipping Department</h3>
                <p className="mb-2"><strong>Email:</strong> shipping@pixelforgestudio.in</p>
                <p className="mb-2"><strong>Phone:</strong> +91 7219846935</p>
                <p className="mb-2"><strong>WhatsApp:</strong> +91 7219846935</p>
                <p className="mb-2"><strong>Support Hours:</strong> Monday-Saturday, 9:00 AM - 6:00 PM IST</p>
                <p className="mb-4"><strong>Address:</strong> Raga Homes in Chikhali, Newale Wasti, Chikhali, Vitthal Nagar, Pimpri-Chinchwad, Maharashtra 411062, India</p>
                
                <div className="bg-primary/10 rounded-lg p-4 mt-4">
                  <p className="text-sm">
                    <strong>Need urgent delivery?</strong> Call us directly for same-day or express delivery options. 
                    We'll do our best to accommodate your timeline!
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Holiday and Festival Shipping</h2>
              <p className="mb-4">
                During Indian festivals and holidays, shipping timelines may be extended:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Diwali, Dussehra, Holi:</strong> +2-3 additional days</li>
                <li><strong>Christmas, New Year:</strong> +1-2 additional days</li>
                <li><strong>Regional festivals:</strong> May affect local deliveries</li>
                <li><strong>Monsoon season:</strong> Possible delays in certain regions</li>
              </ul>
              <p className="text-sm text-foreground/60">
                We recommend placing orders early during festival seasons to ensure timely delivery.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}