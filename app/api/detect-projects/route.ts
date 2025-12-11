import { NextResponse } from 'next/server';

interface DetectedProject {
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  detected: boolean;
}

// Common subdomain patterns to check
const commonSubdomains = [
  'casalink', 'askitchen', 'pogopass', 'typescripttutor', 'gridhealth',
  'myceliumlink', 'admin', 'app', 'portal', 'dashboard', 'api'
];

async function checkUrlExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function getProjectTitle(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) return '';
    
    const html = await response.text();
    
    // Try to extract title from OpenGraph or HTML title
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
    if (ogTitleMatch) return ogTitleMatch[1];
    
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch) return titleMatch[1].trim();
    
    return '';
  } catch {
    return '';
  }
}

async function detectFromSubdomains(baseDomain: string): Promise<DetectedProject[]> {
  const detected: DetectedProject[] = [];
  
  for (const subdomain of commonSubdomains) {
    const url = `https://${subdomain}.${baseDomain}`;
    const exists = await checkUrlExists(url);
    
    if (exists) {
      const title = await getProjectTitle(url) || subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
      detected.push({
        title,
        description: `Automatically detected project on ${baseDomain}`,
        url,
        detected: true
      });
    }
  }
  
  return detected;
}

async function detectFromGitHub(): Promise<DetectedProject[]> {
  const detected: DetectedProject[] = [];
  
  try {
    const response = await fetch(
      'https://api.github.com/users/Arwindpianist/repos?per_page=100&sort=updated',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    
    if (!response.ok) return detected;
    
    const repos = await response.json();
    
    for (const repo of repos) {
      if (repo.fork || !repo.homepage) continue;
      
      const homepage = repo.homepage;
      const isOurDomain = 
        homepage.includes('arwindpianist.com') || 
        homepage.includes('arwindpianist.store');
      
      if (isOurDomain) {
        const exists = await checkUrlExists(homepage);
        if (exists) {
          detected.push({
            title: repo.name,
            description: repo.description || `GitHub project: ${repo.name}`,
            url: homepage,
            githubUrl: repo.html_url,
            detected: true
          });
        }
      }
    }
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
  }
  
  return detected;
}

async function detectFromVercel(): Promise<DetectedProject[]> {
  try {
    const { fetchVercelProjects, transformVercelProjectsToDetected } = await import('@/lib/vercel');
    
    // Also fetch GitHub repos to match with Vercel projects
    const githubResponse = await fetch(
      'https://api.github.com/users/Arwindpianist/repos?per_page=100&sort=updated',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    
    const githubRepos = githubResponse.ok ? await githubResponse.json() : [];
    
    const projects = await fetchVercelProjects();
    return transformVercelProjectsToDetected(projects, githubRepos);
  } catch (error) {
    console.error('Error fetching Vercel projects:', error);
    return [];
  }
}

export async function GET() {
  try {
    // Detect from subdomains on both domains
    const [comProjects, storeProjects] = await Promise.all([
      detectFromSubdomains('arwindpianist.com'),
      detectFromSubdomains('arwindpianist.store')
    ]);
    
    // Detect from GitHub homepage URLs and Vercel projects
    const [githubProjects, vercelProjects] = await Promise.all([
      detectFromGitHub(),
      detectFromVercel()
    ]);
    
    // Merge all detected projects, avoiding duplicates
    // Vercel projects take priority as they have accurate domains
    const allProjects = [...vercelProjects, ...comProjects, ...storeProjects, ...githubProjects];
    const uniqueProjects = new Map<string, DetectedProject>();
    
    for (const project of allProjects) {
      const key = new URL(project.url).hostname;
      // Only add if we haven't seen this hostname, prioritizing Vercel projects
      if (!uniqueProjects.has(key)) {
        uniqueProjects.set(key, project);
      }
    }
    
    return NextResponse.json({
      success: true,
      projects: Array.from(uniqueProjects.values()),
      count: uniqueProjects.size
    });
  } catch (error) {
    console.error('Error detecting projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to detect projects' },
      { status: 500 }
    );
  }
}

