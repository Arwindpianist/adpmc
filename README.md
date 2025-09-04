# ADPMC - Arwind Pianist's Portfolio Website

A modern, responsive portfolio website showcasing projects and skills with dynamic project previews.

## Features

### 🚀 Dynamic Project Previews
- **Automatic Screenshot Generation**: Uses Puppeteer to generate live previews of deployed projects
- **Real-time Updates**: Screenshots are generated on-demand and cached for performance
- **Fallback Handling**: Graceful fallback when screenshots are unavailable

### 📊 GitHub Integration
- **Automatic Repository Fetching**: Fetches all GitHub repositories with descriptions
- **Latest Projects First**: Sorts projects by update date to show the most recent work
- **Smart Filtering**: Excludes deployed projects from GitHub list to avoid duplication

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful glass-like card effects
- **Responsive Layout**: Works perfectly on all device sizes
- **Particle Background**: Interactive particle system for visual appeal
- **Smooth Animations**: Hover effects and transitions

### 🌐 Deployed Projects Showcase
- **Live Previews**: Each deployed project shows a live screenshot
- **Direct Links**: Easy access to both live sites and GitHub repositories
- **Project Descriptions**: Detailed information about each project

## Projects Included

### Deployed Projects
1. **AS Kitchen** - Restaurant website showcasing services and menu
2. **PogoPass** - Password manager official website
3. **KMTCS** - Official services and information website
4. **TypeScript Tutor** - Interactive TypeScript learning platform
5. **Sunrise 2025** - Modern web application with innovative design
6. **GridHealth** - Enterprise system health monitoring platform

### GitHub Projects
- Automatically fetched from GitHub API
- Sorted by latest updates
- Only shows repositories with descriptions

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Animations**: Framer Motion, TSParticles
- **Screenshots**: Puppeteer
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd adpmc
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## API Endpoints

### `/api/screenshot`
Generates screenshots of websites using Puppeteer.

**Query Parameters:**
- `url` (required): The website URL to screenshot

**Example:**
```
GET /api/screenshot?url=https://example.com
```

## Configuration

### Next.js Config
The project includes optimized configuration for:
- Puppeteer integration
- Image optimization
- External domain handling

### Environment Variables
Create a `.env.local` file for any environment-specific configurations.

## Performance Features

- **Image Optimization**: Next.js Image component with automatic optimization
- **Caching**: Screenshots cached for 1 hour to reduce API calls
- **Lazy Loading**: Components loaded dynamically for better performance
- **Static Generation**: Pages pre-rendered for faster loading

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

- **Website**: [arwindpianist.store](https://arwindpianist.store)
- **GitHub**: [@Arwindpianist](https://github.com/Arwindpianist)
