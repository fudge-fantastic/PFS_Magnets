import {
  Camera,
  Palette as PaletteIcon,
  Gift,
  Home,
  Baby,
  Calendar,
  GraduationCap,
  Users,
  MapPin,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export function ProductAccordion() {
  return (
    <div className="pt-2">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="moments" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
          <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
            <div className="flex items-center gap-3">
              <Camera className="h-5 w-5 text-rose-500" />
              Capture Your Cherished Moments Forever
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-neutral-700 leading-relaxed">
            <p className="mb-4">
              Turn your favorite photos into stunning custom photo magnets, perfectly designed to showcase the moments you hold dear. From family vacations to baby milestones and unforgettable graduations, our personalized photo magnets make it easy to transform digital memories into physical keepsakes that you can see every day.
            </p>
            <p>
              Our high-quality magnets are crafted to be vibrant and durable, ensuring your special moments stay vivid for years.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
          <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
            <div className="flex items-center gap-3">
              <PaletteIcon className="h-5 w-5 text-lavender-500" />
              Why You'll Love Them
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-neutral-700">
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0"></div>
                <span>Custom-made from your photos</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0"></div>
                <span>Vibrant colors and sharp details</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0"></div>
                <span>Long-lasting, high-quality finish</span>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gifts" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
          <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
            <div className="flex items-center gap-3">
              <Gift className="h-5 w-5 text-sage-500" />
              Gifts for Any Occasion
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-neutral-700 leading-relaxed">
            <p className="mb-4">
              Looking for a unique gift that shows how much you care? Our custom photo magnets are the perfect choice for birthdays, anniversaries, weddings, or any special occasion. Surprise your loved ones with a heartfelt gift that brings a smile every time they see it.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-800 mb-2">Great Gift Ideas:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Baby className="h-4 w-4 text-rose-500" />
                  <span>Baby announcements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-rose-500" />
                  <span>Save the date for weddings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-rose-500" />
                  <span>Holiday and family photo gifts</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-rose-500" />
                  <span>Graduation and milestone keepsakes</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="decor" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
          <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
            <div className="flex items-center gap-3">
              <Home className="h-5 w-5 text-lavender-500" />
              Stylish Home Decor with a Personal Touch
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-neutral-700 leading-relaxed">
            <p className="mb-4">
              Enhance your home decor with personalized photo magnets that add a unique and sentimental touch to any space. Whether it's your kitchen fridge, a magnetic board, or any metal surface.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-800 mb-2">Perfect for Decorating:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-300 rounded-full flex-shrink-0"></div>
                  <span>Fridge photo displays</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-300 rounded-full flex-shrink-0"></div>
                  <span>Magnetic office boards</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-300 rounded-full flex-shrink-0"></div>
                  <span>Family memory walls</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-300 rounded-full flex-shrink-0"></div>
                  <span>Holiday decorations</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shipping" className="bg-white rounded-2xl px-6 border border-beige-200/50 shadow-soft">
          <AccordionTrigger className="text-lg font-semibold text-neutral-800 hover:text-rose-500">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-sage-500" />
              Made and Shipped from India!
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-neutral-700 leading-relaxed">
            <p className="mb-4">
              Crafted in India by Pixel Forge Studio, your magnets start production the same day you order.
            </p>
            <p>
              With swift processing and reliable tracked shipping across India, your purchase will be at your door in 3-7 business days. Express delivery available for major cities.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
