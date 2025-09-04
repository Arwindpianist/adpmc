import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  // Validate URL
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    // Use a real screenshot service
    const screenshotUrl = await getScreenshotUrl(url);
    
    if (screenshotUrl) {
      // Redirect to the screenshot URL
      return NextResponse.redirect(screenshotUrl);
    } else {
      // Fallback to placeholder
      const placeholderImage = createPlaceholderImage(url);
      return new NextResponse(placeholderImage, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  } catch (error) {
    console.error('Screenshot generation error:', error);
    
    // Fallback to placeholder on error
    const placeholderImage = createPlaceholderImage(url);
    return new NextResponse(placeholderImage, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

async function getScreenshotUrl(url: string): Promise<string | null> {
  try {
    // Using Microlink.io - a free screenshot service
    // This generates real website previews similar to link previews
    const microlinkUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
    
    const response = await fetch(microlinkUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success' && data.data.screenshot) {
        return data.data.screenshot.url;
      }
    }
    
    // Fallback: Try using Cloudinary's screenshot service
    const cloudinaryUrl = `https://res.cloudinary.com/demo/image/fetch/w_1200,h_800,f_auto,q_auto/${encodeURIComponent(url)}`;
    
    // Test if Cloudinary can generate the screenshot
    const cloudinaryResponse = await fetch(cloudinaryUrl, { method: 'HEAD' });
    if (cloudinaryResponse.ok) {
      return cloudinaryUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching screenshot:', error);
    return null;
  }
}

function createPlaceholderImage(url: string): Buffer {
  const hostname = new URL(url).hostname;
  const svg = `
    <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#374151;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect x="50" y="50" width="1100" height="700" rx="15" fill="#374151" stroke="#4b5563" stroke-width="2" filter="url(#glow)"/>
      <text x="600" y="180" font-family="Arial, sans-serif" font-size="52" font-weight="bold" text-anchor="middle" fill="#e5e7eb">${hostname}</text>
      <text x="600" y="240" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="#9ca3af">Live Preview</text>
      <rect x="100" y="300" width="1000" height="400" rx="12" fill="#1f2937" stroke="#374151" stroke-width="1"/>
      <rect x="120" y="320" width="960" height="60" rx="8" fill="#4b5563"/>
      <circle cx="140" cy="350" r="8" fill="#ef4444"/>
      <circle cx="160" cy="350" r="8" fill="#f59e0b"/>
      <circle cx="180" cy="350" r="8" fill="#10b981"/>
      <rect x="220" y="340" width="200" height="20" rx="4" fill="#6b7280"/>
      <rect x="440" y="340" width="100" height="20" rx="4" fill="#6b7280"/>
      <rect x="560" y="340" width="80" height="20" rx="4" fill="#6b7280"/>
      <rect x="120" y="400" width="300" height="200" rx="8" fill="#374151"/>
      <rect x="140" y="420" width="260" height="20" rx="4" fill="#6b7280"/>
      <rect x="140" y="450" width="200" height="15" rx="4" fill="#6b7280"/>
      <rect x="140" y="470" width="180" height="15" rx="4" fill="#6b7280"/>
      <rect x="140" y="490" width="220" height="15" rx="4" fill="#6b7280"/>
      <rect x="140" y="510" width="150" height="15" rx="4" fill="#6b7280"/>
      <rect x="140" y="530" width="240" height="15" rx="4" fill="#6b7280"/>
      <rect x="140" y="550" width="190" height="15" rx="4" fill="#6b7280"/>
      <rect x="140" y="570" width="170" height="15" rx="4" fill="#6b7280"/>
      <rect x="140" y="590" width="210" height="15" rx="4" fill="#6b7280"/>
      <rect x="450" y="400" width="300" height="200" rx="8" fill="#374151"/>
      <rect x="470" y="420" width="260" height="20" rx="4" fill="#6b7280"/>
      <rect x="470" y="450" width="200" height="15" rx="4" fill="#6b7280"/>
      <rect x="470" y="470" width="180" height="15" rx="4" fill="#6b7280"/>
      <rect x="470" y="490" width="220" height="15" rx="4" fill="#6b7280"/>
      <rect x="470" y="510" width="150" height="15" rx="4" fill="#6b7280"/>
      <rect x="470" y="530" width="240" height="15" rx="4" fill="#6b7280"/>
      <rect x="470" y="550" width="190" height="15" rx="4" fill="#6b7280"/>
      <rect x="470" y="570" width="170" height="15" rx="4" fill="#6b7280"/>
      <rect x="470" y="590" width="210" height="15" rx="4" fill="#6b7280"/>
      <rect x="780" y="400" width="300" height="200" rx="8" fill="#374151"/>
      <rect x="800" y="420" width="260" height="20" rx="4" fill="#6b7280"/>
      <rect x="800" y="450" width="200" height="15" rx="4" fill="#6b7280"/>
      <rect x="800" y="470" width="180" height="15" rx="4" fill="#6b7280"/>
      <rect x="800" y="490" width="220" height="15" rx="4" fill="#6b7280"/>
      <rect x="800" y="510" width="150" height="15" rx="4" fill="#6b7280"/>
      <rect x="800" y="530" width="240" height="15" rx="4" fill="#6b7280"/>
      <rect x="800" y="550" width="190" height="15" rx="4" fill="#6b7280"/>
      <rect x="800" y="570" width="170" height="15" rx="4" fill="#6b7280"/>
      <rect x="800" y="590" width="210" height="15" rx="4" fill="#6b7280"/>
      <text x="600" y="750" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#9ca3af">Click to visit the live site</text>
      <circle cx="600" cy="780" r="25" fill="#10b981" opacity="0.9"/>
      <text x="600" y="790" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="white">→</text>
    </svg>
  `;
  
  return Buffer.from(svg);
}
