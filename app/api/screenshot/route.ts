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
    // Try to get OpenGraph data first
    const ogData = await getOpenGraphData(url);
    
    if (ogData && ogData.image) {
      // Return the OpenGraph image
      return NextResponse.json({ 
        screenshotUrl: ogData.image,
        success: true,
        title: ogData.title,
        description: ogData.description
      });
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
    console.error('OpenGraph generation error:', error);
    
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

async function getOpenGraphData(url: string): Promise<{
  image?: string;
  title?: string;
  description?: string;
} | null> {
  try {
    // Fetch the HTML content of the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    
    // Parse OpenGraph meta tags
    const ogImage = extractMetaContent(html, 'property="og:image"') || 
                   extractMetaContent(html, 'property="og:image:url"');
    
    const ogTitle = extractMetaContent(html, 'property="og:title"') ||
                   extractMetaContent(html, 'name="title"') ||
                   extractTitle(html);
    
    const ogDescription = extractMetaContent(html, 'property="og:description"') ||
                         extractMetaContent(html, 'name="description"');

    // If we found an image, make sure it's an absolute URL
    let imageUrl = ogImage;
    if (ogImage && !ogImage.startsWith('http')) {
      const baseUrl = new URL(url);
      imageUrl = new URL(ogImage, baseUrl).href;
    }

    return {
      image: imageUrl,
      title: ogTitle,
      description: ogDescription
    };
  } catch (error) {
    console.error('Error fetching OpenGraph data:', error);
    return null;
  }
}

function extractMetaContent(html: string, property: string): string | null {
  const regex = new RegExp(`<meta[^>]*${property}[^>]*content=["']([^"']*)["'][^>]*>`, 'i');
  const match = html.match(regex);
  return match ? match[1] : null;
}

function extractTitle(html: string): string | null {
  const regex = /<title[^>]*>([^<]*)<\/title>/i;
  const match = html.match(regex);
  return match ? match[1] : null;
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
