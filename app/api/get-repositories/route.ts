import { NextResponse } from 'next/server';

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

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  homepage?: string;
  fork: boolean;
}

export async function GET() {
  try {
    // Fetch repositories server-side to hide URLs from client
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
      return NextResponse.json(
        { error: 'Failed to fetch repositories' },
        { status: 500 }
      );
    }

    const repos: Repository[] = await response.json();

    // Filter out forks
    const filteredRepos = repos.filter(repo => !repo.fork);

    // Helper function to censor text - show first few characters, blur the rest
    const censorText = (text: string, visibleChars: number = 4): string => {
      if (!text || text.length <= visibleChars) {
        return text || '';
      }
      const visible = text.substring(0, visibleChars);
      const censored = '•'.repeat(Math.min(text.length - visibleChars, 20)); // Max 20 dots
      return `${visible}${censored}`;
    };

    // Helper function to censor description - show first few words
    const censorDescription = (text: string): string => {
      if (!text || text.length === 0) {
        return 'No description available.';
      }
      // Show first 3-4 words, then blur the rest
      const words = text.split(' ');
      const visibleWords = Math.min(words.length, 4);
      const visible = words.slice(0, visibleWords).join(' ');
      const censored = words.length > visibleWords ? ' •••' : '';
      return `${visible}${censored}`;
    };

    // Return only safe data - no GitHub URLs, use hashed IDs and censored names
    const safeRepos = filteredRepos.map(repo => {
      const originalName = repo.name;
      const hashedId = hashProjectName(originalName);
      
      // Censor name: show first 3-4 characters, blur the rest
      const censoredName = censorText(originalName, 4);

      return {
        id: hashedId,
        displayName: censoredName,
        description: censorDescription(repo.description || 'No description available.'),
        updatedAt: repo.updated_at,
      };
    });

    return NextResponse.json({
      success: true,
      repositories: safeRepos,
      count: safeRepos.length
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}
