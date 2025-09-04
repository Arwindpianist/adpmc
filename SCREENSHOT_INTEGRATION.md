# Screenshot Integration Guide

This project currently uses custom SVG previews for deployed projects. If you want to integrate real screenshot services, here are some options:

## Available Screenshot Services

### 1. ScreenshotAPI (Recommended)
- **URL**: https://screenshotapi.net/
- **Pricing**: Free tier available, paid plans for higher usage
- **Features**: High-quality screenshots, multiple formats, custom viewports

**Integration:**
```typescript
// In app/api/screenshot/route.ts
async function getScreenshotUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.screenshotapi.net/screenshot?url=${encodeURIComponent(url)}&token=YOUR_API_KEY`);
    if (response.ok) {
      const data = await response.json();
      return data.screenshot;
    }
    return null;
  } catch (error) {
    console.error('Error fetching screenshot:', error);
    return null;
  }
}
```

### 2. Browserless
- **URL**: https://www.browserless.io/
- **Pricing**: Free tier available, paid plans for higher usage
- **Features**: Headless Chrome, multiple APIs, Docker support

**Integration:**
```typescript
async function getScreenshotUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch('https://chrome.browserless.io/screenshot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BROWSERLESS_TOKEN}`
      },
      body: JSON.stringify({
        url: url,
        viewport: { width: 1200, height: 800 }
      })
    });
    
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      return `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`;
    }
    return null;
  } catch (error) {
    console.error('Error fetching screenshot:', error);
    return null;
  }
}
```

### 3. Cloudinary
- **URL**: https://cloudinary.com/
- **Pricing**: Free tier available, paid plans for higher usage
- **Features**: Image transformation, CDN, multiple formats

**Integration:**
```typescript
async function getScreenshotUrl(url: string): Promise<string | null> {
  try {
    const cloudinaryUrl = `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/fetch/w_1200,h_800,f_auto/${encodeURIComponent(url)}`;
    return cloudinaryUrl;
  } catch (error) {
    console.error('Error generating Cloudinary URL:', error);
    return null;
  }
}
```

### 4. Self-Hosted Solution
You can also host your own screenshot service using:
- **Puppeteer** with Docker
- **Playwright** with Docker
- **Selenium** with Docker

## Environment Variables

Add these to your `.env.local` file:

```env
# ScreenshotAPI
SCREENSHOT_API_KEY=your_api_key_here

# Browserless
BROWSERLESS_TOKEN=your_token_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Implementation Steps

1. **Choose a service** from the options above
2. **Sign up** and get your API credentials
3. **Update the `getScreenshotUrl` function** in `app/api/screenshot/route.ts`
4. **Add environment variables** to your deployment platform
5. **Test the integration** with your deployed projects

## Fallback Strategy

The current implementation includes a fallback to custom SVG previews if the screenshot service fails. This ensures your projects page always displays something attractive even if the external service is unavailable.

## Performance Considerations

- **Caching**: Screenshots are cached for 1 hour to reduce API calls
- **Error Handling**: Graceful fallback to SVG previews on errors
- **Rate Limiting**: Be aware of your chosen service's rate limits
- **Cost**: Monitor usage to avoid unexpected charges

## Current Implementation

The current implementation creates beautiful SVG previews that:
- Show the website's hostname prominently
- Include a realistic browser window mockup
- Use consistent styling with your site's theme
- Load quickly and work reliably
- Don't require external dependencies

This approach is perfect for most use cases and provides a professional appearance without the complexity of external services.
