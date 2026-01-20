import { NextResponse } from 'next/server';

async function detectFromVercel() {
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
    // transformVercelProjectsToDetected is now async, so we need to await it
    return await transformVercelProjectsToDetected(projects, githubRepos);
  } catch (error) {
    console.error('Error fetching Vercel projects:', error);
    return [];
  }
}

export async function GET() {
  try {
    // Only fetch from Vercel - this is the single source of truth
    const vercelProjects = await detectFromVercel();
    
    console.log(`Detected ${vercelProjects.length} projects from Vercel`);
    vercelProjects.forEach(p => {
      console.log(`  - ${p.title}: ${p.url}`);
    });
    
    return NextResponse.json({
      success: true,
      projects: vercelProjects,
      count: vercelProjects.length
    });
  } catch (error) {
    console.error('Error detecting projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to detect projects' },
      { status: 500 }
    );
  }
}

