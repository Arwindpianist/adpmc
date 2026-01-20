import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Helper to create a hash from project name (one-way, can't reverse)
function hashProjectName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Server-side function to get GitHub URL map (fetches fresh data)
async function getGitHubUrlMap(): Promise<{ [key: string]: string }> {
  try {
    const response = await fetch(
      'https://api.github.com/users/Arwindpianist/repos?per_page=100&sort=updated',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Mozilla/5.0'
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      return {};
    }

    const repos = await response.json();
    const urlMap: { [key: string]: string } = {};

    repos.forEach((repo: any) => {
      if (!repo.fork) {
        const hashedId = hashProjectName(repo.name);
        urlMap[hashedId] = repo.html_url;
      }
    });

    return urlMap;
  } catch (error) {
    return {};
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Check payment status from cookie
    const cookieStore = await cookies();
    const paymentCookie = cookieStore.get('github_access_paid');
    const hasAccess = paymentCookie?.value === 'true';

    // Also check localStorage via request header (if sent from client)
    // But primarily rely on cookie for security

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Payment required', paid: false },
        { status: 403 }
      );
    }

    // Get GitHub URL from server-side map using hashed ID
    const urlMap = await getGitHubUrlMap();
    const githubUrl = urlMap[projectId];

    if (!githubUrl) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ url: githubUrl, paid: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get GitHub URL' },
      { status: 500 }
    );
  }
}

// Export helper function for use in other server-side code
export { hashProjectName };
