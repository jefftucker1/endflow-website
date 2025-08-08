# Endflow Website

A high-converting, AI-optimized landing page for Endflow's GTM data platform built with Next.js 14, featuring comprehensive tracking, Strapi CMS integration, and modern design.

## 🚀 Features

### Core Features
- **Modern Landing Page** with hero, value props, and conversion-optimized CTAs
- **Pricing Page** with credit-based tiers and 10k free credits offer
- **Product Roadmap** showing Jobs → Companies → People timeline
- **Authentication Pages** (signup/login) with tracking integration
- **Documentation Hub** with API guides and integrations
- **Blog System** with Strapi CMS integration and fallback content

### Technical Features
- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** with Shadcn/ui components
- **Framer Motion** animations and micro-interactions
- **Comprehensive Tracking** (GA4, Facebook, LinkedIn, X, Reddit, Product Hunt, RB2B)
- **GDPR Compliance** with consent management
- **SEO Optimized** for AI crawlers and search engines
- **Mobile-First** responsive design
- **Performance Optimized** with Core Web Vitals focus

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd endflow-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your tracking IDs and API keys:
   ```env
   # Analytics and Tracking
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1234567890123456
   NEXT_PUBLIC_LINKEDIN_PARTNER_ID=1234567
   NEXT_PUBLIC_TWITTER_PIXEL_ID=o1234
   NEXT_PUBLIC_REDDIT_PIXEL_ID=t2_xxxxxxxx
   NEXT_PUBLIC_PRODUCTHUNT_PIXEL_ID=ph_xxxxxxxxxxxxxx
   NEXT_PUBLIC_RB2B_PIXEL_ID=rb2b_xxxxxxxxxxxxxx
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=12345678
   
   # Strapi CMS (optional)
   STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_strapi_api_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Primary**: Pure Black (#000000)
- **Secondary**: Pure White (#FFFFFF)
- **Accent**: Near Black (#18181B)
- **Success**: Green (#22C55E) for CTAs
- **Gray Scale**: Zinc palette from Tailwind

### Typography
- **Primary**: Inter (clean, modern, readable)
- **Code**: JetBrains Mono
- **Headings**: Font weights 600-800
- **Body**: Font weight 400-500

### Components
- **Buttons**: Rounded corners (8px), generous padding
- **Cards**: Subtle shadows, clean borders
- **Inputs**: Minimal style, clear focus states

## 📊 Tracking & Analytics

The website includes comprehensive tracking across multiple platforms:

### Implemented Pixels
- **Google Analytics 4** - Core web analytics
- **Facebook/Meta Pixel** - Social media advertising
- **LinkedIn Insight Tag** - B2B advertising and attribution
- **X (Twitter) Pixel** - Social media conversion tracking
- **Reddit Pixel** - Community-driven traffic attribution
- **Product Hunt Pixel** - Launch and community tracking
- **RB2B Pixel** - Account identification and visitor tracking
- **HubSpot Tracking** - CRM and marketing automation

### Key Events Tracked
- Page views with UTM attribution
- Signup flow (started, completed)
- Credits claimed (10k free credits)
- Demo requests and completions
- Blog post engagement
- Pricing page views
- Contact form submissions
- Export completions (CSV, webhook, Clay)

### GDPR Compliance
- Consent banner with granular preferences
- Cookie categorization (necessary, analytics, marketing, personalization)
- Opt-out mechanisms for each tracking platform
- Privacy policy integration

## 📝 Content Management

### Strapi CMS Integration
The blog system is designed to work with Strapi CMS but includes fallback content:

#### Content Types
- **Blog Posts**: Title, slug, excerpt, content, featured image, author, categories
- **Authors**: Name, bio, avatar, social links
- **Categories**: Name, slug, description, color

#### Fallback System
If Strapi is not available, the blog displays demo content with:
- Sample blog posts about GTM strategies
- Author profiles and bios
- Category organization
- Full responsive design

### Setting up Strapi (Optional)
1. Install and configure Strapi CMS
2. Create the content types as defined in `src/lib/strapi.ts`
3. Add your Strapi URL and API token to environment variables
4. The blog will automatically switch to live content

## 🔧 Configuration

### Environment Variables
All tracking pixels and integrations are controlled via environment variables. Set these in your deployment platform:

#### Required for Tracking
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` - Facebook/Meta Pixel
- `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` - LinkedIn Insight Tag
- `NEXT_PUBLIC_TWITTER_PIXEL_ID` - X/Twitter Pixel
- `NEXT_PUBLIC_REDDIT_PIXEL_ID` - Reddit Pixel
- `NEXT_PUBLIC_PRODUCTHUNT_PIXEL_ID` - Product Hunt
- `NEXT_PUBLIC_RB2B_PIXEL_ID` - RB2B Account Identification
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` - HubSpot Integration

#### Optional for CMS
- `STRAPI_URL` - Strapi CMS endpoint
- `STRAPI_API_TOKEN` - Strapi API authentication

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The site can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Heroku

### Build Commands
```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📱 Pages & Routes

### Main Pages
- `/` - Landing page with hero, value props, features
- `/pricing` - Credit-based pricing tiers
- `/roadmap` - Product roadmap (Jobs → Companies → People)
- `/signup` - User registration with 10k credits offer
- `/login` - User authentication
- `/docs` - Documentation and API guides

### Blog System
- `/blog` - Blog listing with categories and search
- `/blog/[slug]` - Individual blog posts
- `/blog/category/[category]` - Category archives (future)
- `/blog/author/[author]` - Author pages (future)

### Utility Pages
- `/privacy` - Privacy policy (placeholder)
- `/terms` - Terms of service (placeholder)
- `/contact` - Contact information (placeholder)

## 🎯 SEO Optimization

### Technical SEO
- **Sitemap.xml** - Auto-generated for all pages
- **Robots.txt** - Optimized for AI crawlers (GPTBot, ClaudeBot, etc.)
- **Meta Tags** - Dynamic titles and descriptions
- **Open Graph** - Social media sharing optimization
- **Twitter Cards** - Rich social media previews
- **JSON-LD** - Structured data for search engines

### AI Crawler Optimization
Special permissions for AI crawlers:
- GPTBot (OpenAI)
- ClaudeBot (Anthropic)
- ChatGPT-User
- CCBot
- anthropic-ai
- Claude-Web

### Performance
- **Core Web Vitals** optimized
- **Image optimization** with Next.js Image component
- **Font optimization** with next/font
- **Code splitting** and lazy loading
- **Minimal JavaScript** for fast loading

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Mobile responsiveness on all devices
- [ ] Form submissions work (signup, login, contact)
- [ ] Tracking pixels fire correctly
- [ ] GDPR consent flow functions
- [ ] Blog content displays (with/without Strapi)
- [ ] All CTAs link to correct destinations
- [ ] SEO meta tags are correct

### Browser Testing
- Chrome (desktop/mobile)
- Safari (desktop/mobile)
- Firefox (desktop/mobile)
- Edge (desktop)

## 🔍 Performance Monitoring

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Monitoring Tools
- Google PageSpeed Insights
- Lighthouse CI
- Vercel Analytics
- Core Web Vitals extension

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

For technical support or questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation at `/docs`

## 📈 Analytics & Tracking

The website includes comprehensive tracking for:
- **User behavior** and engagement metrics
- **Conversion tracking** across the entire funnel
- **Attribution modeling** with UTM parameters
- **A/B testing** capabilities for optimization
- **Real-time monitoring** of key metrics

All tracking is GDPR compliant with user consent management.

---

Built with ❤️ for Endflow's GTM platform launch.