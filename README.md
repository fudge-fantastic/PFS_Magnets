# PFS Magnets - E-commerce Website

A beautiful, minimalist e-commerce website for custom fridge magnets, featuring a calm aesthetic with soft neutrals and pastel colors.

## 🎨 Design Philosophy

This website embraces a **minimalist pastel aesthetic** designed to create a calm, inviting shopping experience:

- **Soft Neutrals & Pastels**: Beige, dusty rose, pale sage, and soft lavender
- **Generous Spacing**: Ample breathing room for comfortable browsing
- **Smooth Animations**: Gentle transitions and hover effects
- **Glass Morphism**: Modern, premium feel with backdrop blur effects
- **Rounded Shapes**: Soft, organic forms throughout (rounded-3xl, rounded-full)

## ✨ Features

- 🎨 **Minimalist Pastel Design** - Calm, aesthetically beautiful UI/UX
- 🛍️ **Product Gallery** - Spacious grid with elegant product cards
- � **Advanced Filtering** - Easy-to-use sidebar with category and search filters
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Performance Optimized** - Fast loading with lazy loading images
- ♿ **Accessible** - WCAG compliant with proper focus states
- 🎭 **Smooth Animations** - Fade-in, scale, and hover lift effects
- 🌟 **Premium Feel** - Glass effects and soft shadows throughout

## � Tech Stack

- **Framework**: React Router v7
- **Styling**: TailwindCSS with custom pastel theme
- **Typography**: Inter + Poppins fonts
- **Icons**: Lucide React
- **Animations**: CSS custom animations
- **Build Tool**: Vite

## 📋 Documentation

Comprehensive documentation has been created for this redesign:

- **[QUICK_START.md](./QUICK_START.md)** - Getting started guide
- **[REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md)** - Complete redesign overview
- **[COLOR_PALETTE.md](./COLOR_PALETTE.md)** - Detailed color system
- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Component patterns and examples
- **[DESIGN_COMPARISON.md](./DESIGN_COMPARISON.md)** - Before/after analysis
- **[CHECKLIST.md](./CHECKLIST.md)** - Implementation checklist

## 🎯 Quick Start

## 🎯 Quick Start

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

Visit the following pages to see the new design:
- **Home**: `http://localhost:5173/`
- **Gallery**: `http://localhost:5173/gallery`
- **Contact**: `http://localhost:5173/contact`

## 🎨 Color Palette

The design uses a carefully curated palette of soft neutrals and pastels:

```
Soft Beige:     #f7f5f2  (Primary background)
Dusty Rose:     #d97583  (Primary accent)
Pale Sage:      #8aa88a  (Secondary accent)
Soft Lavender:  #9d8ec4  (Tertiary accent)
Cream:          #fffcf5  (Warm neutral)
Neutral Gray:   #262626  (Text)
```

## 🧩 Key Components

### Navigation
- Glass morphism with backdrop blur
- Rounded pill navigation items
- Gradient logo badge
- Smooth mobile menu

### Hero Section
- Large gradient text
- Decorative blurred circles
- Trust badges with statistics
- Multiple CTA buttons

### Product Cards
- 3-column spacious grid
- Glass card design
- Pastel gradient backgrounds
- Hover lift effects
- Rounded-full buttons

### Filter Sidebar
- Clean, minimal design
- Rose accent highlights
- Rounded-2xl containers
- Enhanced spacing

## 📱 Responsive Design

Optimized for all screen sizes:
- **Mobile**: < 640px - Single column, touch-optimized
- **Tablet**: 640px - 1024px - Two columns
- **Desktop**: 1024px+ - Three columns with sidebar

## 🎭 Animations

Custom animations for enhanced UX:
- `fade-in-up` - Entry animations
- `scale-in` - Scale entry animations
- `float` - Floating badge animations
- `pulse-soft` - Gentle pulsing
- `hover-lift` - Card lift on hover

## 🛠️ Customization

### Changing Primary Color

Edit `app/app.css` to change the primary accent:

```css
--color-rose-500: #d97583;  /* Your color here */
```

### Adjusting Spacing

The design uses generous spacing. Modify in components:

```jsx
// Section spacing
className="py-20 md:py-28 lg:py-36"

// Card padding
className="p-6"
```

### Custom Animations

Add new animations in `app/app.css`:

```css
@keyframes your-animation {
  /* Animation keyframes */
}
```

## Building for Production

Create a production build:

```bash
npm run build
```

## 📦 Project Structure

```
app/
├── components/          # React components
│   ├── home/           # Home page components
│   ├── gallery/        # Gallery page components
│   ├── ui/             # UI components
│   ├── Navigation.tsx  # Main navigation
│   ├── Footer.tsx      # Footer component
│   └── Button.tsx      # Button component
├── routes/             # Page routes
├── app.css            # Global styles & custom theme
└── root.tsx           # Root layout

docs/                   # Documentation
public/                # Static assets
build/                 # Production build output
```

## 🎯 Design Principles

1. **Calm & Minimalist** - Reduced visual noise, focus on content
2. **Soft & Inviting** - Pastel colors, rounded shapes
3. **Spacious** - Generous padding and margins
4. **Smooth** - Gentle animations and transitions
5. **Accessible** - WCAG compliant with proper contrast

## 🔧 Tech Details

- **Server-side rendering** for better SEO
- **Hot Module Replacement** for fast development
- **TypeScript** for type safety
- **Tailwind CSS** with custom theme
- **Optimized images** with lazy loading
- **Glass morphism** effects with backdrop-filter

## 🚀 Performance

- Fast initial page load
- Optimized bundle size
- Lazy loaded images
- GPU-accelerated animations
- Minimal re-renders

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- ARIA labels where needed
- Sufficient color contrast (WCAG AA)
- Focus indicators on interactive elements

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

Built with ❤️ by Pixel Forge Studio

---

## 🎉 What's New in the Redesign

### Visual Updates
✨ Complete pastel color scheme
✨ Glass morphism effects
✨ Soft shadows and rounded corners
✨ Gradient backgrounds and text
✨ Enhanced spacing throughout

### Component Updates
✨ Redesigned navigation with glass effect
✨ New hero section with decorative elements
✨ Color-coded category cards
✨ Spacious product grid (3-column)
✨ Clean filter sidebar
✨ Updated footer with icons

### Animations
✨ Fade-in-up entry animations
✨ Smooth hover lift effects
✨ Floating badge animations
✨ Staggered component reveals
✨ Image zoom on hover

### User Experience
✨ Improved visual hierarchy
✨ Better touch targets
✨ Enhanced hover states
✨ Clearer CTAs
✨ More intuitive navigation

---

For detailed information about the redesign, see [REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md)

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
