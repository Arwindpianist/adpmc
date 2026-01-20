import { NextResponse } from 'next/server';
import { fetchVercelProjects, transformVercelProjectsToDetected } from '@/lib/vercel';

async function getGitHubRepos() {
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
    
    if (!response.ok) return [];
    
    return await response.json();
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const [projects, githubRepos] = await Promise.all([
      fetchVercelProjects(),
      getGitHubRepos()
    ]);
    
    const detectedProjects = await transformVercelProjectsToDetected(projects, githubRepos);

    return NextResponse.json({
      success: true,
      projects: detectedProjects,
      count: detectedProjects.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Vercel projects' },
      { status: 500 }
    );
  }
}

